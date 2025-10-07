/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        button: '#8B5CF6',
        card: '#161220',
        secondary:'#9ca3af',
        post:'#1A1A1A',
        border:'#2d1b69'
      }
    },
  },
  plugins: [],
};