# Alchemical Grimoire

## Overview
An interactive web application for shadow work, inner child healing, and archetypal exploration based on Jungian psychology. The app provides comprehensive tools for personal transformation through interactive exercises, journaling, and community sharing.

## Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with modern glass-morphism effects
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Data Visualization**: Recharts (installed but not yet implemented)
- **Storage**: Local Storage for data persistence

## Project Structure
```
src/
├── components/        # UI components
│   ├── activities/   # Interactive activity components
│   ├── features/     # Feature components (AI integration)
│   └── UIComponents.tsx
├── pages/            # Route pages
│   ├── Dashboard.tsx  # Main landing page
│   ├── Chapters.tsx   # Chapter selection
│   ├── ChapterDetail.tsx
│   ├── Toolkit.tsx
│   ├── Archetypes.tsx
│   ├── Community.tsx
│   └── HomePage.tsx
├── context/          # React context for state management
├── data/             # Static data (chapters, etc.)
├── services/         # API services
└── types/            # TypeScript type definitions
```

## Key Features

### Three Comprehensive Chapters
1. **Chapter I: The Shadow Self** - Discover hidden aspects of your psyche and begin integration
2. **Chapter II: The Inner Child** - Heal childhood wounds and reconnect with authentic nature
3. **Chapter III: Archetypes & The Collective Unconscious** - Explore universal patterns shaping consciousness

### Interactive Toolkit
- Journaling system
- Trigger tracking
- Dream logs
- Time capsules
- Progress tracking with visual rewards

### Archetype Explorer
Interactive card-based interface for discovering and integrating Jungian archetypes

### Community Pool
Anonymous insight sharing with fellow seekers

## Design Philosophy

### Color Palette (Modern Refresh)
Replaced the previous purple/pink/gold mystic theme with a calming, modern palette:
- **Primary (Emerald/Green)**: #10b981 - Growth, healing, transformation
- **Secondary (Blue)**: #3b82f6 - Wisdom, depth, clarity
- **Accent (Red/Coral)**: #ef4444 - Energy, passion, vitality
- **Ocean (Teal)**: #14b8a6 - Healing, calm, flow

### UI/UX Principles
- **No Sidebar**: Clean, spacious design with fixed top navigation
- **Glass Morphism**: Subtle transparency and blur effects for depth
- **Motion**: Smooth animations using Framer Motion
- **Responsive**: Mobile-first approach with breakpoints at md/lg
- **Accessibility**: Clear contrast, focus states, semantic HTML

### Navigation Structure
- **Top Navigation Bar**: Fixed header with logo, main links, and CTA button
- **Main Sections**: Home, Chapters, Archetypes, Toolkit, Community
- **Hero-First Design**: Large, engaging hero sections on main pages

## Development Setup
- **Port**: 5000 (configured for Replit)
- **Host**: 0.0.0.0 with allowedHosts enabled for proxy compatibility
- **Entry Point**: src/main.tsx
- **Build Tool**: Vite with HMR (Hot Module Replacement)

## Recent Changes (October 23, 2025)

### Complete Design Overhaul
**Color Scheme Refresh**
- Updated from purple/pink/gold to teal/blue/green/coral modern palette
- New Tailwind config with primary, secondary, accent, and ocean color families
- Removed all mystic/cosmic color references
- Updated global CSS with new gradient definitions and glass effects

**Navigation Redesign**
- **Removed**: Full-height sidebar navigation (EnhancedNavigation component still exists but unused)
- **Added**: Modern fixed top navigation bar with logo, links, and CTA
- **Layout**: Full-width content with pt-20 to accommodate fixed nav
- **Mobile**: Responsive navigation (desktop links hidden on mobile)

**Dashboard Rebuild**
- **Hero Section**: Large headline with gradient text, descriptive copy, dual CTAs
- **Chapter Cards**: Beautiful 3-column grid showcasing all chapters with icons (Brain, Heart, Eye)
- **Features Grid**: 4-card layout highlighting key app features
- **Final CTA**: Centered call-to-action with decorative background effects
- **Animations**: Staggered fade-in using Framer Motion

**Typography**
- Primary: Playfair Display (serif for headings)
- Body: Inter (sans-serif for readability)
- Removed: Cinzel font (previously used for titles)

**Verified Components**
- All 3 chapters display correctly on Dashboard and Chapters page
- Chapter I: The Shadow Self (4 sections) - accessible
- Chapter II: The Inner Child (3 sections) - locked progression
- Chapter III: Archetypes (2 sections) - locked progression

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
- **Theme**: Dark mode with teal/blue/green accents
- **Design**: Modern glass-morphism with smooth animations
- **Layout**: Full-width responsive design with top navigation
- **Experience**: Focus on visual hierarchy and breathing room

## Future Enhancements
- Mobile navigation menu (hamburger)
- Enhanced mobile responsiveness
- Additional interactive activities
- AI-powered pattern recognition
- Growth analytics dashboard
