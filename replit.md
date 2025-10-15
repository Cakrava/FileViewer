# Muhammad Fahril Birthday Web App

## Overview

This is an interactive birthday web application built for Muhammad Fahril. The application guides users through a multi-section journey featuring personalized messages, prayers (doa), word-matching games, inspirational quotes, and a finale celebration with confetti effects and audio. Built with React, TypeScript, Express, and PostgreSQL (via Drizzle ORM), this application prioritizes visual consistency by replicating the exact design from the "FahrilBirthdayBash" repository.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server
- **Wouter** for lightweight client-side routing
- **Framer Motion** for section transitions and animations

**UI Component System**
- **shadcn/ui** components built on Radix UI primitives (New York style variant)
- **Tailwind CSS** for utility-first styling with custom HSL-based color system
- Component aliases configured for clean imports (`@/components`, `@/lib`, etc.)

**State Management**
- Local state management with React hooks (useState, useEffect)
- **TanStack Query (React Query)** for server state management
- **localStorage** for persisting birthday form data across sessions

**Key Features Implementation**
- **Multi-section flow**: 9 sections navigated sequentially (Welcome → Birth Date → Personal Message → Doa → 3x Word Games → Quotes → Finale)
- **Form validation**: Client-side validation with minimum character requirements (10+ chars for messages/games)
- **Interactive games**: Word-matching puzzles with pattern-based blank filling
- **Quote carousel**: Rotatable inspirational quotes with view tracking
- **Finale celebration**: Canvas confetti effects and auto-playing audio

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for the HTTP server
- Middleware: JSON parsing, URL encoding, request logging
- Custom error handling middleware for consistent error responses
- Development-only Vite middleware integration for HMR

**API Design**
- RESTful API pattern with `/api` prefix for all endpoints
- Routes registered via `registerRoutes()` function
- Currently configured with placeholder storage layer

**Data Storage**
- **In-memory storage** (MemStorage) for development/testing
- Interface-based design (IStorage) for future database implementation
- Drizzle ORM configured for PostgreSQL with:
  - Schema: `shared/schema.ts`
  - Migrations: `./migrations` directory
  - Neon Database serverless driver integration

### Design System

**Color Architecture**
- HSL-based theming with CSS custom properties
- Light/dark mode support via CSS class toggling
- Semantic color tokens: background, foreground, primary, secondary, accent, destructive
- Button border computation with opacity-based intensity control
- Elevation system using rgba overlays (elevate-1, elevate-2)

**Typography & Spacing**
- Custom font stack including: DM Sans, Architects Daughter, Fira Code, Geist Mono
- Tailwind's default spacing scale
- Custom border radius values (sm: 3px, md: 6px, lg: 9px)

**Component Styling Principles**
- 100% design extraction from "FahrilBirthdayBash" repository
- Gradient backgrounds: violet-pink-orange transitions
- Card system with backdrop blur effects (white/70 opacity)
- Consistent shadow and border treatments

### External Dependencies

**UI & Animation Libraries**
- **Radix UI**: Accessible component primitives (30+ components including Dialog, Popover, Accordion)
- **Framer Motion**: Animation library for section transitions
- **canvas-confetti**: Confetti effects in finale section
- **html2canvas**: Screenshot/download functionality for birthday cards

**Form & Validation**
- **React Hook Form** with @hookform/resolvers
- **Zod**: Schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod schemas

**Database & ORM**
- **Drizzle ORM**: Type-safe SQL query builder
- **@neondatabase/serverless**: PostgreSQL driver for Neon Database
- **drizzle-kit**: Migration and schema management CLI

**Utility Libraries**
- **clsx** & **tailwind-merge**: Conditional className merging
- **class-variance-authority**: Type-safe variant styling
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation

**Development Tools**
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast bundling for production builds
- **@replit/* plugins**: Replit-specific development tooling (cartographer, dev banner, runtime error modal)

### Data Schema

**Birthday Data Model** (Zod Schema)
```typescript
{
  birthDate: string (required)
  personalMessage: string (min 10 chars)
  wordGame1: string (min 10 chars)
  wordGame2: string (min 10 chars)
  wordGame3: string (min 10 chars)
}
```

**Section State**
- currentSection: number (1-9)
- birthdayData: Partial<BirthdayData>
- viewedQuotes: number[] (tracking quote carousel history)
- age: number (calculated from birthDate)

**Quote Structure**
- id: number
- text: string
- author: string

### Session Management

**Client-side Persistence**
- localStorage key: "fahril-birthday-data"
- Automatic save on data updates
- Automatic load on component mount

**Server Sessions** (Configured but not actively used)
- connect-pg-simple for PostgreSQL session store
- Express session middleware ready for implementation