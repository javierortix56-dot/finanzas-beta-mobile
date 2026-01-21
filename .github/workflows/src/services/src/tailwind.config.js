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
        inter: ['Inter', 'sans-serif'],
        spline: ['Spline Sans', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
