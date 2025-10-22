import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, TrendingUp, Calendar, Gem, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { user, setUser, timeCapsules, journalEntries } = useApp();
  const [readyToOpen, setReadyToOpen] = useState<any[]>([]);

  useEffect(() => {
    // Check for time capsules ready to open
    const now = new Date();
    const ready = timeCapsules.filter(
      (capsule) => !capsule.opened && new Date(capsule.openDate) <= now
    );
    setReadyToOpen(ready);
  }, [timeCapsules]);

  // Initialize user if not exists
  useEffect(() => {
    if (!user) {
      const newUser = {
        id: Date.now().toString(),
        name: 'Seeker',
        progress: {
          chaptersCompleted: [],
          activitiesCompleted: [],
          quizzesCompleted: [],
          pathProgress: 0,
          lastVisit: new Date().toISOString(),
        },
        journalEntries: [],
        triggers: [],
        insightCrystals: 0,
        completedActivities: [],
      };
      setUser(newUser);
    }
  }, [user, setUser]);

  const pathStones = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    completed: user ? i < user.progress.pathProgress : false,
  }));

  const recentJournals = journalEntries.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-gold-400 bg-clip-text text-transparent">
          Welcome to Your Alchemical Journey
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Transform the lead of unconscious patterns into the gold of self-awareness. Your path to
          wholeness begins here.
        </p>
      </motion.div>

      {/* Time Capsule Notification */}
      {readyToOpen.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 border-2 border-gold-400 bg-gradient-to-r from-gold-900/20 to-purple-900/20"
        >
          <div className="flex items-center space-x-4">
            <Mail className="w-8 h-8 text-gold-400 animate-pulse" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gold-400 mb-1">
                A Letter from Your Past Self Awaits
              </h3>
              <p className="text-gray-300">
                You have {readyToOpen.length} time capsule{readyToOpen.length > 1 ? 's' : ''} ready
                to open.
              </p>
            </div>
            <Link to="/toolkit" className="btn-primary">
              Open Now
            </Link>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <span className="text-3xl font-bold text-white">
              {user?.progress.chaptersCompleted.length || 0}
            </span>
          </div>
          <h3 className="text-gray-300 font-semibold">Chapters Completed</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Gem className="w-8 h-8 text-gold-400 Gem-glow" />
            <span className="text-3xl font-bold text-white">{user?.insightCrystals || 0}</span>
          </div>
          <h3 className="text-gray-300 font-semibold">Insight Gems</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-pink-400" />
            <span className="text-3xl font-bold text-white">{journalEntries.length}</span>
          </div>
          <h3 className="text-gray-300 font-semibold">Journal Entries</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <span className="text-3xl font-bold text-white">
              {user?.progress.activitiesCompleted.length || 0}
            </span>
          </div>
          <h3 className="text-gray-300 font-semibold">Activities Completed</h3>
        </motion.div>
      </div>

      {/* Alchemical Path */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold text-white">Your Alchemical Path</h2>
          <span className="text-sm text-gray-400">
            {user?.progress.pathProgress || 0} / {pathStones.length} stones illuminated
          </span>
        </div>

        <div className="relative">
          {/* Path visualization */}
          <div className="flex flex-wrap gap-3 justify-center">
            {pathStones.map((stone, index) => (
              <motion.div
                key={stone.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  stone.completed
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 Gem-glow'
                    : 'bg-gray-700/50 border border-gray-600'
                }`}
              >
                {stone.completed && <Sparkles className="w-6 h-6 text-white" />}
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-300 italic">
              "The privilege of a lifetime is to become who you truly are."
            </p>
            <p className="text-gray-500 text-sm mt-1">— Carl Jung</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/chapters" className="block glass-card p-6 hover:bg-white/10 transition-all group">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all">
                <BookOpen className="w-8 h-8 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-1">Continue Your Journey</h3>
                <p className="text-gray-400">Explore the chapters and deepen your understanding</p>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link to="/toolkit" className="block glass-card p-6 hover:bg-white/10 transition-all group">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-all">
                <Sparkles className="w-8 h-8 text-pink-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-1">Alchemist's Toolkit</h3>
                <p className="text-gray-400">Access journaling, tracking, and reflection tools</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Recent Journal Entries */}
      {recentJournals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-white">Recent Reflections</h2>
            <Link to="/toolkit" className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {recentJournals.map((entry) => (
              <div key={entry.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white">{entry.title}</h3>
                  <span className="text-xs text-gray-400">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300 text-sm line-clamp-2">{entry.content}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
