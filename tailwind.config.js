/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'icc-purple': '#483473',
            'icc-blue': '#0367A6',
            'icc-yellow': '#F2B705',
            'icc-orange': '#F29F05',
            'icc-red': '#D92929',
        },
        backdropBlur: {
            xs: '2px',
        },
        screens: {
            '2xs': { 'min': '0px', 'max': '319px' },
            'xs': { 'min': '320px', 'max': '359px' },
            'ls': { 'min': '360px', 'max': '399px' }, 
            'ms': { 'min': '400px', 'max': '424px' },
            'ss': { 'min': '425px', 'max': '549px' },
            's': { 'min': '550px', 'max': '639px' },
        },
        borderRadius: {
            lg: '50px',
            md: '30px',
            sm: '10px'
        },
    },
  },
  plugins: [],
}