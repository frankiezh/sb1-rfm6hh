/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#2B1810',
            h1: {
              color: '#2B1810',
            },
            h2: {
              color: '#2B1810',
            },
            h3: {
              color: '#2B1810',
            },
            a: {
              color: '#334B40',
              '&:hover': {
                color: '#3D5A4C',
              },
            },
          },
        },
      },
      screens: {
        'xs': '490px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}
