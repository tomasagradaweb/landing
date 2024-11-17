/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Para títulos
        roboto: ['Roboto', 'sans-serif'],         // Para textos
      },
    },
  },
  plugins: [],
}

