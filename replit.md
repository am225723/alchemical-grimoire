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
- Configured Vite for Replit environment (port 5000, 0.0.0.0 host)
- Added lucide-react dependency
- Fixed entry point to use main.tsx
- Set up development workflow

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
