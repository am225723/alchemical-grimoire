import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ChevronLeft, BarChart3, X } from 'lucide-react';

interface Trigger {
  id: string;
  text: string;
  archetype: 'tyrant' | 'victim' | 'martyr' | 'saboteur' | 'judge' | 'rebel';
}

interface TriggerIdentifierProps {
  onClose?: () => void;
  onComplete?: (results: ArchetypeScores) => void;
}

interface ArchetypeScores {
  tyrant: number;
  victim: number;
  martyr: number;
  saboteur: number;
  judge: number;
  rebel: number;
}

const triggers: Trigger[] = [
  // Tyrant triggers (control, perfectionism) - 5 triggers
  { id: '1', text: "When someone is lazy and doesn't pull their weight", archetype: 'tyrant' },
  { id: '2', text: "When things don't go according to plan", archetype: 'tyrant' },
  { id: '3', text: "When someone does something inefficiently or 'the wrong way'", archetype: 'tyrant' },
  { id: '4', text: "When someone breaks the rules just for the sake of it", archetype: 'tyrant' },
  { id: '5', text: "When people are incompetent or can't do things correctly", archetype: 'tyrant' },
  
  // Victim triggers (helplessness, blame) - 5 triggers
  { id: '6', text: "When I feel powerless to change my circumstances", archetype: 'victim' },
  { id: '7', text: "When others seem to have it easier than me", archetype: 'victim' },
  { id: '8', text: "When people don't understand how hard things are for me", archetype: 'victim' },
  { id: '9', text: "When I feel like life is unfair to me", archetype: 'victim' },
  { id: '10', text: "When circumstances beyond my control ruin my plans", archetype: 'victim' },
  
  // Martyr triggers (self-sacrifice, resentment) - 5 triggers
  { id: '11', text: "When my efforts go unnoticed or unappreciated", archetype: 'martyr' },
  { id: '12', text: "When others ask for help but don't reciprocate", archetype: 'martyr' },
  { id: '13', text: "When someone sets boundaries with me", archetype: 'martyr' },
  { id: '14', text: "When I feel taken advantage of after helping others", archetype: 'martyr' },
  { id: '15', text: "When others don't acknowledge my sacrifices", archetype: 'martyr' },
  
  // Saboteur triggers (self-undermining, fear of success) - 5 triggers
  { id: '16', text: "When I'm close to achieving a goal and suddenly lose motivation", archetype: 'saboteur' },
  { id: '17', text: "When someone procrastinates on important things", archetype: 'saboteur' },
  { id: '18', text: "When perfectionism prevents me from finishing projects", archetype: 'saboteur' },
  { id: '19', text: "When I sabotage my own success or opportunities", archetype: 'saboteur' },
  { id: '20', text: "When I find myself making excuses for not following through", archetype: 'saboteur' },
  
  // Judge triggers (criticism, perfectionism) - 5 triggers
  { id: '21', text: "When someone is highly critical or judgmental of others", archetype: 'judge' },
  { id: '22', text: "When people don't meet my standards", archetype: 'judge' },
  { id: '23', text: "When I make a mistake or look foolish", archetype: 'judge' },
  { id: '24', text: "When someone is arrogant or acts superior", archetype: 'judge' },
  { id: '25', text: "When people are sloppy, careless, or mediocre", archetype: 'judge' },
  
  // Rebel triggers (authority, control) - 5 triggers
  { id: '26', text: "When authority figures tell me what to do", archetype: 'rebel' },
  { id: '27', text: "When I feel pressured to conform or fit in", archetype: 'rebel' },
  { id: '28', text: "When someone tries to control my choices or freedom", archetype: 'rebel' },
  { id: '29', text: "When I'm expected to follow rules I don't agree with", archetype: 'rebel' },
  { id: '30', text: "When someone is a 'control freak' and tries to micromanage me", archetype: 'rebel' }
];

const TriggerIdentifier: React.FC<TriggerIdentifierProps> = ({ onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<ArchetypeScores | null>(null);

  const currentTrigger = triggers[currentIndex];
  const progress = ((currentIndex + 1) / triggers.length) * 100;
  const isLastTrigger = currentIndex === triggers.length - 1;

  const handleResponse = (rating: number) => {
    const newResponses = { ...responses, [currentTrigger.id]: rating };
    setResponses(newResponses);

    if (isLastTrigger) {
      calculateResults(newResponses);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const calculateResults = (finalResponses: Record<string, number>) => {
    const scores: ArchetypeScores = {
      tyrant: 0,
      victim: 0,
      martyr: 0,
      saboteur: 0,
      judge: 0,
      rebel: 0
    };

    triggers.forEach(trigger => {
      const rating = finalResponses[trigger.id] || 0;
      scores[trigger.archetype] += rating;
    });

    // Normalize scores to percentage
    const maxPossibleScore = 10; // 5 triggers per archetype * 2 max rating
    const normalizedScores: ArchetypeScores = {
      tyrant: Math.round((scores.tyrant / maxPossibleScore) * 100),
      victim: Math.round((scores.victim / maxPossibleScore) * 100),
      martyr: Math.round((scores.martyr / maxPossibleScore) * 100),
      saboteur: Math.round((scores.saboteur / maxPossibleScore) * 100),
      judge: Math.round((scores.judge / maxPossibleScore) * 100),
      rebel: Math.round((scores.rebel / maxPossibleScore) * 100)
    };

    setResults(normalizedScores);
    setShowResults(true);

    // Save to localStorage
    localStorage.setItem('triggerIdentifierResults', JSON.stringify({
      scores: normalizedScores,
      date: new Date().toISOString(),
      responses: finalResponses
    }));

    if (onComplete) {
      onComplete(normalizedScores);
    }
  };

  const getTopArchetypes = () => {
    if (!results) return [];
    const entries = Object.entries(results) as [keyof ArchetypeScores, number][];
    return entries
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .filter(([_, score]) => score > 0);
  };

  const getArchetypeName = (archetype: string) => {
    const names: Record<string, string> = {
      tyrant: 'The Tyrant',
      victim: 'The Victim',
      martyr: 'The Martyr',
      saboteur: 'The Saboteur',
      judge: 'The Judge',
      rebel: 'The Rebel'
    };
    return names[archetype] || archetype;
  };

  const getArchetypeDescription = (archetype: string) => {
    const descriptions: Record<string, string> = {
      tyrant: 'Your need for control and perfection may be protecting you from vulnerability and chaos.',
      victim: 'You may feel powerless in situations, believing life happens to you rather than for you.',
      martyr: 'Your over-giving and self-sacrifice may be driven by a need for validation and worth.',
      saboteur: 'You may undermine your own success as a twisted form of self-protection.',
      judge: 'Your critical inner voice may be a projection of your own insecurities and fears.',
      rebel: 'Your defiance of authority may be a reaction against feeling controlled or trapped.'
    };
    return descriptions[archetype] || '';
  };

  const getArchetypeColor = (archetype: string) => {
    const colors: Record<string, string> = {
      tyrant: 'from-red-500/20 to-orange-500/20 border-red-500/30',
      victim: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
      martyr: 'from-pink-500/20 to-rose-500/20 border-pink-500/30',
      saboteur: 'from-purple-500/20 to-violet-500/20 border-purple-500/30',
      judge: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30',
      rebel: 'from-green-500/20 to-emerald-500/20 border-green-500/30'
    };
    return colors[archetype] || 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
  };

  if (showResults && results) {
    const topArchetypes = getTopArchetypes();

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-4">
        <div className="max-w-4xl mx-auto pt-20">
          {/* Header */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-purple-400" />
                Your Shadow Profile
              </h1>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-300" />
                </button>
              )}
            </div>
            <p className="text-gray-300">
              Based on your responses, here are the shadow archetypes most active in your life right now.
            </p>
          </div>

          {/* Top Archetypes */}
          <div className="space-y-4 mb-6">
            {topArchetypes.map(([archetype, score], index) => (
              <motion.div
                key={archetype}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${getArchetypeColor(archetype)} border`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {index === 0 && '🥇 '}
                      {index === 1 && '🥈 '}
                      {index === 2 && '🥉 '}
                      {getArchetypeName(archetype)}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {getArchetypeDescription(archetype)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-white">{score}%</div>
                    <div className="text-xs text-gray-400">Activity Level</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* All Scores */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Complete Shadow Profile</h3>
            <div className="space-y-3">
              {Object.entries(results)
                .sort((a, b) => b[1] - a[1])
                .map(([archetype, score]) => (
                  <div key={archetype} className="flex items-center gap-4">
                    <div className="w-32 text-gray-300 text-sm">{getArchetypeName(archetype)}</div>
                    <div className="flex-1 bg-black/30 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <div className="w-12 text-right text-white font-semibold">{score}%</div>
                  </div>
                ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="glass-card rounded-2xl p-6 mt-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-3">📚 Next Steps</h3>
            <p className="text-gray-300 mb-4">
              Now that you know which archetypes are most active, explore each one in depth. Click on the Archetypes page to learn about their patterns, triggers, and how to integrate their shadow and gold aspects.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = '/archetypes'}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
              >
                Explore Archetypes
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-white/10 rounded-lg text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 p-4">
      <div className="max-w-3xl mx-auto pt-20">
        {/* Header */}
        <div className="glass-card rounded-t-2xl p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <AlertCircle className="w-7 h-7 text-purple-400" />
              The Trigger Identifier
            </h1>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            )}
          </div>
          <p className="text-gray-300 text-sm mb-4">
            A trigger is a "shadow-sighting" - a compass pointing to an unhealed part of you. Rate how strongly each of the 30 situations affects you (5 per archetype).
          </p>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Question {currentIndex + 1} of {triggers.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="glass-card rounded-b-2xl p-8"
          >
            <div className="mb-8">
              <p className="text-xl text-white leading-relaxed">
                {currentTrigger.text}
              </p>
            </div>

            {/* Response Options */}
            <div className="space-y-3">
              <button
                onClick={() => handleResponse(0)}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 hover:border-green-500/50 text-white text-left transition-all transform hover:scale-105"
              >
                <div className="font-semibold mb-1">0 - Doesn't bother me</div>
                <div className="text-sm text-gray-300">This situation has little to no emotional impact on me.</div>
              </button>

              <button
                onClick={() => handleResponse(1)}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border border-yellow-500/30 hover:border-yellow-500/50 text-white text-left transition-all transform hover:scale-105"
              >
                <div className="font-semibold mb-1">1 - Annoying</div>
                <div className="text-sm text-gray-300">This bothers me and I notice it, but it's manageable.</div>
              </button>

              <button
                onClick={() => handleResponse(2)}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 hover:border-red-500/50 text-white text-left transition-all transform hover:scale-105"
              >
                <div className="font-semibold mb-1">2 - Makes me deeply angry/anxious</div>
                <div className="text-sm text-gray-300">This triggers a strong emotional reaction in me.</div>
              </button>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentIndex === 0
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="text-gray-400 text-sm">
                {responses[currentTrigger.id] !== undefined && (
                  <span className="text-purple-400">✓ Answered</span>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TriggerIdentifier;
