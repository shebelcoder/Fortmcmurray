# Arrow Cab - Premium Taxi Booking Website

A modern, professional taxi booking website for Arrow Cab, Fort McMurray's premier transportation service with province-wide Alberta coverage.

## Features

### Real-Time Online Booking System
- **Client-side booking** with instant price estimates
- **Automatic price calculation** based on distance and route type
- **Comprehensive coverage**: Fort McMurray, Calgary, Edmonton, Brooks, and 50+ Alberta locations
- **Local storage** for booking history
- **Email notifications** via FormSubmit.co integration

### Modern Minimalist Design
- Clean, professional UI with smooth animations
- Glass-morphism effects and gradient backgrounds
- Fully responsive design (mobile, tablet, desktop)
- Accessible and user-friendly interface
- Inter & Poppins font pairing for modern typography

### Complete Website Pages
1. **Homepage** - Hero section with integrated booking form, stats, services, destinations, fleet showcase
2. **About** - Company story, values, location with embedded Google Maps
3. **Services** - Detailed service offerings with pricing
4. **Gallery** - Photo gallery (ready for fleet and destination images)
5. **Contact** - Contact form and information

### Advanced Booking Features
- **Smart pricing algorithm**:
  - Local rides: Flat rate ($15)
  - Oil Sands camps: Special rates starting at $80
  - Long distance: Discounted per-km rates for longer trips
  - Large vehicle surcharge for 5+ passengers
- **Fort McMurray neighborhoods**: All major areas covered
- **Oil Sands camps**: Kearl, Suncor Firebag, Suncor Fort Hills, CNRL Horizon, Syncrude
- **Major cities**: Calgary, Edmonton, Red Deer, Lethbridge, Medicine Hat, Brooks, Grande Prairie
- **Regional towns**: Lac La Biche, Slave Lake, Athabasca, Cold Lake, and more

## Quick Start

### Setup
1. Clone or download this repository
2. Open `index.html` in a web browser
3. The site works out-of-the-box with no build process required

### Customization
1. **Update contact email**:
   - Edit `js/booking-system.js` line 160
   - Change `arrowcab10@gmail.com` to your email

2. **Add vehicle images**:
   - Place images in `img/fleet/` (sedan.jpg, suv.jpg, van.jpg)
   - Recommended size: 1200x900px

3. **Add destination images**:
   - Place images in `img/destinations/` (calgary.jpg, edmonton.jpg, oil-sands.jpg)
   - Recommended size: 1200x800px

4. **Update pricing**:
   - Edit rates in `js/booking-system.js` lines 12-19
   - Modify distance matrix lines 22-56

### Email Setup (FormSubmit.co)
The booking system uses FormSubmit.co for email notifications:
1. No signup required - just use your email address
2. First booking confirmation: FormSubmit sends a verification email
3. Click the verification link to activate
4. All future bookings will be sent to your email automatically

## File Structure

```
taxi-master/
├── index.html              # Homepage with booking system
├── about.html              # About page
├── service.html            # Services page
├── gallery.html            # Gallery page
├── contact.html            # Contact page
├── css/
│   ├── main.css           # Main styles
│   ├── bootstrap.css      # Bootstrap framework
│   └── [other CSS files]
├── js/
│   ├── booking-system.js  # Booking logic & price calculator
│   ├── main.js            # Main JavaScript
│   └── [other JS files]
├── img/
│   ├── destinations/      # Destination images
│   ├── fleet/             # Vehicle images
│   └── [other images]
└── scss/                  # SCSS source files
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Client-side functionality
- **Bootstrap 4** - Responsive grid system
- **jQuery** - DOM manipulation
- **FormSubmit.co** - Email delivery service
- **Google Fonts** - Inter & Poppins typography
- **Font Awesome** - Icons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Key Features Breakdown

### Booking System
- Real-time price calculation
- Form validation
- Local storage for booking history
- Email confirmation
- Mobile-friendly interface

### Price Calculator Algorithm
```javascript
- Local rides (within Fort McMurray): $15 flat rate
- Oil Sands camps: $80 base + distance calculation
- Long distance (>400km): $1.10/km (discounted rate)
- Medium distance (200-400km): $1.15/km
- Short distance (<200km): $1.20/km
- Airport surcharge: +$10
- Large vehicle (5+ passengers): +30%
```

### Locations Covered
- **Fort McMurray**: 11 neighborhoods
- **Oil Sands**: 5 major camps
- **Major Cities**: 7 Alberta cities (Calgary, Edmonton, etc.)
- **Regional Towns**: 7 towns
- **Custom locations**: "Other" option available

## Support & Customization

For questions or custom development:
- **Email**: arrowcab10@gmail.com
- **Phone**: +1 587 645 7951

## License

© 2025 Arrow Cab. All rights reserved.

## Credits

- Template base: Colorlib Taxi Template
- Design enhancements: Custom modern minimalist redesign
- Booking system: Custom-built JavaScript application
- Icons: Font Awesome
- Fonts: Google Fonts (Inter, Poppins)
