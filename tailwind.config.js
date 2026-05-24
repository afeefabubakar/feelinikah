/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'wedding-bg': '#2b1511',
        'card-olive': '#4d5530',
        'card-brown': '#443511',
        'card-mustard': '#cd9e3f',
        'card-magenta': '#bb006a',
        'card-orange': '#e66524',
        'card-blue': '#104b73',
        'card-cream': '#f8e4c7',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
      },
    },
  },
  plugins: [],
}
