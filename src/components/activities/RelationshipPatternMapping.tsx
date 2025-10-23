import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Heart, AlertTriangle, TrendingUp, Users, Eye, Target, Filter, Download, RefreshCw } from 'lucide-react';
import { useAIService, PatternAnalysis, RelationshipPattern } from '../../services/aiService';

interface PatternNode {
  id: string;
  label: string;
  type: 'person' | 'pattern' | 'trigger' | 'emotion';
  intensity: number;
  connections: string[];
  description?: string;
}

interface Connection {
  source: string;
  target: string;
  strength: number;
  type: 'positive' | 'negative' | 'neutral';
}

interface RelationshipPatternMappingProps {
  onClose?: () => void;
  journalEntries?: string[];
  relationshipHistory?: any[];
}

const RelationshipPatternMapping: React.FC<RelationshipPatternMappingProps> = ({
  onClose,
  journalEntries = [],
  relationshipHistory = []
}) => {
  const [patterns, setPatterns] = useState<PatternAnalysis | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<RelationshipPattern | null>(null);
  const [nodes, setNodes] = useState<PatternNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const aiService = useAIService();

  useEffect(() => {
    if (journalEntries.length > 0 || relationshipHistory.length > 0) {
      analyzePatterns();
    }
  }, [journalEntries, relationshipHistory]);

  const analyzePatterns = async () => {
    setIsAnalyzing(true);
    try {
      const analysis = await aiService.analyzeRelationshipPatterns(journalEntries, relationshipHistory);
      setPatterns(analysis);
      generateVisualization(analysis);
    } catch (error) {
      console.error('Error analyzing patterns:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateVisualization = (analysis: PatternAnalysis) => {
    // Generate nodes and connections for visualization
    const patternNodes: PatternNode[] = analysis.patterns.map((pattern, index) => ({
      id: `pattern-${index}`,
      label: pattern.type,
      type: 'pattern',
      intensity: pattern.impact === 'high' ? 0.9 : pattern.impact === 'medium' ? 0.6 : 0.3,
      connections: pattern.relatedAspects.map((aspect, i) => `aspect-${i}`),
      description: pattern.description
    }));

    const aspectNodes: PatternNode[] = analysis.patterns.flatMap(pattern =>
      pattern.relatedAspects.map((aspect, index) => ({
        id: `aspect-${pattern.type}-${index}`,
        label: aspect,
        type: 'emotion',
        intensity: 0.5,
        connections: [],
        description: `Related aspect: ${aspect}`
      }))
    );

    const patternConnections: Connection[] = analysis.patterns.flatMap(pattern =>
      pattern.relatedAspects.map(aspect => ({
        source: `pattern-${pattern.type}`,
        target: `aspect-${pattern.type}-${pattern.relatedAspects.indexOf(aspect)}`,
        strength: pattern.frequency / 10,
        type: pattern.impact === 'high' ? 'negative' : pattern.impact === 'medium' ? 'neutral' : 'positive'
      }))
    );

    setNodes([...patternNodes, ...aspectNodes]);
    setConnections(patternConnections);
  };

  const getPatternIcon = (type: string) => {
    switch (type) {
      case 'repetition': return <RefreshCw className="w-5 h-5" />;
      case 'trigger': return <AlertTriangle className="w-5 h-5" />;
      case 'avoidance': return <Eye className="w-5 h-5" />;
      case 'projection': return <Target className="w-5 h-5" />;
      case 'integration': return <Heart className="w-5 h-5" />;
      default: return <Network className="w-5 h-5" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'low': return 'text-green-400 bg-green-400/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'positive': return 'stroke-green-400';
      case 'negative': return 'stroke-red-400';
      case 'neutral': return 'stroke-gray-400';
      default: return 'stroke-gray-400';
    }
  };

  const filteredPatterns = patterns?.patterns.filter(pattern => 
    filter === 'all' || pattern.type === filter
  ) || [];

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
                  <RefreshCw className="w-5 h-5 text-gray-300" />
                </button>
              )}
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Relationship Pattern Mapping</h2>
                  <p className="text-gray-400 text-sm">Visualize and understand your relationship dynamics</p>
                </div>
              </div>
            </div>
            <button
              onClick={analyzePatterns}
              disabled={isAnalyzing}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pattern Visualization */}
          <div className="lg:col-span-2">
            <div className="glass-card h-[600px] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Pattern Network</h3>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-1 rounded-lg bg-white/10 text-white text-sm border border-white/20 focus:outline-none focus:border-purple-400"
                  >
                    <option value="all">All Patterns</option>
                    <option value="repetition">Repetition</option>
                    <option value="trigger">Triggers</option>
                    <option value="avoidance">Avoidance</option>
                    <option value="projection">Projection</option>
                    <option value="integration">Integration</option>
                  </select>
                </div>
              </div>

              {/* SVG Network Visualization */}
              <div className="relative w-full h-[500px] bg-black/30 rounded-xl overflow-hidden">
                <svg className="w-full h-full">
                  {/* Render connections */}
                  {connections.map((conn, index) => {
                    const sourceNode = nodes.find(n => n.id === conn.source);
                    const targetNode = nodes.find(n => n.id === conn.target);
                    if (!sourceNode || !targetNode) return null;

                    return (
                      <line
                        key={index}
                        x1={Math.random() * 80 + 10} // Simplified positioning
                        y1={Math.random() * 80 + 10}
                        x2={Math.random() * 80 + 10}
                        y2={Math.random() * 80 + 10}
                        className={getConnectionColor(conn.type)}
                        strokeWidth={conn.strength * 3}
                        strokeOpacity={0.6}
                      />
                    );
                  })}

                  {/* Render nodes */}
                  {nodes.map((node, index) => (
                    <g key={node.id}>
                      <circle
                        cx={Math.random() * 80 + 10}
                        cy={Math.random() * 80 + 10}
                        r={node.intensity * 20 + 10}
                        className="fill-purple-500/80 stroke-purple-400"
                        strokeWidth={2}
                      />
                      <text
                        x={Math.random() * 80 + 10}
                        y={Math.random() * 80 + 10}
                        className="fill-white text-xs text-center"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Pattern Details */}
          <div className="space-y-6">
            {/* Pattern List */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Detected Patterns</h3>
              <div className="space-y-3">
                <AnimatePresence>
                  {filteredPatterns.map((pattern, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={() => setSelectedPattern(pattern)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedPattern === pattern
                          ? 'bg-purple-600/30 border-purple-400/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getImpactColor(pattern.impact)}`}>
                            {getPatternIcon(pattern.type)}
                          </div>
                          <div>
                            <p className="text-white font-medium capitalize">{pattern.type}</p>
                            <p className="text-gray-400 text-sm">Frequency: {pattern.frequency}</p>
                          </div>
                        </div>
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Selected Pattern Details */}
            {selectedPattern && (
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Pattern Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Description</p>
                    <p className="text-white">{selectedPattern.description}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Impact Level</p>
                    <div className={`inline-flex px-3 py-1 rounded-lg text-sm font-medium ${getImpactColor(selectedPattern.impact)}`}>
                      {selectedPattern.impact}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Related Aspects</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPattern.relatedAspects.map((aspect, index) => (
                        <span key={index} className="px-2 py-1 rounded bg-purple-600/30 text-purple-300 text-sm">
                          {aspect}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Insights */}
            {patterns && (
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">AI Insights</h3>
                <div className="space-y-3">
                  {patterns.insights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Brain className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-gray-400 text-sm mb-2">Confidence: {Math.round(patterns.confidence * 100)}%</p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                      style={{ width: `${patterns.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        {patterns && (
          <div className="glass-card rounded-b-2xl p-6 border-t border-white/10 mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {patterns.recommendations.map((recommendation, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-purple-400" />
                    <p className="text-gray-300 text-sm">{recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelationshipPatternMapping;