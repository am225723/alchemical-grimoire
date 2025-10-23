import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Home,
  Compass,
  Sparkles,
  Users,
  Menu,
  X,
  Gem,
  Brain,
  Heart,
  Moon,
  Eye,
  TrendingUp,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
  isNew?: boolean;
  children?: NavigationItem[];
}

interface EnhancedNavigationProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const EnhancedNavigation: React.FC<EnhancedNavigationProps> = ({ isCollapsed, onToggleCollapse }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const { user } = useApp();

  const mainNavigation: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: '/',
      icon: Home,
      description: 'Your personal overview and progress'
    },
    {
      name: 'Chapters',
      href: '/chapters',
      icon: BookOpen,
      description: 'Explore the alchemical journey'
    },
    {
      name: 'Alchemist\'s Toolkit',
      href: '/toolkit',
      icon: Compass,
      description: 'Interactive tools and exercises'
    },
    {
      name: 'Archetypes',
      href: '/archetypes',
      icon: Sparkles,
      description: 'Discover your inner archetypes'
    },
    {
      name: 'Community',
      href: '/community',
      icon: Users,
      description: 'Connect with fellow seekers'
    },
  ];

  const aiNavigation: NavigationItem[] = [
    {
      name: 'AI-Powered Activities',
      href: '#', // Changed href to # as it's a parent item
      icon: Brain,
      description: 'Enhanced shadow work experiences',
      isNew: true,
      badge: 'NEW',
      children: [
        {
          name: 'Shadow Dialogue',
          href: '/activities/dialogue',
          icon: Heart,
          description: 'Sacred conversation with your shadow'
        },
        {
          name: 'Pattern Mapping',
          href: '/activities/patterns',
          icon: TrendingUp,
          description: 'Visualize relationship dynamics'
        },
        {
          name: 'Authentic Self Discovery',
          href: '/activities/authenticity',
          icon: Sparkles,
          description: 'Uncover your true nature'
        },
        {
          name: 'Transformation Timeline',
          href: '/activities/timeline',
          icon: Eye,
          description: 'Track your growth journey'
        }
      ]
    },
    {
      name: 'Advanced Features',
      href: '#', // Changed href to # as it's a parent item
      icon: Moon,
      description: 'Deep integration tools',
      isNew: true,
      badge: 'BETA',
      children: [
        {
          name: 'Pattern Recognition',
          href: '/features/patterns',
          icon: Brain,
          description: 'AI-powered pattern analysis'
        },
        {
          name: 'Shadow Integration',
          href: '/features/integration',
          icon: Moon,
          description: 'Immersive integration experiences'
        }
      ]
    }
  ];

  const toggleExpanded = (item: string) => {
    setExpandedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const isItemActive = (item: NavigationItem) => {
    // Check if the current path matches the item's href directly
    if (location.pathname === item.href) return true;
    // If the item has children, check if any child's href matches the current path
    if (item.children) {
      return item.children.some(child => location.pathname === child.href);
    }
    return false;
  };

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const isActive = isItemActive(item);
    const isExpanded = expandedItems.includes(item.name);
    const hasChildren = item.children && item.children.length > 0;

    // Simplified rendering when collapsed
    if (isCollapsed && level === 0) {
      return (
        <div key={item.name} className="relative group">
          {hasChildren ? (
            <button
              onClick={() => toggleExpanded(item.name)}
              className={`w-full flex items-center justify-center p-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600/60 to-pink-600/60 text-white shadow-glow-sm'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white hover:shadow-glow-sm'
              }`}
              title={item.name}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
            </button>
          ) : (
            <Link
              to={item.href}
              className={`flex items-center justify-center p-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600/60 to-pink-600/60 text-white shadow-glow-sm'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white hover:shadow-glow-sm'
              }`}
              title={item.name}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
            </Link>
          )}
          {/* Tooltip on hover */}
          <div className="hidden lg:block absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-lg">
            {item.name}
            {item.isNew && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-400/20 text-green-400 border border-green-400/30">
                {item.badge}
              </span>
            )}
          </div>
        </div>
      );
    }

    return (
      <div key={item.name}>
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.name)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all group text-left relative overflow-hidden ${
              isActive
                ? 'bg-gradient-to-r from-purple-600/60 to-pink-600/60 text-white shadow-glow-sm'
                : 'text-gray-300 hover:bg-white/10 hover:text-white hover:shadow-glow-sm'
            } ${level > 0 ? 'ml-6' : ''}`}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{item.name}</span>
                {item.isNew && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-green-400/20 text-green-400 border border-green-400/30">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        ) : (
          <Link
            to={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all group text-left relative overflow-hidden ${
              isActive
                ? 'bg-gradient-to-r from-purple-600/60 to-pink-600/60 text-white shadow-glow-sm'
                : 'text-gray-300 hover:bg-white/10 hover:text-white hover:shadow-glow-sm'
            } ${level > 0 ? 'ml-6' : ''}`}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{item.name}</span>
                {item.isNew && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-green-400/20 text-green-400 border border-green-400/30">
                    {item.badge}
                  </span>
                )}
              </div>
              {item.description && level === 0 && (
                <p className="text-xs text-gray-400 mt-1">{item.description}</p>
              )}
            </div>
          </Link>
        )}

        {/* Render children */}
        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-1">
            {item.children?.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full glass-card-glow border-r border-purple-500/30 transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 shadow-glow ${
          isCollapsed ? 'lg:w-20' : 'lg:w-80'
        } w-80`}
      >
        <div className="flex flex-col h-full p-6 relative">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-600/10 to-transparent pointer-events-none" />
          
          {/* Logo and Collapse Button */}
          <div className="flex items-center justify-between mb-8 relative z-10">
            <Link to="/" className={`flex items-center hover-lift group ${isCollapsed ? 'lg:justify-center lg:w-full' : 'space-x-2'}`}>
              <div className="relative">
                <Gem className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <div className="absolute inset-0 blur-lg bg-purple-500/50 rounded-full animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {!isCollapsed && (
                <span className="text-xl font-title font-bold gradient-text">
                  Alchemical Grimoire
                </span>
              )}
            </Link>
            <div className="flex items-center space-x-2">
              <button
                onClick={onToggleCollapse}
                className="hidden lg:block text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* User Info */}
          {user && !isCollapsed && (
            <div className="mb-8 p-4 bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-xl border border-purple-500/30 hover-lift relative overflow-hidden">
              <div className="absolute inset-0 bg-shimmer opacity-0 hover:opacity-100 transition-opacity" />
              <p className="text-sm text-gray-400 mb-1">Welcome back,</p>
              <p className="font-semibold text-white font-title">{user.name}</p>
              <div className="mt-3 flex items-center space-x-2">
                <Gem className="w-4 h-4 text-gold-400 animate-pulse" />
                <span className="text-sm text-gold-400 font-semibold">
                  {user.insightCrystals} Insight Crystals
                </span>
              </div>
            </div>
          )}
          {user && isCollapsed && (
            <div className="mb-8 flex justify-center">
              <div className="p-2 bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-lg border border-purple-500/30 hover-lift">
                <Gem className="w-6 h-6 text-gold-400 animate-pulse" />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex-1 space-y-6 overflow-y-auto pr-2">
            {/* Main Navigation */}
            <div>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Main Navigation
                </h3>
              )}
              <nav className="space-y-2">
                {mainNavigation.map((item) => renderNavigationItem(item))}
              </nav>
            </div>

            {/* AI-Enhanced Features */}
            <div>
              {!isCollapsed ? (
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>AI-Enhanced</span>
                </h3>
              ) : (
                <div className="border-t border-white/10 my-4" />
              )}
              <nav className="space-y-2">
                {aiNavigation.map((item) => renderNavigationItem(item))}
              </nav>
            </div>
          </div>

          {/* Settings */}
          <div className="pt-6 border-t border-white/10">
            <nav className="space-y-2">
              <Link
                to="/settings"
                className={`flex items-center ${isCollapsed ? 'justify-center p-3' : 'space-x-3 px-4 py-3'} rounded-lg transition-all ${
                  location.pathname === '/settings'
                    ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
                title={isCollapsed ? 'Settings' : undefined}
              >
                <Settings className="w-5 h-5" />
                {!isCollapsed && <span className="font-medium">Settings</span>}
              </Link>
            </nav>
          </div>

          {/* Footer */}
          {!isCollapsed && (
            <div className="pt-6 border-t border-white/10 mt-6">
              <p className="text-xs text-gray-400 text-center">
                "Until you make the unconscious conscious, it will direct your life and you will call it fate."
              </p>
              <p className="text-xs text-gray-500 text-center mt-2">— Carl Jung</p>
            </div>
          )}
        </div>
      </aside>

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
              <Gem className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-400 font-semibold">{user.insightCrystals}</span>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default EnhancedNavigation;
