/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          'gray-1': '#181818',
          'gray-2': '#212121',
          'gray-3': '#525252',
          'gray-4': '#393E46',
          'gray-5': '#151515',
        }
    },
  },
  plugins: [],
}
