/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#020206',
          900: '#030712',
          800: '#0b1020',
          700: '#111827'
        },
        cosmic: {
          blue: '#38bdf8',
          purple: '#7c8cff',
          gold: '#fbbf24',
          cyan: '#06b6d4'
        }
      },
      fontFamily: {
        en: ['Outfit', 'Inter', 'sans-serif'],
        khmer: ['Siemreap', 'Khmer OS Siemreap', 'Noto Sans Khmer', 'sans-serif']
      }
    },
  },
  plugins: [],
}
