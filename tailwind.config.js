/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#FF0000',
        loading: '#3F3F3F',
      },
      width: {
        mid: '7.5rem',
      },
      // backgroundImage: {
      //   'loading-thumbnail': "url('/img/loading-thumbnail.png')",
      // },
    },
  },
  plugins: [],
};
