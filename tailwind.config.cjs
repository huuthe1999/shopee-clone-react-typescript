/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ee4d2d'
      },
      backgroundImage: {
        'advertising-panel': "url('/src/assets/images/advertisingPanel.png')"
      }
    }
  },
  plugins: []
}
