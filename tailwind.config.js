/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blush: '#F8C6CF',
          pastel: '#FCE5E8',
          rose: '#E98B9B',
          deepRose: '#A82F4D',
          cream: '#FFF9EF',
          ivory: '#F7F3E8',
          sage: '#78844B',
          olive: '#4C542C',
          brown: '#40251D',
          coral: '#FF647F',
          gold: '#C59B27',
          headerBg: '#FDF1F4',
          cardBg: '#FFFDF9',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 3s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'petal-fall': 'petalFall 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.9, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.02)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10%) rotate(0deg) translateX(0)', opacity: 0 },
          '10%': { opacity: 0.8 },
          '90%': { opacity: 0.8 },
          '100%': { transform: 'translateY(110vh) rotate(360deg) translateX(50px)', opacity: 0 },
        }
      }
    },
  },
  plugins: [],
};
