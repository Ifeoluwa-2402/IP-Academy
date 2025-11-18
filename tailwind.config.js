/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B5E20', // Dark green
          dark: '#0D3E10',
          light: '#2E7D32',
        },
        secondary: {
          DEFAULT: '#FFD700', // Gold
          dark: '#B8860B',
          light: '#FFE44D',
        },
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
}

