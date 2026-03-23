/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#05070b',
          800: '#0c111b',
          700: '#141d2b',
          500: '#8f9cb2',
          300: '#d4dcec',
        },
        accent: {
          500: '#38bdf8',
          400: '#67e8f9',
        },
      },
      boxShadow: {
        card: '0 12px 24px -14px rgba(0, 0, 0, 0.6)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
}

