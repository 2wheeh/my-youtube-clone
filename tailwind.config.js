/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#FF0000',
      },
      // backgroundImage: {
      //   'loading-thumbnail': "url('/img/loading-thumbnail.png')",
      // },
    },
  },
  plugins: [],
};
