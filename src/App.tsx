import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; // Keep this import
import EnhancedNavigation from './components/EnhancedNavigation';

// Enhanced Activities
import ImmersiveShadowDialogue from './components/activities/ImmersiveShadowDialogue';
import RelationshipPatternMapping from './components/activities/RelationshipPatternMapping';
import AuthenticSelfDiscovery from './components/activities/AuthenticSelfDiscovery';
import TransformationTimeline from './components/activities/TransformationTimeline';

// AI-Powered Features
import AIPatternRecognition from './components/features/AIPatternRecognition';
import ImmersiveShadowIntegration from './components/features/ImmersiveShadowIntegration';

// Placeholder HomePage
const HomePage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-white mb-4">Alchemical Grimoire</h1>
      <p className="text-2xl text-blue-200 mb-8">Enhanced Edition with AI Integration</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-white mb-2">Immersive Dialogue</h3>
          <p className="text-gray-300">AI-powered shadow conversations</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="text-4xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold text-white mb-2">Pattern Recognition</h3>
          <p className="text-gray-300">Discover hidden patterns</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="text-4xl mb-4">⚔️</div>
          <h3 className="text-xl font-semibold text-white mb-2">Shadow Quests</h3>
          <p className="text-gray-300">Gamified integration journey</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-xl font-semibold text-white mb-2">AI Insights</h3>
          <p className="text-gray-300">Personalized guidance</p>
        </div>
      </div>
    </div>
  </div>
);

// REMOVE or COMMENT OUT this placeholder if it exists:
// const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//  <div>{children}</div>
// );

function App() {
  return (
    <Router>
      <AppProvider> {/* This uses the imported AppProvider */}
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <EnhancedNavigation />

          {/* Main Content - Desktop has top nav, mobile has side nav */}
          <main className="lg:pl-80 pt-16 lg:pt-0"> {/* Adjusted padding for larger sidebar */}
            <div className="p-6 lg:p-8"> {/* Added padding here */}
              <Routes>
                {/* Home Route */}
                <Route path="/" element={<HomePage />} />

                {/* Enhanced Activities */}
                <Route path="/activities/dialogue" element={<ImmersiveShadowDialogue />} />
                <Route path="/activities/patterns" element={<RelationshipPatternMapping />} />
                <Route path="/activities/authenticity" element={<AuthenticSelfDiscovery />} />
                <Route path="/activities/timeline" element={<TransformationTimeline />} />

                {/* AI-Powered Features */}
                <Route path="/features/patterns" element={<AIPatternRecognition />} />
                <Route path="/features/integration" element={<ImmersiveShadowIntegration />} />

                 {/* Placeholder routes for future premium features */}
                 <Route path="/features/growth-analytics" element={
                   <div className="min-h-screen flex items-center justify-center">
                     <div className="text-center text-white">
                       <h1 className="text-4xl font-bold mb-4">Growth Analytics</h1>
                       <p className="text-xl text-blue-200">Coming Soon</p>
                     </div>
                   </div>
                 } />
                 <Route path="/features/predictions" element={
                   <div className="min-h-screen flex items-center justify-center">
                     <div className="text-center text-white">
                       <h1 className="text-4xl font-bold mb-4">Predictive Insights</h1>
                       <p className="text-xl text-blue-200">Coming Soon</p>
                     </div>
                   </div>
                 } />
                 <Route path="/community/collective-wisdom" element={
                   <div className="min-h-screen flex items-center justify-center">
                     <div className="text-center text-white">
                       <h1 className="text-4xl font-bold mb-4">Collective Wisdom</h1>
                       <p className="text-xl text-blue-200">Coming Soon</p>
                     </div>
                   </div>
                 } />
                 <Route path="/community/group-journey" element={
                   <div className="min-h-screen flex items-center justify-center">
                     <div className="text-center text-white">
                       <h1 className="text-4xl font-bold mb-4">Group Journey</h1>
                       <p className="text-xl text-blue-200">Coming Soon</p>
                     </div>
                   </div>
                 } />
                 <Route path="/tools/meditation" element={
                   <div className="min-h-screen flex items-center justify-center">
                     <div className="text-center text-white">
                       <h1 className="text-4xl font-bold mb-4">Meditation Library</h1>
                       <p className="text-xl text-blue-200">Coming Soon</p>
                     </div>
                   </div>
                 } />
                 <Route path="/tools/sensory-studio" element={
                   <div className="min-h-screen flex items-center justify-center">
                     <div className="text-center text-white">
                       <h1 className="text-4xl font-bold mb-4">Sensory Studio</h1>
                       <p className="text-xl text-blue-200">Coming Soon</p>
                     </div>
                   </div>
                 } />

                {/* Original Page Routes */}
                {/* These might need updating if file structure changed */}
                <Route path="/chapters" element={<div>Chapters Page Placeholder</div>} />
                <Route path="/chapter/:id" element={<div>Chapter Detail Placeholder</div>} />
                <Route path="/toolkit" element={<div>Toolkit Page Placeholder</div>} />
                <Route path="/archetypes" element={<div>Archetypes Page Placeholder</div>} />
                <Route path="/community" element={<div>Community Page Placeholder</div>} />
                <Route path="/settings" element={<div>Settings Page Placeholder</div>} />

              </Routes>
            </div>
          </main>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
