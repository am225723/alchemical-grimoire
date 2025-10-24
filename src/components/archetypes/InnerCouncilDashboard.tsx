import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Shield, Heart, Flame, Scale, Zap, TrendingUp, Lightbulb, Calendar } from 'lucide-react';

interface ArchetypeVolume {
  id: string;
  name: string;
  volume: number;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  activity: string;
}

interface WeeklyCheck {
  timestamp: number;
  volumes: { [key: string]: number };
}

const archetypeData: ArchetypeVolume[] = [
  {
    id: 'tyrant',
    name: 'The Tyrant',
    volume: 0,
    icon: Crown,
    gradient: 'from-red-600 to-orange-600',
    activity: 'Your Tyrant is loud. This is a sign you\'re trying to control too much. Use the Control-Fear Matrix to identify what you\'re truly afraid of.'
  },
  {
    id: 'victim',
    name: 'The Victim',
    volume: 0,
    icon: Shield,
    gradient: 'from-blue-600 to-indigo-600',
    activity: 'Your Victim is active. You\'re giving away power. Use the Victim-to-Victor Reframer to find where you have control.'
  },
  {
    id: 'martyr',
    name: 'The Martyr',
    volume: 0,
    icon: Heart,
    gradient: 'from-pink-600 to-rose-600',
    activity: 'Your Martyr is loud. This is a sign you\'re ignoring your own needs. Use the Yes/No Need Sorter to practice a Boundaried No today.'
  },
  {
    id: 'saboteur',
    name: 'The Saboteur',
    volume: 0,
    icon: Flame,
    gradient: 'from-purple-600 to-violet-600',
    activity: 'Your Saboteur is undermining you. Write a Letter from Your Saboteur to understand what it\'s trying to protect you from.'
  },
  {
    id: 'judge',
    name: 'The Judge',
    volume: 0,
    icon: Scale,
    gradient: 'from-amber-600 to-yellow-600',
    activity: 'Your Judge is also active. Use the Judgment Tracker to find the value hidden in your self-criticism.'
  },
  {
    id: 'rebel',
    name: 'The Rebel',
    volume: 0,
    icon: Zap,
    gradient: 'from-cyan-600 to-teal-600',
    activity: 'Your Rebel is resisting. Practice the Reactive vs. Authentic No quiz to distinguish between self-sabotage and true autonomy.'
  }
];

export function InnerCouncilDashboard() {
  const [volumes, setVolumes] = useState<{ [key: string]: number }>(() => {
    const saved = localStorage.getItem('archetype-volumes');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.current || {};
    }
    return archetypeData.reduce((acc, arch) => ({ ...acc, [arch.id]: 0 }), {});
  });

  const [checkIns, setCheckIns] = useState<WeeklyCheck[]>(() => {
    const saved = localStorage.getItem('archetype-check-ins');
    return saved ? JSON.parse(saved) : [];
  });

  const handleVolumeChange = (id: string, value: number) => {
    const updated = { ...volumes, [id]: value };
    setVolumes(updated);
    localStorage.setItem('archetype-volumes', JSON.stringify({ current: updated }));
  };

  const saveCheckIn = () => {
    const checkIn: WeeklyCheck = {
      timestamp: Date.now(),
      volumes: { ...volumes }
    };
    const updated = [checkIn, ...checkIns].slice(0, 10); // Keep last 10 check-ins
    setCheckIns(updated);
    localStorage.setItem('archetype-check-ins', JSON.stringify(updated));
  };

  // Get top 3 loudest archetypes
  const loudestArchetypes = archetypeData
    .map(arch => ({ ...arch, volume: volumes[arch.id] || 0 }))
    .filter(arch => arch.volume > 0)
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 3);

  const primaryArchetype = loudestArchetypes[0];
  const secondaryArchetype = loudestArchetypes[1];

  const totalVolume = Object.values(volumes).reduce((sum, v) => sum + v, 0);
  const averageVolume = totalVolume / archetypeData.length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center space-x-2 glass-card px-6 py-3 rounded-full mb-4">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <span className="text-slate-300">Shadow Integration Tracker</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Your Inner Council
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          These archetypes are not enemies to vanquish—they're parts of you to understand. 
          You are the CEO, and they are your Inner Council, each with a valuable perspective.
        </p>
      </motion.div>

      {/* Weekly Check-In */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-400" />
            Weekly Check-In
          </h2>
          {checkIns.length > 0 && (
            <p className="text-sm text-gray-400">
              Last check-in: {new Date(checkIns[0].timestamp).toLocaleDateString()}
            </p>
          )}
        </div>
        
        <p className="text-gray-300 mb-6">
          Who is "loudest" on your council this week? Adjust the sliders based on how active each archetype feels in your life right now.
        </p>

        {/* Sliders */}
        <div className="space-y-6">
          {archetypeData.map((archetype, index) => {
            const IconComponent = archetype.icon;
            const volume = volumes[archetype.id] || 0;
            
            return (
              <motion.div
                key={archetype.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${archetype.gradient} p-2`}>
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                    <span className="font-semibold text-white">{archetype.name}</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{volume}%</span>
                </div>
                
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => handleVolumeChange(archetype.id, parseInt(e.target.value))}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-white/10"
                    style={{
                      background: `linear-gradient(to right, 
                        rgb(var(--tw-gradient-from)) 0%, 
                        rgb(var(--tw-gradient-to)) ${volume}%, 
                        rgba(255,255,255,0.1) ${volume}%, 
                        rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                  <style>{`
                    input[type="range"]::-webkit-slider-thumb {
                      appearance: none;
                      width: 24px;
                      height: 24px;
                      border-radius: 50%;
                      background: linear-gradient(135deg, var(--tw-gradient-stops));
                      cursor: pointer;
                      border: 3px solid white;
                      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                    }
                    input[type="range"]::-moz-range-thumb {
                      width: 24px;
                      height: 24px;
                      border-radius: 50%;
                      background: linear-gradient(135deg, var(--tw-gradient-stops));
                      cursor: pointer;
                      border: 3px solid white;
                      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                    }
                  `}</style>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={saveCheckIn}
          disabled={totalVolume === 0}
          className="mt-8 w-full px-6 py-3 bg-gradient-modern text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save This Week's Check-In
        </motion.button>
      </motion.div>

      {/* Dynamic Insights */}
      {loudestArchetypes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            Your Integration To-Do's
          </h2>

          {/* Primary Archetype */}
          {primaryArchetype && (
            <div className={`glass-card p-6 border-l-4 bg-gradient-to-r ${primaryArchetype.gradient} bg-opacity-5`}
              style={{ borderLeftColor: `rgb(var(--tw-gradient-from))` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${primaryArchetype.gradient} p-2 flex-shrink-0`}>
                  <primaryArchetype.icon className="w-full h-full text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Primary: {primaryArchetype.name} ({primaryArchetype.volume}%)
                  </h3>
                  <p className="text-gray-300">{primaryArchetype.activity}</p>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Archetype */}
          {secondaryArchetype && (
            <div className={`glass-card p-6 border-l-4 bg-gradient-to-r ${secondaryArchetype.gradient} bg-opacity-5`}
              style={{ borderLeftColor: `rgb(var(--tw-gradient-from))` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${secondaryArchetype.gradient} p-2 flex-shrink-0`}>
                  <secondaryArchetype.icon className="w-full h-full text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Secondary: {secondaryArchetype.name} ({secondaryArchetype.volume}%)
                  </h3>
                  <p className="text-gray-300">{secondaryArchetype.activity}</p>
                </div>
              </div>
            </div>
          )}

          {/* Overall Pattern */}
          <div className="glass-card p-6 bg-purple-500/5 border border-purple-500/20">
            <h3 className="text-lg font-bold text-purple-400 mb-2">Pattern Insight</h3>
            <p className="text-gray-300">
              {averageVolume > 60 
                ? '⚠️ Your Inner Council is very loud this week. This suggests a period of intense inner work or external stress. Be gentle with yourself and prioritize self-care.'
                : averageVolume > 30
                ? '💡 Moderate archetype activity. This is normal—these parts are always present. The key is conscious awareness and integration.'
                : averageVolume > 0
                ? '✨ Relatively quiet council. Either you\'re in a balanced period, or you\'re not yet fully aware of these patterns. Stay curious.'
                : '🌟 Check in honestly—everyone has active archetypes. If nothing registers, spend time in self-reflection this week.'
              }
            </p>
          </div>
        </motion.div>
      )}

      {/* Check-In History */}
      {checkIns.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Check-In History</h2>
          <div className="space-y-3">
            {checkIns.slice(0, 5).map((checkIn, index) => {
              const topArchetype = Object.entries(checkIn.volumes)
                .sort(([, a], [, b]) => (b as number) - (a as number))[0];
              const archetypeName = archetypeData.find(a => a.id === topArchetype[0])?.name;
              
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">
                      {new Date(checkIn.timestamp).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-400">
                      Primary: {archetypeName} ({topArchetype[1]}%)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Total: {Object.values(checkIn.volumes).reduce((sum: number, v) => sum + (v as number), 0) / 6}% avg
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
