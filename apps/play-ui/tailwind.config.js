import componentsConfig from '../../packages/components/tailwind.config.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../../packages/components/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...componentsConfig.theme?.extend
    }
  },
  plugins: []
}
