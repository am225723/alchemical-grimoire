import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Eye, TrendingUp, AlertTriangle, Heart, Target, Zap, RefreshCw, Download, Filter } from 'lucide-react';
import { useAIService, PatternAnalysis, RelationshipPattern } from '../../services/aiService';

interface AIPatternRecognitionProps {
  onClose?: () => void;
  userData?: any;
  journalData?: string[];
}

interface DetectedPattern {
  id: string;
  type: 'emotional' | 'behavioral' | 'cognitive' | 'relational';
  title: string;
  description: string;
  frequency: number;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  triggers: string[];
  consequences: string[];
  recommendations: string[];
  relatedPatterns: string[];
}

const AIPatternRecognition: React.FC<AIPatternRecognitionProps> = ({
  onClose,
  userData = {},
  journalData = []
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedPatterns, setDetectedPatterns] = useState<DetectedPattern[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<DetectedPattern | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'frequency' | 'impact' | 'confidence'>('impact');

  useEffect(() => {
    if (journalData.length > 0) {
      analyzePatterns();
    }
  }, [journalData]);

  const analyzePatterns = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate AI analysis with sample data
      const mockPatterns: DetectedPattern[] = [
        {
          id: '1',
          type: 'emotional',
          title: 'Emotional Suppression Pattern',
          description: 'Tendency to suppress difficult emotions, particularly anger and sadness, leading to internal tension and emotional buildup.',
          frequency: 8,
          confidence: 0.92,
          impact: 'high',
          triggers: ['Conflict situations', 'Personal criticism', 'Feeling misunderstood'],
          consequences: ['Physical tension', 'Emotional outbursts', 'Relationship strain'],
          recommendations: [
            'Practice emotional labeling exercises',
            'Create safe emotional expression outlets',
            'Journal about suppressed emotions daily'
          ],
          relatedPatterns: ['perfectionism', 'people-pleasing']
        },
        {
          id: '2',
          type: 'behavioral',
          title: 'Avoidance of Vulnerability',
          description: 'Consistent pattern of avoiding situations that require emotional vulnerability or authentic self-expression.',
          frequency: 6,
          confidence: 0.87,
          impact: 'high',
          triggers: ['Intimate conversations', 'Self-reflection prompts', 'Emotional intimacy'],
          consequences: ['Shallow relationships', 'Limited self-awareness', 'Missed growth opportunities'],
          recommendations: [
            'Start with small vulnerability exercises',
            'Practice sharing with trusted individuals',
            'Work with a therapist or coach'
          ],
          relatedPatterns: ['emotional suppression', 'fear of rejection']
        },
        {
          id: '3',
          type: 'cognitive',
          title: 'Catastrophic Thinking Loop',
          description: 'Automatic tendency to imagine worst-case scenarios and escalate minor issues into major problems.',
          frequency: 7,
          confidence: 0.85,
          impact: 'medium',
          triggers: ['Uncertainty', 'New situations', 'Performance pressure'],
          consequences: ['Anxiety spikes', 'Decision paralysis', 'Unnecessary stress'],
          recommendations: [
            'Practice reality-testing thoughts',
            'Use the "best/worst/most likely" technique',
            'Develop mindfulness practices'
          ],
          relatedPatterns: ['perfectionism', 'control issues']
        },
        {
          id: '4',
          type: 'relational',
          title: 'Rescuer Dynamics',
          description: 'Pattern of taking on responsibility for others' emotions and problems, often at personal expense.',
          frequency: 5,
          confidence: 0.78,
          impact: 'medium',
          triggers: ['Others in distress', 'Family conflicts', 'Workplace dynamics'],
          consequences: ['Emotional burnout', 'Resentment buildup', 'Enabling behaviors'],
          recommendations: [
            'Practice setting healthy boundaries',
            'Develop empathy without over-identification',
            'Focus on empowerment vs. fixing'
          ],
          relatedPatterns: ['people-pleasing', 'lack of boundaries']
        }
  ];

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDetectedPatterns(mockPatterns);
    } catch (error) {
      console.error('Error analyzing patterns:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getPatternIcon = (type: string) => {
    switch (type) {
      case 'emotional': return <Heart className="w-5 h-5" />;
      case 'behavioral': return <Target className="w-5 h-5" />;
      case 'cognitive': return <Brain className="w-5 h-5" />;
      case 'relational': return <Eye className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emotional': return 'text-pink-400 bg-pink-400/20 border-pink-400/30';
      case 'behavioral': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'cognitive': return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
      case 'relational': return 'text-green-400 bg-green-400/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-400';
    if (confidence >= 0.7) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const filteredPatterns = detectedPatterns.filter(pattern => 
    filter === 'all' || pattern.type === filter
  );

  const sortedPatterns = [...filteredPatterns].sort((a, b) => {
    switch (sortBy) {
      case 'frequency':
        return b.frequency - a.frequency;
      case 'impact':
        const impactOrder = { high: 3, medium: 2, low: 1 };
        return impactOrder[b.impact] - impactOrder[a.impact];
      case 'confidence':
        return b.confidence - a.confidence;
      default:
        return 0;
    }
  });

  const exportReport = () => {
    const report = {
      date: new Date().toISOString(),
      patterns: detectedPatterns,
      summary: {
        total: detectedPatterns.length,
        highImpact: detectedPatterns.filter(p => p.impact === 'high').length,
        averageConfidence: detectedPatterns.reduce((acc, p) => acc + p.confidence, 0) / detectedPatterns.length
      }
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pattern-recognition-report.json';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-card rounded-t-2xl p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <RefreshCw className="w-5 h-5 text-gray-300 rotate-180" />
                </button>
              )}
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AI Pattern Recognition</h2>
                  <p className="text-gray-400 text-sm">Advanced AI analysis of your behavioral and emotional patterns</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={exportReport}
                disabled={detectedPatterns.length === 0}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={analyzePatterns}
                disabled={isAnalyzing}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>{isAnalyzing ? 'Analyzing...' : 'Re-analyze'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="glass-card border-t border-white/10 p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Filter:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-1 rounded-lg bg-white/10 text-white text-sm border border-white/20 focus:outline-none focus:border-purple-400"
              >
                <option value="all">All Types</option>
                <option value="emotional">Emotional</option>
                <option value="behavioral">Behavioral</option>
                <option value="cognitive">Cognitive</option>
                <option value="relational">Relational</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'frequency' | 'impact' | 'confidence')}
                className="px-3 py-1 rounded-lg bg-white/10 text-white text-sm border border-white/20 focus:outline-none focus:border-purple-400"
              >
                <option value="impact">Impact</option>
                <option value="frequency">Frequency</option>
                <option value="confidence">Confidence</option>
              </select>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{detectedPatterns.length} patterns detected</span>
              <span>{detectedPatterns.filter(p => p.impact === 'high').length} high impact</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pattern List */}
          <div className="lg:col-span-2">
            <div className="glass-card h-[600px] rounded-2xl p-6 overflow-y-auto">
              <h3 className="text-xl font-semibold text-white mb-6">Detected Patterns</h3>
              
              {isAnalyzing ? (
                <div className="flex items-center justify-center h-[400px]">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-purple-400 border-t-transparent animate-spin"></div>
                    <p className="text-white text-lg">AI Analysis in Progress</p>
                    <p className="text-gray-400 text-sm">Scanning your data for patterns...</p>
                  </div>
                </div>
              ) : sortedPatterns.length === 0 ? (
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400 mb-4">No patterns detected yet</p>
                  <p className="text-gray-500 text-sm">Add more journal entries or data to enable pattern recognition</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {sortedPatterns.map((pattern, index) => (
                      <motion.div
                        key={pattern.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedPattern(pattern)}
                        className={`p-5 rounded-xl border cursor-pointer transition-all ${
                          selectedPattern?.id === pattern.id
                            ? 'bg-purple-600/30 border-purple-400/50'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${getTypeColor(pattern.type)}`}>
                              {getPatternIcon(pattern.type)}
                            </div>
                            <div>
                              <h4 className="text-white font-semibold">{pattern.title}</h4>
                              <p className="text-gray-400 text-sm capitalize">{pattern.type} pattern</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-medium ${getImpactColor(pattern.impact)}`}>
                              {pattern.impact.toUpperCase()}
                            </div>
                            <div className="flex items-center space-x-1 mt-1">
                              <TrendingUp className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-400">{pattern.frequency} occurrences</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{pattern.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <AlertTriangle className="w-4 h-4 text-orange-400" />
                              <span className="text-xs text-gray-400">{pattern.triggers.length} triggers</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Zap className="w-4 h-4 text-yellow-400" />
                              <span className={`text-xs font-medium ${getConfidenceColor(pattern.confidence)}`}>
                                {Math.round(pattern.confidence * 100)}% confidence
                              </span>
                            </div>
                          </div>
                          <div className="w-20 bg-white/10 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                              style={{ width: `${pattern.confidence * 100}%` }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* Pattern Details */}
          <div className="space-y-6">
            {selectedPattern ? (
              <>
                {/* Pattern Overview */}
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg ${getTypeColor(selectedPattern.type)}`}>
                      {getPatternIcon(selectedPattern.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{selectedPattern.title}</h3>
                      <p className="text-gray-400 text-sm capitalize">{selectedPattern.type} pattern</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Description</p>
                      <p className="text-gray-300 text-sm">{selectedPattern.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className={`text-lg font-bold ${getImpactColor(selectedPattern.impact)}`}>
                          {selectedPattern.impact}
                        </p>
                        <p className="text-xs text-gray-400">Impact</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-purple-400">{selectedPattern.frequency}</p>
                        <p className="text-xs text-gray-400">Frequency</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-lg font-bold ${getConfidenceColor(selectedPattern.confidence)}`}>
                          {Math.round(selectedPattern.confidence * 100)}%
                        </p>
                        <p className="text-xs text-gray-400">Confidence</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Triggers */}
                <div className="glass-card rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Triggers</h4>
                  <div className="space-y-2">
                    {selectedPattern.triggers.map((trigger, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                        <AlertTriangle className="w-4 h-4 text-orange-400" />
                        <p className="text-gray-300 text-sm">{trigger}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consequences */}
                <div className="glass-card rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Consequences</h4>
                  <div className="space-y-2">
                    {selectedPattern.consequences.map((consequence, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-red-400/10 border border-red-400/20">
                        <Eye className="w-4 h-4 text-red-400" />
                        <p className="text-gray-300 text-sm">{consequence}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="glass-card rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Recommendations</h4>
                  <div className="space-y-2">
                    {selectedPattern.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-green-400/10 border border-green-400/20">
                        <Target className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-300 text-sm">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Patterns */}
                {selectedPattern.relatedPatterns.length > 0 && (
                  <div className="glass-card rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Related Patterns</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPattern.relatedPatterns.map((related, index) => (
                        <span key={index} className="px-3 py-1 rounded-full bg-purple-600/30 text-purple-300 text-sm">
                          {related}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="glass-card rounded-2xl p-6 text-center">
                <Brain className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400 mb-2">Select a pattern to view details</p>
                <p className="text-gray-500 text-sm">Click on any detected pattern to explore its insights and recommendations</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPatternRecognition;
