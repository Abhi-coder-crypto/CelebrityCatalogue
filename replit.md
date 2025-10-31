# Celebrity Booking Catalogue

## Overview

A premium web-based celebrity booking platform that showcases profiles of singers, actors, comedians, influencers, choreographers, chefs, and motivational speakers. Built as a modern Progressive Web App (PWA), the application features a luxury glassmorphism aesthetic with sophisticated dark backgrounds and metallic accents. Users can browse celebrities by category, filter by various criteria, save favorites, and submit booking enquiries that integrate with WhatsApp for direct communication.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management and caching
- Framer Motion for animations and transitions

**UI Component System**
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design system
- Custom typography system using Google Fonts (Playfair Display, Inter, Montserrat)
- Glassmorphism design pattern with backdrop blur effects
- Responsive grid layouts supporting mobile-first design

**State Management**
- Local component state for UI interactions
- React Query for server state caching and synchronization
- Browser localStorage implied for favorites persistence (via local state)

**Key Design Patterns**
- Component composition with Radix UI headless components
- Form validation using react-hook-form with Zod schema validation
- Custom hooks for reusable logic (use-mobile, use-toast)
- Path aliases for clean imports (@/, @shared/, @assets/)

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- TypeScript for type safety across the stack
- Custom middleware for request logging and JSON parsing

**API Design**
- RESTful API endpoints following resource-based patterns
- Routes defined in `/server/routes.ts`
- Endpoints for celebrities (GET, view tracking) and enquiries (POST)
- Storage abstraction layer via IStorage interface

**Data Storage Strategy**
- In-memory storage implementation (MemStorage) with seeded sample data
- Interface-based design allowing future database integration
- Drizzle ORM configured for PostgreSQL migration path
- Schema definitions shared between client and server via `/shared/schema.ts`

**Database Schema (MongoDB)**
- `celebrities` collection: stores celebrity profiles with metadata, social links, and view counts
- `enquiries` collection: stores user enquiry submissions with celebrity references
- MongoDB ObjectID for document identification
- Array fields for multi-value fields (languages, event types, social links)

### API Structure

**Celebrity Endpoints**
- `GET /api/celebrities` - Fetch all celebrity profiles
- `GET /api/celebrities/:id` - Fetch single celebrity by ID
- `POST /api/celebrities/:id/view` - Increment view counter for analytics

**Enquiry Endpoints**
- `POST /api/enquiries` - Create new booking enquiry with validation and email notification
- `GET /api/enquiries` - Fetch all enquiries (admin functionality)

**Response Patterns**
- JSON responses for all endpoints
- Error handling with appropriate HTTP status codes
- Zod schema validation for request bodies
- Detailed error messages for validation failures

### Key Architectural Decisions

**Monorepo Structure**
- Client and server code in single repository
- Shared schema and types via `/shared` directory
- Build process bundles server with esbuild, client with Vite
- Production deployment serves static client files from Express

**Development Experience**
- Hot Module Replacement (HMR) in development
- Vite middleware mode for seamless dev server integration
- TypeScript path mapping for clean imports
- Custom error overlays and dev tooling for Replit environment

**Routing Strategy**
- Client-side routing with wouter (lightweight, hooks-based)
- Routes: Home (`/`), Category pages (`/category/:slug`), Celebrity profiles (`/celebrity/:slug`)
- Server handles all API routes under `/api/*` prefix
- Catch-all route serves React app for SPA behavior

**Form Handling**
- React Hook Form for form state management
- Zod schemas for runtime validation matching database schema
- Optimistic UI updates where appropriate
- Toast notifications for user feedback

**Image Assets**
- Static images stored in `/attached_assets/generated_images`
- Vite alias for asset imports (`@assets/`)
- Background videos and hero imagery for premium feel

## External Dependencies

### Core Framework Dependencies
- **React 18+** - UI library with modern hooks and concurrent features
- **Express.js** - Node.js web application framework for API server
- **Vite** - Next-generation frontend build tool with fast HMR
- **TypeScript** - Type-safe JavaScript superset for full-stack development

### Database & ORM
- **Drizzle ORM** - TypeScript ORM with type-safe query builder
- **@neondatabase/serverless** - PostgreSQL client for Neon serverless database
- **drizzle-zod** - Integration between Drizzle schemas and Zod validation
- **connect-pg-simple** - PostgreSQL session store (prepared for authentication)

### UI Component Libraries
- **Radix UI** - Headless component primitives (20+ components including Dialog, Dropdown, Popover, Toast, etc.)
- **shadcn/ui** - Pre-styled components built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework with custom configuration
- **Framer Motion** - Animation library for smooth transitions and interactions
- **Lucide React** - Icon library with consistent design system
- **React Icons** - Social media icons (Instagram, YouTube, WhatsApp, etc.)

### Form & Validation
- **react-hook-form** - Performant form library with minimal re-renders
- **@hookform/resolvers** - Validation resolvers for react-hook-form
- **Zod** - TypeScript-first schema validation library

### Routing & State
- **wouter** - Minimalist client-side router (2KB alternative to React Router)
- **@tanstack/react-query** - Server state management with caching and synchronization

### Styling Utilities
- **class-variance-authority** - Utility for creating type-safe component variants
- **clsx** - Conditional className construction
- **tailwind-merge** - Merge Tailwind classes without conflicts
- **tailwindcss-animate** - Animation utilities for Tailwind

### Development Tools
- **@replit/vite-plugin-runtime-error-modal** - Runtime error overlay for Replit
- **@replit/vite-plugin-cartographer** - Replit development tooling
- **tsx** - TypeScript execution for Node.js (development server)
- **esbuild** - Fast JavaScript bundler for server production build

### Email Notifications
- **Nodemailer** - Email service for sending enquiry notifications via Gmail
- Email notifications sent automatically when new enquiry is submitted
- Configured via environment variables: `GMAIL_APP_PASSWORD` and `NOTIFICATION_EMAIL`
- Email service gracefully handles missing credentials (logs warning but doesn't block enquiry submission)
- HTML formatted emails with customer details, celebrity info, and enquiry purpose

### Third-Party Integrations (Planned)
- **WhatsApp Business API** - Enquiry redirection with pre-filled messages (URL-based integration)
- **Google Fonts CDN** - Typography system (Playfair Display, Inter, Montserrat)

### Build & Deployment Configuration
- PostCSS with Autoprefixer for CSS processing
- Drizzle Kit for database migrations
- Custom Vite configuration with path aliases and asset handling
- Environment variables for database connection (MONGODB_URI) and email (GMAIL_APP_PASSWORD, NOTIFICATION_EMAIL)