import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chapters } from '../data/chapters';
import { useApp } from '../context/AppContext';

const ChapterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, completeActivity, completeChapter, addJournalEntry, awardCrystal } = useApp();
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string | boolean }>({});
  const [quizResults, setQuizResults] = useState<{ [key: string]: boolean }>({});
  const [showResults, setShowResults] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [activeActivity, setActiveActivity] = useState<string | null>(null);

  const chapter = chapters.find((c) => c.id === parseInt(id || '0'));

  if (!chapter) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Chapter not found</h1>
        <button onClick={() => navigate('/chapters')} className="btn-primary">
          Return to Chapters
        </button>
      </div>
    );
  }

  const section = chapter.sections[currentSection];
  const isLastSection = currentSection === chapter.sections.length - 1;
  const isChapterCompleted = user?.progress.chaptersCompleted.includes(chapter.id);

  const handleActivityComplete = (activityId: string) => {
    if (journalText.trim()) {
      addJournalEntry({
        type: 'general',
        title: activeActivity || 'Chapter Activity',
        content: journalText,
      });
      completeActivity(activityId);
      setJournalText('');
      setActiveActivity(null);
      awardCrystal();
    }
  };

  const handleQuizSubmit = () => {
    if (!chapter.quiz) return;

    const results: { [key: string]: boolean } = {};
    chapter.quiz.questions.forEach((q) => {
      results[q.id] = quizAnswers[q.id] === q.correctAnswer;
    });
    setQuizResults(results);
    setShowResults(true);

    const allCorrect = Object.values(results).every((r) => r);
    if (allCorrect && !isChapterCompleted) {
      completeChapter(chapter.id);
      awardCrystal();
    }
  };

  const correctCount = Object.values(quizResults).filter((r) => r).length;
  const totalQuestions = chapter.quiz?.questions.length || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <button
          onClick={() => navigate('/chapters')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Chapters</span>
        </button>
        {isChapterCompleted && (
          <div className="flex items-center space-x-2 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Completed</span>
          </div>
        )}
      </motion.div>

      {/* Chapter Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-8 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {chapter.title}
        </h1>
        <h2 className="text-2xl text-purple-300 mb-4">{chapter.subtitle}</h2>
        <p className="text-gray-300 text-lg">{chapter.description}</p>
      </motion.div>

      {/* Section Navigation */}
      {!showQuiz && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Sections</h3>
            <span className="text-sm text-gray-400">
              {currentSection + 1} of {chapter.sections.length}
            </span>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {chapter.sections.map((s, index) => (
              <button
                key={s.id}
                onClick={() => setCurrentSection(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all ${
                  index === currentSection
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        {!showQuiz ? (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-8 space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold text-white mb-6">{section.title}</h2>

            <div className="prose prose-invert prose-lg max-w-none">
              {section.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Activities */}
            {section.activities && section.activities.length > 0 && (
              <div className="mt-8 space-y-4">
                <h3 className="text-2xl font-serif font-bold text-white mb-4">
                  Reflective Activities
                </h3>
                {section.activities.map((activity) => {
                  const isCompleted = user?.progress.activitiesCompleted.includes(activity.id);
                  const isActive = activeActivity === activity.id;

                  return (
                    <div
                      key={activity.id}
                      className="p-6 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                          )}
                          <h4 className="text-xl font-semibold text-white">{activity.title}</h4>
                        </div>
                        {isCompleted && (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 mb-4 ml-9">{activity.description}</p>

                      {!isCompleted && (
                        <div className="ml-9">
                          {!isActive ? (
                            <button
                              onClick={() => setActiveActivity(activity.id)}
                              className="btn-secondary"
                            >
                              Begin Activity
                            </button>
                          ) : (
                            <div className="space-y-4">
                              <textarea
                                value={journalText}
                                onChange={(e) => setJournalText(e.target.value)}
                                placeholder="Write your reflections here..."
                                className="input-field min-h-[200px] resize-y"
                              />
                              <div className="flex space-x-3">
                                <button
                                  onClick={() => handleActivityComplete(activity.id)}
                                  disabled={!journalText.trim()}
                                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Save & Complete
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveActivity(null);
                                    setJournalText('');
                                  }}
                                  className="btn-secondary"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Section
              </button>

              {isLastSection && chapter.quiz ? (
                <button onClick={() => setShowQuiz(true)} className="btn-primary">
                  Take Chapter Quiz
                </button>
              ) : (
                <button
                  onClick={() =>
                    setCurrentSection(Math.min(chapter.sections.length - 1, currentSection + 1))
                  }
                  disabled={isLastSection}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Section
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-white mb-3">Chapter Quiz</h2>
              <p className="text-gray-300">
                Test your understanding of the concepts covered in this chapter.
              </p>
            </div>

            {chapter.quiz?.questions.map((question, index) => (
              <div key={question.id} className="p-6 bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {index + 1}. {question.question}
                </h3>

                {question.type === 'true-false' ? (
                  <div className="space-y-2">
                    {[true, false].map((option) => (
                      <label
                        key={option.toString()}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                          quizAnswers[question.id] === option
                            ? 'bg-purple-500/20 border border-purple-500'
                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                        } ${
                          showResults &&
                          (quizResults[question.id]
                            ? quizAnswers[question.id] === option
                              ? 'border-green-500 bg-green-500/20'
                              : ''
                            : quizAnswers[question.id] === option
                            ? 'border-red-500 bg-red-500/20'
                            : option === question.correctAnswer
                            ? 'border-green-500 bg-green-500/20'
                            : '')
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          checked={quizAnswers[question.id] === option}
                          onChange={() =>
                            setQuizAnswers({ ...quizAnswers, [question.id]: option })
                          }
                          disabled={showResults}
                          className="text-purple-500"
                        />
                        <span className="text-white">{option ? 'True' : 'False'}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {question.options?.map((option) => (
                      <label
                        key={option}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                          quizAnswers[question.id] === option
                            ? 'bg-purple-500/20 border border-purple-500'
                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                        } ${
                          showResults &&
                          (quizResults[question.id]
                            ? quizAnswers[question.id] === option
                              ? 'border-green-500 bg-green-500/20'
                              : ''
                            : quizAnswers[question.id] === option
                            ? 'border-red-500 bg-red-500/20'
                            : option === question.correctAnswer
                            ? 'border-green-500 bg-green-500/20'
                            : '')
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          checked={quizAnswers[question.id] === option}
                          onChange={() =>
                            setQuizAnswers({ ...quizAnswers, [question.id]: option })
                          }
                          disabled={showResults}
                          className="text-purple-500"
                        />
                        <span className="text-white">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {showResults && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${
                      quizResults[question.id]
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-red-500/10 border border-red-500/30'
                    }`}
                  >
                    <p
                      className={`font-semibold mb-2 ${
                        quizResults[question.id] ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {quizResults[question.id] ? '✓ Correct!' : '✗ Incorrect'}
                    </p>
                    <p className="text-gray-300 text-sm">{question.explanation}</p>
                  </div>
                )}
              </div>
            ))}

            {!showResults ? (
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button onClick={() => setShowQuiz(false)} className="btn-secondary">
                  Back to Chapter
                </button>
                <button
                  onClick={handleQuizSubmit}
                  disabled={
                    Object.keys(quizAnswers).length !== chapter.quiz?.questions.length
                  }
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Quiz
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="glass-card p-6 text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <Sparkles className="w-8 h-8 text-gold-400 crystal-glow" />
                    <h3 className="text-2xl font-bold text-white">
                      Quiz Complete!
                    </h3>
                  </div>
                  <p className="text-xl text-gray-300 mb-2">
                    You scored {correctCount} out of {totalQuestions}
                  </p>
                  {correctCount === totalQuestions && !isChapterCompleted && (
                    <p className="text-green-400 font-semibold">
                      🎉 Chapter completed! You earned an Insight Crystal!
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setShowQuiz(false);
                      setShowResults(false);
                      setQuizAnswers({});
                      setQuizResults({});
                    }}
                    className="btn-secondary"
                  >
                    Review Chapter
                  </button>
                  <button onClick={() => navigate('/chapters')} className="btn-primary">
                    Return to Chapters
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChapterDetail;