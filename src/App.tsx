import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { BookOpen, Compass, Users, Wrench, Home, Sparkles, Menu, X, Users2, Brain } from 'lucide-react';

// Pages
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Chapters from './pages/Chapters';
import ChapterDetail from './pages/ChapterDetail';
import Toolkit from './pages/Toolkit';
import Archetypes from './pages/Archetypes';
import Community from './pages/Community';
import InnerCouncil from './pages/InnerCouncil';
import AITools from './pages/AITools';
import IntegrationLog from './pages/IntegrationLog';

// Enhanced Activities
import ImmersiveShadowDialogue from './components/activities/ImmersiveShadowDialogue';
import RelationshipPatternMapping from './components/activities/RelationshipPatternMapping';
import AuthenticSelfDiscovery from './components/activities/AuthenticSelfDiscovery';
import TransformationTimeline from './components/activities/TransformationTimeline';

// AI-Powered Features
import AIPatternRecognition from './components/features/AIPatternRecognition';
import ImmersiveShadowIntegration from './components/features/ImmersiveShadowIntegration';

// Module 1 - Shadow Diagnostic
import TriggerIdentifier from './components/TriggerIdentifier';

const TopNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b-2 border-transparent bg-clip-padding" style={{
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(244, 63, 94, 0.15) 100%)',
        backdropFilter: 'blur(24px)',
        borderImage: 'linear-gradient(90deg, rgba(6, 182, 212, 0.5), rgba(168, 85, 247, 0.5), rgba(244, 63, 94, 0.5)) 1'
      }}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover-lift group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-ocean-500/20 to-purple-500/20 group-hover:from-ocean-400/30 group-hover:to-purple-400/30 transition-all duration-300">
                <Sparkles className="w-7 h-7 text-ocean-400 group-hover:text-purple-400 transition-colors" />
              </div>
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-ocean-300 via-purple-300 to-accent-300 bg-clip-text text-transparent">
                Alchemical Grimoire
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/" className="nav-link group">
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Home</span>
              </Link>
              <Link to="/chapters" className="nav-link group">
                <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Chapters</span>
              </Link>
              <Link to="/archetypes" className="nav-link group">
                <Compass className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Archetypes</span>
              </Link>
              <Link to="/inner-council" className="nav-link group">
                <Users2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Inner Council</span>
              </Link>
              <Link to="/ai-tools" className="nav-link group">
                <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>AI Tools</span>
              </Link>
              <Link to="/toolkit" className="nav-link group">
                <Wrench className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Toolkit</span>
              </Link>
              <Link to="/community" className="nav-link group">
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Community</span>
              </Link>
            </div>

            {/* Desktop CTA Button */}
            <Link to="/chapters" className="hidden md:block px-6 py-3 bg-gradient-to-r from-ocean-500 via-purple-600 to-accent-500 text-white font-bold rounded-xl hover:from-ocean-400 hover:via-purple-500 hover:to-accent-400 transform hover:scale-105 transition-all duration-300 shadow-glow relative overflow-hidden group">
              <span className="relative z-10">Start Journey</span>
              <div className="absolute inset-0 bg-shimmer opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-ocean-400 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-20 right-0 bottom-0 w-64 glass-card border-l border-ocean-500/20 p-6">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-slate-300 hover:text-ocean-400 transition-colors font-medium flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-800/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link 
                to="/chapters" 
                className="text-slate-300 hover:text-ocean-400 transition-colors font-medium flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-800/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpen className="w-5 h-5" />
                <span>Chapters</span>
              </Link>
              <Link 
                to="/archetypes" 
                className="text-slate-300 hover:text-ocean-400 transition-colors font-medium flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-800/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Compass className="w-5 h-5" />
                <span>Archetypes</span>
              </Link>
              <Link 
                to="/inner-council" 
                className="text-slate-300 hover:text-ocean-400 transition-colors font-medium flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-800/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users2 className="w-5 h-5" />
                <span>Inner Council</span>
              </Link>
              <Link 
                to="/ai-tools" 
                className="text-slate-300 hover:text-ocean-400 transition-colors font-medium flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-800/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Brain className="w-5 h-5" />
                <span>AI Tools</span>
              </Link>
              <Link 
                to="/toolkit" 
                className="text-slate-300 hover:text-ocean-400 transition-colors font-medium flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-800/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Wrench className="w-5 h-5" />
                <span>Toolkit</span>
              </Link>
              <Link 
                to="/community" 
                className="text-slate-300 hover:text-ocean-400 transition-colors font-medium flex items-center space-x-2 p-3 rounded-lg hover:bg-slate-800/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="w-5 h-5" />
                <span>Community</span>
              </Link>
              <Link 
                to="/chapters" 
                className="btn-primary w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Journey
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppProvider>
        <div className="min-h-screen">
          <TopNav />
          
          {/* Main Content with top padding for fixed nav */}
          <main className="pt-28">
            <Routes>
              {/* Home Route */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/home" element={<HomePage />} />

              {/* Main Pages */}
              <Route path="/chapters" element={<Chapters />} />
              <Route path="/chapter/:id" element={<ChapterDetail />} />
              <Route path="/toolkit" element={<Toolkit />} />
              <Route path="/archetypes" element={<Archetypes />} />
              <Route path="/inner-council" element={<InnerCouncil />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/integration-log" element={<IntegrationLog />} />
              <Route path="/community" element={<Community />} />
              <Route path="/settings" element={
                <div className="min-h-screen flex items-center justify-center px-6">
                  <div className="text-center text-white glass-card p-12">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Settings</h1>
                    <p className="text-xl text-slate-300">Coming Soon</p>
                  </div>
                </div>
              } />

              {/* Module 1 - Shadow Diagnostic */}
              <Route path="/trigger-identifier" element={<TriggerIdentifier />} />
              <Route path="/shadow-diagnostic" element={<TriggerIdentifier />} />

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
