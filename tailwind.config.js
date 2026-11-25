/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#101F3C',           // Deep Navy
          'navy-dark': '#0B1528',      // Dark contrast / Footer deep navy
          'navy-surface': '#FFFFFF',   // Clean pure white for surfaces
          'navy-card': '#F7F9FC',      // Soft white / light silver for card fills
          'navy-border': '#C4CCD5',    // Silver border
          royal: '#234F91',          // Royal Blue
          'royal-hover': '#1B3E73',
          'royal-light': '#EBF2FA',
          steel: '#52749A',          // Steel Blue
          silver: '#C4CCD5',         // Silver
          'silver-light': '#E2E8F0',
          white: '#FFFFFF',          // Pure White
          light: '#F7F9FC',          // Soft White page background
          gold: '#B69A63',           // Subtle Gold Accent
          'gold-light': '#F5F0E6',
          // Harmonized aliases for backward-compatibility
          yellow: '#234F91',         // Royal Blue replaces bright yellow
          'yellow-hover': '#1B3E73',
          'yellow-light': '#EBF2FA',
          'yellow-dark': '#101F3C',
          slate: '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'glow-royal': '0 0 25px -5px rgba(35, 79, 145, 0.35)',
        'glow-yellow': '0 0 25px -5px rgba(35, 79, 145, 0.25)',
        'glow-navy': '0 10px 30px -10px rgba(16, 31, 60, 0.15)',
        'card-hover': '0 15px 30px -10px rgba(16, 31, 60, 0.08), 0 0 1px 1px rgba(196, 204, 213, 0.6)'
      }
    },
  },
  plugins: [],
}
