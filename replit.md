# Alchemical Grimoire

## Overview
Alchemical Grimoire is an interactive web application designed for personal transformation through shadow work, inner child healing, and archetypal exploration, rooted in Jungian psychology. It offers tools such as interactive exercises, journaling, and community sharing to guide users through self-discovery. The project aims to provide a visually rich and engaging platform for profound psychological exploration and integration.

## User Preferences
- **Theme**: Dark mode with vibrant multi-color gradients
- **Design**: Advanced glass-morphism with smooth animations and shimmer effects
- **Layout**: Full-width responsive design with enhanced top navigation
- **Experience**: Focus on visual richness, breathing room, and engaging interactions
- **Colors**: Prefer vibrant, cosmic color schemes over muted tones

## System Architecture

### UI/UX Decisions
The application features a dark mode with a vibrant, multi-color gradient palette (Ocean, Purple, Green, Accent, Secondary, Gold), emphasizing cosmic and ocean themes. Advanced gradients like `gradient-modern` and `shimmer` are used throughout. UI/UX principles include a no-sidebar, full-width design, advanced gradient glassmorphism top navigation with animated hover states and a shimmering CTA button, smooth animations via Framer Motion, and mobile-first responsiveness. Typography uses Playfair Display for headings and Inter for body text.

### Technical Implementations
The frontend is built with React 18, TypeScript, and Vite. Styling is handled with Tailwind CSS, incorporating glass-morphism effects and dynamic gradients. Framer Motion is used for animations, and Lucide React for icons. React Router DOM manages routing. Data persistence relies on Local Storage.

### Feature Specifications
The application includes three core chapters: The Shadow Self, The Inner Child, and Archetypes & The Collective Unconscious. It features a comprehensive explorer for six shadow archetypes (Tyrant, Victim, Martyr, Saboteur, Judge, Rebel), each with interactive hover cards, detailed modal views, and reflection questions. An interactive toolkit offers journaling, trigger tracking, dream logs, time capsules, and progress tracking. A "Community Pool" allows anonymous insight sharing.

**AI-Powered Features:**
The application integrates OpenAI GPT-5 and Perplexity API for five AI-powered tools:
1.  **Daily Journal Analyzer**: Perplexity NLP for journal entry analysis and archetype detection.
2.  **Dynamic Trigger Analyzer**: Perplexity NLP for trigger situation analysis, archetype detection, and emotional keyword extraction.
3.  **Socratic Reframe Coach**: OpenAI GPT-5 chatbot for guided reframing.
4.  **Saboteur Interview**: OpenAI GPT-5 role-playing as the user's Saboteur archetype.
5.  **Judgment De-Coder**: AI for shadow-to-gold translation of judgments.
These tools are accessible via a central `/ai-tools` hub, with a BYOK (Bring Your Own Key) security model for API access.

**Interactive Archetype Activities:**
Each of the six shadow archetypes has a dedicated, highly interactive activity:
-   **TyrantActivity**: Control-Fear Matrix.
-   **VictimActivity**: Victim-to-Victor Reframer (multi-step).
-   **MartyrActivity**: Yes/No Need Sorter (drag-and-drop).
-   **SaboteurActivity**: Letter from Your Saboteur (guided template).
-   **JudgeActivity**: Judgment Tracker & Reframe (four-part analysis).
-   **RebelActivity**: Reactive vs. Authentic "No" Quiz (swipe interface).
These activities are integrated into archetype modals and persist data locally.

**Inner Council Dashboard:**
A dedicated page (`/inner-council`) provides a weekly check-in system with archetype volume sliders, dynamic insights, archetype recommendations, and integration tool suggestions.

**Lesson Plan Implementation (October 2025):**
Based on comprehensive curriculum PDF, implemented Module 1 and Module 8 features:
-   **Trigger Identifier** (`/trigger-identifier`): A diagnostic quiz with 30 triggers (5 per archetype) rated on a 3-point scale (0=doesn't bother, 1=annoying, 2=deeply triggering). Calculates which archetypes are most active and provides personalized shadow profile results with accurate percentage scoring.
-   **Integration Log** (`/integration-log`): Central dashboard displaying all shadow work insights from every tool (trigger diagnostics, control-fear matrices, reframes, need sorting, letters, judgments, council check-ins). Includes filtering by archetype, data export (JSON), and timeline view of all shadow work activities.

### System Design Choices
The project prioritizes a client-side architecture where all user data is stored locally in the browser's localStorage, ensuring privacy and direct user control over their data. Environment variables (`VITE_OPENAI_API_KEY`, `VITE_PERPLEXITY_API_KEY`) are used for API keys, adhering to a BYOK model.

## External Dependencies
-   **React**: Frontend library
-   **TypeScript**: Type-safe JavaScript
-   **Vite**: Build tool
-   **Tailwind CSS**: Utility-first CSS framework
-   **Framer Motion**: Animation library
-   **Lucide React**: Icon library
-   **React Router DOM**: Declarative routing
-   **OpenAI GPT-5**: AI model for conversational coaching and role-playing
-   **Perplexity (llama-3.1-sonar)**: AI model for NLP text analysis
-   **Recharts**: (Planned for data visualization, not yet implemented)