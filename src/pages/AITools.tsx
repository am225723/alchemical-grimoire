import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Bot, Scale, BookOpen, Brain } from 'lucide-react';
import DailyJournalAnalyzer from '../components/ai/DailyJournalAnalyzer';
import DynamicTriggerAnalyzer from '../components/ai/DynamicTriggerAnalyzer';
import { VictimActivityAI } from '../components/archetypes/VictimActivityAI';
import { SaboteurActivityAI } from '../components/archetypes/SaboteurActivityAI';
import { JudgeActivityAI } from '../components/archetypes/JudgeActivityAI';

type AITool = 'journal' | 'trigger' | 'socratic' | 'saboteur' | 'judgment';

export default function AITools() {
  const [selectedTool, setSelectedTool] = useState<AITool>('journal');

  const tools = [
    {
      id: 'journal' as AITool,
      name: 'Daily Journal Analyzer',
      description: 'AI-powered analysis that auto-updates your Inner Council',
      icon: BookOpen,
      color: 'from-purple-500 to-cyan-500',
      component: DailyJournalAnalyzer
    },
    {
      id: 'trigger' as AITool,
      name: 'Dynamic Trigger Analyzer',
      description: 'NLP text analysis to identify active shadow archetypes',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      component: DynamicTriggerAnalyzer
    },
    {
      id: 'socratic' as AITool,
      name: 'Socratic Reframe Coach',
      description: 'AI chatbot guides you from victim to victor thinking',
      icon: Bot,
      color: 'from-cyan-500 to-blue-500',
      component: VictimActivityAI
    },
    {
      id: 'saboteur' as AITool,
      name: 'Saboteur Interview',
      description: 'AI role-plays as your protective Saboteur',
      icon: Bot,
      color: 'from-orange-500 to-pink-500',
      component: SaboteurActivityAI
    },
    {
      id: 'judgment' as AITool,
      name: 'Judgment De-Coder',
      description: 'AI translates harsh judgments into core values',
      icon: Scale,
      color: 'from-yellow-500 to-orange-500',
      component: JudgeActivityAI
    }
  ];

  const selectedToolData = tools.find(t => t.id === selectedTool);
  const SelectedComponent = selectedToolData?.component;

  return (
    <div className="min-h-screen pt-28 px-4 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full mb-6">
            <Brain className="w-12 h-12 text-purple-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              AI-Powered Shadow Work
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Advanced AI features powered by OpenAI and Perplexity to deepen your self-discovery journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tool Selection Sidebar */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              AI Tools
            </h2>
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isSelected = selectedTool === tool.id;
              
              return (
                <motion.button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    isSelected
                      ? `bg-gradient-to-r ${tool.color} shadow-lg`
                      : 'glass-card hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                    <div className="flex-1">
                      <div className={`font-semibold mb-1 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                        {tool.name}
                      </div>
                      <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                        {tool.description}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={selectedTool}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {SelectedComponent && <SelectedComponent />}
            </motion.div>
          </div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            About These AI Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <p className="mb-2"><span className="text-cyan-400 font-semibold">OpenAI GPT-5:</span> Powers conversational AI features (Socratic Coach, Saboteur Interview, Judgment De-Coder)</p>
              <p><span className="text-purple-400 font-semibold">Perplexity:</span> Powers NLP analysis features (Journal Analyzer, Trigger Analyzer)</p>
            </div>
            <div>
              <p className="mb-2"><span className="text-green-400 font-semibold">Privacy:</span> All conversations and analyses are stored locally in your browser</p>
              <p><span className="text-yellow-400 font-semibold">Auto-Sync:</span> Journal analysis automatically updates your Inner Council Dashboard</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
