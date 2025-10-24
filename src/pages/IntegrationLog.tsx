import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Crown, Users, Heart, Zap, Scale, Flame, AlertCircle, Calendar, Trash2, Download } from 'lucide-react';

interface LogEntry {
  type: string;
  archetype?: string;
  data: any;
  timestamp: string;
}

const IntegrationLog: React.FC = () => {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [filterArchetype, setFilterArchetype] = useState<string>('all');

  useEffect(() => {
    loadAllEntries();
  }, []);

  const loadAllEntries = () => {
    const entries: LogEntry[] = [];

    // Load Trigger Identifier results
    const triggerResults = localStorage.getItem('triggerIdentifierResults');
    if (triggerResults) {
      try {
        const data = JSON.parse(triggerResults);
        entries.push({
          type: 'trigger_diagnostic',
          data,
          timestamp: data.date || new Date().toISOString()
        });
      } catch (e) {
        console.error('Error parsing trigger results:', e);
      }
    }

    // Load Tyrant Control-Fear Matrix
    const tyrantEntries = localStorage.getItem('tyrant-control-matrix');
    if (tyrantEntries) {
      try {
        const data = JSON.parse(tyrantEntries);
        entries.push({
          type: 'tyrant_control_matrix',
          archetype: 'tyrant',
          data,
          timestamp: new Date().toISOString()
        });
      } catch (e) {
        console.error('Error parsing tyrant entries:', e);
      }
    }

    // Load Victim-to-Victor reframes
    const victimEntries = localStorage.getItem('victim-reframes');
    if (victimEntries) {
      try {
        const data = JSON.parse(victimEntries);
        entries.push({
          type: 'victim_reframes',
          archetype: 'victim',
          data,
          timestamp: new Date().toISOString()
        });
      } catch (e) {
        console.error('Error parsing victim entries:', e);
      }
    }

    // Load Martyr Yes/No entries
    const martyrEntries = localStorage.getItem('martyr-sorted-needs');
    if (martyrEntries) {
      try {
        const data = JSON.parse(martyrEntries);
        entries.push({
          type: 'martyr_needs',
          archetype: 'martyr',
          data,
          timestamp: new Date().toISOString()
        });
      } catch (e) {
        console.error('Error parsing martyr entries:', e);
      }
    }

    // Load Saboteur letters
    const saboteurEntries = localStorage.getItem('saboteur-letters');
    if (saboteurEntries) {
      try {
        const data = JSON.parse(saboteurEntries);
        entries.push({
          type: 'saboteur_letters',
          archetype: 'saboteur',
          data,
          timestamp: new Date().toISOString()
        });
      } catch (e) {
        console.error('Error parsing saboteur entries:', e);
      }
    }

    // Load Judge judgments
    const judgeEntries = localStorage.getItem('judge-judgments');
    if (judgeEntries) {
      try {
        const data = JSON.parse(judgeEntries);
        entries.push({
          type: 'judge_judgments',
          archetype: 'judge',
          data,
          timestamp: new Date().toISOString()
        });
      } catch (e) {
        console.error('Error parsing judge entries:', e);
      }
    }

    // Load Rebel quiz results
    const rebelEntries = localStorage.getItem('rebel-responses');
    if (rebelEntries) {
      try {
        const data = JSON.parse(rebelEntries);
        entries.push({
          type: 'rebel_quiz',
          archetype: 'rebel',
          data,
          timestamp: new Date().toISOString()
        });
      } catch (e) {
        console.error('Error parsing rebel entries:', e);
      }
    }

    // Load Inner Council check-ins
    const councilEntries = localStorage.getItem('inner-council-history');
    if (councilEntries) {
      try {
        const data = JSON.parse(councilEntries);
        data.forEach((checkin: any) => {
          entries.push({
            type: 'council_checkin',
            data: checkin,
            timestamp: checkin.date || new Date().toISOString()
          });
        });
      } catch (e) {
        console.error('Error parsing council entries:', e);
      }
    }

    // Sort by timestamp (newest first)
    entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    setLogEntries(entries);
  };

  const getArchetypeIcon = (archetype?: string) => {
    switch (archetype) {
      case 'tyrant': return <Crown className="w-5 h-5 text-red-400" />;
      case 'victim': return <Users className="w-5 h-5 text-blue-400" />;
      case 'martyr': return <Heart className="w-5 h-5 text-pink-400" />;
      case 'saboteur': return <Zap className="w-5 h-5 text-purple-400" />;
      case 'judge': return <Scale className="w-5 h-5 text-yellow-400" />;
      case 'rebel': return <Flame className="w-5 h-5 text-green-400" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getEntryTitle = (entry: LogEntry) => {
    switch (entry.type) {
      case 'trigger_diagnostic': return 'Shadow Profile Assessment';
      case 'tyrant_control_matrix': return 'Tyrant: Control-Fear Matrix';
      case 'victim_reframes': return 'Victim: Victor Reframes';
      case 'martyr_needs': return 'Martyr: Yes/No Need Sorting';
      case 'saboteur_letters': return 'Saboteur: Letter from Your Saboteur';
      case 'judge_judgments': return 'Judge: Judgment Tracker';
      case 'rebel_quiz': return 'Rebel: Authentic vs Reactive';
      case 'council_checkin': return 'Inner Council Check-in';
      default: return 'Shadow Work Entry';
    }
  };

  const getArchetypeColor = (archetype?: string) => {
    switch (archetype) {
      case 'tyrant': return 'from-red-500/20 to-orange-500/20 border-red-500/30';
      case 'victim': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'martyr': return 'from-pink-500/20 to-rose-500/20 border-pink-500/30';
      case 'saboteur': return 'from-purple-500/20 to-violet-500/20 border-purple-500/30';
      case 'judge': return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
      case 'rebel': return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  const renderEntryContent = (entry: LogEntry) => {
    switch (entry.type) {
      case 'trigger_diagnostic':
        const topScores = Object.entries(entry.data.scores || {})
          .sort((a: any, b: any) => b[1] - a[1])
          .slice(0, 3);
        return (
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Top Active Archetypes:</p>
            {topScores.map(([archetype, score]: any) => (
              <div key={archetype} className="flex items-center justify-between">
                <span className="text-white capitalize">{archetype}</span>
                <span className="text-purple-400 font-semibold">{score}%</span>
              </div>
            ))}
          </div>
        );

      case 'tyrant_control_matrix':
        return (
          <div className="space-y-2">
            <p className="text-sm text-gray-400">{entry.data.length} control behavior(s) identified</p>
            {entry.data.slice(0, 2).map((item: any) => (
              <div key={item.id} className="text-sm">
                <span className="text-white">→ {item.behavior}</span>
              </div>
            ))}
          </div>
        );

      case 'council_checkin':
        return (
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Weekly Volume Levels:</p>
            {Object.entries(entry.data.volumes || {})
              .filter(([_, volume]: any) => volume > 50)
              .map(([archetype, volume]: any) => (
                <div key={archetype} className="flex items-center justify-between">
                  <span className="text-white capitalize">{archetype}</span>
                  <span className="text-purple-400 font-semibold">{volume}%</span>
                </div>
              ))}
          </div>
        );

      default:
        return (
          <p className="text-sm text-gray-400">
            Insight saved to your integration log
          </p>
        );
    }
  };

  const filteredEntries = filterArchetype === 'all' 
    ? logEntries 
    : logEntries.filter(e => e.archetype === filterArchetype);

  const exportData = () => {
    const dataStr = JSON.stringify(logEntries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `alchemical-grimoire-log-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear ALL your integration log data? This cannot be undone.')) {
      localStorage.clear();
      setLogEntries([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-4">
      <div className="max-w-6xl mx-auto pt-20">
        {/* Header */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                <BookOpen className="w-8 h-8 text-purple-400" />
                Integration Log
              </h1>
              <p className="text-gray-300">
                A central place to review all your shadow work insights and progress.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-all"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={clearAllData}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 font-semibold transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setFilterArchetype('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterArchetype === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              All ({logEntries.length})
            </button>
            {['tyrant', 'victim', 'martyr', 'saboteur', 'judge', 'rebel'].map(archetype => (
              <button
                key={archetype}
                onClick={() => setFilterArchetype(archetype)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
                  filterArchetype === archetype
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {archetype} ({logEntries.filter(e => e.archetype === archetype).length})
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredEntries.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No Entries Yet</h3>
            <p className="text-gray-400 mb-6">
              Start your shadow work journey to see your insights appear here.
            </p>
            <a
              href="/trigger-identifier"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Take Shadow Diagnostic
            </a>
          </div>
        )}

        {/* Log Entries */}
        <div className="space-y-4">
          {filteredEntries.map((entry, index) => (
            <motion.div
              key={`${entry.type}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${getArchetypeColor(entry.archetype)} border`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  {getArchetypeIcon(entry.archetype)}
                  <div>
                    <h3 className="text-xl font-bold text-white">{getEntryTitle(entry)}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(entry.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pl-8">
                {renderEntryContent(entry)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationLog;
