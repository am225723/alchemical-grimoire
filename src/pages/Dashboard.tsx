import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, Compass, Wrench, Users, ArrowRight, Star, Brain, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { chapters } from '../data/chapters';

const Dashboard: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const chapterIcons = [
    { Icon: Brain, color: 'text-ocean-400', bgColor: 'bg-ocean-500/20', borderColor: 'border-ocean-500/30' },
    { Icon: Heart, color: 'text-primary-400', bgColor: 'bg-primary-500/20', borderColor: 'border-primary-500/30' },
    { Icon: Eye, color: 'text-secondary-400', bgColor: 'bg-secondary-500/20', borderColor: 'border-secondary-500/30' }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Chapters',
      description: 'Journey through shadow work, inner child healing, and archetypal exploration',
      color: 'ocean'
    },
    {
      icon: Wrench,
      title: 'Alchemist\'s Toolkit',
      description: 'Journaling, trigger tracking, dream logs, and time capsules for transformation',
      color: 'primary'
    },
    {
      icon: Compass,
      title: 'Archetype Explorer',
      description: 'Discover and integrate Jungian archetypes to understand your psyche',
      color: 'secondary'
    },
    {
      icon: Users,
      title: 'Community Wisdom',
      description: 'Share insights anonymously and learn from fellow seekers',
      color: 'ocean'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            {...fadeInUp}
          >
            <div className="inline-flex items-center space-x-2 glass-card px-6 py-3 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-ocean-400" />
              <span className="text-slate-300">Begin Your Transformation Journey</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Transform the Lead</span>
              <br />
              <span className="text-slate-100">Into Gold</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed">
              An interactive companion for shadow work, inner child healing, and archetypal exploration
              based on Jungian psychology.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/chapters" className="btn-primary flex items-center space-x-2">
                <span>Start Chapter I</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/toolkit" className="btn-secondary">
                Explore Toolkit
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-ocean-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float-slow"></div>
      </section>

      {/* Chapters Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="section-header">The Three Chapters</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Your path to wholeness unfolds through three transformative chapters
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {chapters.map((chapter, index) => {
              const { Icon, color, bgColor, borderColor } = chapterIcons[index];
              
              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                >
                  <Link to={`/chapter/${chapter.id}`} className="block group">
                    <div className="glass-card-hover p-8 h-full relative overflow-hidden">
                      {/* Chapter Number Badge */}
                      <div className="absolute top-4 right-4">
                        <div className={`w-12 h-12 rounded-full ${bgColor} ${borderColor} border flex items-center justify-center`}>
                          <span className={`text-xl font-bold ${color}`}>{chapter.id}</span>
                        </div>
                      </div>

                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl ${bgColor} ${borderColor} border flex items-center justify-center mb-6`}>
                        <Icon className={`w-8 h-8 ${color}`} />
                      </div>

                      {/* Content */}
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-slate-400 mb-2">{chapter.title}</h3>
                        <h4 className={`text-2xl font-bold mb-3 ${color} group-hover:underline`}>
                          {chapter.subtitle}
                        </h4>
                        <p className="text-slate-300 leading-relaxed">
                          {chapter.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-700/50">
                        <span className="text-sm text-slate-400">
                          {chapter.sections.length} Sections
                        </span>
                        <ArrowRight className={`w-5 h-5 ${color} transform group-hover:translate-x-1 transition-transform`} />
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/0 via-ocean-500/0 to-primary-500/0 group-hover:from-ocean-500/10 group-hover:to-primary-500/10 transition-all duration-500 rounded-2xl"></div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="section-header">Your Transformation Toolkit</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Powerful tools and features to support your inner work
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index + 0.5 }}
                className="glass-card p-6 hover-lift"
              >
                <div className={`w-14 h-14 rounded-xl bg-${feature.color}-500/20 border border-${feature.color}-500/30 flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-400`} />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="glass-card p-12 text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <Star className="w-12 h-12 text-ocean-400 animate-pulse-glow" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Your Journey Begins Now
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of seekers on the path to self-discovery and inner transformation.
                Begin with Chapter I and unlock the hidden aspects of your psyche.
              </p>
              <Link to="/chapters" className="btn-primary inline-flex items-center space-x-2">
                <span>Begin Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            {/* Background Glow */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-ocean-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary-500/30 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
