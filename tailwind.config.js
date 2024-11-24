/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        interphases: ['TT Interphases Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
