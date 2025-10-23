import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Brain, Sparkles, Moon, Sun, Eye, Zap, Play, Pause, RotateCw, Download, Share2, Volume2 } from 'lucide-react';
import { useAIService } from '../../services/aiService';

interface IntegrationPhase {
  id: string;
  name: string;
  description: string;
  duration: number;
  visualTheme: 'darkness' | 'twilight' | 'dawn' | 'daylight';
  exercises: IntegrationExercise[];
  musicUrl?: string;
  visualizationType: 'breathing' | 'mandala' | 'journey' | 'mirror';
}

interface IntegrationExercise {
  id: string;
  title: string;
  instruction: string;
  duration: number;
  type: 'breathing' | 'visualization' | 'affirmation' | 'reflection' | 'dialogue';
  prompts?: string[];
}

interface ImmersiveShadowIntegrationProps {
  onClose?: () => void;
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
}

const ImmersiveShadowIntegration: React.FC<ImmersiveShadowIntegrationProps> = ({
  onClose,
  userLevel = 'intermediate'
}) => {
  const [currentPhase, setCurrentPhase] = useState<IntegrationPhase | null>(null);
  const [currentExercise, setCurrentExercise] = useState<IntegrationExercise | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<string[]>([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [showJournal, setShowJournal] = useState(false);

  const integrationPhases: IntegrationPhase[] = [
    {
      id: 'encounter',
      name: 'Shadow Encounter',
      description: 'Gently meet and acknowledge your shadow aspects without judgment',
      duration: 15,
      visualTheme: 'darkness',
      visualizationType: 'breathing',
      exercises: [
        {
          id: 'grounding',
          title: 'Grounding Breath',
          instruction: 'Breathe deeply into your belly, feeling your connection to the earth',
          duration: 3,
          type: 'breathing'
        },
        {
          id: 'invitation',
          title: 'Shadow Invitation',
          instruction: 'Silently invite your shadow aspects to make themselves known',
          duration: 5,
          type: 'dialogue',
          prompts: ['What parts of myself do I usually hide?', 'What emotions do I avoid feeling?']
        },
        {
          id: 'acknowledgment',
          title: 'Loving Acknowledgment',
          instruction: 'Acknowledge each shadow aspect with love and acceptance',
          duration: 7,
          type: 'affirmation'
        }
      ]
    },
    {
      id: 'dialogue',
      name: 'Sacred Dialogue',
      description: 'Engage in meaningful conversation with your shadow aspects',
      duration: 20,
      visualTheme: 'twilight',
      visualizationType: 'mirror',
      exercises: [
        {
          id: 'listening',
          title: 'Deep Listening',
          instruction: 'Listen to what your shadow wants to tell you',
          duration: 8,
          type: 'reflection',
          prompts: ['What do you need from me?', 'What wisdom do you hold?']
        },
        {
          id: 'understanding',
          title: 'Mutual Understanding',
          instruction: 'Seek to understand the purpose and protection your shadow offers',
          duration: 7,
          type: 'dialogue'
        },
        {
          id: 'gratitude',
          title: 'Gratitude Exchange',
          instruction: 'Express gratitude for your shadow\'s protection and wisdom',
          duration: 5,
          type: 'affirmation'
        }
      ]
    },
    {
      id: 'integration',
      name: 'Sacred Integration',
      description: 'Weave shadow aspects into your conscious self with love and wisdom',
      duration: 25,
      visualTheme: 'dawn',
      visualizationType: 'journey',
      exercises: [
        {
          id: 'weaving',
          title: 'Energy Weaving',
          instruction: 'Visualize weaving shadow and light together in your heart center',
          duration: 10,
          type: 'visualization'
        },
        {
          id: 'harmonizing',
          title: 'Harmonization',
          instruction: 'Feel all aspects of yourself coming into harmony',
          duration: 10,
          type: 'breathing'
        },
        {
          id: 'embodiment',
          title: 'Embodied Integration',
          instruction: 'Feel the integrated self throughout your entire being',
          duration: 5,
          type: 'reflection'
        }
      ]
    },
    {
      id: 'emergence',
      name: 'Radiant Emergence',
      description: 'Step forward as your whole, integrated self with renewed wisdom and power',
      duration: 10,
      visualTheme: 'daylight',
      visualizationType: 'mandala',
      exercises: [
        {
          id: 'radiance',
          title: 'Inner Radiance',
          instruction: 'Feel your authentic light shining from within',
          duration: 5,
          type: 'visualization'
        },
        {
          id: 'commitment',
          title: 'Sacred Commitment',
          instruction: 'Commit to living from this integrated state',
          duration: 5,
          type: 'affirmation'
        }
      ]
    }
  ];

  useEffect(() => {
    if (currentPhase && !currentExercise) {
      setCurrentExercise(currentPhase.exercises[0]);
    }
  }, [currentPhase]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleExerciseComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  const startPhase = (phase: IntegrationPhase) => {
    setCurrentPhase(phase);
    setCurrentExercise(phase.exercises[0]);
    setTimeRemaining(phase.exercises[0].duration * 60);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleExerciseComplete = () => {
    if (!currentPhase || !currentExercise) return;

    const currentIndex = currentPhase.exercises.findIndex(ex => ex.id === currentExercise.id);
    if (currentIndex < currentPhase.exercises.length - 1) {
      // Move to next exercise
      const nextExercise = currentPhase.exercises[currentIndex + 1];
      setCurrentExercise(nextExercise);
      setTimeRemaining(nextExercise.duration * 60);
      setIsPlaying(false);
    } else {
      // Complete phase
      setCompletedPhases(prev => [...prev, currentPhase.id]);
      setIsPlaying(false);
      setShowJournal(true);
    }
  };

  const getThemeGradient = (theme: string) => {
    switch (theme) {
      case 'darkness': return 'from-gray-900 via-purple-900 to-black';
      case 'twilight': return 'from-purple-900 via-blue-900 to-indigo-900';
      case 'dawn': return 'from-indigo-900 via-purple-600 to-pink-600';
      case 'daylight': return 'from-purple-600 via-pink-500 to-yellow-400';
      default: return 'from-purple-900 via-black to-blue-900';
    }
  };

  const getExerciseIcon = (type: string) => {
    switch (type) {
      case 'breathing': return <Heart className="w-5 h-5" />;
      case 'visualization': return <Eye className="w-5 h-5" />;
      case 'affirmation': return <Sparkles className="w-5 h-5" />;
      case 'reflection': return <Brain className="w-5 h-5" />;
      case 'dialogue': return <Volume2 className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const saveJournalEntry = () => {
    if (journalEntry.trim()) {
      const entry = {
        date: new Date().toISOString(),
        phase: currentPhase?.name,
        entry: journalEntry
      };
      
      const savedEntries = JSON.parse(localStorage.getItem('shadowIntegrationJournal') || '[]');
      savedEntries.push(entry);
      localStorage.setItem('shadowIntegrationJournal', JSON.stringify(savedEntries));
      
      setJournalEntry('');
      setShowJournal(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentPhase ? getThemeGradient(currentPhase.visualTheme) : 'from-purple-900 via-black to-blue-900'} p-4 transition-all duration-1000`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass-card rounded-t-2xl p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <RotateCw className="w-5 h-5 text-gray-300 rotate-180" />
                </button>
              )}
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Immersive Shadow Integration</h2>
                  <p className="text-gray-400 text-sm">A sacred journey of wholeness and self-acceptance</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  isAudioEnabled ? 'bg-purple-600/50 text-purple-300' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {!currentPhase ? (
          /* Phase Selection */
          <div className="glass-card min-h-[500px] rounded-2xl p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">Choose Your Integration Journey</h3>
                <p className="text-gray-300 text-lg">Each phase guides you through a different aspect of shadow integration</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {integrationPhases.map((phase, index) => (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className={`glass-card rounded-xl p-6 border-2 cursor-pointer transition-all hover:border-purple-400/50 ${
                      completedPhases.includes(phase.id) ? 'border-green-400/30 bg-green-400/5' : 'border-white/10'
                    }`}
                    onClick={() => startPhase(phase)}
                    >
                      {completedPhases.includes(phase.id) && (
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-green-400" />
                        </div>
                      )}

                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getThemeGradient(phase.visualTheme)} flex items-center justify-center`}>
                          {phase.visualTheme === 'darkness' && <Moon className="w-6 h-6 text-white" />}
                          {phase.visualTheme === 'twilight' && <Eye className="w-6 h-6 text-white" />}
                          {phase.visualTheme === 'dawn' && <Sun className="w-6 h-6 text-white" />}
                          {phase.visualTheme === 'daylight' && <Sparkles className="w-6 h-6 text-white" />}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-white">{phase.name}</h4>
                          <p className="text-gray-400 text-sm">{phase.duration} minutes</p>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4">{phase.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {phase.exercises.map((_, i) => (
                              <div key={i} className="w-2 h-2 rounded-full bg-purple-400/30"></div>
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">{phase.exercises.length} exercises</span>
                        </div>
                        <button className="px-4 py-2 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-400/30 hover:bg-purple-600/50 transition-colors">
                          Begin
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {completedPhases.length > 0 && (
                <div className="text-center">
                  <p className="text-gray-400 mb-4">Completed phases: {completedPhases.length}/{integrationPhases.length}</p>
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                    Start Full Journey
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Active Session */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Exercise Area */}
            <div className="lg:col-span-2">
              <div className="glass-card h-[600px] rounded-2xl p-8 relative overflow-hidden">
                {/* Visualization Background */}
                <div className="absolute inset-0 opacity-20">
                  {currentPhase.visualizationType === 'breathing' && (
                    <div className="flex items-center justify-center h-full">
                      <div className={`w-32 h-32 rounded-full border-4 border-purple-400 ${isPlaying ? 'animate-pulse' : ''}`}></div>
                    </div>
                  )}
                  {currentPhase.visualizationType === 'mandala' && (
                    <div className="flex items-center justify-center h-full">
                      <div className={`w-48 h-48 rounded-full border-4 border-purple-400 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '20s' }}>
                        <div className="w-full h-full rounded-full border-4 border-pink-400 absolute top-0 left-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                      </div>
                    </div>
                  )}
                  {currentPhase.visualizationType === 'mirror' && (
                    <div className="flex items-center justify-center h-full">
                      <div className={`w-40 h-40 rounded-lg border-4 border-blue-400 ${isPlaying ? 'animate-pulse' : ''}`}></div>
                    </div>
                  )}
                  {currentPhase.visualizationType === 'journey' && (
                    <div className="flex items-center justify-center h-full">
                      <div className={`w-36 h-36 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 ${isPlaying ? 'animate-bounce' : ''}`}></div>
                    </div>
                  )}
                </div>

                {/* Exercise Content */}
                <div className="relative z-10 text-center">
                  <div className="mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                      {getExerciseIcon(currentExercise.type)}
                      <h3 className="text-2xl font-bold text-white">{currentExercise.title}</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-8">{currentExercise.instruction}</p>
                  </div>

                  {/* Prompts */}
                  {currentExercise.prompts && (
                    <div className="mb-8 space-y-3">
                      {currentExercise.prompts.map((prompt, index) => (
                        <div key={index} className="inline-block p-3 rounded-lg bg-white/10 border border-white/20">
                          <p className="text-gray-200 italic">"{prompt}"</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Timer */}
                  <div className="mb-8">
                    <div className="text-6xl font-bold text-white mb-2">{formatTime(timeRemaining)}</div>
                    <div className="w-64 h-2 mx-auto bg-white/10 rounded-full">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${((currentExercise.duration * 60 - timeRemaining) / (currentExercise.duration * 60)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={togglePlayPause}
                      className="p-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPhase(null);
                        setCurrentExercise(null);
                        setIsPlaying(false);
                      }}
                      className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      Exit Session
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Phase Progress */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Session Progress</h3>
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">{currentPhase.name}</p>
                  <div className="flex items-center space-x-2">
                    {currentPhase.exercises.map((exercise, index) => (
                      <div
                        key={exercise.id}
                        className={`flex-1 h-2 rounded-full ${
                          exercise.id === currentExercise.id
                            ? 'bg-purple-400'
                            : currentPhase.exercises.indexOf(currentExercise) > index
                            ? 'bg-green-400'
                            : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  {currentPhase.exercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      className={`flex items-center space-x-3 p-2 rounded-lg ${
                        exercise.id === currentExercise.id
                          ? 'bg-purple-600/30'
                          : currentPhase.exercises.indexOf(currentExercise) > index
                          ? 'bg-green-400/10'
                          : 'bg-white/5'
                      }`}
                    >
                      {getExerciseIcon(exercise.type)}
                      <div className="flex-1">
                        <p className="text-white text-sm">{exercise.title}</p>
                        <p className="text-gray-400 text-xs">{exercise.duration} min</p>
                      </div>
                      {currentPhase.exercises.indexOf(currentExercise) > index && (
                        <Sparkles className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Integration Tips</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Heart className="w-4 h-4 text-pink-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">Approach with curiosity and compassion</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Brain className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">Notice resistance without judgment</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Eye className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">Trust your inner wisdom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Journal Modal */}
        <AnimatePresence>
          {showJournal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowJournal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card rounded-2xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Integration Reflection</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Take a moment to reflect on your experience in the {currentPhase?.name} phase
                </p>
                <textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="What did you discover? How are you feeling? What insights emerged?"
                  className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-purple-400 min-h-[120px] mb-4"
                />
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowJournal(false)}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Skip
                  </button>
                  <button
                    onClick={saveJournalEntry}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Save Reflection
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImmersiveShadowIntegration;