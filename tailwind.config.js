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
          navy: '#101F3D',           // Dark navy headings (#101F3D)
          'navy-dark': '#0B1528',      // Dark contrast / Footer deep navy
          'navy-surface': '#FFFFFF',   // Clean pure white for surfaces
          'navy-card': '#FFFFFF',      // Clean white for cards
          'navy-border': '#E2E8F0',    // Thin light-grey border
          royal: '#315FA5',          // Professional blue accent (#315FA5)
          'royal-hover': '#244880',
          'royal-light': '#EFF5FF',    // Subtle blue gradient (#EFF5FF)
          steel: '#52749A',          // Steel Blue
          silver: '#C4CCD5',         // Silver
          'silver-light': '#E2E8F0',   // Thin light-grey
          white: '#FFFFFF',          // Pure White
          light: '#F8FAFD',          // Off-white base colour (#F8FAFD)
          gold: '#B69A63',           // Subtle Gold Accent
          'gold-light': '#F5F0E6',
          // Harmonized aliases for backward-compatibility
          yellow: '#315FA5',
          'yellow-hover': '#244880',
          'yellow-light': '#EFF5FF',
          'yellow-dark': '#101F3D',
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
