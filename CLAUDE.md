# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, minimalist taxi booking website for Arrow Cab, featuring a real-time booking system with automatic price calculation. The site provides comprehensive coverage across Alberta, from Fort McMurray to Calgary, Edmonton, Brooks, and 50+ locations. Built with HTML5, CSS3, JavaScript, and Bootstrap, featuring a client-side booking system with local storage and email integration.

## Site Structure

The website consists of these main pages:
- `index.html` - Homepage with real-time booking system, stats, services, popular routes, fleet showcase
- `about.html` - Company story, core values, stats, and location with Google Maps
- `service.html` - Detailed service offerings with pricing (local, long-distance, airport, oil sands, corporate, events)
- `gallery.html` - Photo gallery for fleet and destinations
- `contact.html` - Contact form and information
- `blog-home.html`, `blog-single.html` - Blog pages (legacy)
- `elements.html` - UI elements showcase (legacy)

## CSS Architecture

Styles are built using SCSS (Sass) with the following structure:

### Main SCSS Entry Point
- `scss/main.scss` - Imports all theme files

### Theme Components (in `scss/theme/`)
- `_variables.scss` - Color scheme, fonts, and global variables
- `_mixins.scss` - Reusable SCSS mixins
- `_reset.scss` - CSS reset/normalization
- `_header.scss` - Header and navigation styles
- `_home.scss` - Homepage-specific styles
- `_footer.scss` - Footer styles
- `_blog.scss` - Blog section styles
- `_contact.scss` - Contact page styles
- `_elements.scss` - UI elements and components
- `_flexbox.scss` - Flexbox utilities

### Compiling SCSS
To make CSS changes, edit files in `scss/` directory and compile to `css/main.css`. The site uses a Sass preprocessor workflow.

## JavaScript Architecture

### Core Libraries (loaded in order):
1. `js/vendor/jquery-2.2.4.min.js` - jQuery library
2. Bootstrap's Popper.js (loaded from CDN)
3. `js/vendor/bootstrap.min.js` - Bootstrap framework
4. `js/easing.min.js` - jQuery easing animations
5. `js/hoverIntent.js` - Hover intent detection
6. `js/superfish.min.js` - Menu navigation
7. `js/jquery.ajaxchimp.min.js` - Mailchimp integration
8. `js/jquery.magnific-popup.min.js` - Lightbox/popup functionality
9. `js/jquery-ui.js` - jQuery UI (for datepickers)
10. `js/jquery.nice-select.min.js` - Custom select dropdowns
11. `js/mail-script.js` - Contact form handling
12. `js/main.js` - Main application logic
13. **`js/booking-system.js`** - Custom booking system with price calculator (INDEX PAGE ONLY)

### Main JavaScript Features (`js/main.js`)
- **Mobile navigation**: Creates responsive menu from `#nav-menu-container`
- **Smooth scrolling**: Enables smooth anchor link scrolling with easing
- **Nice Select**: Initializes custom styled select dropdowns
- **Magnific Popup**: Handles image gallery lightbox (`.img-gal`) and video popups (`.play-btn`)
- **jQuery UI Datepicker**: Applied to `#datepicker` and `#datepicker2` elements
- **Superfish menu**: Dropdown navigation with animation
- **Google Maps**: Initializes map on contact page (element `#map`)
- **Mailchimp integration**: Newsletter subscription via AJAX
- **Header scroll class**: Adds `.header-scrolled` class after scrolling 100px

## Booking System (`js/booking-system.js`)

### Overview
Client-side booking system with real-time price calculation, local storage, and email delivery. Handles all booking logic without requiring a backend server.

### Key Components

#### 1. PriceCalculator Object
- **Base rates**: Local ($15), Oil Sands ($80), Per-km ($1.20)
- **Distance matrix**: Pre-defined distances to 50+ Alberta locations
- **Intelligent pricing**:
  - Local Fort McMurray rides: Flat $15
  - Oil Sands camps: $80 base + distance calculation
  - Long distance (>400km): Discounted $1.10/km rate
  - Medium distance (200-400km): $1.15/km
  - Short distance: Standard $1.20/km
  - Airport surcharge: +$10
  - Large vehicle (5+ passengers): +30%

#### 2. BookingManager Object
- **Local storage**: Saves all bookings to browser localStorage
- **Form validation**: Ensures all required fields are complete
- **Real-time updates**: Calculates price as user selects locations
- **Email delivery**: Submits booking to FormSubmit.co for email notification

### Location Coverage
- **Fort McMurray**: 11 neighborhoods (Downtown, Abasand, Beacon Hill, etc.)
- **Oil Sands**: 5 major camps (Kearl, Suncor Firebag, Suncor Fort Hills, CNRL, Syncrude)
- **Major Cities**: Calgary, Edmonton, Red Deer, Lethbridge, Medicine Hat, Brooks, Grande Prairie
- **Regional Towns**: Lac La Biche, Slave Lake, Athabasca, Bonnyville, Cold Lake, St. Paul, Whitecourt

### Event Handlers
- `fromLocation.change` - Updates price when pickup location changes
- `toLocation.change` - Updates price when destination changes
- `passengers.change` - Recalculates for large vehicle if needed
- `form.submit` - Saves booking and sends email

## Form Handling

### Booking Form (index.html)
- **Real-time booking** with instant price estimates
- **Fields**: name, phone, email (optional), from-location, to-location, pickup date/time, passengers, notes
- **Price display**: Shows estimated fare before booking
- **Email delivery**: Uses FormSubmit.co to send booking details to arrowcab10@gmail.com
- **Local storage**: Saves booking history in browser

### Contact Form (contact.html)
- Uses FormSubmit.co service
- Captures: name, email, phone, message

### Newsletter Subscription (footer)
- Mailchimp integration via `jquery.ajaxchimp.min.js`
- Update action URL in footer forms to use your Mailchimp endpoint

## Google Maps Integration

The contact page includes Google Maps integration:
- API key is embedded in `index.html` and `contact.html` (line ~413 and ~168)
- Map initialization is in `js/main.js` (lines 210-342)
- Default coordinates set to New York (40.6700, -73.9400) - update to Fort McMurray coordinates

## Modern Design System

### CSS Variables (defined in inline `<style>` blocks)
```css
--primary-color: #2563eb (blue)
--accent-color: #3b82f6 (lighter blue)
--success-color: #10b981 (green)
--text-dark: #1f2937 (dark gray)
--text-light: #6b7280 (light gray)
--bg-light: #f9fafb (off-white)
--border-color: #e5e7eb (border gray)
--shadow-md, --shadow-lg, --shadow-xl (elevation shadows)
```

### Design Features
- **Glass-morphism**: Semi-transparent backgrounds with blur effects
- **Gradient headers**: Purple gradient (`#667eea` to `#764ba2`)
- **Card hover effects**: Lift animation with enhanced shadows
- **Smooth transitions**: 0.3s ease on all interactive elements
- **Modern typography**: Inter (body) + Poppins (headings)

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## Making Changes

### Update Booking Prices
Edit `js/booking-system.js`:
- **Base rates** (lines 12-19): Change flat rates and per-km pricing
- **Distance matrix** (lines 22-56): Add/update city distances
- **Fort McMurray areas** (lines 59-72): Add/remove local neighborhoods

### Update Booking Locations
Edit `index.html` booking form (lines 443-533):
- Add new cities to `<optgroup>` sections
- Include distance in parentheses for destination dropdown
- Keep pickup and destination lists synchronized

### Update Contact Information
- **Phone**: Search "+1 587 645 7951" across all HTML files
- **Email**: Update "arrowcab10@gmail.com" in `js/booking-system.js` (line 160) and HTML contact forms
- **Address**: Search "4957 STN MAIN" in about.html

### Modify Styles
**Option 1** - Quick changes (inline styles):
- Edit `<style>` blocks in each HTML file
- Faster for page-specific styles

**Option 2** - Comprehensive changes (SCSS):
1. Edit files in `scss/theme/`
2. Compile SCSS to `css/main.css`
3. Changes apply across all pages

### Add Fleet/Destination Images
1. **Fleet images**: Place in `img/fleet/` (sedan.jpg, suv.jpg, van.jpg)
   - Recommended: 1200x900px, 4:3 aspect ratio
2. **Destination images**: Place in `img/destinations/` (calgary.jpg, edmonton.jpg, oil-sands.jpg)
   - Recommended: 1200x800px, 3:2 aspect ratio
3. The site has fallback images if custom ones aren't available

### Create New Pages
1. Copy header/footer from existing pages
2. Include all CSS files (lines 16-23 in index.html)
3. Include all JS files (lines 847-858 in index.html)
4. Add inline `<style>` block with CSS variables
5. Update navigation active state (`menu-active` class)

## Key File Locations

- **Booking system logic**: `js/booking-system.js`
- **Price calculator**: `js/booking-system.js` lines 10-87
- **Email configuration**: `js/booking-system.js` line 160
- **Location lists**: `index.html` lines 443-533
- **SCSS sources**: `scss/theme/` directory
- **Fleet images**: `img/fleet/`
- **Destination images**: `img/destinations/`

## Documentation

The `Taxi - Doc` folder contains original template documentation. See `README.md` for updated project documentation including booking system usage and customization guide.
