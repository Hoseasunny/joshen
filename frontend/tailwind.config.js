/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brandBlue: '#0A4D9D',
        brandGreen: '#4CAF50',
        skyBlue: '#6EC6FF',
        brandDark: '#062a5c',
        lightGray: '#F8FAFC',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 40px rgba(10, 77, 157, 0.15)',
      },
    },
  },
  plugins: [],
};
