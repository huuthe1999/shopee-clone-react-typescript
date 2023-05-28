/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ee4d2d',
        secondary: '#f63'
      },
      backgroundImage: {
        'advertising-panel': "url('/src/assets/images/advertisingPanel.png')"
      },
      scale: {
        55: '0.55'
      },
      keyframes: {
        dots: {
          '20%': { backgroundPosition: '0% 0%, 50% 50%, 100% 50%' },
          '40%': { backgroundPosition: '0% 100%, 50% 0%, 100% 50%' },
          '60%': { backgroundPosition: '0% 50%, 50% 100%, 100% 0%' },
          '80%': { backgroundPosition: '0% 50%, 50% 50%, 100% 100%' }
        }
      }
    }
  },
  plugins: []
}
