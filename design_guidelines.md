# Celebrity Booking Catalogue - Comprehensive Design Guidelines

## Design Approach

**Reference-Based Luxury E-commerce**: Drawing inspiration from premium booking platforms (The Knot, Luxury Escapes) combined with high-end portfolio sites (Awwwards winners). The aesthetic must convey exclusivity and professionalism while maintaining accessibility for event planners and corporate clients.

**Core Principle**: Premium glassmorphism aesthetic with sophisticated dark backgrounds and metallic accents (gold/silver) to create a luxurious, high-end catalogue experience.

---

## Typography System

**Font Families** (via Google Fonts CDN):
- **Display/Headers**: "Playfair Display" (serif, elegant) - 600, 700 weights
- **Body/UI**: "Inter" (sans-serif, modern) - 400, 500, 600 weights  
- **Accent/Categories**: "Montserrat" (sans-serif, sophisticated) - 500, 600, 700 weights

**Type Scale**:
- Hero Headline: text-6xl md:text-7xl lg:text-8xl (Playfair Display, bold)
- Section Headers: text-4xl md:text-5xl (Playfair Display)
- Category Titles: text-2xl md:text-3xl (Montserrat, semibold)
- Celebrity Names: text-xl md:text-2xl (Montserrat, semibold)
- Body Text: text-base md:text-lg (Inter)
- UI Elements: text-sm md:text-base (Inter, medium)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Component padding: p-6 to p-8 (mobile), p-8 to p-12 (desktop)
- Section spacing: py-16 to py-20 (mobile), py-24 to py-32 (desktop)
- Card gaps: gap-6 (mobile), gap-8 (desktop)
- Container max-width: max-w-7xl with px-6 md:px-8

**Grid Systems**:
- Category Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 (7 categories require flexible layout)
- Celebrity Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Featured Section: grid-cols-1 md:grid-cols-3

---

## Component Library

### Hero Section
- Full viewport height (h-screen) with background video of events/crowd
- Centered content with glassmorphic overlay container
- Headline: "Discover & Book Your Favorite Celebrities"
- Subheading with value proposition
- Primary CTA button with blurred background overlay
- Floating search bar with glassmorphism effect
- Scrolling ticker at bottom: "Recently Booked For..." with celebrity names

### Category Grid Section
- 7 category cards with 3D flip effect on hover
- Each card displays: Icon (from Heroicons), category name, celebrity count
- Glassmorphic card styling with subtle borders
- Staggered animation on scroll (Framer Motion)
- Card dimensions: aspect-ratio-square on mobile, aspect-ratio-4/3 on desktop

### Featured/Trending Section
- Horizontal scrollable carousel on mobile, 3-column grid on desktop
- Celebrity cards with: Large image, name, category badge, view count indicator
- "Featured" or "Trending" badge in corner
- Hover effect reveals quick actions: View Profile, Enquire Now

### Celebrity Profile Cards (Grid View)
- Vertical card layout with image on top (aspect-ratio-3/4)
- Glassmorphic info panel overlay at bottom third
- Name, category badge, location icon
- Social media icons row (Instagram, YouTube, Twitter - use Font Awesome)
- "View Profile" button
- Heart icon for favorites/shortlist in top-right corner
- Subtle shadow and lift effect on hover

### Individual Profile Page Layout
- Hero banner: Full-width image/video (h-96 md:h-[600px])
- Two-column layout below hero:
  - Left (2/3): Bio, work highlights, embedded showreel video
  - Right (1/3): Sticky sidebar with quick info, social links, "Enquire Now" CTA
- Tabbed interface for: About, Gallery, Reviews (future)
- Breadcrumb navigation at top

### Search & Filter System
- Sticky filter bar below hero
- Search input with icon (Heroicons magnifying glass)
- Filter dropdowns: Category, Event Type, Location, Language, Gender
- Active filters displayed as removable chips
- Results count display
- Sort options: Popularity, Trending, A-Z

### Enquire Now Modal/Popup
- Centered modal with glassmorphic backdrop blur
- Form fields with floating labels:
  - Your Name (auto-focus)
  - Email (with validation)
  - Contact Number (with country code dropdown)
  - Purpose of Enquiry (textarea)
  - Auto-filled: Celebrity Name (read-only, highlighted)
- Dual CTAs: "Submit Enquiry" (primary), "Cancel" (ghost)
- WhatsApp icon indicator showing redirect

### Shortlist/Favorites Feature
- Floating action button (FAB) in bottom-right showing count
- Click opens sidebar/modal with shortlisted celebrities
- Compact list view with thumbnails
- "Send Combined Enquiry" button at bottom
- Remove option for each item

### Footer
- Four-column layout (desktop), stacked (mobile):
  - Column 1: Logo, tagline, social links
  - Column 2: Quick Links (Categories, About, Contact)
  - Column 3: Top Celebrities (dynamic list)
  - Column 4: Newsletter signup with glassmorphic input
- Bottom bar: Copyright, Privacy Policy, Terms, QR code for profile sharing
- Background: Subtle pattern or gradient

### Navigation
- Sticky header with glassmorphic background (blur on scroll)
- Logo left, navigation center, CTA/Login right
- Mobile: Hamburger menu with full-screen overlay
- Categories mega-menu on hover (desktop)

### Cards & Containers
- All cards use glassmorphism: backdrop-blur-lg with semi-transparent backgrounds
- Subtle border: border border-white/10
- Rounded corners: rounded-xl to rounded-2xl
- Shadows: Enhanced on hover with shadow-2xl

### Buttons & Interactive Elements
- Primary buttons: Medium rounded (rounded-lg), semibold text, px-8 py-3
- Buttons on images/hero: Blurred background, no hover interactions (native states only)
- Icon buttons: Circular (rounded-full), p-3
- Links: Underline on hover with smooth transition
- Active states: Subtle scale (scale-95) and opacity changes

### Badges & Tags
- Category badges: Small rounded pills (rounded-full), uppercase text (text-xs), px-3 py-1
- Status indicators: "Featured", "Trending", "New" - positioned absolutely on cards

---

## Images

### Hero Background
- **Location**: Full-screen hero section background
- **Description**: High-quality cinematic video or image montage showing crowd at concerts, celebrity performances, events with confetti/lights - should convey excitement and premium quality
- **Treatment**: Dimmed overlay (dark gradient) to ensure text readability

### Category Icons
- **Location**: Category grid cards
- **Description**: Use Heroicons for each category (microphone for singers, film for actors, etc.)

### Celebrity Profile Images
- **Location**: Profile cards, individual profile pages
- **Description**: Professional headshots or action shots of celebrities, high-resolution, aspect-ratio maintained
- **Treatment**: Subtle gradient overlay on card images for text contrast

### Background Patterns
- **Location**: Section dividers, footer
- **Description**: Subtle geometric patterns or luxury textures (very low opacity)

---

## Animations

**Scroll-Based**: Fade-in and slide-up for sections (Framer Motion)
**Hover Effects**: 
- Cards: Lift (translateY -4px) with enhanced shadow
- 3D flip for category cards
- Subtle glow on glassmorphic elements
**Transitions**: All interactive elements use transition-all duration-300 ease-in-out
**Loading States**: Skeleton screens with shimmer effect for celebrity cards

---

## Responsive Breakpoints

- Mobile-first approach
- sm: 640px (2-column grids begin)
- md: 768px (Navigation changes, 3-column layouts)
- lg: 1024px (4-column grids, sidebar layouts)
- xl: 1280px (Maximum 4-column for celebrity cards)

---

## Accessibility

- Focus indicators: Visible focus rings (ring-2 ring-offset-2)
- ARIA labels for all interactive elements
- Keyboard navigation support for modals and dropdowns
- Alt text for all celebrity images
- Color contrast ratios meeting WCAG AA standards (important for glassmorphic text)

---

## PWA Considerations

- App-like header (minimal chrome)
- Install prompt UI
- Offline state messaging
- Loading indicators for network requests
- Touch-friendly tap targets (min 44x44px)