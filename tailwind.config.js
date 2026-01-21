/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#40826c",
        "primary-dark": "#2d6150",
        surface: { light: "#ffffff", dark: "#1e2028" },
        background: { light: "#f8fafb", dark: "#15161e" },
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
