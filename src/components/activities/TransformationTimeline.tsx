import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed unused Edit
import { Calendar, MapPin, TrendingUp, Award, Sparkles, Plus, Trash2, ChevronRight, Heart, Brain, Eye, Target } from 'lucide-react';
import { useAIService, TimelineEvent } from '../../services/aiService'; // Removed unused type

interface TransformationTimelineProps {
  onClose?: () => void;
}

const TransformationTimeline: React.FC<TransformationTimelineProps> = ({ onClose }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null); // Consider defining a type for analysisResults
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
      try {
        setEvents(JSON.parse(savedEvents).map((event: any) => ({
          ...event,
          // Ensure date is parsed correctly, handle potential invalid dates
          date: event.date ? new Date(event.date) : new Date()
        })));
      } catch (error) {
        console.error("Error parsing saved timeline events:", error);
        localStorage.removeItem('transformationTimeline'); // Clear corrupted data
        initializeSampleEvents(); // Initialize with sample data if parsing fails
      }
    } else {
      initializeSampleEvents(); // Initialize with sample data if nothing is saved
    }
  }, []);

  const initializeSampleEvents = () => {
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
    // Optionally save sample events to localStorage immediately
    // localStorage.setItem('transformationTimeline', JSON.stringify(sampleEvents));
  };


  const handleAddEvent = () => {
    // Basic validation
    if (!newEvent.title?.trim() || !newEvent.description?.trim()) {
      alert("Please provide a title and description for the event.");
      return;
    }

    const eventToAdd: TimelineEvent = {
      id: Date.now().toString(),
      date: new Date(), // Use current date for new events
      title: newEvent.title.trim(),
      description: newEvent.description.trim(),
      type: newEvent.type || 'reflection', // Default type if not selected
      impact: newEvent.impact || 5, // Default impact
      emotions: newEvent.emotions || [],
      learnings: newEvent.learnings || []
    };

    // Update state and localStorage
    const updatedEvents = [...events, eventToAdd].sort((a, b) => b.date.getTime() - a.date.getTime());
    setEvents(updatedEvents);
    localStorage.setItem('transformationTimeline', JSON.stringify(updatedEvents));

    // Reset form and close modal
    setNewEvent({
      title: '',
      description: '',
      type: 'reflection',
      emotions: [],
      learnings: [],
      impact: 5 // Reset impact as well
    });
    setIsAddingEvent(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents);
      localStorage.setItem('transformationTimeline', JSON.stringify(updatedEvents));
      if (selectedEvent?.id === eventId) {
        setSelectedEvent(null); // Deselect if the deleted event was selected
      }
    }
  };


  const analyzeProgress = async () => {
    setIsAnalyzing(true);
    setAnalysisResults(null); // Clear previous results
    try {
      const results = await aiService.analyzeTransformationTimeline(events);
      setAnalysisResults(results);
    } catch (error) {
      console.error('Error analyzing timeline:', error);
       // Show error to user?
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
      case 'breakthrough': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30 border-2 border-yellow-400/50'; // Added border
      case 'challenge': return 'text-red-400 bg-red-400/20 border-red-400/30 border-2 border-red-400/50'; // Added border
      case 'integration': return 'text-green-400 bg-green-400/20 border-green-400/30 border-2 border-green-400/50'; // Added border
      case 'reflection': return 'text-blue-400 bg-blue-400/20 border-blue-400/30 border-2 border-blue-400/50'; // Added border
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30 border-2 border-gray-400/50'; // Added border
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

  const formatDate = (date: Date | string) => { // Accept string as well for safety
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) {
         return "Invalid Date";
      }
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return "Invalid Date";
    }
  };


  // No need to create a new sorted array if events are already sorted on update
  // const sortedEvents = [...events].sort((a, b) => b.date.getTime() - a.date.getTime());

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"> {/* Added margin-top */}
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="glass-card h-[600px] rounded-2xl p-6 overflow-y-auto">
              <h3 className="text-xl font-semibold text-white mb-6">Your Journey</h3>

              {events.length === 0 && !isAnalyzing ? ( // Added !isAnalyzing check
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
                <div className="relative pl-8"> {/* Added padding for timeline line */}
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400/50 to-blue-400/50" />

                  <div className="space-y-6">
                    {/* Use events directly if already sorted */}
                    {events.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-4" // Padding for content relative to line
                        layout // Add layout animation
                      >
                         {/* Timeline Dot */}
                        <div className={`absolute -left-[1.1rem] top-1 w-6 h-6 rounded-full ${getEventColor(event.type)} flex items-center justify-center`}>
                          {getEventIcon(event.type)}
                        </div>

                        {/* Event Card */}
                        <div
                          className={`flex-1 p-4 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all ${selectedEvent?.id === event.id ? 'ring-2 ring-purple-400' : ''}`} // Highlight selected
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-semibold">{event.title}</h4>
                            <span className="text-gray-400 text-sm">{formatDate(event.date)}</span>
                          </div>
                          <p className="text-gray-300 text-sm mb-3 line-clamp-3">{event.description}</p> {/* Use line-clamp */}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getEventColor(event.type).split(' ')[0]}`}> {/* Simplified color class */}
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
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>


          {/* Sidebar */}
          <div className="space-y-6">
            {/* Analysis Results */}
            {isAnalyzing && (
                 <div className="glass-card rounded-2xl p-6 text-center">
                   <div className="w-8 h-8 mx-auto mb-2 rounded-full border-2 border-purple-400 border-t-transparent animate-spin"></div>
                   <p className="text-gray-300">Analyzing Progress...</p>
                 </div>
             )}
            <AnimatePresence>
             {analysisResults && !isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card rounded-2xl p-6"
              >
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
                    <motion.div // Animated progress bar
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(analysisResults.progress.completedLessons / analysisResults.progress.totalLessons) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
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
              </motion.div>
             )}
            </AnimatePresence>

            {/* Selected Event Details */}
            <AnimatePresence>
             {selectedEvent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Event Details</h3>
                  <button
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                    className="p-1 rounded-lg hover:bg-red-500/20 transition-colors text-red-400 hover:text-red-300" // Improved styling
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1 font-semibold">Date</p> {/* Added font-semibold */}
                    <p className="text-white">{formatDate(selectedEvent.date)}</p>
                  </div>

                   <div>
                     <p className="text-gray-400 text-sm mb-
