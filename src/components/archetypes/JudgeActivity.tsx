import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Plus, Trash2 } from 'lucide-react';

interface JudgmentEntry {
  id: string;
  judgment: string;
  mirror: string;
  fear: string;
  value: string;
  timestamp: number;
}

const valueOptions = [
  'Productivity',
  'Efficiency',
  'Fairness',
  'Contribution',
  'Excellence',
  'Truth',
  'Justice',
  'Integrity',
  'Competence',
  'Order',
  'Respect',
  'Responsibility'
];

export function JudgeActivity() {
  const [entries, setEntries] = useState<JudgmentEntry[]>(() => {
    const saved = localStorage.getItem('judge-judgments');
    return saved ? JSON.parse(saved) : [];
  });

  const [judgment, setJudgment] = useState('');
  const [mirror, setMirror] = useState('');
  const [fear, setFear] = useState('');
  const [value, setValue] = useState('');

  const saveEntry = () => {
    const entry: JudgmentEntry = {
      id: Date.now().toString(),
      judgment,
      mirror,
      fear,
      value,
      timestamp: Date.now()
    };

    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem('judge-judgments', JSON.stringify(updated));

    // Reset
    setJudgment('');
    setMirror('');
    setFear('');
    setValue('');
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('judge-judgments', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg border border-indigo-500/30">
        <Scale className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <p className="font-semibold text-white mb-1">The Judgment Tracker & Reframe</p>
          <p>Transform harsh judgments into wisdom by finding the mirror, fear, and hidden value beneath.</p>
        </div>
      </div>

      {/* Input Form */}
      <div className="glass-card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            The Judgment (of self or others)
          </label>
          <input
            type="text"
            value={judgment}
            onChange={(e) => setJudgment(e.target.value)}
            placeholder="e.g., My co-worker is so lazy in meetings"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Find the Mirror: Where is this true for you?
          </label>
          <input
            type="text"
            value={mirror}
            onChange={(e) => setMirror(e.target.value)}
            placeholder="e.g., I sometimes tune out in meetings when I'm overwhelmed"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Find the Fear: What does this judgment protect you from?
          </label>
          <textarea
            value={fear}
            onChange={(e) => setFear(e.target.value)}
            placeholder="e.g., It protects me from my own laziness, which I fear. If I'm lazy, I'll fail and be judged."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all min-h-[80px] resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Find the Gold: What hidden value is in this judgment?
          </label>
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          >
            <option value="">Select a value...</option>
            {valueOptions.map(v => (
              <option key={v} value={v} className="bg-gray-900">{v}</option>
            ))}
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={saveEntry}
          disabled={!judgment.trim() || !mirror.trim() || !fear.trim() || !value}
          className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          Log Judgment
        </motion.button>
      </div>

      {/* Judgment Log */}
      <AnimatePresence mode="popLayout">
        {entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-white">Your Judgment Log</h3>
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-5 group hover:border-indigo-500/50 transition-all"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <p className="text-white font-semibold mb-1">"{entry.judgment}"</p>
                    <p className="text-xs text-gray-500">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                    <p className="text-indigo-400 font-semibold mb-1">🪞 The Mirror</p>
                    <p className="text-gray-300">{entry.mirror}</p>
                  </div>

                  <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <p className="text-purple-400 font-semibold mb-1">😰 The Fear</p>
                    <p className="text-gray-300">{entry.fear}</p>
                  </div>

                  <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <p className="text-yellow-400 font-semibold mb-1">✨ The Hidden Value</p>
                    <p className="text-gray-300">{entry.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {entries.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Scale className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Your judgment log will appear here</p>
        </div>
      )}
    </div>
  );
}
