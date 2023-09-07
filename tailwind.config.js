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

//this is my variable.scss file
// .dark {
//   --color-bg-primary: #0f0f0f;
//   --color-bg-secondary:#222222;
//   --color-border-primary:#303030

//   --color-text-primary: #f7fafc;
//   --color-text-ternary:	#3d3d3d;
//   --color-text-secondary: #aaaaaa;
//   --color-text-accent: #81e6d9;
// }

// .light {
//   --color-bg-primary: #ffffff;
//   --color-bg-secondary: #edf2f7;
//   --color-bg-ternary:#edf2f7;
//   --color-text-primary: #2d3748;
//   --color-text-secondary: #4a5568;
//   --color-text-accent: #2b6cb0;
// }
