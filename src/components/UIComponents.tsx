import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

// Glass Card Component
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  glow = false,
  hover = true,
  ...props
}) => {
  const baseClass = glow ? 'glass-card-glow' : 'glass-card';
  const hoverClass = hover ? 'hover-lift' : '';
  
  return (
    <div className={`${baseClass} ${hoverClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Gradient Text Component
interface GradientTextProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export const GradientText: React.FC<GradientTextProps> = ({ 
  children, 
  className = '',
  glow = false 
}) => {
  return (
    <span className={`gradient-text ${glow ? 'text-glow' : ''} ${className}`}>
      {children}
    </span>
  );
};

// Icon Button Component
interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  variant = 'ghost',
  size = 'md',
  glow = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-glow',
    secondary: 'bg-white/10 text-purple-300 hover:bg-white/20',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/10'
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${glow ? 'glow-purple' : ''} 
        rounded-lg flex items-center justify-center transition-all hover-lift ${className}`}
    >
      <Icon className={iconSizes[size]} />
    </button>
  );
};

// Badge Component
interface BadgeProps {
  children: ReactNode;
  variant?: 'purple' | 'pink' | 'gold' | 'green' | 'blue';
  glow?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  glow = false,
  className = ''
}) => {
  const variantClasses = {
    purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    pink: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    gold: 'bg-gold-500/20 text-gold-300 border-gold-500/30',
    green: 'bg-green-500/20 text-green-300 border-green-500/30',
    blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold 
      border ${variantClasses[variant]} ${glow ? 'shadow-glow-sm' : ''} ${className}`}>
      {children}
    </span>
  );
};

// Animated Card Component
interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  className?: string;
  glow?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  className = '',
  glow = false,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className={`${glow ? 'glass-card-glow' : 'glass-card'} hover-lift ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Feature Card Component
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
  delay?: number;
  onClick?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  gradient = 'from-purple-500 to-pink-500',
  delay = 0,
  onClick
}) => {
  return (
    <AnimatedCard delay={delay} glow className="p-6 cursor-pointer" onClick={onClick}>
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} 
        flex items-center justify-center mb-4 shadow-glow`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 font-title">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </AnimatedCard>
  );
};

// Progress Bar Component
interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  gradient?: string;
  glow?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showLabel = true,
  gradient = 'from-purple-500 to-pink-500',
  glow = false,
  className = ''
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        {showLabel && (
          <span className="text-sm text-gray-400">
            {value} / {max}
          </span>
        )}
        <span className="text-sm font-semibold text-purple-400">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${gradient} ${glow ? 'shadow-glow' : ''}`}
        />
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  iconColor?: string;
  delay?: number;
  glow?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  iconColor = 'text-purple-400',
  delay = 0,
  glow = false
}) => {
  return (
    <AnimatedCard delay={delay} glow={glow} className="p-6">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${iconColor}`} />
        <span className="text-3xl font-bold text-white">
          {value}
        </span>
      </div>
      <h3 className="text-gray-300 font-semibold">{label}</h3>
    </AnimatedCard>
  );
};

// Loading Spinner Component
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4'
  };

  return (
    <div className={`spinner ${sizeClasses[size]} ${className}`} />
  );
};

// Floating Icon Component
interface FloatingIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  glow?: boolean;
}

export const FloatingIcon: React.FC<FloatingIconProps> = ({
  icon: Icon,
  size = 64,
  color = 'text-purple-400',
  glow = false
}) => {
  return (
    <div className="relative float-animation">
      <Icon className={`${color} ${glow ? 'glow-purple' : ''}`} size={size} />
      {glow && (
        <div className="absolute inset-0 blur-xl bg-purple-500/50 rounded-full animate-pulse-glow" />
      )}
    </div>
  );
};

// Section Header Component
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  gradient?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  centered = true,
  gradient = true,
  className = ''
}) => {
  return (
    <div className={`${centered ? 'text-center' : ''} mb-12 ${className}`}>
      <h2 className={`text-4xl md:text-5xl font-title font-bold mb-4 ${
        gradient ? 'gradient-text' : 'text-white'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

// Tooltip Component (simple version)
interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = 'top'
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute ${positionClasses[position]} z-50 px-3 py-2 
          text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap
          border border-white/10 animate-fade-in`}>
          {text}
        </div>
      )}
    </div>
  );
};

export default {
  GlassCard,
  GradientText,
  IconButton,
  Badge,
  AnimatedCard,
  FeatureCard,
  ProgressBar,
  StatCard,
  Spinner,
  FloatingIcon,
  SectionHeader,
  Tooltip
};
