/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        small: ['var(--font-roboto-small)'],
        medium: ['var(--font-roboto-medium)'],
        large: ['var(--font-roboto-large)'],
        logo: ['var(--font-logo)'],
      },
    },
  },
  plugins: [],
}
