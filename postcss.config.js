import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss, // Handles Tailwind processing
    autoprefixer, // Still useful for vendor prefixes
  ],
};
