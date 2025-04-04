/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          bg: '#121212',
          card: '#1e1e1e',
          text: '#f5f5f5',
          title: '#f1c40f',
          button: '#e67e22',
          buttonHover: '#d35400',
          peg: '#e67e22',
          pegSelected: '#e74c3c',
          board: '#2c3e50',
        },
        // Light theme colors
        light: {
          bg: '#f0f0f0',
          card: '#ffffff',
          text: '#333333',
          title: '#8B4513',
          button: '#8B4513',
          buttonHover: '#A0522D',
          peg: '#8B4513',
          pegSelected: '#ff6347',
          board: '#f9f3e9',
        },
      },
      boxShadow: {
        'dark': '0 5px 15px rgba(0, 0, 0, 0.5)',
        'light': '0 5px 15px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}

