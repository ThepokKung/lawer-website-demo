/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,ts}'],
  theme: {
    extend: {
      colors: {
        // Executive Deep Jungle Palette (replaces former navy)
        navy: {
          950: '#061811',
          900: '#0B251B', // Deep Jungle
          850: '#113326',
          800: '#163E2F',
          700: '#1E523E',
          600: '#276850'
        },
        forest: {
          50: '#F0F7F4',
          100: '#DDEEE7',
          200: '#BDDCD1',
          300: '#94C4B3',
          400: '#64A690',
          500: '#1B4D3E', // Forest Green
          600: '#164235',
          700: '#12372C',
          800: '#0E2C23',
          900: '#0A201A'
        },
        gold: {
          100: '#FBF8F0',
          200: '#F5EDD8',
          300: '#E8D6AC',
          400: '#D8B261',
          500: '#C59B42',
          600: '#A68030',
          700: '#856423',
          800: '#634918'
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
