/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#FF0000',
        ytgray: '#3F3F3F',
      },

      height: {
        mid: '11.25rem',
      },
      // backgroundImage: {
      //   'loading-thumbnail': "url('/img/loading-thumbnail.png')",
      // },
    },
  },
  plugins: [],
};
