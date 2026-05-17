import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#09090b',
        card: '#111113',
        accent: '#8b5cf6'
      }
    }
  },
  plugins: []
};

export default config;
