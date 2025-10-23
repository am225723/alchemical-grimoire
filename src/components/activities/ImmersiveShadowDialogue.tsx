import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Heart, Brain, Sparkles, Send, ArrowLeft } from 'lucide-react'; // Ensure lucide-react is installed
import { useAIService, DialogueResponse } from '../../services/aiService';

interface DialogueMessage {
  id: string;
  sender: 'user' | 'shadow';
  message: string;
  timestamp: Date;
  emotionalTone?: 'supportive' | 'challenging' | 'neutral' | 'empathetic';
}

interface ImmersiveShadowDialogueProps {
  onClose?: () => void;
  initialContext?: string;
}

const ImmersiveShadowDialogue: React.FC<ImmersiveShadowDialogueProps> = ({
  onClose,
  initialContext = "shadow work exploration"
}) => {
  const [messages, setMessages] = useState<DialogueMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [emotionalState, setEmotionalState] = useState<string>('curious');
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const aiService = useAIService();

  useEffect(() => {
    // Initialize conversation with a shadow greeting
    const initialMessage: DialogueMessage = {
      id: 'shadow-welcome',
      sender: 'shadow',
      message: "Welcome to this sacred space of dialogue. I am here to help you explore the hidden aspects of yourself. What brings you to this conversation today?",
      timestamp: new Date(),
      emotionalTone: 'empathetic'
    };
    setMessages([initialMessage]);

    setSuggestedQuestions([
      "I'm feeling disconnected from parts of myself",
      "I keep repeating patterns I don't understand",
      "I want to understand my fears better",
      "I'm ready for deeper self-exploration"
    ]);
  }, []);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: DialogueMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setSuggestedQuestions([]); // Clear suggestions while AI responds

    try {
      const response: DialogueResponse = await aiService.generateShadowResponse(
        message,
        initialContext,
        emotionalState
      );

      const shadowMessage: DialogueMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'shadow',
        message: response.message,
        timestamp: new Date(),
        emotionalTone: response.emotionalTone
      };

      // Simulate typing delay
      setTimeout(() => {
        setMessages(prev => [...prev, shadowMessage]);
        setSuggestedQuestions(response.suggestedQuestions);
        setIsTyping(false);
      }, 1500 + Math.random() * 1000); // Add slight variability

    } catch (error) {
      console.error('Error generating response:', error);
      // Add error message to chat
       const errorMessage: DialogueMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'shadow',
        message: "I seem to be having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
        emotionalTone: 'neutral'
      };
       setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const getToneColor = (tone?: string) => {
    switch (tone) {
      case 'supportive': return 'text-blue-400';
      case 'challenging': return 'text-orange-400';
      case 'empathetic': return 'text-purple-400';
      default: return 'text-gray-300';
    }
  };

  const getToneIcon = (tone?: string) => {
    switch (tone) {
      case 'supportive': return <Heart className="w-4 h-4" />;
      case 'challenging': return <Brain className="w-4 h-4" />;
      case 'empathetic': return <Sparkles className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-4 flex flex-col">
      <div className="max-w-4xl mx-auto flex flex-col flex-grow w-full">
        {/* Header */}
        <div className="glass-card rounded-t-2xl p-6 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-300" />
                </button>
              )}
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Shadow Dialogue</h2>
                  <p className="text-gray-400 text-sm">Sacred conversation with your inner self</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">State:</span>
              <select
                value={emotionalState}
                onChange={(e) => setEmotionalState(e.target.value)}
                className="px-3 py-1 rounded-lg bg-white/10 text-white text-sm border border-white/20 focus:outline-none focus:border-purple-400"
              >
                <option value="curious">Curious</option>
                <option value="confused">Confused</option>
                <option value="anxious">Anxious</option>
                <option value="determined">Determined</option>
                <option value="vulnerable">Vulnerable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="glass-card flex-grow overflow-y-auto">
          <div className="p-6 space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  layout // Add layout animation
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] ${msg.sender === 'user' ? 'pl-10' : 'pr-10'}`}> {/* Adjusted width and padding */}
                    <div className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                       {/* Icon/Avatar */}
                       <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                         msg.sender === 'user' ? 'bg-purple-500' : 'bg-gray-700'
                       }`}>
                         {msg.sender === 'user' ? (
                           <span className="text-white text-xs font-medium">YOU</span>
                         ) : (
                           getToneIcon(msg.emotionalTone)
                         )}
                       </div>
                       {/* Bubble */}
                      <div className={`rounded-2xl px-4 py-3 ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none' // User bubble style
                          : 'bg-white/10 text-gray-100 backdrop-blur-sm rounded-bl-none' // Shadow bubble style
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p> {/* Added whitespace-pre-wrap */}
                        <p className={`text-xs mt-2 opacity-70 ${
                          msg.sender === 'user' ? 'text-right' : 'text-left' // Align timestamp
                        }`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} {/* Simplified time */}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                layout
                className="flex justify-start"
              >
                 <div className="flex items-start space-x-2 pr-10">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mt-1">
                      {getToneIcon()}
                    </div>
                    <div className="bg-white/10 rounded-2xl px-4 py-3 backdrop-blur-sm rounded-bl-none">
                      <div className="flex space-x-1.5"> {/* Adjusted spacing */}
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Suggested Questions */}
        {!isTyping && suggestedQuestions.length > 0 && (
          <div className="glass-card border-t border-white/10 p-4 flex-shrink-0">
            <p className="text-sm text-gray-400 mb-3">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(question)}
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-sm border border-white/10 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="glass-card rounded-b-2xl border-t border-white/10 p-4 flex-shrink-0">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
              placeholder="Share your thoughts, feelings, or questions..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-purple-400 transition-colors"
              disabled={isTyping}
            />
            <button
              onClick={() => handleSendMessage(inputMessage)}
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 w-24" // Fixed width button
            >
              {isTyping ? (
                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveShadowDialogue;
