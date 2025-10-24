import React, { useState } from 'react'; // Removed unused useEffect
import { motion } from 'framer-motion'; // Removed unused AnimatePresence
import { Heart, Brain, Users, Lightbulb, Target, Award, TrendingUp, Star, ChevronRight, Sparkles } from 'lucide-react'; // Ensure lucide-react is installed
interface AuthenticityScore {
  overall: number;
  emotional: number;
  behavioral: number;
  cognitive: number;
  social: number;
  strengths: string[];
  growthAreas: string[];
  insights: string[];
}

interface Question {
  id: string;
  category: 'emotional' | 'behavioral' | 'cognitive' | 'social';
  question: string;
  type: 'scale' | 'choice' | 'text';
  options?: string[];
  weight: number;
}

interface AuthenticSelfDiscoveryProps {
  onClose?: () => void;
}

const AuthenticSelfDiscovery: React.FC<AuthenticSelfDiscoveryProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'assessment' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [authenticityScore, setAuthenticityScore] = useState<AuthenticityScore | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const questions: Question[] = [
    {
      id: 'emotional_1',
      category: 'emotional',
      question: 'How often do you express your true feelings, even when they might make others uncomfortable?',
      type: 'scale',
      weight: 1.0
    },
    {
      id: 'behavioral_1',
      category: 'behavioral',
      question: 'When you make decisions, how often do you choose what feels right for you versus what others expect?',
      type: 'scale',
      weight: 1.0
    },
    {
      id: 'cognitive_1',
      category: 'cognitive',
      question: 'How aligned are your daily actions with your deeply held values?',
      type: 'scale',
      weight: 1.0
    },
    {
      id: 'social_1',
      category: 'social',
      question: 'In social situations, how often do you find yourself masking your true personality?',
      type: 'scale',
      weight: 1.0
    },
    {
      id: 'emotional_2',
      category: 'emotional',
      question: 'What type of emotional expression feels most natural to you?',
      type: 'choice',
      options: ['Verbal sharing', 'Creative expression', 'Physical activity', 'Quiet reflection'],
      weight: 0.8
    },
    {
      id: 'behavioral_2',
      category: 'behavioral',
      question: 'Describe a recent situation where you acted completely true to yourself',
      type: 'text',
      weight: 1.2
    },
    {
      id: 'cognitive_2',
      category: 'cognitive',
      question: 'How often do you question your own beliefs and assumptions?',
      type: 'scale',
      weight: 1.0
    },
    {
      id: 'social_2',
      category: 'social',
      question: 'Which social environment brings out your most authentic self?',
      type: 'choice',
      options: ['One-on-one conversations', 'Small groups', 'Large gatherings', 'Solo time'],
      weight: 0.8
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleResponse = (value: any) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitAssessment = async () => {
    setIsAnalyzing(true);
    try {
      // Corrected: Pass responses as the first argument, which aiService expects as any[] based on error TS2345
      // This might need adjustment in aiService.ts if responses shouldn't be an array
      const score = await aiService.assessAuthenticity(
        Object.values(responses), // Pass values as an array
        [], // behaviors data would come from user tracking
        ['authenticity', 'self-expression', 'vulnerability', 'integrity'] // sample values
      );
      setAuthenticityScore(score);
      setCurrentStep('results');
    } catch (error) {
      console.error('Error assessing authenticity:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };


  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'emotional': return <Heart className="w-5 h-5" />;
      case 'behavioral': return <Target className="w-5 h-5" />;
      case 'cognitive': return <Brain className="w-5 h-5" />;
      case 'social': return <Users className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emotional': return 'text-pink-400 bg-pink-400/20 border-pink-400/30';
      case 'behavioral': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'cognitive': return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
      case 'social': return 'text-green-400 bg-green-400/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Highly Authentic';
    if (score >= 60) return 'Moderately Authentic';
    if (score >= 40) return 'Developing Authenticity';
    return 'Exploring Authenticity';
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-card rounded-t-2xl p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-300 rotate-180" />
                </button>
              )}
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Authentic Self Discovery</h2>
                  <p className="text-gray-400 text-sm">Uncover your true nature and living authentically</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-400">AI-Guided Assessment</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="glass-card min-h-[500px]">
          {currentStep === 'intro' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Discover Your Authentic Self</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    This journey will help you explore the depths of your authentic nature.
                    Through thoughtful questions and AI-powered insights, you'll gain clarity
                    on how aligned you are with your true self.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {['emotional', 'behavioral', 'cognitive', 'social'].map((category) => (
                    <div key={category} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className={`inline-flex p-2 rounded-lg mb-2 ${getCategoryColor(category)}`}>
                        {getCategoryIcon(category)}
                      </div>
                      <p className="text-white font-medium capitalize">{category}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center space-x-8 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-purple-400" />
                      <span>{questions.length} Questions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span>Personalized Insights</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      <span>Growth Recommendations</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep('assessment')}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
                >
                  Begin Discovery Journey
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'assessment' && (
            <div className="p-8">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span className="text-sm text-gray-400">{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${getCategoryColor(currentQuestion.category)}`}>
                    {getCategoryIcon(currentQuestion.category)}
                  </div>
                  <span className="text-purple-400 font-medium capitalize">{currentQuestion.category}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-6">{currentQuestion.question}</h3>

                {/* Answer Options */}
                {currentQuestion.type === 'scale' && (
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleResponse(value)}
                        className={`w-full p-4 rounded-lg border text-left transition-all ${
                          responses[currentQuestion.id] === value
                            ? 'bg-purple-600/30 border-purple-400/50 text-white'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>
                            {value === 1 && 'Never'}
                            {value === 2 && 'Rarely'}
                            {value === 3 && 'Sometimes'}
                            {value === 4 && 'Often'}
                            {value === 5 && 'Always'}
                          </span>
                          <div className="flex space-x-1">
                            {[...Array(value)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'choice' && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleResponse(option)}
                        className={`w-full p-4 rounded-lg border text-left transition-all ${
                          responses[currentQuestion.id] === option
                            ? 'bg-purple-600/30 border-purple-400/50 text-white'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'text' && (
                  <textarea
                    value={responses[currentQuestion.id] || ''}
                    onChange={(e) => handleResponse(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-purple-400 transition-colors min-h-[120px]"
                  />
                )}
              </motion.div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={!responses[currentQuestion.id]}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Complete Assessment' : 'Next'}
                </button>
              </div>
            </div>
          )}

          {currentStep === 'results' && authenticityScore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8"
            >
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className={`text-4xl font-bold text-white ${getScoreColor(authenticityScore.overall)}`}>
                    {authenticityScore.overall}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{getScoreLabel(authenticityScore.overall)}</h3>
                <p className="text-gray-400">Your Authenticity Score</p>
              </div>

              {/* Category Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Object.entries(authenticityScore.categories).map(([category, score]) => (
                  <div key={category} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      {getCategoryIcon(category)}
                      <span className="text-gray-400 text-sm capitalize">{category}</span>
                    </div>
                    <p className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</p>
                    <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Insights */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h4 className="text-xl font-semibold text-white mb-4">Key Insights</h4>
                <div className="space-y-3">
                  {authenticityScore.insights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Lightbulb className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth Areas */}
              <div className="glass-card rounded-xl p-6">
                <h4 className="text-xl font-semibold text-white mb-4">Areas for Growth</h4>
                <div className="space-y-3">
                  {authenticityScore.growthAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <Target className="w-5 h-5 text-blue-400" />
                      <p className="text-gray-300">{area}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {isAnalyzing && (
            <div className="flex items-center justify-center h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-purple-400 border-t-transparent animate-spin"></div>
                <p className="text-white text-lg">Analyzing your responses...</p>
                <p className="text-gray-400 text-sm">Generating personalized insights</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticSelfDiscovery;
