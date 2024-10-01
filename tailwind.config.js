/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-token': 'linear-gradient(135.58deg, #000138 24.75%, #000138 60.82%, #581539 95.57%)',
        'gradient-priority': 'linear-gradient(44.42deg, #000138 24.75%, #000138 60.82%, #581539 95.57%)',
        'jumbotron': 'url(\'/assets/images/jumbotron-bg.png\')'
      },
      colors: {
        'primary': '#000138',
        'secondary': '#00FFFF',
        'accent': '#8325DB',
        'primary-light':'#272861',
        'primary-dark':'#000029',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
