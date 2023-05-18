/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      'animation': {
        'background-bright': 'bright 2s ease infinite',
        'background-relaxed': 'relaxed 2s ease infinite',
        'background-fun': 'fun 2s ease infinite',
      },
      'keyframes': {
        'bright': {
          '0%, 100%': {
            backgroundColor: '#93C5FD',
            opacity: 1
          },
          '50%': {
            backgroundColor: '#D8B4FE',
            opacity: 0.7
          }
        },
        'relaxed': {
          '0%, 100%': {
            backgroundColor: '#4ADE80',
            opacity: 1
          },
          '50%': {
            backgroundColor: '#BEF264',
            opacity: 0.7
          }
        },
        'fun': {
          '0%, 100%': {
            backgroundColor: '#FB923C',
            opacity: 1
          },
          '50%': {
            backgroundColor: '#FDE047',
            opacity: 0.7
          }
        },
      }
    },
  },
  plugins: [],
}

