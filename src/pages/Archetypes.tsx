import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Archetypes: React.FC = () => {
  const { archetypes, claimArchetype } = useApp();
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const handleCardClick = (id: string) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const claimedArchetypes = archetypes.filter((a) => a.claimed);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          The Archetype Explorer
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover the universal patterns that shape human experience. Each archetype represents a
          facet of the collective unconscious, offering insights into your own psyche.
        </p>
      </motion.div>

      {/* Inner Council */}
      {claimedArchetypes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Sparkles className="w-6 h-6 text-gold-400 crystal-glow" />
            <h2 className="text-2xl font-serif font-bold text-white">Your Inner Council</h2>
          </div>
          <p className="text-gray-300 mb-6">
            These are the archetypes you've recognized and claimed as active in your life. By
            acknowledging them, you begin the process of integration.
          </p>
          <div className="flex flex-wrap gap-3">
            {claimedArchetypes.map((archetype) => (
              <div
                key={archetype.id}
                className="px-4 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 rounded-full text-white font-semibold flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{archetype.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 bg-purple-900/20 border-purple-500/30"
      >
        <p className="text-gray-300 text-center">
          <span className="font-semibold text-purple-400">Click a card</span> to reveal its deeper
          meaning. <span className="font-semibold text-purple-400">Claim an archetype</span> when
          you recognize its pattern in your life.
        </p>
      </motion.div>

      {/* Archetype Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {archetypes.map((archetype, index) => {
          const isFlipped = flippedCards.has(archetype.id);

          return (
            <motion.div
              key={archetype.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="relative h-[400px] perspective-1000"
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                onClick={() => handleCardClick(archetype.id)}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front of card */}
                <div
                  className="absolute inset-0 glass-card overflow-hidden backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={archetype.imageUrl}
                      alt={archetype.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-serif font-bold text-white mb-3">
                      {archetype.name}
                    </h3>
                    <p className="text-gray-300 line-clamp-3">{archetype.description}</p>
                    <div className="mt-4 text-center">
                      <span className="text-sm text-purple-400 font-semibold">
                        Click to reveal more →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 glass-card p-6 backface-hidden overflow-y-auto"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <h3 className="text-2xl font-serif font-bold text-white mb-4">
                    {archetype.name}
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-purple-400 uppercase mb-2">
                        Core Fears
                      </h4>
                      <ul className="space-y-1">
                        {archetype.fears.map((fear, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start">
                            <span className="text-purple-400 mr-2">•</span>
                            {fear}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-green-400 uppercase mb-2">
                        Integrated Potential
                      </h4>
                      <p className="text-gray-300 text-sm">{archetype.integratedPotential}</p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      claimArchetype(archetype.id);
                    }}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      archetype.claimed
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                    }`}
                  >
                    {archetype.claimed ? (
                      <span className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Claimed</span>
                      </span>
                    ) : (
                      'Claim This Archetype'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Jung Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-8 text-center"
      >
        <p className="text-xl text-gray-300 italic mb-3">
          "The archetype is a tendency to form representations of a motif—representations that can
          vary a great deal in detail without losing their basic pattern."
        </p>
        <p className="text-gray-500">— Carl Jung</p>
      </motion.div>

      {/* Archetype Detail Modal */}
      <AnimatePresence>
        {selectedArchetype && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArchetype(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-3xl font-serif font-bold text-white">
                  {archetypes.find((a) => a.id === selectedArchetype)?.name}
                </h2>
                <button
                  onClick={() => setSelectedArchetype(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {/* Modal content would go here */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Archetypes;