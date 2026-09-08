/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040814',
          900: '#060D1E',
          850: '#0A142F',
          800: '#0E1D43',
          700: '#15295C',
          600: '#1F3B82'
        },
        gold: {
          300: '#F5E2B3',
          400: '#DFBA73',
          500: '#C5A059',
          600: '#A4823E',
          700: '#7F6229'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      transitionTimingFunction: {
        'apple-ease': 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
};
