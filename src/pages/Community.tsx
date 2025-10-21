import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Send, Heart, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Community: React.FC = () => {
  const { communityInsights, addCommunityInsight } = useApp();
  const [newInsight, setNewInsight] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Insights' },
    { id: 'shadow', name: 'Shadow Work' },
    { id: 'inner-child', name: 'Inner Child' },
    { id: 'growth', name: 'Personal Growth' },
    { id: 'healing', name: 'Healing' },
  ];

  const handleSubmit = () => {
    if (newInsight.trim()) {
      addCommunityInsight({
        text: newInsight,
        category: selectedCategory === 'all' ? 'growth' : selectedCategory,
      });
      setNewInsight('');
    }
  };

  const filteredInsights =
    selectedCategory === 'all'
      ? communityInsights
      : communityInsights.filter((i) => i.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Community Reflection Pool
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A sacred space for sharing anonymous insights and finding connection in our shared human
          experience.
        </p>
      </motion.div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 bg-purple-900/20 border-purple-500/30"
      >
        <div className="flex items-start space-x-3">
          <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Anonymous & Sacred</h3>
            <p className="text-gray-300 text-sm">
              All insights shared here are completely anonymous. This is a space for authentic
              expression without judgment. Share what resonates, knowing you're contributing to the
              collective healing journey.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Share Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-8"
      >
        <h2 className="text-2xl font-serif font-bold text-white mb-6">Share an Insight</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.filter((c) => c.id !== 'all').map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Your Insight (One Sentence)
            </label>
            <textarea
              value={newInsight}
              onChange={(e) => setNewInsight(e.target.value)}
              placeholder="Share a brief insight from your journey..."
              className="input-field min-h-[100px]"
              maxLength={200}
            />
            <p className="text-xs text-gray-400 mt-1">{newInsight.length}/200 characters</p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!newInsight.trim()}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 inline mr-2" />
            Share Anonymously
          </button>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-4"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Insights Stream */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold text-white">Shared Insights</h2>
          <div className="flex items-center space-x-2 text-gray-400">
            <Users className="w-5 h-5" />
            <span className="text-sm">{communityInsights.length} insights shared</span>
          </div>
        </div>

        {filteredInsights.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">
              No insights shared yet. Be the first to contribute to the collective wisdom.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {filteredInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all floating-element"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-500/20 rounded-full flex-shrink-0">
                    <Heart className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-200 leading-relaxed italic">"{insight.text}"</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-purple-400 capitalize">{insight.category}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(insight.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Jung Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-8 text-center"
      >
        <p className="text-xl text-gray-300 italic mb-3">
          "The meeting of two personalities is like the contact of two chemical substances: if
          there is any reaction, both are transformed."
        </p>
        <p className="text-gray-500">— Carl Jung</p>
      </motion.div>
    </div>
  );
};

export default Community;