/** @type {import('tailwindcss').Config} */
module.exports = {

  darkMode: 'class',
  corePlugins: {
    preflight: true,
  },
  
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'buy': '#48C076',
        'sell': '#d9304e',
      },
      animation: {
        'shake': 'shake 0.1s'
      },
      keyframes: {
        shake: {
          "0%, 100%": {
            "transform": "translateX(-3%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)"
          },
          "50%": {
            "transform": "translateX(3%)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)"
          }
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
