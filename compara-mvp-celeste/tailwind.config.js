/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        celeste: {
          50: '#f0faff',
          100: '#e0f4ff',
          200: '#bfe9ff',
          300: '#99dbff',
          400: '#66c7ff',
          500: '#33b3ff',
          600: '#1296e6',
          700: '#0e78b8',
          800: '#0b5a8a',
          900: '#073d5c'
        }
      },
      boxShadow: {
        soft: '0 10px 25px -10px rgba(51,179,255,0.35)'
      }
    },
  },
  plugins: [],
};