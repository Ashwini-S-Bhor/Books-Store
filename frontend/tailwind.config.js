/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",            
      "./src/**/*.{js,ts,jsx,tsx}" 
    ],
    theme: {
      extend: {
        colors: {
          primary: '#FFCE1A',
          secondary: '#0D0842',
          blackBG: '#cac2c29c',
          favorite: '#FF5841', 
        },
      },
    },
    plugins: [],
  }
  