/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mystic': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        'gold': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        'cosmic': {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mystic': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'gradient-fire': 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #c44569 100%)',
        'gradient-cosmic': 'linear-gradient(135deg, #4c1d95 0%, #5b21b6 25%, #7c3aed 50%, #a855f7 75%, #ec4899 100%)',
        'gradient-gold': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #a855f7 0%, #ec4899 25%, #fbbf24 50%, #3b82f6 75%, #a855f7 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
        'shimmer': 'shimmer 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'rotate-border': 'rotateBorder 3s linear infinite',
        'background-shift': 'backgroundShift 20s ease infinite',
        'orb-float': 'orbFloat 15s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(2deg)' },
          '66%': { transform: 'translateY(-10px) rotate(-2deg)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(167, 85, 247, 0.5), 0 0 40px rgba(167, 85, 247, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(167, 85, 247, 0.8), 0 0 80px rgba(167, 85, 247, 0.5), 0 0 120px rgba(167, 85, 247, 0.3)'
          },
        },
        pulseGold: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(251, 191, 36, 0.8), 0 0 80px rgba(251, 191, 36, 0.5)'
          },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% center' },
          '50%': { backgroundPosition: '100% center' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rotateBorder: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        backgroundShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        orbFloat: {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'translateY(-30px) scale(1.1)',
            opacity: '1',
          },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(167, 85, 247, 0.5)',
        'glow': '0 0 20px rgba(167, 85, 247, 0.6), 0 0 40px rgba(167, 85, 247, 0.4)',
        'glow-lg': '0 0 30px rgba(167, 85, 247, 0.7), 0 0 60px rgba(167, 85, 247, 0.5), 0 0 90px rgba(167, 85, 247, 0.3)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.6), 0 0 40px rgba(236, 72, 153, 0.4)',
        'glow-gold': '0 0 20px rgba(251, 191, 36, 0.6), 0 0 40px rgba(251, 191, 36, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'inner-glow': 'inset 0 0 20px rgba(167, 85, 247, 0.3)',
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'title': ['Cinzel', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionDuration: {
        '400': '400ms',
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
}
