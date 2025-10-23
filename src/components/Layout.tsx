import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Compass, Sparkles, Users, Menu, X, Gem } from 'lucide-react'; // Ensure lucide-react is installed
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useApp();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Chapters', href: '/chapters', icon: BookOpen },
    { name: 'Alchemist\'s Toolkit', href: '/toolkit', icon: Compass },
    { name: 'Archetypes', href: '/archetypes', icon: Sparkles },
    { name: 'Community', href: '/community', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"> {/* Added background */}
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 glass-card border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <Gem className="w-8 h-8 text-purple-400 Gem-glow" />
              <span className="text-xl font-serif font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Alchemical Grimoire
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Welcome back,</p>
              <p className="font-semibold text-white">{user.name}</p>
              <div className="mt-3 flex items-center space-x-2">
                <Gem className="w-4 h-4 text-gold-400" />
                <span className="text-sm text-gold-400 font-semibold">
                  {user.insightCrystals} Insight Crystals
                </span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="pt-6 border-t border-white/10">
            <p className="text-xs text-gray-400 text-center">
              "Until you make the unconscious conscious, it will direct your life and you will call it fate."
            </p>
            <p className="text-xs text-gray-500 text-center mt-2">— Carl Jung</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 glass-card border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <Gem className="w-6 h-6 text-purple-400" />
              <span className="font-serif font-bold text-white">Alchemical Grimoire</span>
            </div>
            {user && (
              <div className="flex items-center space-x-1">
                <Gem className="w-4 h-4 text-gold-400" />
                <span className="text-sm text-gold-400 font-semibold">{user.insightCrystals}</span>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-screen p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
