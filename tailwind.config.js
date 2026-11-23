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
          navy: '#071B3A',
          'navy-dark': '#041026',
          'navy-surface': '#0A234A',
          'navy-card': '#0E2D5E',
          'navy-border': '#1A3F7A',
          yellow: '#FFC928',
          'yellow-hover': '#FFD555',
          'yellow-light': '#FFF6D6',
          'yellow-dark': '#E5B117',
          white: '#FFFFFF',
          slate: '#94A3B8',
          light: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        }
      },
      boxShadow: {
        'glow-yellow': '0 0 25px -5px rgba(255, 201, 40, 0.35)',
        'glow-navy': '0 10px 30px -10px rgba(7, 27, 58, 0.5)',
        'card-hover': '0 20px 35px -10px rgba(7, 27, 58, 0.4), 0 0 1px 1px rgba(255, 201, 40, 0.25)'
      }
    },
  },
  plugins: [],
}

