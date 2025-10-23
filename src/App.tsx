import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { BookOpen, Compass, Users, Wrench, Home, Sparkles } from 'lucide-react';

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

const TopNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-ocean-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-lift">
            <Sparkles className="w-8 h-8 text-ocean-400" />
            <span className="text-2xl font-display font-bold gradient-text">
              Alchemical Grimoire
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-300 hover:text-ocean-400 transition-colors font-medium flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/chapters" className="text-slate-300 hover:text-ocean-400 transition-colors font-medium flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Chapters</span>
            </Link>
            <Link to="/archetypes" className="text-slate-300 hover:text-ocean-400 transition-colors font-medium flex items-center space-x-2">
              <Compass className="w-4 h-4" />
              <span>Archetypes</span>
            </Link>
            <Link to="/toolkit" className="text-slate-300 hover:text-ocean-400 transition-colors font-medium flex items-center space-x-2">
              <Wrench className="w-4 h-4" />
              <span>Toolkit</span>
            </Link>
            <Link to="/community" className="text-slate-300 hover:text-ocean-400 transition-colors font-medium flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Community</span>
            </Link>
          </div>

          {/* CTA Button */}
          <Link to="/chapters" className="hidden md:block btn-primary">
            Start Journey
          </Link>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <AppProvider>
        <div className="min-h-screen">
          <TopNav />
          
          {/* Main Content with top padding for fixed nav */}
          <main className="pt-20">
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
                <div className="min-h-screen flex items-center justify-center px-6">
                  <div className="text-center text-white glass-card p-12">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Settings</h1>
                    <p className="text-xl text-slate-300">Coming Soon</p>
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
                <div className="min-h-screen flex items-center justify-center px-6">
                  <div className="text-center text-white glass-card p-12">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Growth Analytics</h1>
                    <p className="text-xl text-slate-300">Coming Soon</p>
                  </div>
                </div>
              } />
              <Route path="/features/predictions" element={
                <div className="min-h-screen flex items-center justify-center px-6">
                  <div className="text-center text-white glass-card p-12">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Predictive Insights</h1>
                    <p className="text-xl text-slate-300">Coming Soon</p>
                  </div>
                </div>
              } />
              <Route path="/community/collective-wisdom" element={
                <div className="min-h-screen flex items-center justify-center px-6">
                  <div className="text-center text-white glass-card p-12">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Collective Wisdom</h1>
                    <p className="text-xl text-slate-300">Coming Soon</p>
                  </div>
                </div>
              } />
              <Route path="/community/group-journey" element={
                <div className="min-h-screen flex items-center justify-center px-6">
                  <div className="text-center text-white glass-card p-12">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Group Journey</h1>
                    <p className="text-xl text-slate-300">Coming Soon</p>
                  </div>
                </div>
              } />
              <Route path="/tools/meditation" element={
                <div className="min-h-screen flex items-center justify-center px-6">
                  <div className="text-center text-white glass-card p-12">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Meditation Library</h1>
                    <p className="text-xl text-slate-300">Coming Soon</p>
                  </div>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
