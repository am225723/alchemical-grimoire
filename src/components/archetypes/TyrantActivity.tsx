import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Shield } from 'lucide-react';

interface ControlEntry {
  id: string;
  behavior: string;
  fear: string;
}

export function TyrantActivity() {
  const [entries, setEntries] = useState<ControlEntry[]>(() => {
    const saved = localStorage.getItem('tyrant-control-matrix');
    return saved ? JSON.parse(saved) : [];
  });
  const [newBehavior, setNewBehavior] = useState('');
  const [newFear, setNewFear] = useState('');

  const addEntry = () => {
    if (!newBehavior.trim() || !newFear.trim()) return;
    
    const entry: ControlEntry = {
      id: Date.now().toString(),
      behavior: newBehavior,
      fear: newFear
    };
    
    const updated = [...entries, entry];
    setEntries(updated);
    localStorage.setItem('tyrant-control-matrix', JSON.stringify(updated));
    
    setNewBehavior('');
    setNewFear('');
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('tyrant-control-matrix', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-500/20 to-red-500/20 rounded-lg border border-purple-500/30">
        <Shield className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <p className="font-semibold text-white mb-1">The Control-Fear Matrix</p>
          <p>Map your control behaviors to the fears they protect you from. This creates compassion instead of judgment.</p>
        </div>
      </div>

      {/* Input Form */}
      <div className="glass-card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Control Behavior
          </label>
          <input
            type="text"
            value={newBehavior}
            onChange={(e) => setNewBehavior(e.target.value)}
            placeholder="e.g., I re-read emails 10 times before sending"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            onKeyPress={(e) => e.key === 'Enter' && document.getElementById('fear-input')?.focus()}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            What is this protecting you from?
          </label>
          <input
            id="fear-input"
            type="text"
            value={newFear}
            onChange={(e) => setNewFear(e.target.value)}
            placeholder="e.g., Being seen as stupid or incompetent"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            onKeyPress={(e) => e.key === 'Enter' && addEntry()}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addEntry}
          disabled={!newBehavior.trim() || !newFear.trim()}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-red-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          Add to Matrix
        </motion.button>
      </div>

      {/* Entries List */}
      <AnimatePresence mode="popLayout">
        {entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-white">Your Control-Fear Map</h3>
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-4 group hover:border-purple-500/50 transition-all"
              >
                <div className="flex gap-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-purple-400 font-semibold mb-1">Control Behavior</p>
                      <p className="text-white">{entry.behavior}</p>
                    </div>
                    <div>
                      <p className="text-xs text-red-400 font-semibold mb-1">Hidden Fear</p>
                      <p className="text-gray-300">{entry.fear}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {entries.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Shield className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Your control-fear matrix will appear here</p>
        </div>
      )}
    </div>
  );
}
