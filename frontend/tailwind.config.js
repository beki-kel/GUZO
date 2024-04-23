/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background1': "url('/src/assets/back-1.png')",
      },
    },
  },
  plugins: [],
}
