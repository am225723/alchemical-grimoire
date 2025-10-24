# Alchemical Grimoire

## Overview
An interactive web application for shadow work, inner child healing, and archetypal exploration based on Jungian psychology. The app provides comprehensive tools for personal transformation through interactive exercises, journaling, and community sharing.

## Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with advanced glass-morphism effects and vibrant gradients
- **Animations**: Framer Motion for smooth, engaging interactions
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
│   ├── Archetypes.tsx # 6 Shadow Archetypes explorer
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

### Six Shadow Archetypes Explorer
Advanced interactive page featuring the core shadow archetypes:
- **The Tyrant**: Power and control shadow
- **The Victim**: Helplessness and external control
- **The Martyr**: Self-sacrifice for recognition
- **The Saboteur**: Self-undermining patterns
- **The Judge**: Criticism and separation
- **The Rebel**: Authority rejection

Each archetype features:
- Interactive hover cards with gradient effects
- Detailed modal views with shadow/light aspects
- Integration questions for self-reflection
- Visual design matching archetype energy

### Interactive Toolkit
- Journaling system
- Trigger tracking
- Dream logs
- Time capsules
- Progress tracking with visual rewards

### Community Pool
Anonymous insight sharing with fellow seekers

## Design Philosophy

### Color Palette (Advanced Modern Gradients)
Multi-color vibrant palette with cosmic/ocean themes:

**Primary Colors:**
- **Ocean (Cyan/Teal)**: #06b6d4, #0891b2 - Flow, healing, transformation
- **Purple**: #a855f7, #9333ea - Mystery, depth, spirituality
- **Green**: #22c55e, #16a34a - Growth, vitality, renewal
- **Accent (Rose/Pink)**: #f43f5e, #e11d48 - Energy, passion, courage
- **Secondary (Sky Blue)**: #0ea5e9, #0284c7 - Clarity, wisdom, expansion
- **Gold**: #eab308, #ca8a04 - Alchemy, transformation, illumination

**Advanced Gradients:**
- **gradient-modern**: Ocean → Sky Blue → Purple → Accent (135deg, 4-stop)
- **gradient-ocean**: Ocean → Sky Blue → Green
- **gradient-sunset**: Accent → Purple → Blue
- **gradient-cosmic**: Purple → Ocean → Green
- **gradient-fire**: Red → Orange → Gold
- **shimmer**: Animated shimmer overlay for interactive elements

**Shadow Effects:**
- Multi-color glows (ocean + purple, green, etc.)
- Advanced glass-morphism with backdrop-blur-2xl
- Dynamic hover states with color transitions

### UI/UX Principles
- **No Sidebar**: Clean, spacious full-width design
- **Advanced Top Navigation**: 
  - Gradient glassmorphism background
  - Animated hover states on all links
  - Shimmer effect on CTA button
  - Responsive mobile menu with slide-in panel
- **Glass Morphism**: Enhanced transparency, blur, and depth
- **Motion**: Smooth, professional animations via Framer Motion
- **Responsive**: Mobile-first with proper breakpoints
- **Accessibility**: High contrast, focus states, semantic HTML
- **Advanced Gradients**: Multi-stop gradients throughout for visual richness

### Navigation Structure
- **Top Navigation Bar**: Fixed header with gradient background, logo, main links, and animated CTA
- **Main Sections**: Home, Chapters, Archetypes, Toolkit, Community
- **Hero-First Design**: Large, engaging hero sections with gradient text
- **Proper Spacing**: pt-28 on main content to prevent header overlap

## Development Setup
- **Port**: 5000 (configured for Replit)
- **Host**: 0.0.0.0 with allowedHosts enabled for proxy compatibility
- **Entry Point**: src/main.tsx
- **Build Tool**: Vite with HMR (Hot Module Replacement)

## Recent Changes (October 24, 2025)

### Interactive Archetype Activities Implementation (October 24, 2025 - Latest)

**Comprehensive Shadow Work Activities**
Added highly interactive, engaging activities for all 6 shadow archetypes based on professional curriculum:

**New Components Created:**
1. **TyrantActivity** - Control-Fear Matrix
   - Two-column dynamic form mapping control behaviors to underlying fears
   - Add/delete entries with smooth animations
   - Helps users shift from self-judgment to self-compassion
   - localStorage persistence

2. **VictimActivity** - Victim-to-Victor Reframer
   - Multi-step guided reframing journey (4 steps with progress bar)
   - Transforms helplessness into agency
   - Saves "Victor Statements" for review
   - Step-by-step process: victim thought → find control → small action → power statement

3. **MartyrActivity** - Yes/No Need Sorter
   - Trello-style drag-and-drop card sorter
   - Three buckets: Joyful Yes, Boundaried No, Martyr Yes
   - 10 common scenarios to sort
   - Real-time insights showing "Martyr pile" count
   - Tap-to-move on mobile, drag on desktop

4. **SaboteurActivity** - Letter from Your Saboteur
   - Guided template for externalizing the saboteur voice
   - Fill-in-the-blank prompts with deep psychological insight
   - Shifts perspective from fighting to reassuring the saboteur
   - Saves complete letters for review

5. **JudgeActivity** - Judgment Tracker & Reframe
   - Logging tool with four-part analysis
   - Mirror: Where is this true for you?
   - Fear: What does this protect you from?
   - Gold: What hidden value is beneath this?
   - Transforms harsh judgments into wisdom

6. **RebelActivity** - Reactive vs. Authentic "No" Quiz
   - Tinder-style swipe interface (or tap buttons)
   - 8 scenarios testing reactive vs. authentic responses
   - Instant feedback after each choice
   - Final profile showing shadow/gold rebel ratio
   - Real-time pattern identification

**Archetypes Page Enhancements:**
- Added tab system to archetype modals (Overview + Interactive Activity)
- Smooth Framer Motion transitions between tabs
- "Begin Interactive Activity" CTA button in overview
- Each archetype seamlessly integrates its unique activity

**Inner Council Dashboard (Module 8):**
- New dedicated page at `/inner-council`
- Weekly check-in system with 6 archetype volume sliders (0-100%)
- Dynamic insights based on loudest archetypes
- Primary + secondary archetype recommendations
- Integration tool suggestions (e.g., "Use Control-Fear Matrix")
- Pattern insights based on overall activity levels
- Check-in history with top archetype tracking
- Full localStorage persistence

**Navigation Updates:**
- Added "Inner Council" link to top navigation (desktop + mobile)
- Uses Users2 icon for visual distinction
- Positioned between Archetypes and Toolkit

**Technical Implementation:**
- All activities use localStorage for data persistence
- Smooth Framer Motion animations throughout
- Responsive mobile design with touch-friendly interactions
- Advanced UI patterns: drag-drop, swipe gestures, multi-step forms
- Real-time feedback and dynamic insights
- TypeScript strict mode compliance
- Proper null safety and type checking

**User Experience:**
- Activities are highly interactive, not just static forms
- Immediate visual feedback on all interactions
- Clear progress indicators and success states
- Data saves automatically (no "save" button friction)
- Beautiful cosmic gradient aesthetic throughout
- Accessible on all devices

**Status**: ✅ All 6 archetype activities functional and highly interactive
**Architect Review**: ✅ PASS - Meets "highly interactive" curriculum requirements

## Recent Changes (October 24, 2025)

### TypeScript Compilation Fixes (Latest)

**Deployment Build Errors Resolved**
All TypeScript compilation errors blocking deployment have been fixed:

1. **UIComponents.tsx**
   - Fixed framer-motion type conflict by removing HTML attributes inheritance
   - AnimatedCard now only accepts specific props (onClick) instead of spreading all HTML div props
   - Prevents conflict between React's onAnimationStart and framer-motion's animation handlers

2. **Type Definitions**
   - Created `src/vite-env.d.ts` to define environment variable types
   - Added support for `VITE_AI_API_URL` and other import.meta.env variables

3. **Null Safety Improvements**
   - Added comprehensive null checks in ImmersiveShadowIntegration.tsx for currentExercise
   - Replaced NodeJS.Timeout with ReturnType<typeof setInterval> for cross-platform compatibility
   - Wrapped currentExercise usage in conditional blocks to prevent null reference errors

4. **Code Cleanup**
   - Removed all unused imports across multiple components
   - Removed unused variables and parameters (userMessage, getToneColor, userLevel, etc.)
   - Cleaned up aiService.ts (removed unused useEffect import)

**Build Status**: ✅ Successfully compiling with `npm run build`
**Deployment**: Ready for production deployment

### Deployment Port Configuration Fix (October 24, 2025 - Latest)

**Port Mismatch Resolved**
Fixed deployment configuration to ensure Vite preview runs on the correct port:

1. **Deployment Configuration**
   - Updated deployment run command to explicitly use port 5000
   - Command: `npx vite preview --host 0.0.0.0 --port 5000`
   - Matches Replit's expected port mapping (localPort 5000 → externalPort 80)

2. **Package.json Update**
   - Updated preview script to match deployment configuration
   - Ensures local preview and production deployment use the same port
   - Command: `vite preview --host 0.0.0.0 --port 5000`

**Deployment Status**: ✅ Port 5000 configured correctly, ready for autoscale deployment

### Major UI Enhancement (October 23, 2025)

**Header Overlap Fix**
- Increased main content padding from pt-20 to pt-28
- Ensures fixed navigation never covers page content
- Verified across all pages

**Enhanced Color Palette**
- Added purple, gold color scales for richer visual palette
- Created 6 advanced gradient definitions (modern, ocean, sunset, cosmic, fire, shimmer)
- Enhanced shadow effects with multi-color glows
- Updated body background with animated 5-color gradient

**Navigation Bar Redesign**
- Gradient glassmorphism background (ocean → purple → accent)
- Animated gradient border using borderImage
- Enhanced logo with gradient background container
- Nav links with hover effects (gradient backgrounds, scaling icons)
- Advanced CTA button with shimmer animation on hover
- Proper mobile responsive menu maintained

**New Archetypes Page**
- Completely rebuilt to showcase 6 shadow archetypes
- Interactive card grid (3 columns on desktop)
- Each archetype has unique gradient and icon (Crown, Shield, Heart, Flame, Scale, Zap)
- Hover effects with glow shadows matching archetype colors
- Full-screen modal for detailed archetype exploration
- Shadow/light aspects clearly delineated
- Integration questions for self-reflection
- Path of Integration guide section
- Carl Jung quote footer

**Enhanced Styling System**
- Upgraded glass-card with stronger blur (backdrop-blur-2xl)
- Enhanced button styles with bolder colors and longer transitions
- New nav-link utility class for consistent navigation styling
- Improved hover states across all interactive elements

### Previous Design Overhaul

**Color Scheme Refresh**
- Updated from purple/pink/gold to multi-gradient modern palette
- New Tailwind config with comprehensive color families
- Advanced gradient utilities and animations

**Navigation Redesign**
- Removed full-height sidebar navigation
- Added modern fixed top navigation bar
- Mobile hamburger menu with responsive panel

**Dashboard Rebuild**
- Hero Section with gradient headline
- Chapter Cards in 3-column grid
- Features Grid with 4-card layout
- Final CTA section with decorative effects

**Typography**
- Primary: Playfair Display (serif for headings)
- Body: Inter (sans-serif for readability)

**Verified Components**
- All 3 chapters accessible and properly displayed
- Chapter I: The Shadow Self (4 sections)
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
- **Theme**: Dark mode with vibrant multi-color gradients
- **Design**: Advanced glass-morphism with smooth animations and shimmer effects
- **Layout**: Full-width responsive design with enhanced top navigation
- **Experience**: Focus on visual richness, breathing room, and engaging interactions
- **Colors**: Prefer vibrant, cosmic color schemes over muted tones

## Future Enhancements
- Enhanced mobile responsiveness testing
- Additional interactive activities
- AI-powered pattern recognition
- Growth analytics dashboard
- More archetype explorations
- Integration journaling within archetype modals
