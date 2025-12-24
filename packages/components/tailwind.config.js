/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#555ab9',
          hover: '#4a4fa0'
        }
      },
      fontFamily: {
        sans: ['Nunito Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
}
