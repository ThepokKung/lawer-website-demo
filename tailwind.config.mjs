/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,ts}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060F1E',
          900: '#0B1B3D',
          850: '#102A56',
          800: '#173974',
          700: '#1E4A94',
          600: '#255DB7'
        },
        gold: {
          100: '#F9F5EC',
          200: '#F2E7CB',
          300: '#E5D19E',
          400: '#D5B76C',
          500: '#B38E46',
          600: '#9A7432',
          700: '#7C5B23',
          800: '#5F4418'
        }
      },
      borderRadius: {
        xs: '1px'
      },
      fontFamily: {
        sans: ['Sarabun', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Noto Sans SC', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'Cambria', 'serif']
      }
    }
  },
  plugins: []
};
