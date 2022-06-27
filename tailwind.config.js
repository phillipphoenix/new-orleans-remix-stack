/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      // Custom fonts. Remove if not wanted, but be sure to add a new sans and serif font or update the Typography atom.
      sans: ["'Roboto'", "sans-serif"],
      serif: ["'Roboto Slab'", "serif"],
    },
    extend: {},
  },
  plugins: [],
};
