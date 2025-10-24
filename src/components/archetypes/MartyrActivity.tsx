import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Smile, X, Frown } from 'lucide-react';

interface Card {
  id: string;
  scenario: string;
  bucket: 'joyful' | 'boundaried' | 'martyr' | null;
}

const scenarios = [
  "Your boss asks you to work late on a Friday",
  "Your friend asks for a big favor when you're already exhausted",
  "Your partner wants to watch a movie you hate",
  "Your child wants you to play, but you're depleted",
  "A colleague asks you to cover their shift",
  "Your mom wants you to visit this weekend (you need rest)",
  "Someone asks for your help with a project you're not interested in",
  "Your friend needs emotional support, but you're overwhelmed",
  "Your partner wants you to attend a social event you dread",
  "Someone asks you to volunteer for something that doesn't excite you"
];

export function MartyrActivity() {
  const [cards, setCards] = useState<Card[]>(() => {
    const saved = localStorage.getItem('martyr-cards');
    if (saved) return JSON.parse(saved);
    return scenarios.map((scenario, index) => ({
      id: `card-${index}`,
      scenario,
      bucket: null
    }));
  });

  const [draggedCard, setDraggedCard] = useState<string | null>(null);

  const moveCard = (cardId: string, bucket: 'joyful' | 'boundaried' | 'martyr') => {
    const updated = cards.map(card =>
      card.id === cardId ? { ...card, bucket } : card
    );
    setCards(updated);
    localStorage.setItem('martyr-cards', JSON.stringify(updated));
  };

  const resetCards = () => {
    const reset = cards.map(card => ({ ...card, bucket: null }));
    setCards(reset);
    localStorage.setItem('martyr-cards', JSON.stringify(reset));
  };

  const getCardsByBucket = (bucket: 'joyful' | 'boundaried' | 'martyr' | null) => {
    return cards.filter(card => card.bucket === bucket);
  };

  const unsortedCards = getCardsByBucket(null);
  const martyrCards = getCardsByBucket('martyr');

  const Bucket = ({ type, title, icon: Icon, color, description }: {
    type: 'joyful' | 'boundaried' | 'martyr';
    title: string;
    icon: any;
    color: string;
    description: string;
  }) => (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        if (draggedCard) {
          moveCard(draggedCard, type);
          setDraggedCard(null);
        }
      }}
      className={`glass-card p-4 min-h-[200px] border-2 ${
        draggedCard ? 'border-dashed border-white/30' : 'border-transparent'
      } transition-all`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${color}`} />
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <p className="text-xs text-gray-400 mb-4">{description}</p>
      
      <div className="space-y-2">
        {getCardsByBucket(type).map((card) => (
          <motion.div
            key={card.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            draggable
            onDragStart={() => setDraggedCard(card.id)}
            onDragEnd={() => setDraggedCard(null)}
            onClick={() => moveCard(card.id, null as any)}
            className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-move hover:bg-white/10 transition-all group"
          >
            <p className="text-sm text-gray-300">{card.scenario}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                moveCard(card.id, null as any);
              }}
              className="mt-2 text-xs text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
            >
              Reset
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-lg border border-pink-500/30">
        <Heart className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <p className="font-semibold text-white mb-1">The "Yes/No" Need Sorter</p>
          <p>Sort scenarios into three buckets to identify your Martyr pattern. Drag cards or tap to move them.</p>
        </div>
      </div>

      {/* Unsorted Cards */}
      {unsortedCards.length > 0 && (
        <div className="glass-card p-4">
          <h3 className="font-semibold text-white mb-3">Scenarios to Sort</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {unsortedCards.map((card) => (
              <motion.div
                key={card.id}
                layout
                draggable
                onDragStart={() => setDraggedCard(card.id)}
                onDragEnd={() => setDraggedCard(null)}
                className="p-3 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-lg cursor-move hover:border-pink-500/50 transition-all"
              >
                <p className="text-sm text-gray-300">{card.scenario}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => moveCard(card.id, 'joyful')}
                    className="flex-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded hover:bg-green-500/30 transition-all"
                  >
                    Joyful Yes
                  </button>
                  <button
                    onClick={() => moveCard(card.id, 'boundaried')}
                    className="flex-1 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded hover:bg-blue-500/30 transition-all"
                  >
                    Boundaried No
                  </button>
                  <button
                    onClick={() => moveCard(card.id, 'martyr')}
                    className="flex-1 px-2 py-1 bg-pink-500/20 text-pink-400 text-xs rounded hover:bg-pink-500/30 transition-all"
                  >
                    Martyr Yes
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Buckets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Bucket
          type="joyful"
          title="Joyful Yes"
          icon={Smile}
          color="text-green-400"
          description="I want to do this, no strings attached"
        />
        <Bucket
          type="boundaried"
          title="Boundaried No"
          icon={X}
          color="text-blue-400"
          description="I cannot or will not do this"
        />
        <Bucket
          type="martyr"
          title="Martyr Yes"
          icon={Frown}
          color="text-pink-400"
          description="I'll do it... but I'll resent it"
        />
      </div>

      {/* Insights */}
      <AnimatePresence>
        {martyrCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-6 border-l-4 border-pink-500"
          >
            <h3 className="text-lg font-semibold text-white mb-3">💡 Your Martyr Pattern</h3>
            <p className="text-gray-300 mb-4">
              You have <span className="text-pink-400 font-bold">{martyrCards.length}</span> "Martyr Yes" scenarios. 
              These are breeding grounds for resentment.
            </p>
            <p className="text-sm text-gray-400 mb-4">
              <strong className="text-white">Integration Question:</strong> What is ONE "Martyr Yes" you can transform into a "Boundaried No" this week?
            </p>
            <button
              onClick={resetCards}
              className="px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all text-sm"
            >
              Reset All Cards
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
