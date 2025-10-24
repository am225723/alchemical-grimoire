import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Save } from 'lucide-react';

interface Letter {
  id: string;
  intro: string;
  protection: string;
  fear: string;
  need: string;
  timestamp: number;
}

export function SaboteurActivity() {
  const [letters, setLetters] = useState<Letter[]>(() => {
    const saved = localStorage.getItem('saboteur-letters');
    return saved ? JSON.parse(saved) : [];
  });

  const [userName, setUserName] = useState('');
  const [intro, setIntro] = useState('');
  const [protection, setProtection] = useState('');
  const [fear, setFear] = useState('');
  const [need, setNeed] = useState('');

  const saveLetter = () => {
    const letter: Letter = {
      id: Date.now().toString(),
      intro,
      protection,
      fear,
      need,
      timestamp: Date.now()
    };

    const updated = [letter, ...letters];
    setLetters(updated);
    localStorage.setItem('saboteur-letters', JSON.stringify(updated));

    // Reset form
    setIntro('');
    setProtection('');
    setFear('');
    setNeed('');
  };

  const getFullLetter = (letter: Letter) => {
    return `Dear ${userName || 'Friend'},

I am the part of you that ${letter.intro}.

I am doing this because I am trying to protect you from ${letter.protection}.

The thing I am *most* afraid of is ${letter.fear}.

What I need from you to feel safe is ${letter.need}.

With care,
Your Saboteur`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
        <Flame className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <p className="font-semibold text-white mb-1">A Letter from Your Saboteur</p>
          <p>Externalize your sabotaging voice by letting it speak. This shifts you from fighting it to reassuring it.</p>
        </div>
      </div>

      {/* Letter Form */}
      <div className="glass-card p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Name (optional)
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g., Sarah"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
          />
        </div>

        <div className="space-y-4 p-6 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-lg border border-orange-500/20">
          <p className="text-gray-400 italic text-sm">Dear {userName || '[Your Name]'},</p>
          
          <div>
            <label className="block text-sm font-medium text-orange-300 mb-2">
              I am the part of you that...
            </label>
            <textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="e.g., makes you procrastinate, starts fights right before intimacy, finds flaws in every opportunity"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all min-h-[80px] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-300 mb-2">
              I am doing this because I am trying to protect you from...
            </label>
            <textarea
              value={protection}
              onChange={(e) => setProtection(e.target.value)}
              placeholder="e.g., failing, being judged, getting hurt, succeeding and not being able to handle it"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all min-h-[80px] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-300 mb-2">
              The thing I am *most* afraid of is...
            </label>
            <textarea
              value={fear}
              onChange={(e) => setFear(e.target.value)}
              placeholder="e.g., that you're not good enough and people will find out, that you'll be abandoned, that you'll be exposed as a fraud"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all min-h-[80px] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-300 mb-2">
              What I need from you to feel safe is...
            </label>
            <textarea
              value={need}
              onChange={(e) => setNeed(e.target.value)}
              placeholder="e.g., to take smaller steps, to be reassured that it's okay to fail, to know you won't abandon me if I succeed"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all min-h-[80px] resize-none"
            />
          </div>

          <p className="text-gray-400 italic text-sm">
            With care,<br />
            Your Saboteur
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={saveLetter}
          disabled={!intro.trim() || !protection.trim() || !fear.trim() || !need.trim()}
          className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          Save Letter
        </motion.button>
      </div>

      {/* Saved Letters */}
      {letters.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Your Saboteur Letters</h3>
          {letters.map((letter) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 border-l-4 border-orange-500"
            >
              <pre className="whitespace-pre-wrap text-sm text-gray-300 font-sans">
                {getFullLetter(letter)}
              </pre>
              <p className="text-xs text-gray-500 mt-4">
                Written {new Date(letter.timestamp).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
