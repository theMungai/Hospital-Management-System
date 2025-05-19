/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        blob: "30% 70% 82% 18% / 48% 69% 31% 52%",
        imageBlob: '0px 0px 200px 200px',
      },
      colors: {
        customGreen: '#6EAB36',
        customTealBlue: '#007E85',
        customWhite:'#ECECEC'
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        lexend: ['Lexend Tera', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
