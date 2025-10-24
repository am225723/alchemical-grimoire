import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, MessageCircle, Loader2, Bot } from 'lucide-react';
import aiService from '../../services/aiService';

interface Reframe {
  id: string;
  victimThought: string;
  control: string;
  action: string;
  victorStatement: string;
  timestamp: number;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function VictimActivityAI() {
  const [mode, setMode] = useState<'structured' | 'ai'>('structured');
  
  // Structured Mode State
  const [reframes, setReframes] = useState<Reframe[]>(() => {
    const saved = localStorage.getItem('victim-reframes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [step, setStep] = useState(1);
  const [victimThought, setVictimThought] = useState('');
  const [control, setControl] = useState('');
  const [action, setAction] = useState('');
  const [victorStatement, setVictorStatement] = useState('');

  // AI Coach Mode State
  const [aiConversation, setAiConversation] = useState<ConversationMessage[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

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

  const handleAiChat = async () => {
    if (!aiInput.trim()) return;

    const userMessage = aiInput;
    setAiInput('');

    // Add user message to conversation
    const updatedConversation: ConversationMessage[] = [
      ...aiConversation,
      { role: 'user', content: userMessage }
    ];
    setAiConversation(updatedConversation);
    setIsAiThinking(true);

    try {
      const response = await aiService.getSocraticQuestion(userMessage, updatedConversation);
      
      setAiConversation([
        ...updatedConversation,
        { role: 'assistant', content: response.question }
      ]);
    } catch (error) {
      console.error('AI Coach error:', error);
      setAiConversation([
        ...updatedConversation,
        { role: 'assistant', content: 'I\'m here to listen. What part of this situation feels most difficult for you?' }
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const resetAiChat = () => {
    setAiConversation([]);
    setAiInput('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
        <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-300 flex-1">
          <p className="font-semibold text-white mb-1">Victim-to-Victor Reframer</p>
          <p>Transform helplessness into agency by finding your power, even if it's just 1%.</p>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 p-1 bg-white/5 rounded-lg">
        <button
          onClick={() => setMode('structured')}
          className={`flex-1 px-4 py-3 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
            mode === 'structured'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Structured
        </button>
        <button
          onClick={() => setMode('ai')}
          className={`flex-1 px-4 py-3 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
            mode === 'ai'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Bot className="w-4 h-4" />
          AI Socratic Coach
        </button>
      </div>

      {/* Structured Mode */}
      {mode === 'structured' && (
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
      )}

      {/* AI Socratic Coach Mode */}
      {mode === 'ai' && (
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">AI Socratic Coach</h3>
                <p className="text-xs text-gray-400">Ask questions to guide you to your own power</p>
              </div>
            </div>
            {aiConversation.length > 0 && (
              <button
                onClick={resetAiChat}
                className="text-xs text-gray-400 hover:text-white transition-all"
              >
                Start Over
              </button>
            )}
          </div>

          {/* Conversation */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {aiConversation.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Share a situation where you're feeling powerless.</p>
                <p className="text-xs mt-2">The AI coach will ask questions to help you find your agency.</p>
              </div>
            )}
            
            {aiConversation.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-white/5 border border-white/10 text-gray-300'
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {isAiThinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg flex items-center gap-2 text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Coach is thinking...
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isAiThinking && handleAiChat()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              disabled={isAiThinking}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAiChat}
              disabled={!aiInput.trim() || isAiThinking}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold disabled:opacity-50"
            >
              Send
            </motion.button>
          </div>
        </div>
      )}

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
