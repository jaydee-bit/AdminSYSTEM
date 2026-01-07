/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}", // 👈 tells Tailwind to scan all HTML + JS files
    "./Adminside/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
