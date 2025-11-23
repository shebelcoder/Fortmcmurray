/**
 * Arrow Cab Booking System
 * Client-side booking management with price estimation
 */

(function() {
    'use strict';

    // Price calculator based on distance and location type
    const PriceCalculator = {
        // Base rates
        rates: {
            base: 8.00,              // Base fare
            perKm: 1.20,             // Per kilometer
            local: 15.00,            // Local flat rate (within Fort McMurray)
            oilSands: 80.00,         // Oil sands base rate
            airportSurcharge: 10.00  // Airport pickup/dropoff
        },

        // Distance matrix (in kilometers)
        distances: {
            // Local Fort McMurray (flat rate)
            'local': 0,

            // Oil Sands Camps
            'Kearl Oil Sands': 65,
            'Suncor Firebag': 95,
            'Suncor Fort Hills': 90,
            'CNRL Horizon': 70,
            'Syncrude Mildred Lake': 40,

            // Major Cities
            'Calgary': 550,
            'Calgary Airport': 550,
            'Edmonton': 435,
            'Edmonton Airport': 435,
            'Red Deer': 400,
            'Lethbridge': 680,
            'Medicine Hat': 650,
            'Brooks': 590,
            'Grande Prairie': 480,

            // Regional Towns
            'Lac La Biche': 170,
            'Slave Lake': 250,
            'Athabasca': 260,
            'Bonnyville': 310,
            'Cold Lake': 290,
            'St. Paul': 340,
            'Whitecourt': 330
        },

        // Fort McMurray local areas
        fortMcMurrayAreas: [
            'Downtown Fort McMurray',
            'Abasand',
            'Beacon Hill',
            'Dickinsfield',
            'Eagle Ridge',
            'Gregoire',
            'Parsons Creek',
            'Stone Creek',
            'Thickwood',
            'Timberlea',
            'Waterways',
            'Fort McMurray Airport'
        ],

        // Calculate price based on from and to locations
        calculate: function(from, to, passengers) {
            if (!from || !to) return 0;

            let price = 0;
            const isFromLocal = this.fortMcMurrayAreas.includes(from);
            const isToLocal = this.fortMcMurrayAreas.includes(to);

            // Both local - flat rate
            if (isFromLocal && isToLocal) {
                price = this.rates.local;
            }
            // Oil sands trips
            else if (from.includes('Oil Sands') || from.includes('Camp') ||
                     from.includes('CNRL') || from.includes('Syncrude') ||
                     to.includes('Oil Sands') || to.includes('Camp') ||
                     to.includes('CNRL') || to.includes('Syncrude')) {
                const campLocation = from.includes('Oil Sands') || from.includes('Camp') ||
                                    from.includes('CNRL') || from.includes('Syncrude') ? from : to;
                const distance = this.distances[campLocation] || 70;
                price = this.rates.oilSands + (distance * 0.5);
            }
            // Long distance trips
            else {
                const destination = isFromLocal ? to : from;
                const distance = this.getDistance(destination);

                if (distance > 0) {
                    // Long distance pricing (better rates for longer trips)
                    if (distance > 400) {
                        price = this.rates.base + (distance * 1.10); // Discounted rate
                    } else if (distance > 200) {
                        price = this.rates.base + (distance * 1.15);
                    } else {
                        price = this.rates.base + (distance * this.rates.perKm);
                    }
                } else {
                    price = 50; // Minimum for unknown routes
                }
            }

            // Airport surcharge
            if (from.includes('Airport') || to.includes('Airport')) {
                price += this.rates.airportSurcharge;
            }

            // Large vehicle surcharge for 5+ passengers
            if (passengers === '5+') {
                price *= 1.3;
            }

            return Math.round(price);
        },

        // Get distance for a location
        getDistance: function(location) {
            // Try exact match first
            if (this.distances[location]) {
                return this.distances[location];
            }

            // Try partial match
            for (let key in this.distances) {
                if (location.includes(key) || key.includes(location.split(' ')[0])) {
                    return this.distances[key];
                }
            }

            return 0;
        }
    };

    // Booking Manager
    const BookingManager = {
        bookings: [],

        init: function() {
            this.loadBookings();
            this.setupEventListeners();
            this.setMinDateTime();
        },

        // Load bookings from localStorage
        loadBookings: function() {
            const stored = localStorage.getItem('arrowCabBookings');
            if (stored) {
                try {
                    this.bookings = JSON.parse(stored);
                } catch (e) {
                    this.bookings = [];
                }
            }
        },

        // Save bookings to localStorage
        saveBookings: function() {
            localStorage.setItem('arrowCabBookings', JSON.stringify(this.bookings));
        },

        // Set minimum date/time to now
        setMinDateTime: function() {
            const now = new Date();
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            document.getElementById('pickupTime').min = now.toISOString().slice(0, 16);
        },

        // Setup event listeners
        setupEventListeners: function() {
            const form = document.getElementById('bookingForm');
            const fromLocation = document.getElementById('fromLocation');
            const toLocation = document.getElementById('toLocation');
            const passengers = document.getElementById('passengers');

            // Calculate price on location/passenger change
            const updatePrice = () => {
                const from = fromLocation.value;
                const to = toLocation.value;
                const pass = passengers.value;

                if (from && to) {
                    const price = PriceCalculator.calculate(from, to, pass);
                    this.displayPrice(price);
                }
            };

            fromLocation.addEventListener('change', updatePrice);
            toLocation.addEventListener('change', updatePrice);
            passengers.addEventListener('change', updatePrice);

            // Form submission
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBooking();
            });
        },

        // Display calculated price
        displayPrice: function(price) {
            const priceEstimate = document.getElementById('priceEstimate');
            const priceAmount = document.getElementById('priceAmount');

            priceAmount.textContent = '$' + price;
            priceEstimate.style.display = 'block';
        },

        // Handle booking submission
        handleBooking: function() {
            const form = document.getElementById('bookingForm');
            const formData = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                customerName: document.getElementById('customerName').value,
                customerPhone: document.getElementById('customerPhone').value,
                customerEmail: document.getElementById('customerEmail').value,
                fromLocation: document.getElementById('fromLocation').value,
                toLocation: document.getElementById('toLocation').value,
                pickupTime: document.getElementById('pickupTime').value,
                passengers: document.getElementById('passengers').value,
                notes: document.getElementById('bookingNotes').value,
                estimatedPrice: document.getElementById('priceAmount').textContent
            };

            // Save to local storage
            this.bookings.push(formData);
            this.saveBookings();

            // Send booking via email
            this.sendBookingEmail(formData);

            // Show confirmation
            this.showConfirmation(formData);

            // Reset form
            form.reset();
            document.getElementById('priceEstimate').style.display = 'none';
        },

        // Send booking email using FormSubmit.co
        sendBookingEmail: function(data) {
            const emailBody = `
                New Booking Request - Arrow Cab

                Booking ID: ${data.id}
                Date: ${new Date(data.timestamp).toLocaleString()}

                Customer Information:
                Name: ${data.customerName}
                Phone: ${data.customerPhone}
                Email: ${data.customerEmail || 'Not provided'}

                Trip Details:
                From: ${data.fromLocation}
                To: ${data.toLocation}
                Pickup Time: ${new Date(data.pickupTime).toLocaleString()}
                Passengers: ${data.passengers}

                Estimated Fare: ${data.estimatedPrice}

                Additional Notes:
                ${data.notes || 'None'}

                Please confirm this booking with the customer.
            `;

            // Create hidden form for FormSubmit
            const tempForm = document.createElement('form');
            tempForm.action = 'https://formsubmit.co/arrowcab10@gmail.com';
            tempForm.method = 'POST';
            tempForm.style.display = 'none';

            // Add form fields
            const fields = {
                '_subject': `New Booking: ${data.fromLocation} to ${data.toLocation}`,
                '_template': 'box',
                '_captcha': 'false',
                'name': data.customerName,
                'phone': data.customerPhone,
                'email': data.customerEmail || 'Not provided',
                'from': data.fromLocation,
                'to': data.toLocation,
                'datetime': data.pickupTime,
                'passengers': data.passengers,
                'price': data.estimatedPrice,
                'notes': data.notes || 'None',
                'booking_id': data.id
            };

            for (let key in fields) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = fields[key];
                tempForm.appendChild(input);
            }

            document.body.appendChild(tempForm);
            tempForm.submit();
        },

        // Show booking confirmation
        showConfirmation: function(data) {
            const message = `
                ✓ Booking Confirmed!

                Booking ID: #${data.id}

                Your ride from ${data.fromLocation} to ${data.toLocation} has been booked for ${new Date(data.pickupTime).toLocaleString()}.

                Estimated Fare: ${data.estimatedPrice}

                We'll contact you shortly at ${data.customerPhone} to confirm the details.

                Thank you for choosing Arrow Cab!
            `;

            alert(message);

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            BookingManager.init();
        });
    } else {
        BookingManager.init();
    }

    // Make booking manager globally accessible for debugging
    window.ArrowCabBooking = BookingManager;

})();
