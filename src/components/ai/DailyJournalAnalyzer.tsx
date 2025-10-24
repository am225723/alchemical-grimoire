import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, TrendingUp, BookOpen } from 'lucide-react';
import aiService from '../../services/aiService';

export const DailyJournalAnalyzer: React.FC = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!journalEntry.trim()) {
      setError('Please write something in your journal first');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await aiService.analyzeJournalEntry(journalEntry);
      setAnalysis(result);

      // Auto-update Inner Council Dashboard
      const existingCheckins = JSON.parse(localStorage.getItem('archetypeCheckins') || '[]');
      const newCheckin = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        values: {
          tyrant: result.tyrant,
          victim: result.victim,
          martyr: result.martyr,
          saboteur: result.saboteur,
          judge: result.judge,
          rebel: result.rebel
        },
        topArchetype: result.topArchetype,
        source: 'ai_journal_analysis'
      };
      
      existingCheckins.push(newCheckin);
      localStorage.setItem('archetypeCheckins', JSON.stringify(existingCheckins));

      // Save the journal entry
      const existingEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
      existingEntries.push({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        content: journalEntry,
        analysis: result
      });
      localStorage.setItem('journalEntries', JSON.stringify(existingEntries));

    } catch (err) {
      setError('Failed to analyze journal entry. Please check your API keys.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getArchetypeColor = (name: string) => {
    const colors: Record<string, string> = {
      tyrant: 'from-purple-500 to-pink-500',
      victim: 'from-blue-500 to-cyan-500',
      martyr: 'from-rose-500 to-pink-500',
      saboteur: 'from-orange-500 to-red-500',
      judge: 'from-yellow-500 to-orange-500',
      rebel: 'from-red-500 to-purple-500'
    };
    return colors[name.toLowerCase()] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-block p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full mb-4"
        >
          <Sparkles className="w-8 h-8 text-purple-400" />
        </motion.div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Daily Journal Analyzer
        </h2>
        <p className="text-gray-400">
          AI-powered analysis that automatically updates your Inner Council Dashboard
        </p>
      </div>

      {/* Journal Input */}
      <div className="glass-card p-6 space-y-4">
        <label className="block">
          <span className="text-lg font-semibold text-gray-200 flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            Today's Journal Entry
          </span>
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Write about your day, your emotions, challenges you faced, or anything that's on your mind..."
            className="w-full h-48 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
          />
        </label>

        <motion.button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !journalEntry.trim()}
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
              <Sparkles className="w-5 h-5" />
              Analyze with AI
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
            {/* Archetype Levels */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Archetype Activity Levels
              </h3>

              <div className="space-y-3">
                {Object.entries(analysis).map(([key, value]) => {
                  if (!['tyrant', 'victim', 'martyr', 'saboteur', 'judge', 'rebel'].includes(key)) return null;
                  const level = value as number;
                  const name = key.charAt(0).toUpperCase() + key.slice(1);
                  
                  return (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-medium capitalize">{name}</span>
                        <span className="text-cyan-400 font-bold">{level}%</span>
                      </div>
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full bg-gradient-to-r ${getArchetypeColor(key)} rounded-full`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Archetypes */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-4">Primary Archetypes Active Today</h3>
              <div className="flex gap-4">
                <div className={`flex-1 p-4 rounded-xl bg-gradient-to-br ${getArchetypeColor(analysis.topArchetype)} bg-opacity-20`}>
                  <div className="text-sm text-gray-400 mb-1">Primary</div>
                  <div className="text-2xl font-bold text-white">{analysis.topArchetype}</div>
                </div>
                {analysis.secondaryArchetype && (
                  <div className={`flex-1 p-4 rounded-xl bg-gradient-to-br ${getArchetypeColor(analysis.secondaryArchetype)} bg-opacity-20`}>
                    <div className="text-sm text-gray-400 mb-1">Secondary</div>
                    <div className="text-2xl font-bold text-white">{analysis.secondaryArchetype}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Insight & Suggestion */}
            <div className="glass-card p-6 space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">AI Insight</h4>
                <p className="text-gray-300">{analysis.insight}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Suggested Activity</h4>
                <p className="text-gray-300">{analysis.suggestedActivity}</p>
              </div>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm text-center">
              ✓ Your Inner Council Dashboard has been automatically updated with this analysis
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyJournalAnalyzer;
