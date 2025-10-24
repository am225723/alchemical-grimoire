import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, MessageCircle, Loader2, Bot } from 'lucide-react';
import aiService from '../../services/aiService';

interface Letter {
  id: string;
  letter: string;
  timestamp: number;
}

interface ConversationMessage {
  role: 'user' | 'saboteur';
  content: string;
}

export function SaboteurActivityAI() {
  const [mode, setMode] = useState<'template' | 'ai'>('template');
  
  // Template Mode State
  const [letters, setLetters] = useState<Letter[]>(() => {
    const saved = localStorage.getItem('saboteur-letters');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [fields, setFields] = useState({
    goal: '',
    behavior: '',
    fear: '',
    reassurance: ''
  });

  // AI Interview Mode State
  const [aiConversation, setAiConversation] = useState<ConversationMessage[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [context, setContext] = useState('');

  const handleFieldChange = (field: keyof typeof fields, value: string) => {
    setFields(prev => ({ ...prev, [field]: value }));
  };

  const saveLetter = () => {
    const letterText = `Dear Self,

I know you want to ${fields.goal}. But I need you to understand something: I'm the one who makes you ${fields.behavior}. And I do it because I'm terrified that ${fields.fear}.

I know it seems like I'm working against you, but please see this: I'm trying to protect you. If you never try, you can never fail. If you stay small, nobody can judge you. If you self-sabotage first, at least the pain is on YOUR terms.

But here's what I need you to know: ${fields.reassurance}

We can do this together, but I need you to reassure me. Can you show me it's safe to let you succeed?

—Your Saboteur`;

    const letter: Letter = {
      id: Date.now().toString(),
      letter: letterText,
      timestamp: Date.now()
    };
    
    const updated = [letter, ...letters];
    setLetters(updated);
    localStorage.setItem('saboteur-letters', JSON.stringify(updated));
    
    setFields({ goal: '', behavior: '', fear: '', reassurance: '' });
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

    // Update context if first message
    if (aiConversation.length === 0) {
      setContext(userMessage);
    }

    try {
      const response = await aiService.saboteurRespond(userMessage, context || userMessage);
      
      setAiConversation([
        ...updatedConversation,
        { role: 'saboteur', content: response.saboteurMessage }
      ]);

      // Save the interaction
      const saved = localStorage.getItem('saboteur-interviews') || '[]';
      const interviews = JSON.parse(saved);
      interviews.push({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        conversation: [...updatedConversation, { role: 'saboteur', content: response.saboteurMessage }],
        underlyingFear: response.underlyingFear
      });
      localStorage.setItem('saboteur-interviews', JSON.stringify(interviews));

    } catch (error) {
      console.error('Saboteur interview error:', error);
      setAiConversation([
        ...updatedConversation,
        { role: 'saboteur', content: "I'm just trying to protect you. What if you fail? It's safer to stay where you are, even if you're unhappy. At least it's familiar." }
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const resetAiChat = () => {
    setAiConversation([]);
    setAiInput('');
    setContext('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
        <Flame className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-300 flex-1">
          <p className="font-semibold text-white mb-1">Saboteur Interview</p>
          <p>Talk directly to your Saboteur to understand its protective fears.</p>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 p-1 bg-white/5 rounded-lg">
        <button
          onClick={() => setMode('template')}
          className={`flex-1 px-4 py-3 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
            mode === 'template'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4" />
          Template Letter
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
          AI Interview
        </button>
      </div>

      {/* Template Mode */}
      {mode === 'template' && (
        <div className="glass-card p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                What goal are you avoiding?
              </label>
              <input
                type="text"
                value={fields.goal}
                onChange={(e) => handleFieldChange('goal', e.target.value)}
                placeholder="e.g., apply for that new job"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                What behavior am I using to hold you back?
              </label>
              <input
                type="text"
                value={fields.behavior}
                onChange={(e) => handleFieldChange('behavior', e.target.value)}
                placeholder="e.g., procrastinate, doubt yourself, get distracted"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                What am I afraid will happen if you succeed?
              </label>
              <input
                type="text"
                value={fields.fear}
                onChange={(e) => handleFieldChange('fear', e.target.value)}
                placeholder="e.g., you'll be exposed as a fraud"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                How can you reassure me it's safe to let you try?
              </label>
              <textarea
                value={fields.reassurance}
                onChange={(e) => handleFieldChange('reassurance', e.target.value)}
                placeholder="e.g., Even if I fail, I'll learn something valuable. Trying doesn't mean I'm not enough—it means I'm brave."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none min-h-[100px]"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={saveLetter}
              disabled={!fields.goal || !fields.behavior || !fields.fear || !fields.reassurance}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              Save Letter
            </motion.button>
          </div>
        </div>
      )}

      {/* AI Interview Mode */}
      {mode === 'ai' && (
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Talk to Your Saboteur</h3>
                <p className="text-xs text-gray-400">The AI will role-play as your protective Saboteur</p>
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
                <p>Ask your Saboteur why it's holding you back.</p>
                <p className="text-xs mt-2">Example: "Why are you making me procrastinate on this job application?"</p>
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
                      : 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-gray-200'
                  }`}
                >
                  {msg.role === 'saboteur' && (
                    <div className="text-xs text-orange-400 font-semibold mb-1">Your Saboteur:</div>
                  )}
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
                  Saboteur is responding...
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
              placeholder="Talk to your Saboteur..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              disabled={isAiThinking}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAiChat}
              disabled={!aiInput.trim() || isAiThinking}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold disabled:opacity-50"
            >
              Send
            </motion.button>
          </div>
        </div>
      )}

      {/* Saved Letters */}
      {letters.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Your Letters</h3>
          {letters.slice(0, 3).map((letter) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-4 border-l-4 border-orange-500"
            >
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">{letter.letter}</pre>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
