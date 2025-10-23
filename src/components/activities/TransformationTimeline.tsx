import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, TrendingUp, Award, Sparkles, Plus, Edit, Trash2, ChevronRight, Heart, Brain, Eye, Target } from 'lucide-react';
import { useAIService, TimelineEvent } from '../../services/aiService';

interface TransformationTimelineProps {
  onClose?: () => void;
}

const TransformationTimeline: React.FC<TransformationTimelineProps> = ({ onClose }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [newEvent, setNewEvent] = useState<Partial<TimelineEvent>>({
    title: '',
    description: '',
    type: 'reflection',
    emotions: [],
    learnings: []
  });
  
  const aiService = useAIService();

  useEffect(() => {
    // Load saved events from localStorage or API
    const savedEvents = localStorage.getItem('transformationTimeline');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents).map((event: any) => ({
        ...event,
        date: new Date(event.date)
      })));
    } else {
      // Initialize with sample events
      const sampleEvents: TimelineEvent[] = [
        {
          id: '1',
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          title: 'First Shadow Work Session',
          description: 'Had my first deep conversation about my fears and insecurities. Felt vulnerable but liberating.',
          type: 'breakthrough',
          impact: 8,
          emotions: ['vulnerability', 'hope', 'anxiety'],
          learnings: ['Vulnerability is strength', 'Self-acceptance is the foundation']
        },
        {
          id: '2',
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          title: 'Pattern Recognition',
          description: 'Identified recurring patterns in my relationships and began understanding their roots.',
          type: 'challenge',
          impact: 6,
          emotions: ['frustration', 'clarity', 'determination'],
          learnings: ['Awareness is the first step', 'Patterns can be changed']
        }
      ];
      setEvents(sampleEvents);
    }
  }, []);

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.description) {
      const event: TimelineEvent = {
        id: Date.now().toString(),
        date: new Date(),
        title: newEvent.title,
        description: newEvent.description,
        type: newEvent.type as TimelineEvent['type'] || 'reflection',
        impact: 5,
        emotions: newEvent.emotions || [],
        learnings: newEvent.learnings || []
      };
      
      const updatedEvents = [...events, event].sort((a, b) => b.date.getTime() - a.date.getTime());
      setEvents(updatedEvents);
      localStorage.setItem('transformationTimeline', JSON.stringify(updatedEvents));
      
      setNewEvent({
        title: '',
        description: '',
        type: 'reflection',
        emotions: [],
        learnings: []
      });
      setIsAddingEvent(false);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem('transformationTimeline', JSON.stringify(updatedEvents));
    setSelectedEvent(null);
  };

  const analyzeProgress = async () => {
    setIsAnalyzing(true);
    try {
      const results = await aiService.analyzeTransformationTimeline(events);
      setAnalysisResults(results);
    } catch (error) {
      console.error('Error analyzing timeline:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'breakthrough': return <Sparkles className="w-5 h-5" />;
      case 'challenge': return <Brain className="w-5 h-5" />;
      case 'integration': return <Heart className="w-5 h-5" />;
      case 'reflection': return <Eye className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'breakthrough': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'challenge': return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'integration': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'reflection': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'nigredo': return 'text-gray-400';
      case 'albedo': return 'text-white';
      case 'citrinitas': return 'text-yellow-400';
      case 'rubedo': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const sortedEvents = [...events].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-4">
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
                  <ChevronRight className="w-5 h-5 text-gray-300 rotate-180" />
                </button>
              )}
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Transformation Timeline</h2>
                  <p className="text-gray-400 text-sm">Track your journey through shadow work and personal growth</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={analyzeProgress}
                disabled={events.length === 0 || isAnalyzing}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                <TrendingUp className={`w-4 h-4 ${isAnalyzing ? 'animate-pulse' : ''}`} />
                <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Progress'}</span>
              </button>
              <button
                onClick={() => setIsAddingEvent(true)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="glass-card h-[600px] rounded-2xl p-6 overflow-y-auto">
              <h3 className="text-xl font-semibold text-white mb-6">Your Journey</h3>
              
              {events.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400 mb-4">No events recorded yet</p>
                  <button
                    onClick={() => setIsAddingEvent(true)}
                    className="px-4 py-2 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-400/30 hover:bg-purple-600/50 transition-colors"
                  >
                    Add Your First Event
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {sortedEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Timeline Line */}
                      {index < sortedEvents.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-20 bg-gradient-to-b from-purple-400/50 to-transparent" />
                      )}
                      
                      {/* Event Card */}
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-full ${getEventColor(event.type)} border-2`}>
                          {getEventIcon(event.type)}
                        </div>
                        
                        <div 
                          className="flex-1 p-4 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all"
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-semibold">{event.title}</h4>
                            <span className="text-gray-400 text-sm">{formatDate(event.date)}</span>
                          </div>
                          <p className="text-gray-300 text-sm mb-3">{event.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className={`text-xs px-2 py-1 rounded-full capitalize ${getEventColor(event.type)}`}>
                                {event.type}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Award className="w-3 h-3 text-yellow-400" />
                                <span className="text-xs text-gray-400">Impact: {event.impact}/10</span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Analysis Results */}
            {analysisResults && (
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Progress Analysis</h3>
                
                {/* Current Phase */}
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-2">Current Phase</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className={`text-lg font-bold capitalize ${getPhaseColor(analysisResults.progress.currentPhase)}`}>
                        {analysisResults.progress.currentPhase}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {analysisResults.progress.completedLessons}/{analysisResults.progress.totalLessons} lessons
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Overall Progress</span>
                    <span className="text-sm text-gray-400">
                      {Math.round((analysisResults.progress.completedLessons / analysisResults.progress.totalLessons) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(analysisResults.progress.completedLessons / analysisResults.progress.totalLessons) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                {/* Next Milestone */}
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-2">Next Milestone</p>
                  <p className="text-white font-medium">{analysisResults.progress.nextMilestone}</p>
                </div>

                {/* Upcoming Challenges */}
                <div>
                  <p className="text-gray-400 text-sm mb-3">Upcoming Challenges</p>
                  <div className="space-y-2">
                    {analysisResults.upcomingChallenges.map((challenge: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Brain className="w-4 h-4 text-orange-400" />
                        <p className="text-gray-300 text-sm">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Selected Event Details */}
            {selectedEvent && (
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Event Details</h3>
                  <button
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                    className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Date</p>
                    <p className="text-white">{formatDate(selectedEvent.date)}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Type</p>
                    <span className={`inline-flex px-2 py-1 rounded-full text-sm capitalize ${getEventColor(selectedEvent.type)}`}>
                      {selectedEvent.type}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Emotions</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.emotions.map((emotion, index) => (
                        <span key={index} className="px-2 py-1 rounded bg-purple-600/30 text-purple-300 text-sm">
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Learnings</p>
                    <div className="space-y-2">
                      {selectedEvent.learnings.map((learning, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Heart className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300 text-sm">{learning}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Event Modal */}
        <AnimatePresence>
          {isAddingEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setIsAddingEvent(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card rounded-2xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Add New Event</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Title</label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-purple-400"
                      placeholder="Event title..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Description</label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-purple-400 min-h-[100px]"
                      placeholder="Describe what happened..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Type</label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as TimelineEvent['type'] }))}
                      className="w-full px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-purple-400"
                    >
                      <option value="breakthrough">Breakthrough</option>
                      <option value="challenge">Challenge</option>
                      <option value="integration">Integration</option>
                      <option value="reflection">Reflection</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setIsAddingEvent(false)}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEvent}
                    disabled={!newEvent.title || !newEvent.description}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Event
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

export default TransformationTimeline;