import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        imperial: '#2A123F', // Imperial Violet
        amethyst: '#4B1F6F', // Amethyst Noir
        lavender: '#9C8CB9', // Dusted Lavender
        orchid: '#C686DD', // Orchid Smoke
        pearl: '#F1EDF7', // Moon Pearl
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        hand: ['Caveat', '"Segoe Script"', 'cursive'],
      },
      boxShadow: {
        ink: '0 22px 40px -22px rgba(20, 6, 34, 0.7), 0 4px 10px -4px rgba(20, 6, 34, 0.35)',
      },
    },
  },
  plugins: [],
} satisfies Config
