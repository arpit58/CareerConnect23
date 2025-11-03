/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        accent: '#10b981',
        hoverAccent: '#14b8a6',
        background: '#f0fdf4',
        darkText: '#1e293b'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem'
      },
    },
  },
  plugins: [],
}
