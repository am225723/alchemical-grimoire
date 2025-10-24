import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Zap, ThumbsDown, ThumbsUp, RotateCcw } from 'lucide-react';

interface Scenario {
  id: string;
  text: string;
  reactiveNo: string;
  authenticNo: string;
}

const scenarios: Scenario[] = [
  {
    id: '1',
    text: 'Your doctor tells you to eat healthier',
    reactiveNo: 'You can\'t tell me what to do! I\'ll eat what I want.',
    authenticNo: 'I will not follow this specific diet, but I will find a healthy-eating path that feels authentic to me.'
  },
  {
    id: '2',
    text: 'Your partner asks you to move in together',
    reactiveNo: 'I feel trapped! I have to get out! (starts a fight)',
    authenticNo: 'I value this relationship, but I need to be honest that I\'m not ready for that step because I value my own space.'
  },
  {
    id: '3',
    text: 'Your boss sets a new deadline for a project',
    reactiveNo: 'They\'re always controlling me. I\'ll miss it on purpose to prove a point.',
    authenticNo: 'I disagree with this timeline. Let me propose an alternative that works better.'
  },
  {
    id: '4',
    text: 'A friend suggests you should quit your toxic job',
    reactiveNo: 'Don\'t tell me what to do with my life!',
    authenticNo: 'I appreciate your concern. I\'m working through this at my own pace.'
  },
  {
    id: '5',
    text: 'Your therapist recommends a daily meditation practice',
    reactiveNo: 'I\'m not going to be one of those meditation people. That\'s not me.',
    authenticNo: 'Traditional meditation doesn\'t resonate with me, but I\'m open to finding my own mindfulness practice.'
  },
  {
    id: '6',
    text: 'Your family expects you to attend a holiday gathering',
    reactiveNo: 'They can\'t force me. I\'m not going just to spite them.',
    authenticNo: 'I love you, but I need to skip this year to prioritize my mental health.'
  },
  {
    id: '7',
    text: 'Someone suggests you should save more money',
    reactiveNo: 'I\'ll spend my money however I want. You\'re not my parent.',
    authenticNo: 'I hear you, and I\'m working on my financial goals in a way that feels right for me.'
  },
  {
    id: '8',
    text: 'Your company implements a new mandatory policy',
    reactiveNo: 'This is ridiculous. I\'m going to ignore it and see what happens.',
    authenticNo: 'I have concerns about this policy. Let me bring them to the appropriate channels.'
  }
];

export function RebelActivity() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<{ [key: string]: 'reactive' | 'authentic' }>(() => {
    const saved = localStorage.getItem('rebel-results');
    return saved ? JSON.parse(saved) as { [key: string]: 'reactive' | 'authentic' } : {};
  });
  const [showFeedback, setShowFeedback] = useState<'reactive' | 'authentic' | null>(null);

  const currentScenario = scenarios[currentIndex];
  const totalScenarios = scenarios.length;
  const answeredCount = Object.keys(results).length;

  const handleSwipe = (direction: 'left' | 'right') => {
    const choice: 'reactive' | 'authentic' = direction === 'left' ? 'reactive' : 'authentic';
    
    const updated = { ...results, [currentScenario.id]: choice };
    setResults(updated);
    localStorage.setItem('rebel-results', JSON.stringify(updated));
    
    setShowFeedback(choice);
    
    setTimeout(() => {
      setShowFeedback(null);
      if (currentIndex < scenarios.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 2000);
  };

  const reset = () => {
    setResults({});
    setCurrentIndex(0);
    setShowFeedback(null);
    localStorage.removeItem('rebel-results');
  };

  const reactiveCount = Object.values(results).filter(r => r === 'reactive').length;
  const authenticCount = Object.values(results).filter(r => r === 'authentic').length;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg border border-red-500/30">
        <Zap className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <p className="font-semibold text-white mb-1">Reactive vs. Authentic "No"</p>
          <p>Swipe left for reactive (shadow), right for authentic (gold). Learn the difference between self-sabotage and true autonomy.</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-400">
          Scenario {Math.min(currentIndex + 1, totalScenarios)} of {totalScenarios}
        </p>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-3 py-1 text-gray-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-red-500 to-orange-500"
          initial={{ width: 0 }}
          animate={{ width: `${(answeredCount / totalScenarios) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Swipe Card */}
      {currentIndex < scenarios.length && (
        <div className="relative h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!showFeedback && (
              <motion.div
                key={currentScenario.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info: PanInfo) => {
                  if (info.offset.x < -100) handleSwipe('left');
                  if (info.offset.x > 100) handleSwipe('right');
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute w-full max-w-md"
              >
                <div className="glass-card p-8 cursor-grab active:cursor-grabbing">
                  <div className="text-center mb-8">
                    <Zap className="w-12 h-12 mx-auto mb-4 text-red-400" />
                    <h3 className="text-xl font-bold text-white mb-4">
                      {currentScenario.text}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Swipe or tap to choose your response
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSwipe('left')}
                      className="p-4 bg-red-500/20 border-2 border-red-500 rounded-lg hover:bg-red-500/30 transition-all"
                    >
                      <ThumbsDown className="w-6 h-6 mx-auto mb-2 text-red-400" />
                      <p className="text-xs text-red-300 font-semibold">Reactive No</p>
                      <p className="text-xs text-gray-400 mt-1">(Shadow)</p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSwipe('right')}
                      className="p-4 bg-green-500/20 border-2 border-green-500 rounded-lg hover:bg-green-500/30 transition-all"
                    >
                      <ThumbsUp className="w-6 h-6 mx-auto mb-2 text-green-400" />
                      <p className="text-xs text-green-300 font-semibold">Authentic No</p>
                      <p className="text-xs text-gray-400 mt-1">(Gold)</p>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {showFeedback && (
              <motion.div
                key="feedback"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute w-full max-w-md"
              >
                <div className={`glass-card p-8 border-2 ${
                  showFeedback === 'reactive' 
                    ? 'border-red-500 bg-red-500/10' 
                    : 'border-green-500 bg-green-500/10'
                }`}>
                  <div className="text-center mb-6">
                    {showFeedback === 'reactive' ? (
                      <>
                        <ThumbsDown className="w-12 h-12 mx-auto mb-4 text-red-400" />
                        <h3 className="text-lg font-bold text-red-400 mb-2">Shadow Rebel (Self-Sabotage)</h3>
                        <p className="text-sm text-gray-300 italic">
                          "{currentScenario.reactiveNo}"
                        </p>
                      </>
                    ) : (
                      <>
                        <ThumbsUp className="w-12 h-12 mx-auto mb-4 text-green-400" />
                        <h3 className="text-lg font-bold text-green-400 mb-2">Golden Rebel (Autonomy)</h3>
                        <p className="text-sm text-gray-300 italic">
                          "{currentScenario.authenticNo}"
                        </p>
                      </>
                    )}
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-xs text-gray-400">
                      {showFeedback === 'reactive' 
                        ? '⚠️ This is reactive defiance—you\'re saying no just because you feel controlled, which often harms you more than anyone else.'
                        : '✨ This is authentic autonomy—you\'re honoring your truth while staying in integrity with yourself and others.'
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Results Summary */}
      {currentIndex >= scenarios.length && !showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 border-l-4 border-red-500"
        >
          <h3 className="text-2xl font-bold text-white mb-4">🎯 Your Rebel Profile</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <p className="text-3xl font-bold text-red-400 mb-1">{reactiveCount}</p>
              <p className="text-sm text-gray-400">Reactive Responses</p>
              <p className="text-xs text-gray-500 mt-1">(Shadow Rebel)</p>
            </div>
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <p className="text-3xl font-bold text-green-400 mb-1">{authenticCount}</p>
              <p className="text-sm text-gray-400">Authentic Responses</p>
              <p className="text-xs text-gray-500 mt-1">(Golden Rebel)</p>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg mb-4">
            <p className="text-sm text-gray-300">
              {reactiveCount > authenticCount 
                ? '🔥 You have a strong Shadow Rebel pattern. You often say "no" as a reaction to feeling controlled, which can be self-sabotaging. Practice pausing before reacting.'
                : '✨ You\'re accessing your Golden Rebel! You can set boundaries authentically without reactive defiance. This is true freedom.'
              }
            </p>
          </div>

          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all"
          >
            Retake Assessment
          </button>
        </motion.div>
      )}
    </div>
  );
}
