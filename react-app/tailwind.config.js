/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Avenir Next', 'Segoe UI', 'Arial', 'sans-serif'],
        display: ['Montserrat', 'Avenir Next', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 22px 70px rgba(0, 84, 166, 0.12)',
      },
    },
  },
  plugins: [],
}
