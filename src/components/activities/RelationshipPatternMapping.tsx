import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed unused Users, Download. Added Brain
import { Network, Heart, AlertTriangle, TrendingUp, Eye, Target, Filter, RefreshCw, Brain } from 'lucide-react';
interface RelationshipPattern {
  id: string;
  name: string;
  description: string;
  frequency: number;
  triggers: string[];
  behaviors: string[];
  outcomes: string[];
  archetype?: string;
  type: string;
  impact: number;
  relatedAspects: string[];
}

interface PatternAnalysis {
  patterns: RelationshipPattern[];
  overallInsights: string[];
  recommendations: string[];
  insights: string[];
  confidence: number;
}

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

  useEffect(() => {
    if (journalEntries.length > 0 || relationshipHistory.length > 0) {
      analyzePatterns();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journalEntries, relationshipHistory]); // Added aiService dependency if it changes, or disable lint warning

  const analyzePatterns = async () => {
    setIsAnalyzing(true);
    try {
      // Mock pattern analysis
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const analysis: PatternAnalysis = {
        patterns: [
          {
            id: '1',
            name: 'Seeking Validation',
            description: 'Pattern of seeking external approval in relationships',
            frequency: 8,
            triggers: ['Criticism', 'Uncertainty', 'Conflict'],
            behaviors: ['Over-explaining', 'Apologizing excessively', 'People-pleasing'],
            outcomes: ['Resentment', 'Loss of self', 'Burnout'],
            archetype: 'Victim',
            type: 'emotional',
            impact: 7,
            relatedAspects: ['Self-worth', 'Boundaries', 'Authenticity']
          }
        ],
        overallInsights: ['Strong pattern of external validation seeking detected'],
        recommendations: ['Practice setting boundaries', 'Develop self-validation practices'],
        insights: ['Your relationships often reflect your inner child needs'],
        confidence: 0.85
      };
      
      setPatterns(analysis);
      generateVisualization(analysis);
    } catch (error) {
      console.error('Error analyzing patterns:', error);
       // Display error to user?
       setPatterns(null); // Clear previous patterns on error
       setNodes([]);
       setConnections([]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateVisualization = (analysis: PatternAnalysis) => {
    // Generate nodes and connections for visualization
    const patternNodes: PatternNode[] = analysis.patterns.map((pattern, index) => ({
      // Use pattern type + index for ID to avoid potential duplicates if types repeat
      id: `${pattern.type}-${index}`,
      label: pattern.type,
      type: 'pattern',
      intensity: pattern.impact >= 7 ? 0.9 : pattern.impact >= 4 ? 0.6 : 0.3,
      // Ensure aspect IDs are unique by including pattern context
      connections: pattern.relatedAspects.map((_, i) => `aspect-${pattern.type}-${index}-${i}`),
      description: pattern.description
    }));

    const aspectNodes: PatternNode[] = analysis.patterns.flatMap((pattern, pIndex) =>
      pattern.relatedAspects.map((aspect, aIndex) => ({
        // Ensure aspect IDs are unique and match connection targets
        id: `aspect-${pattern.type}-${pIndex}-${aIndex}`,
        label: aspect,
        type: 'emotion', // Or 'trigger' or 'behavior' depending on aspect nature?
        intensity: 0.5,
        connections: [], // Aspects don't have outgoing connections in this model
        description: `Related aspect: ${aspect}`
      }))
    );

    // Remove duplicates from aspectNodes based on label to simplify visualization?
    const uniqueAspectNodes = Array.from(new Map(aspectNodes.map(node => [node.label, node])).values());


    const patternConnections: Connection[] = analysis.patterns.flatMap((pattern, pIndex) =>
      pattern.relatedAspects.map((_, aIndex) => ({
        // Ensure source and target IDs match node IDs
        source: `${pattern.type}-${pIndex}`,
        target: `aspect-${pattern.type}-${pIndex}-${aIndex}`,
        // Scale strength more appropriately, ensure it's within a reasonable range (e.g., 0.1 to 1.0)
        strength: Math.max(0.1, Math.min(1.0, pattern.frequency / 10)),
        type: pattern.impact >= 7 ? 'negative' : pattern.impact >= 4 ? 'neutral' : 'positive'
      }))
    );

    // Set unique aspect nodes if preferred for visualization
    setNodes([...patternNodes, ...uniqueAspectNodes]);
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

  const getImpactColor = (impact: string | number) => {
    // Convert number to string for legacy code compatibility
    const impactStr = typeof impact === 'number' 
      ? (impact >= 7 ? 'high' : impact >= 4 ? 'medium' : 'low')
      : impact;
      
    switch (impactStr) {
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

  // TODO: Implement actual SVG Network Visualization logic
  // The current random positioning is just a placeholder.
  // Libraries like d3-force or react-flow could be used here.

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
                  {/* Changed Icon */}
                  <ArrowLeft className="w-5 h-5 text-gray-300" />
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"> {/* Added margin-top */}
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

              {/* SVG Network Visualization Placeholder */}
              <div className="relative w-full h-[500px] bg-black/30 rounded-xl overflow-hidden flex items-center justify-center">
                 {isAnalyzing ? (
                   <div className="text-center text-white">
                     <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
                     Analyzing...
                   </div>
                 ) : nodes.length > 0 ? (
                    <svg className="w-full h-full">
                    {/* Render connections */}
                    {connections.map((conn, index) => {
                      // Placeholder positioning - replace with actual layout calculation
                      const sourcePos = { x: Math.random() * 90 + 5, y: Math.random() * 90 + 5 };
                      const targetPos = { x: Math.random() * 90 + 5, y: Math.random() * 90 + 5 };

                      return (
                        <line
                          key={index}
                          x1={`${sourcePos.x}%`}
                          y1={`${sourcePos.y}%`}
                          x2={`${targetPos.x}%`}
                          y2={`${targetPos.y}%`}
                          className={getConnectionColor(conn.type)}
                          strokeWidth={conn.strength * 2} // Adjusted stroke width
                          strokeOpacity={0.5}
                        />
                      );
                    })}

                    {/* Render nodes */}
                    {nodes.map((node) => {
                       // Placeholder positioning - replace with actual layout calculation
                      const nodePos = { x: Math.random() * 90 + 5, y: Math.random() * 90 + 5 };
                      return (
                        <g key={node.id} transform={`translate(${nodePos.x}%, ${nodePos.y}%)`}>
                          <circle
                            r={node.intensity * 15 + 8} // Adjusted radius
                            className="fill-purple-500/80 stroke-purple-400 hover:stroke-white cursor-pointer"
                            strokeWidth={1.5}
                            onClick={() => {
                               const foundPattern = patterns?.patterns.find(p => p.type === node.label);
                               if(foundPattern) setSelectedPattern(foundPattern);
                            }}
                          />
                          <text
                            className="fill-white text-[8px] sm:text-[10px] text-center pointer-events-none" // Adjusted text size
                            textAnchor="middle"
                            dominantBaseline="middle"
                            dy="0.3em" // Center text vertically
                          >
                            {node.label.length > 10 ? node.label.substring(0, 8) + '...' : node.label}
                          </text>
                        </g>
                      )
                    })}
                  </svg>
                 ) : (
                    <div className="text-center text-gray-400">
                      <Network className="w-12 h-12 mx-auto mb-4" />
                      <p>No pattern data available or analysis failed.</p>
                      <p className="text-sm">Try adding journal entries or refreshing.</p>
                    </div>
                 )}
              </div>
            </div>
          </div>

          {/* Pattern Details */}
          <div className="space-y-6">
            {/* Pattern List */}
            <div className="glass-card rounded-2xl p-6 max-h-[300px] overflow-y-auto"> {/* Added max-height */}
              <h3 className="text-xl font-semibold text-white mb-4 sticky top-0 bg-inherit pb-2">Detected Patterns</h3> {/* Made header sticky */}
              <div className="space-y-3">
                {isAnalyzing ? (
                   <p className="text-gray-400">Analyzing...</p>
                ) : filteredPatterns.length === 0 ? (
                    <p className="text-gray-400">No patterns found for this filter.</p>
                ) : (
                  <AnimatePresence>
                    {filteredPatterns.map((pattern, index) => (
                      <motion.div
                        key={`${pattern.type}-${index}`} // Use a more stable key
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        layout // Add layout animation
                        onClick={() => setSelectedPattern(pattern)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedPattern?.type === pattern.type && selectedPattern?.description === pattern.description // Check more specific match
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
                )}
              </div>
            </div>

            {/* Selected Pattern Details */}
            <AnimatePresence>
              {selectedPattern && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass-card rounded-2xl p-6 overflow-hidden" // Added overflow-hidden
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Pattern Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-1 font-semibold">Description</p> {/* Added font-semibold */}
                      <p className="text-white text-sm">{selectedPattern.description}</p> {/* Adjusted text size */}
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1 font-semibold">Impact Level</p> {/* Added font-semibold */}
                      <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(selectedPattern.impact)}`}> {/* Adjusted size and padding */}
                        {selectedPattern.impact}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1 font-semibold">Related Aspects</p> {/* Added font-semibold */}
                      <div className="flex flex-wrap gap-2">
                        {selectedPattern.relatedAspects.map((aspect, index) => (
                          <span key={index} className="px-2 py-1 rounded bg-purple-600/30 text-purple-300 text-xs"> {/* Adjusted size */}
                            {aspect}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Insights */}
            {patterns && patterns.insights.length > 0 && ( // Conditionally render insights
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">AI Insights</h3>
                <div className="space-y-3">
                  {patterns.insights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Brain className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" /> {/* Added Brain icon */}
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
        {patterns && patterns.recommendations.length > 0 && ( // Conditionally render recommendations
          <div className="glass-card rounded-b-2xl p-6 border-t border-white/10 mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {patterns.recommendations.map((recommendation, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-start space-x-3"> {/* Changed to items-start */}
                    <Target className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" /> {/* Added margin-top */}
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

// Added ArrowLeft to imports
import { ArrowLeft } from 'lucide-react';

export default RelationshipPatternMapping;
