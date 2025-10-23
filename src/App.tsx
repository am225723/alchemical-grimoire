import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import EnhancedNavigation from './components/EnhancedNavigation';

// Pages
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Chapters from './pages/Chapters';
import ChapterDetail from './pages/ChapterDetail';
import Toolkit from './pages/Toolkit';
import Archetypes from './pages/Archetypes';
import Community from './pages/Community';

// Enhanced Activities
import ImmersiveShadowDialogue from './components/activities/ImmersiveShadowDialogue';
import RelationshipPatternMapping from './components/activities/RelationshipPatternMapping';
import AuthenticSelfDiscovery from './components/activities/AuthenticSelfDiscovery';
import TransformationTimeline from './components/activities/TransformationTimeline';

// AI-Powered Features
import AIPatternRecognition from './components/features/AIPatternRecognition';
import ImmersiveShadowIntegration from './components/features/ImmersiveShadowIntegration';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Router>
      <AppProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <EnhancedNavigation isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />

          {/* Main Content - Desktop margin adjusts based on sidebar state */}
          <main className={`min-h-screen pt-16 lg:pt-6 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'}`}>
            <div className="px-6 lg:px-8 py-6 lg:py-0">
              <Routes>
                {/* Home Route */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/home" element={<HomePage />} />

                {/* Main Pages */}
                <Route path="/chapters" element={<Chapters />} />
                <Route path="/chapter/:id" element={<ChapterDetail />} />
                <Route path="/toolkit" element={<Toolkit />} />
                <Route path="/archetypes" element={<Archetypes />} />
                <Route path="/community" element={<Community />} />
                <Route path="/settings" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center text-white glass-card p-12">
                      <h1 className="text-4xl font-bold mb-4 gradient-text">Settings</h1>
                      <p className="text-xl text-gray-300">Coming Soon</p>
                    </div>
                  </div>
                } />

                {/* Enhanced Activities */}
                <Route path="/activities/dialogue" element={<ImmersiveShadowDialogue />} />
                <Route path="/activities/patterns" element={<RelationshipPatternMapping />} />
                <Route path="/activities/authenticity" element={<AuthenticSelfDiscovery />} />
                <Route path="/activities/timeline" element={<TransformationTimeline />} />

                {/* AI-Powered Features */}
                <Route path="/features/patterns" element={<AIPatternRecognition />} />
                <Route path="/features/integration" element={<ImmersiveShadowIntegration />} />

                {/* Future Premium Features */}
                <Route path="/features/growth-analytics" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center text-white glass-card p-12">
                      <h1 className="text-4xl font-bold mb-4 gradient-text">Growth Analytics</h1>
                      <p className="text-xl text-gray-300">Coming Soon</p>
                    </div>
                  </div>
                } />
                <Route path="/features/predictions" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center text-white glass-card p-12">
                      <h1 className="text-4xl font-bold mb-4 gradient-text">Predictive Insights</h1>
                      <p className="text-xl text-gray-300">Coming Soon</p>
                    </div>
                  </div>
                } />
                <Route path="/community/collective-wisdom" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center text-white glass-card p-12">
                      <h1 className="text-4xl font-bold mb-4 gradient-text">Collective Wisdom</h1>
                      <p className="text-xl text-gray-300">Coming Soon</p>
                    </div>
                  </div>
                } />
                <Route path="/community/group-journey" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center text-white glass-card p-12">
                      <h1 className="text-4xl font-bold mb-4 gradient-text">Group Journey</h1>
                      <p className="text-xl text-gray-300">Coming Soon</p>
                    </div>
                  </div>
                } />
                <Route path="/tools/meditation" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center text-white glass-card p-12">
                      <h1 className="text-4xl font-bold mb-4 gradient-text">Meditation Library</h1>
                      <p className="text-xl text-gray-300">Coming Soon</p>
                    </div>
                  </div>
                } />
                <Route path="/tools/sensory-studio" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center text-white glass-card p-12">
                      <h1 className="text-4xl font-bold mb-4 gradient-text">Sensory Studio</h1>
                      <p className="text-xl text-gray-300">Coming Soon</p>
                    </div>
                  </div>
                } />
              </Routes>
            </div>
          </main>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
