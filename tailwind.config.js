/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#137fec",
        "background-light": "#ffffff",
        "background-dark": "#101922",
        "neutral-gray": "#e7edf3",
        "muted-blue": "#4c739a",
        "accent-gold": "#fbbf24"
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}