/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "primary": "#1e6474",
        "primary-hover": "#3ab2a9",
        "accent-1": "#2f8dc5",
        "accent-1-hover": "#5aaddb",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
          "primary": "#006473",
          "secondary": "#008cc3",
          "accent": "#1dcdbc",
          "neutral": "#2b3440",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
  plugins: [require('daisyui')],


}

