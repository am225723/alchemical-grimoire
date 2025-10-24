import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  Heart, 
  Eye, 
  Moon, 
  Compass, 
  BookOpen, 
  ArrowRight,
  Gem,
  Zap,
  Target
} from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const HomePage: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    const generatedParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(generatedParticles);

    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    });
  }, [controls]);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Deep pattern recognition and personalized guidance for your transformation journey',
      color: 'from-purple-500 to-pink-500',
      glowColor: 'shadow-glow'
    },
    {
      icon: Heart,
      title: 'Shadow Dialogue',
      description: 'Sacred conversations with your shadow self through immersive AI interactions',
      color: 'from-pink-500 to-red-500',
      glowColor: 'shadow-glow-pink'
    },
    {
      icon: Eye,
      title: 'Pattern Recognition',
      description: 'Discover hidden patterns in relationships and behaviors with visual mapping',
      color: 'from-blue-500 to-cyan-500',
      glowColor: 'shadow-glow'
    },
    {
      icon: Sparkles,
      title: 'Authentic Discovery',
      description: 'Uncover your true self through guided exploration and self-assessment',
      color: 'from-gold-400 to-orange-500',
      glowColor: 'shadow-glow-gold'
    }
  ];

  const journeySteps = [
    {
      icon: Moon,
      title: 'Explore the Shadow',
      description: 'Begin your descent into the unconscious'
    },
    {
      icon: Compass,
      title: 'Navigate Patterns',
      description: 'Map your inner landscape'
    },
    {
      icon: Target,
      title: 'Integrate Insights',
      description: 'Embody your discoveries'
    },
    {
      icon: Gem,
      title: 'Transform Reality',
      description: 'Manifest your authentic self'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Particles Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-purple-500/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            className="space-y-8"
          >
            {/* Floating Gem Icon */}
            <motion.div
              className="flex justify-center mb-8"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="relative">
                <Gem className="w-24 h-24 text-purple-400 glow-purple" />
                <div className="absolute inset-0 blur-xl bg-purple-500/50 rounded-full animate-pulse-glow" />
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-title font-bold mb-6"
            >
              <span className="gradient-text text-glow">
                Alchemical Grimoire
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-purple-200 mb-4 font-display"
            >
              Transform the Lead of Unconsciousness
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-pink-300 mb-12"
            >
              into the Gold of Self-Awareness
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Embark on a profound journey of shadow work, inner healing, and archetypal exploration 
              powered by AI-enhanced insights and immersive experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                to="/activities/dialogue"
                className="group btn-primary px-8 py-4 text-lg flex items-center gap-3 hover-lift"
              >
                Begin Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/chapters"
                className="btn-secondary px-8 py-4 text-lg flex items-center gap-3 hover-lift"
              >
                <BookOpen className="w-5 h-5" />
                Explore Chapters
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 pt-12 border-t border-white/10"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">AI</div>
                <div className="text-sm text-gray-400">Powered Insights</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">∞</div>
                <div className="text-sm text-gray-400">Growth Potential</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">✨</div>
                <div className="text-sm text-gray-400">Transformations</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-title font-bold mb-6 gradient-text">
              AI-Enhanced Experiences
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Cutting-edge technology meets ancient wisdom for unprecedented personal transformation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-card-glow p-8 hover-lift cursor-pointer"
              >
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center ${feature.glowColor}`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Zap className="w-6 h-6 text-gold-400 animate-pulse" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 font-title">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Path */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-title font-bold mb-6 gradient-text">
              Your Transformation Path
            </h2>
            <p className="text-xl text-gray-300">
              Four sacred stages of alchemical transformation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative"
              >
                <div className="glass-card p-6 text-center hover-lift">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-glow">
                      {index + 1}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-4 mt-4 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center float-animation">
                      <step.icon className="w-8 h-8 text-purple-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-2 font-title">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Line (except for last item) */}
                {index < journeySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent transform translate-x-1/2 z-0" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card-glow p-12 text-center relative overflow-hidden"
          >
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-gold-600/20 animate-gradient-shift opacity-50" />
            
            <div className="relative z-10">
              <Sparkles className="w-16 h-16 text-gold-400 mx-auto mb-6 animate-pulse-gold" />
              
              <h2 className="text-3xl md:text-4xl font-title font-bold mb-4 gradient-text">
                Ready to Transform?
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                "Until you make the unconscious conscious, it will direct your life and you will call it fate."
                <span className="block mt-2 text-purple-400 text-base">— Carl Jung</span>
              </p>
              
              <Link
                to="/activities/dialogue"
                className="inline-flex items-center gap-3 btn-primary px-10 py-4 text-lg hover-lift"
              >
                Start Your Transformation
                <Sparkles className="w-5 h-5 animate-pulse" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacing */}
      <div className="h-20" />
    </div>
  );
};

export default HomePage;
