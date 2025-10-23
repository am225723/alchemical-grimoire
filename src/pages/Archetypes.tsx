import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Shield, Heart, Flame, Scale, Zap, X, Sparkles, ChevronRight } from 'lucide-react';

interface Archetype {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  shadow: string;
  lightSide: string;
  questions: string[];
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  glowColor: string;
}

const shadowArchetypes: Archetype[] = [
  {
    id: 'tyrant',
    name: 'The Tyrant',
    subtitle: 'Power and Control Shadow',
    description: 'The Tyrant archetype manifests when we seek to dominate and control others or situations. This shadow emerges from a deep fear of powerlessness and vulnerability.',
    shadow: 'Controlling behavior, authoritarianism, manipulation, need to dominate, fear of losing control, inability to trust others, rigid rules and expectations.',
    lightSide: 'Strong leadership, healthy boundaries, decisive action, protective instincts, ability to take charge when needed, sovereignty over one\'s own life.',
    questions: [
      'Where in my life do I try to control others or situations?',
      'What am I afraid will happen if I let go of control?',
      'How can I lead without dominating?'
    ],
    icon: Crown,
    gradient: 'from-red-600 via-orange-600 to-red-700',
    glowColor: 'shadow-[0_0_30px_rgba(220,38,38,0.6)]'
  },
  {
    id: 'victim',
    name: 'The Victim',
    subtitle: 'Helplessness and External Control',
    description: 'The Victim archetype appears when we believe we have no power over our circumstances and that external forces control our destiny.',
    shadow: 'Learned helplessness, blaming others, refusing responsibility, feeling powerless, seeking rescue, chronic complaining, inability to act.',
    lightSide: 'Healthy vulnerability, asking for help when needed, recognizing genuine injustice, compassion for suffering, ability to receive support.',
    questions: [
      'Where do I give away my power to others or circumstances?',
      'What would change if I took full responsibility for my life?',
      'How can I ask for help without becoming helpless?'
    ],
    icon: Shield,
    gradient: 'from-blue-600 via-indigo-600 to-blue-700',
    glowColor: 'shadow-[0_0_30px_rgba(37,99,235,0.6)]'
  },
  {
    id: 'martyr',
    name: 'The Martyr',
    subtitle: 'Self-Sacrifice for Recognition',
    description: 'The Martyr archetype emerges when we sacrifice ourselves for others not out of genuine love, but to gain recognition, sympathy, or moral superiority.',
    shadow: 'Codependency, self-neglect for praise, guilt manipulation, playing the hero, refusing self-care, resentment under the surface, inability to receive.',
    lightSide: 'Genuine service, healthy sacrifice for loved ones, empathy and care, dedication to a cause, ability to put others first when appropriate.',
    questions: [
      'Where do I sacrifice myself to feel needed or valued?',
      'What would I lose if I stopped taking care of everyone else?',
      'How can I serve others without abandoning myself?'
    ],
    icon: Heart,
    gradient: 'from-pink-600 via-rose-600 to-pink-700',
    glowColor: 'shadow-[0_0_30px_rgba(219,39,119,0.6)]'
  },
  {
    id: 'saboteur',
    name: 'The Saboteur',
    subtitle: 'Self-Undermining Patterns',
    description: 'The Saboteur archetype works against our own success and happiness, often unconsciously undermining our efforts right when we\'re about to achieve our goals.',
    shadow: 'Self-destructive behavior, procrastination, fear of success, imposter syndrome, last-minute failures, unconscious self-betrayal, addiction patterns.',
    lightSide: 'Healthy skepticism, risk awareness, ability to question plans, protective instinct, recognizing genuine threats to wellbeing.',
    questions: [
      'Where do I undermine my own success or happiness?',
      'What am I afraid would happen if I fully succeeded?',
      'How can I protect myself without destroying my dreams?'
    ],
    icon: Flame,
    gradient: 'from-purple-600 via-violet-600 to-purple-700',
    glowColor: 'shadow-[0_0_30px_rgba(126,34,206,0.6)]'
  },
  {
    id: 'judge',
    name: 'The Judge',
    subtitle: 'Criticism and Separation',
    description: 'The Judge archetype manifests as harsh criticism of ourselves and others, creating separation and preventing genuine connection and self-acceptance.',
    shadow: 'Harsh self-criticism, condemning others, perfectionism, black-and-white thinking, inability to forgive, superiority complex, constant evaluation.',
    lightSide: 'Discernment, healthy standards, ability to evaluate situations, wisdom, moral compass, capacity for constructive feedback.',
    questions: [
      'Where am I harshest on myself or others?',
      'What would it mean to accept imperfection?',
      'How can I discern without condemning?'
    ],
    icon: Scale,
    gradient: 'from-amber-600 via-yellow-600 to-amber-700',
    glowColor: 'shadow-[0_0_30px_rgba(245,158,11,0.6)]'
  },
  {
    id: 'rebel',
    name: 'The Rebel',
    subtitle: 'Authority Rejection',
    description: 'The Rebel archetype appears when we automatically resist authority, rules, and structure, often sabotaging ourselves in the name of freedom.',
    shadow: 'Automatic opposition, destructive rebellion, inability to commit, rejecting all authority, chaos creation, contrarian for its own sake, fear of conformity.',
    lightSide: 'Healthy autonomy, challenging injustice, creative innovation, standing up for beliefs, breaking harmful patterns, genuine individuality.',
    questions: [
      'Where do I rebel just to rebel, not for a genuine cause?',
      'What am I really fighting against?',
      'How can I be free without destroying structure?'
    ],
    icon: Zap,
    gradient: 'from-cyan-600 via-teal-600 to-cyan-700',
    glowColor: 'shadow-[0_0_30px_rgba(6,182,212,0.6)]'
  }
];

const Archetypes: React.FC = () => {
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 glass-card px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-slate-300">Shadow Work Integration</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">The Six Shadow</span>
            <br />
            <span className="text-slate-100">Archetypes</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            These universal patterns dwell in the unconscious, shaping our behaviors and reactions.
            By recognizing and integrating them, we reclaim our power and wholeness.
          </p>
        </motion.div>

        {/* Archetype Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {shadowArchetypes.map((archetype, index) => {
            const IconComponent = archetype.icon;
            return (
              <motion.div
                key={archetype.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(archetype.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedArchetype(archetype)}
                className="group cursor-pointer"
              >
                <div className={`relative glass-card p-8 h-full overflow-hidden transition-all duration-500 ${
                  hoveredId === archetype.id ? archetype.glowColor : ''
                }`}>
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${archetype.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${archetype.gradient} p-4 mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-white transition-colors">
                      {archetype.name}
                    </h3>
                    <p className="text-sm font-semibold text-purple-400 mb-4">
                      {archetype.subtitle}
                    </p>
                    <p className="text-slate-300 leading-relaxed mb-6 line-clamp-3">
                      {archetype.description}
                    </p>
                    
                    {/* Click to Explore */}
                    <div className="flex items-center text-ocean-400 font-semibold group-hover:text-purple-400 transition-colors">
                      <span>Explore Shadow</span>
                      <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${archetype.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Integration Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-8 md:p-12 bg-gradient-to-br from-purple-900/20 to-ocean-900/20"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">The Path of Integration</h2>
          <div className="grid md:grid-cols-2 gap-8 text-slate-300">
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Recognize</h3>
              <p className="leading-relaxed">
                Notice when these patterns arise in your life. Awareness is the first step toward transformation.
                Each archetype serves a purpose, even in shadow.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Accept</h3>
              <p className="leading-relaxed">
                Welcome these parts of yourself without judgment. They emerged to protect you, 
                even if they no longer serve your highest good.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Integrate</h3>
              <p className="leading-relaxed">
                Transform shadow into light by claiming the archetype's positive aspects. 
                The Tyrant becomes a sovereign leader. The Victim reclaims their power.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Embody</h3>
              <p className="leading-relaxed">
                Live from your integrated wholeness. Each archetype, when balanced, 
                becomes a source of strength and wisdom on your journey.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Jung Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 glass-card p-8 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-xl md:text-2xl text-slate-200 italic mb-4 leading-relaxed">
              "One does not become enlightened by imagining figures of light, 
              but by making the darkness conscious."
            </p>
            <p className="text-slate-400 font-semibold">— Carl Jung</p>
          </div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-ocean-500/20 rounded-full blur-3xl"></div>
        </motion.div>
      </div>

      {/* Archetype Detail Modal */}
      <AnimatePresence>
        {selectedArchetype && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedArchetype(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="glass-card max-w-4xl w-full my-8 p-8 md:p-12 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArchetype(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Icon Header */}
              <div className="flex items-start space-x-6 mb-8">
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${selectedArchetype.gradient} p-5 flex-shrink-0`}>
                  <selectedArchetype.icon className="w-full h-full text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-slate-100 mb-2">
                    {selectedArchetype.name}
                  </h2>
                  <p className={`text-lg font-semibold bg-gradient-to-r ${selectedArchetype.gradient} bg-clip-text text-transparent`}>
                    {selectedArchetype.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {selectedArchetype.description}
              </p>

              {/* Shadow & Light Sides */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="glass-card p-6 bg-red-900/10 border-red-500/30">
                  <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center">
                    <Flame className="w-5 h-5 mr-2" />
                    Shadow Aspects
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedArchetype.shadow}
                  </p>
                </div>
                
                <div className="glass-card p-6 bg-green-900/10 border-green-500/30">
                  <h3 className="text-xl font-bold text-green-400 mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Integrated Light
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedArchetype.lightSide}
                  </p>
                </div>
              </div>

              {/* Integration Questions */}
              <div className="glass-card p-6 bg-purple-900/10 border-purple-500/30">
                <h3 className="text-xl font-bold text-purple-400 mb-4">
                  Questions for Self-Reflection
                </h3>
                <ul className="space-y-3">
                  {selectedArchetype.questions.map((question, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setSelectedArchetype(null)}
                  className={`btn-primary bg-gradient-to-r ${selectedArchetype.gradient}`}
                >
                  Begin Integration Work
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Archetypes;
