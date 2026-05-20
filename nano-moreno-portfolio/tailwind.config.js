/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        crimson: '#FF0033',
        void: '#000000',
        ghost: '#FFFFFF',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        bebas: ['"Bebas Neue"', 'cursive'],
      },
    },
  },
  plugins: [],
}
