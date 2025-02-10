// This is my  tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        ternary: 'var(--color-ternary)',
        textPrimary: 'var(--color-txtprimary)',
        border:'var(--color-border)',
      },
      // backgroundColor: {
      //   primary: 'var(--color-bg-primary)',
      //   secondary: 'var(--color-bg-secondary)',
      //   ternary: 'var(--color-bg-ternary)',
      // },
      // textColor: {
      //   accent: 'var(--color-text-accent)',
      //   primary: 'var(--color-text-primary)',
      //   secondary: 'var(--color-text-secondary)',
      // },
    },
  },
  plugins: [],
}