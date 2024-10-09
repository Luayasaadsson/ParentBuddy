/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFC107',
        secondary: '#FF5722',
        background: '#F0F4F8',
        text: '#333333',
      },
    },
  },
  plugins: [],
}