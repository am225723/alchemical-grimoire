import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Sparkles, Loader2 } from 'lucide-react';
import aiService from '../../services/aiService';

interface JudgmentLog {
  id: string;
  judgment: string;
  target: string;
  mirror: string;
  fear: string;
  value: string;
  timestamp: number;
  aiDecoded?: {
    projection: string;
    goldValue: string;
    integrationTip: string;
  };
}

export function JudgeActivityAI() {
  const [logs, setLogs] = useState<JudgmentLog[]>(() => {
    const saved = localStorage.getItem('judgment-logs');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [judgment, setJudgment] = useState('');
  const [target, setTarget] = useState('');
  const [mirror, setMirror] = useState('');
  const [fear, setFear] = useState('');
  const [value, setValue] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [aiInsight, setAiInsight] = useState<any>(null);

  const handleAIDecode = async () => {
    if (!judgment.trim() || !target.trim()) return;

    setIsDecoding(true);
    setAiInsight(null);

    try {
      const result = await aiService.decodeJudgment(judgment, target);
      setAiInsight(result);
      
      // Auto-fill the mirror and value fields with AI insights
      setMirror(result.projection);
      setValue(result.goldValue);
    } catch (error) {
      console.error('AI decode error:', error);
    } finally {
      setIsDecoding(false);
    }
  };

  const saveLog = () => {
    const log: JudgmentLog = {
      id: Date.now().toString(),
      judgment,
      target,
      mirror,
      fear,
      value,
      timestamp: Date.now(),
      aiDecoded: aiInsight
    };
    
    const updated = [log, ...logs];
    setLogs(updated);
    localStorage.setItem('judgment-logs', JSON.stringify(updated));
    
    // Reset form
    setJudgment('');
    setTarget('');
    setMirror('');
    setFear('');
    setValue('');
    setAiInsight(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
        <Scale className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <p className="font-semibold text-white mb-1">Judgment De-Coder</p>
          <p>Use AI to translate harsh judgments into wisdom and discover your core values.</p>
        </div>
      </div>

      {/* Main Form */}
      <div className="glass-card p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              The Judgment
            </label>
            <textarea
              value={judgment}
              onChange={(e) => setJudgment(e.target.value)}
              placeholder="e.g., I can't stand how fake and 'sales-y' my co-worker is. He's so inauthentic."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 resize-none min-h-[80px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Who or what are you judging?
            </label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., my co-worker, my friend, social media influencers"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
            />
          </div>

          {/* AI Decode Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAIDecode}
            disabled={isDecoding || !judgment.trim() || !target.trim()}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
          >
            {isDecoding ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                AI is decoding...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Decode with AI
              </>
            )}
          </motion.button>

          {/* AI Insights */}
          <AnimatePresence>
            {aiInsight && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 pt-4 border-t border-white/10"
              >
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <h4 className="text-sm font-semibold text-purple-400 mb-2">🔮 The Projection</h4>
                  <p className="text-gray-300 text-sm">{aiInsight.projection}</p>
                </div>

                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <h4 className="text-sm font-semibold text-yellow-400 mb-2">✨ The "Gold" (Your Core Value)</h4>
                  <p className="text-gray-300 text-sm">{aiInsight.goldValue}</p>
                </div>

                <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2">🎯 Integration Tip</h4>
                  <p className="text-gray-300 text-sm">{aiInsight.integrationTip}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Manual Fields (pre-filled by AI or user can edit) */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                🪞 The Mirror: Where is this true for YOU?
              </label>
              <textarea
                value={mirror}
                onChange={(e) => setMirror(e.target.value)}
                placeholder="AI will help fill this, or write your own reflection..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 resize-none min-h-[80px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                😨 The Fear: What does this protect you from?
              </label>
              <input
                type="text"
                value={fear}
                onChange={(e) => setFear(e.target.value)}
                placeholder="e.g., being seen as inauthentic myself"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                💎 The Gold: What value does this reveal?
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="AI will help fill this, or write your own..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={saveLog}
            disabled={!judgment || !target || !mirror || !value}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
          >
            Save Decoded Judgment
          </motion.button>
        </div>
      </div>

      {/* Saved Logs */}
      {logs.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Your Decoded Judgments</h3>
          {logs.slice(0, 5).map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-4 border-l-4 border-yellow-500 space-y-2"
            >
              <div className="text-sm text-gray-400">
                <span className="font-semibold text-yellow-400">Judgment:</span> {log.judgment}
              </div>
              <div className="text-sm text-gray-400">
                <span className="font-semibold text-cyan-400">💎 Gold Value:</span> {log.value}
              </div>
              {log.aiDecoded && (
                <div className="text-xs text-purple-400 mt-2">
                  ✨ AI Integration: {log.aiDecoded.integrationTip}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
