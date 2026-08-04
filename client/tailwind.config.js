/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#1a7a2e', foreground: '#ffffff' },
        green: {
          50: '#f0faf0', 100: '#dcf5dc', 600: '#1a7a2e', 700: '#156125', 800: '#0f4a1c', 900: '#0a3312',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: { lg: '0.75rem', md: 'calc(0.75rem - 2px)', sm: 'calc(0.75rem - 4px)' },
    },
  },
  plugins: [],
};