import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { chapters } from '../data/chapters';
import { useApp } from '../context/AppContext';

const Chapters: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          The Chapters of Transformation
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Each chapter is a gateway to deeper self-understanding. Progress through them at your own
          pace, allowing the wisdom to integrate naturally.
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Your Progress</h3>
            <p className="text-gray-400">
              {user?.progress.chaptersCompleted.length || 0} of {chapters.length} chapters completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-purple-400">
              {Math.round(((user?.progress.chaptersCompleted.length || 0) / chapters.length) * 100)}%
            </div>
            <p className="text-sm text-gray-400">Complete</p>
          </div>
        </div>
        <div className="mt-4 h-3 bg-gray-700/50 rounded-full overflow-hidden">
          <div
            className="progress-bar h-full"
            style={{
              width: `${((user?.progress.chaptersCompleted.length || 0) / chapters.length) * 100}%`,
            }}
          />
        </div>
      </motion.div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter, index) => {
          const isCompleted = user?.progress.chaptersCompleted.includes(chapter.id);
          const isLocked = index > 0 && !user?.progress.chaptersCompleted.includes(chapters[index - 1].id);

          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Link
                to={isLocked ? '#' : `/chapter/${chapter.id}`}
                className={`block chapter-card h-full ${
                  isLocked ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={(e) => isLocked && e.preventDefault()}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    {isLocked ? (
                      <Lock className="w-6 h-6 text-gray-400" />
                    ) : isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-purple-400" />
                    )}
                  </div>
                  {isCompleted && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                      Completed
                    </span>
                  )}
                  {isLocked && (
                    <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs font-semibold rounded-full">
                      Locked
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-serif font-bold text-white mb-2">{chapter.title}</h3>
                <h4 className="text-lg text-purple-400 mb-3">{chapter.subtitle}</h4>
                <p className="text-gray-300 mb-4">{chapter.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{chapter.sections.length} sections</span>
                  {!isLocked && (
                    <span className="text-purple-400 font-semibold group-hover:text-purple-300">
                      {isCompleted ? 'Review' : 'Begin'} →
                    </span>
                  )}
                </div>
              </Link>
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
          "Your visions will become clear only when you can look into your own heart. Who looks
          outside, dreams; who looks inside, awakes."
        </p>
        <p className="text-gray-500">— Carl Jung</p>
      </motion.div>
    </div>
  );
};

export default Chapters;