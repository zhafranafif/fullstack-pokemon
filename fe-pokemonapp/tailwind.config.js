/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pokemon-sans': ['Netflix Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

