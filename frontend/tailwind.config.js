/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports =  withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background1': "url('/src/assets/back-1.png')",
        'background2': "url('/src/assets/harari.jpg')"
      },
    },
  },
  plugins: [],
});
