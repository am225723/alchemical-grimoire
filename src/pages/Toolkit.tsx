import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Target,
  Moon,
  Mail,
  TrendingUp,
  Calendar,
  Sparkles,
  Plus,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Toolkit: React.FC = () => {
  const {
    journalEntries,
    addJournalEntry,
    triggers,
    addTrigger,
    timeCapsules,
    addTimeCapsule,
    openTimeCapsule,
    dreamLogs,
    addDreamLog,
    awardCrystal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'journal' | 'triggers' | 'capsule' | 'dreams' | 'insights'
  >('journal');

  // Journal state
  const [journalTitle, setJournalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [journalType, setJournalType] = useState<'general' | 'inner-child' | 'shadow' | 'dream'>(
    'general'
  );

  // Trigger state
  const [triggerSituation, setTriggerSituation] = useState('');
  const [triggerEmotions, setTriggerEmotions] = useState<
    { emotion: string; intensity: number }[]
  >([]);
  const [triggerMemories, setTriggerMemories] = useState('');
  const [triggerSensations, setTriggerSensations] = useState('');
  const [showEmotionForm, setShowEmotionForm] = useState(false);
  const [newEmotion, setNewEmotion] = useState('');
  const [newIntensity, setNewIntensity] = useState(5);

  // Time Capsule state
  const [capsuleLetter, setCapsuleLetter] = useState('');
  const [capsuleDate, setCapsuleDate] = useState('');

  // Dream state
  const [dreamTitle, setDreamTitle] = useState('');
  const [dreamDescription, setDreamDescription] = useState('');
  const [dreamCharacters, setDreamCharacters] = useState('');
  const [dreamSymbols, setDreamSymbols] = useState('');
  const [dreamEmotions, setDreamEmotions] = useState('');

  const handleJournalSubmit = () => {
    if (journalTitle.trim() && journalContent.trim()) {
      addJournalEntry({
        type: journalType,
        title: journalTitle,
        content: journalContent,
      });
      setJournalTitle('');
      setJournalContent('');
      awardCrystal();
    }
  };

  const handleTriggerSubmit = () => {
    if (triggerSituation.trim() && triggerEmotions.length > 0) {
      addTrigger({
        situation: triggerSituation,
        emotions: triggerEmotions,
        memories: triggerMemories,
        physicalSensations: triggerSensations,
      });
      setTriggerSituation('');
      setTriggerEmotions([]);
      setTriggerMemories('');
      setTriggerSensations('');
      awardCrystal();
    }
  };

  const handleAddEmotion = () => {
    if (newEmotion.trim()) {
      setTriggerEmotions([...triggerEmotions, { emotion: newEmotion, intensity: newIntensity }]);
      setNewEmotion('');
      setNewIntensity(5);
      setShowEmotionForm(false);
    }
  };

  const handleCapsuleSubmit = () => {
    if (capsuleLetter.trim() && capsuleDate) {
      addTimeCapsule({
        letter: capsuleLetter,
        openDate: capsuleDate,
        opened: false,
      });
      setCapsuleLetter('');
      setCapsuleDate('');
      awardCrystal();
    }
  };

  const handleDreamSubmit = () => {
    if (dreamTitle.trim() && dreamDescription.trim()) {
      addDreamLog({
        title: dreamTitle,
        description: dreamDescription,
        characters: dreamCharacters.split(',').map((c) => c.trim()).filter(Boolean),
        symbols: dreamSymbols.split(',').map((s) => s.trim()).filter(Boolean),
        emotions: dreamEmotions.split(',').map((e) => e.trim()).filter(Boolean),
      });
      setDreamTitle('');
      setDreamDescription('');
      setDreamCharacters('');
      setDreamSymbols('');
      setDreamEmotions('');
      awardCrystal();
    }
  };

  const tabs = [
    { id: 'journal', name: 'Journal', icon: BookOpen },
    { id: 'triggers', name: 'Trigger Tracker', icon: Target },
    { id: 'capsule', name: 'Time Capsule', icon: Mail },
    { id: 'dreams', name: 'Dream Log', icon: Moon },
    { id: 'insights', name: 'Insights', icon: TrendingUp },
  ];

  const readyCapsules = timeCapsules.filter(
    (c) => !c.opened && new Date(c.openDate) <= new Date()
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          The Alchemist's Toolkit
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Tools for deep self-exploration, tracking patterns, and cultivating awareness.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-2"
      >
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Journal Tab */}
        {activeTab === 'journal' && (
          <>
            <div className="glass-card p-8">
              <h2 className="text-2xl font-serif font-bold text-white mb-6">
                Create Journal Entry
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Entry Type
                  </label>
                  <select
                    value={journalType}
                    onChange={(e) => setJournalType(e.target.value as any)}
                    className="input-field"
                  >
                    <option value="general">General Reflection</option>
                    <option value="inner-child">Inner Child Work</option>
                    <option value="shadow">Shadow Work</option>
                    <option value="dream">Dream Analysis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={journalTitle}
                    onChange={(e) => setJournalTitle(e.target.value)}
                    placeholder="Give your entry a title..."
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Your Reflection
                  </label>
                  <textarea
                    value={journalContent}
                    onChange={(e) => setJournalContent(e.target.value)}
                    placeholder="Write your thoughts, feelings, and insights..."
                    className="input-field min-h-[300px] resize-y"
                  />
                </div>

                <button
                  onClick={handleJournalSubmit}
                  disabled={!journalTitle.trim() || !journalContent.trim()}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Entry
                </button>
              </div>
            </div>

            {/* Recent Entries */}
            {journalEntries.length > 0 && (
              <div className="glass-card p-8">
                <h3 className="text-xl font-serif font-bold text-white mb-6">Recent Entries</h3>
                <div className="space-y-4">
                  {journalEntries.slice(0, 5).map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white">{entry.title}</h4>
                          <span className="text-xs text-purple-400 capitalize">{entry.type}</span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-3">{entry.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Trigger Tracker Tab */}
        {activeTab === 'triggers' && (
          <>
            <div className="glass-card p-8">
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Log a Trigger</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Situation
                  </label>
                  <textarea
                    value={triggerSituation}
                    onChange={(e) => setTriggerSituation(e.target.value)}
                    placeholder="Describe what happened..."
                    className="input-field min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Emotions Felt
                  </label>
                  <div className="space-y-2 mb-3">
                    {triggerEmotions.map((emotion, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                      >
                        <div className="flex-1">
                          <span className="text-white font-semibold">{emotion.emotion}</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-400">Intensity:</span>
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden max-w-[200px]">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                style={{ width: `${emotion.intensity * 10}%` }}
                              />
                            </div>
                            <span className="text-sm text-white">{emotion.intensity}/10</span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setTriggerEmotions(triggerEmotions.filter((_, i) => i !== index))
                          }
                          className="text-red-400 hover:text-red-300 ml-4"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {!showEmotionForm ? (
                    <button
                      onClick={() => setShowEmotionForm(true)}
                      className="btn-secondary w-full"
                    >
                      <Plus className="w-5 h-5 inline mr-2" />
                      Add Emotion
                    </button>
                  ) : (
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                      <input
                        type="text"
                        value={newEmotion}
                        onChange={(e) => setNewEmotion(e.target.value)}
                        placeholder="Emotion name (e.g., Anger, Sadness, Fear)"
                        className="input-field"
                      />
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Intensity: {newIntensity}/10
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={newIntensity}
                          onChange={(e) => setNewIntensity(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={handleAddEmotion} className="btn-primary flex-1">
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setShowEmotionForm(false);
                            setNewEmotion('');
                            setNewIntensity(5);
                          }}
                          className="btn-secondary flex-1"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Associated Memories
                  </label>
                  <textarea
                    value={triggerMemories}
                    onChange={(e) => setTriggerMemories(e.target.value)}
                    placeholder="What memories came up?"
                    className="input-field min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Physical Sensations
                  </label>
                  <textarea
                    value={triggerSensations}
                    onChange={(e) => setTriggerSensations(e.target.value)}
                    placeholder="What did you feel in your body?"
                    className="input-field min-h-[100px]"
                  />
                </div>

                <button
                  onClick={handleTriggerSubmit}
                  disabled={!triggerSituation.trim() || triggerEmotions.length === 0}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Log Trigger
                </button>
              </div>
            </div>

            {/* Pattern Analysis */}
            {triggers.length >= 5 && (
              <div className="glass-card p-8 bg-purple-900/20 border-purple-500/30">
                <div className="flex items-center space-x-3 mb-4">
                  <Sparkles className="w-6 h-6 text-gold-400 crystal-glow" />
                  <h3 className="text-xl font-serif font-bold text-white">
                    Pattern Analysis Available
                  </h3>
                </div>
                <p className="text-gray-300 mb-4">
                  You've logged {triggers.length} triggers. The Alchemist can now help you identify
                  patterns and explore root causes.
                </p>
                <button className="btn-primary">Analyze Patterns with AI</button>
              </div>
            )}

            {/* Recent Triggers */}
            {triggers.length > 0 && (
              <div className="glass-card p-8">
                <h3 className="text-xl font-serif font-bold text-white mb-6">Recent Triggers</h3>
                <div className="space-y-4">
                  {triggers.slice(0, 5).map((trigger) => (
                    <div
                      key={trigger.id}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <p className="text-white font-semibold">{trigger.situation}</p>
                        <span className="text-xs text-gray-400">
                          {new Date(trigger.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {trigger.emotions.map((emotion, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                          >
                            {emotion.emotion} ({emotion.intensity}/10)
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Time Capsule Tab */}
        {activeTab === 'capsule' && (
          <>
            {readyCapsules.length > 0 && (
              <div className="glass-card p-8 bg-gold-900/20 border-gold-500/30">
                <div className="flex items-center space-x-3 mb-4">
                  <Mail className="w-6 h-6 text-gold-400 animate-pulse" />
                  <h3 className="text-xl font-serif font-bold text-white">
                    Time Capsules Ready to Open
                  </h3>
                </div>
                <div className="space-y-3">
                  {readyCapsules.map((capsule) => (
                    <div
                      key={capsule.id}
                      className="p-4 bg-white/5 rounded-lg border border-gold-500/30"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold mb-1">
                            Letter from {new Date(capsule.createdDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-400">
                            Sealed until {new Date(capsule.openDate).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => openTimeCapsule(capsule.id)}
                          className="btn-primary"
                        >
                          Open
                        </button>
                      </div>
                      {capsule.opened && (
                        <div className="mt-4 p-4 bg-white/5 rounded-lg">
                          <p className="text-gray-300 whitespace-pre-wrap">{capsule.letter}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="glass-card p-8">
              <h2 className="text-2xl font-serif font-bold text-white mb-4">
                Create a Time Capsule
              </h2>
              <p className="text-gray-300 mb-6">
                Write a letter to your future self. Set a date when you'd like to open it and
                reflect on your growth.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Letter to Your Future Self
                  </label>
                  <textarea
                    value={capsuleLetter}
                    onChange={(e) => setCapsuleLetter(e.target.value)}
                    placeholder="Dear Future Me..."
                    className="input-field min-h-[300px] resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Open Date
                  </label>
                  <input
                    type="date"
                    value={capsuleDate}
                    onChange={(e) => setCapsuleDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field"
                  />
                </div>

                <button
                  onClick={handleCapsuleSubmit}
                  disabled={!capsuleLetter.trim() || !capsuleDate}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Seal Time Capsule
                </button>
              </div>
            </div>

            {/* Sealed Capsules */}
            {timeCapsules.filter((c) => !c.opened && new Date(c.openDate) > new Date()).length >
              0 && (
              <div className="glass-card p-8">
                <h3 className="text-xl font-serif font-bold text-white mb-6">Sealed Capsules</h3>
                <div className="space-y-3">
                  {timeCapsules
                    .filter((c) => !c.opened && new Date(c.openDate) > new Date())
                    .map((capsule) => (
                      <div
                        key={capsule.id}
                        className="p-4 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-white font-semibold">
                            Created {new Date(capsule.createdDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-400">
                            Opens on {new Date(capsule.openDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Mail className="w-6 h-6 text-purple-400" />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Dreams Tab */}
        {activeTab === 'dreams' && (
          <>
            <div className="glass-card p-8">
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Log a Dream</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Dream Title
                  </label>
                  <input
                    type="text"
                    value={dreamTitle}
                    onChange={(e) => setDreamTitle(e.target.value)}
                    placeholder="Give your dream a title..."
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Dream Description
                  </label>
                  <textarea
                    value={dreamDescription}
                    onChange={(e) => setDreamDescription(e.target.value)}
                    placeholder="Describe your dream in detail..."
                    className="input-field min-h-[200px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Characters (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={dreamCharacters}
                    onChange={(e) => setDreamCharacters(e.target.value)}
                    placeholder="e.g., Mother, Stranger, Old friend"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Symbols (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={dreamSymbols}
                    onChange={(e) => setDreamSymbols(e.target.value)}
                    placeholder="e.g., Water, House, Flying"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Emotions (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={dreamEmotions}
                    onChange={(e) => setDreamEmotions(e.target.value)}
                    placeholder="e.g., Fear, Joy, Confusion"
                    className="input-field"
                  />
                </div>

                <button
                  onClick={handleDreamSubmit}
                  disabled={!dreamTitle.trim() || !dreamDescription.trim()}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Dream
                </button>
              </div>
            </div>

            {/* Recent Dreams */}
            {dreamLogs.length > 0 && (
              <div className="glass-card p-8">
                <h3 className="text-xl font-serif font-bold text-white mb-6">Recent Dreams</h3>
                <div className="space-y-4">
                  {dreamLogs.slice(0, 5).map((dream) => (
                    <div
                      key={dream.id}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-white">{dream.title}</h4>
                        <span className="text-xs text-gray-400">
                          {new Date(dream.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {dream.description}
                      </p>
                      {dream.symbols.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {dream.symbols.map((symbol, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded"
                            >
                              {symbol}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="glass-card p-8 text-center">
            <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-white mb-4">
              Insights & Analytics
            </h2>
            <p className="text-gray-300 mb-6">
              Track your progress, identify patterns, and gain deeper understanding of your journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-white/5 rounded-lg">
                <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{journalEntries.length}</div>
                <p className="text-gray-400">Journal Entries</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg">
                <Target className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{triggers.length}</div>
                <p className="text-gray-400">Triggers Logged</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg">
                <Moon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{dreamLogs.length}</div>
                <p className="text-gray-400">Dreams Recorded</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Toolkit;