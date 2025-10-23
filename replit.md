# Alchemical Grimoire - Enhanced Edition

## Overview
An interactive web application for shadow work, inner child healing, and archetypal exploration based on Jungian psychology. The app provides comprehensive tools for personal transformation through interactive exercises, journaling, and community sharing.

## Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with glass-morphism effects
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Data Visualization**: Recharts
- **Storage**: Local Storage for data persistence

## Project Structure
```
src/
├── components/        # UI components
│   ├── activities/   # Interactive activity components
│   ├── features/     # Feature components (AI integration)
│   ├── Layout.tsx    # Main layout wrapper
│   └── EnhancedNavigation.tsx
├── pages/            # Route pages
├── context/          # React context for state management
├── data/             # Static data (chapters, etc.)
├── services/         # API services
└── types/            # TypeScript type definitions
```

## Key Features
- **Chapter System**: Three comprehensive chapters on shadow work, inner child, and archetypes
- **Interactive Toolkit**: Journaling, trigger tracking, dream logs, time capsules
- **Archetype Explorer**: Interactive card-based interface
- **Progress Tracking**: Visual path with rewards system
- **Community Pool**: Anonymous insight sharing

## Development Setup
- Port: 5000 (configured for Replit)
- Host: 0.0.0.0 with allowedHosts enabled for proxy compatibility
- Entry point: src/main.tsx

## Recent Changes (October 23, 2025)
### Initial Setup
- Configured Vite for Replit environment (port 5000, 0.0.0.0 host)
- Added lucide-react dependency
- Fixed entry point to use main.tsx
- Set up development workflow

### UI Enhancement Update
- **Global Styles**: Completely redesigned with custom fonts (Cinzel, Playfair Display, Inter), animated gradient backgrounds, mystical orb effects, advanced glass-morphism with multiple glow variants, gradient text animations, button shimmer effects, floating animations, custom scrollbars, and comprehensive animation keyframes
- **Tailwind Configuration**: Extended with mystic/cosmic/gold color palettes, 15+ custom animations (float, pulse-glow, shimmer, etc.), custom shadows for glow effects, new font families, and advanced keyframes
- **Homepage**: Created stunning new animated homepage with particle effects, floating gem icon, gradient hero section, AI-powered features grid with hover effects, transformation path visualization, and engaging CTAs
- **Navigation**: Enhanced sidebar with glass-card-glow effects, decorative gradients, animated logo, improved user info card with shimmer effects, and glowing navigation items
- **UI Components**: Built comprehensive library of reusable components (GlassCard, GradientText, IconButton, Badge, AnimatedCard, FeatureCard, ProgressBar, StatCard, Spinner, FloatingIcon, SectionHeader, Tooltip) with full interactivity support

### Sidebar Collapse & Page Integration Update
- **Collapsible Sidebar**: Added desktop collapse functionality with smooth animations
  - Toggle button with chevron icons (ChevronLeft/ChevronRight)
  - Sidebar transitions between 320px (expanded) and 80px (collapsed)
  - Icon-only view when collapsed with hover tooltips for navigation items
  - Condensed user info card (gem icon only) in collapsed state
  - Section headers and footer hidden when collapsed
- **Dynamic Layout**: Main content padding adjusts automatically (lg:pl-80 expanded, lg:pl-20 collapsed) with smooth transitions
- **Page Routes**: Connected all actual page components replacing placeholders
  - Dashboard (/) - Main landing page with progress overview
  - Chapters (/chapters) - Chapter selection and progress tracking
  - ChapterDetail (/chapter/:id) - Individual chapter content
  - Toolkit (/toolkit) - Interactive tools and exercises
  - Archetypes (/archetypes) - Archetype explorer
  - Community (/community) - Community sharing features
  - Settings (/settings) - Settings page (Coming Soon)
- **Improved UX**: All "Coming Soon" placeholders styled with glass-card effects for consistency

## Data Persistence
All user data stored in browser localStorage:
- User progress and stats
- Journal entries
- Trigger logs
- Time capsules
- Dream logs
- Claimed archetypes
- Community insights

## User Preferences
- Theme: Dark mode by default with purple, pink, and gold accents
- Design: Glass-morphism UI with smooth animations
- Layout: Responsive, mobile-first design
