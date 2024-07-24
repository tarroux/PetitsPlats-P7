/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html", "./scripts/components/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'anton': ['Anton', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif']
      }
    },
  },
  plugins: [],
}

