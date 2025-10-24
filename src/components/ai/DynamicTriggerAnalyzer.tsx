import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Loader2, Lightbulb, ArrowRight } from 'lucide-react';
import aiService from '../../services/aiService';

const DynamicTriggerAnalyzer: React.FC = () => {
  const [story, setStory] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!story.trim()) {
      setError('Please describe a triggering situation first');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await aiService.analyzeTriggerStory(story);
      setAnalysis(result);

      // Save to localStorage
      const existingTriggers = JSON.parse(localStorage.getItem('aiTriggerAnalyses') || '[]');
      existingTriggers.push({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        story: story,
        analysis: result
      });
      localStorage.setItem('aiTriggerAnalyses', JSON.stringify(existingTriggers));

    } catch (err) {
      setError('Failed to analyze trigger. Please check your API keys.');
      console.error('Trigger analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getArchetypeIcon = (archetype: string) => {
    const icons: Record<string, string> = {
      tyrant: '👑',
      victim: '🛡️',
      martyr: '❤️',
      saboteur: '🔥',
      judge: '⚖️',
      rebel: '⚡'
    };
    return icons[archetype.toLowerCase()] || '✨';
  };

  const getArchetypeColor = (archetype: string) => {
    const colors: Record<string, string> = {
      tyrant: 'from-purple-500 to-pink-500',
      victim: 'from-blue-500 to-cyan-500',
      martyr: 'from-rose-500 to-pink-500',
      saboteur: 'from-orange-500 to-red-500',
      judge: 'from-yellow-500 to-orange-500',
      rebel: 'from-red-500 to-purple-500'
    };
    return colors[archetype.toLowerCase()] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-block p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full mb-4"
        >
          <Zap className="w-8 h-8 text-orange-400" />
        </motion.div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Dynamic Trigger Analyzer
        </h2>
        <p className="text-gray-400">
          AI-powered NLP analysis to identify which shadow archetype is active
        </p>
      </div>

      {/* Story Input */}
      <div className="glass-card p-6 space-y-4">
        <label className="block">
          <span className="text-lg font-semibold text-gray-200 flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-orange-400" />
            Describe Your Triggering Situation
          </span>
          <p className="text-sm text-gray-400 mb-3">
            Write a free-form story about a recent situation that made you feel angry, anxious, or frustrated. 
            What happened? What did the other person do or say?
          </p>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Example: My co-worker presented my idea as their own in the meeting. I felt invisible and furious, but I just sat there and said nothing..."
            className="w-full h-40 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none"
          />
        </label>

        <motion.button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !story.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Analyze Trigger
            </>
          )}
        </motion.button>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}
      </div>

      {/* Analysis Results */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Primary Archetype */}
            <div className={`glass-card p-8 bg-gradient-to-br ${getArchetypeColor(analysis.primaryArchetype)} bg-opacity-10`}>
              <div className="flex items-start gap-4">
                <div className="text-6xl">{getArchetypeIcon(analysis.primaryArchetype)}</div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">Primary Archetype Detected</div>
                  <h3 className="text-3xl font-bold text-white mb-2">The {analysis.primaryArchetype}</h3>
                  {analysis.secondaryArchetype && (
                    <div className="text-sm text-gray-400">
                      Secondary: The {analysis.secondaryArchetype}
                    </div>
                  )}
                  <div className="mt-4">
                    <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                      Confidence: {Math.round(analysis.confidence * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emotional Keywords */}
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                Emotional Keywords Detected
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.emotionalKeywords.map((keyword: string, index: number) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-yellow-300 font-medium"
                  >
                    "{keyword}"
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Analysis */}
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-cyan-400 mb-3">AI Analysis</h4>
              <p className="text-gray-300 leading-relaxed">{analysis.analysis}</p>
            </div>

            {/* Suggested Module */}
            <div className="glass-card p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-2 border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Next Step: Explore This Module</h4>
                  <div className="text-xl font-bold text-white">{analysis.suggestedModule}</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white"
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DynamicTriggerAnalyzer;
