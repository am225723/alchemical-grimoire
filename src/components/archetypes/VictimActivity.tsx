import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Reframe {
  id: string;
  victimThought: string;
  control: string;
  action: string;
  victorStatement: string;
  timestamp: number;
}

export function VictimActivity() {
  const [reframes, setReframes] = useState<Reframe[]>(() => {
    const saved = localStorage.getItem('victim-reframes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [step, setStep] = useState(1);
  const [victimThought, setVictimThought] = useState('');
  const [control, setControl] = useState('');
  const [action, setAction] = useState('');
  const [victorStatement, setVictorStatement] = useState('');

  const resetForm = () => {
    setStep(1);
    setVictimThought('');
    setControl('');
    setAction('');
    setVictorStatement('');
  };

  const saveReframe = () => {
    const reframe: Reframe = {
      id: Date.now().toString(),
      victimThought,
      control,
      action,
      victorStatement,
      timestamp: Date.now()
    };
    
    const updated = [reframe, ...reframes];
    setReframes(updated);
    localStorage.setItem('victim-reframes', JSON.stringify(updated));
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
        <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <p className="font-semibold text-white mb-1">Victim-to-Victor Reframer</p>
          <p>Transform helplessness into agency by finding your power, even if it's just 1%.</p>
        </div>
      </div>

      {/* Multi-Step Form */}
      <div className="glass-card p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-all ${
                s <= step ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white">Step 1: The Victim Thought</h3>
              <p className="text-gray-400 text-sm">Write a recent thought where you felt powerless.</p>
              <textarea
                value={victimThought}
                onChange={(e) => setVictimThought(e.target.value)}
                placeholder="e.g., My boss is drowning me in work and stressing me out"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all min-h-[100px] resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(2)}
                disabled={!victimThought.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50"
              >
                Next <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white">Step 2: Find the Choice</h3>
              <p className="text-gray-400 text-sm">What part of this, even 1%, is in your control?</p>
              <textarea
                value={control}
                onChange={(e) => setControl(e.target.value)}
                placeholder="e.g., I can control whether I speak up about my workload"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all min-h-[100px] resize-none"
              />
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all">
                  Back
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(3)}
                  disabled={!control.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50"
                >
                  Next <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white">Step 3: Small Action</h3>
              <p className="text-gray-400 text-sm">What's one small action you could take to feel 5% more powerful?</p>
              <textarea
                value={action}
                onChange={(e) => setAction(e.target.value)}
                placeholder="e.g., Schedule a meeting with my boss to discuss priorities"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all min-h-[100px] resize-none"
              />
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all">
                  Back
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(4)}
                  disabled={!action.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50"
                >
                  Next <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white">Step 4: Victor Statement</h3>
              <p className="text-gray-400 text-sm">Rewrite from a place of power, starting with "I will..."</p>
              <textarea
                value={victorStatement}
                onChange={(e) => setVictorStatement(e.target.value)}
                placeholder="e.g., I will speak with my boss tomorrow about my bandwidth and set a clear boundary"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all min-h-[100px] resize-none"
              />
              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all">
                  Back
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveReframe}
                  disabled={!victorStatement.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50"
                >
                  Save Reframe
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Saved Reframes */}
      {reframes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Your Victor Statements</h3>
          {reframes.slice(0, 5).map((reframe) => (
            <motion.div
              key={reframe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-4 border-l-4 border-cyan-500"
            >
              <p className="text-cyan-400 font-semibold mb-2">✨ {reframe.victorStatement}</p>
              <p className="text-xs text-gray-500 line-through">{reframe.victimThought}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
