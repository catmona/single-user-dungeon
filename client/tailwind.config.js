/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'slowpulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 0.15s infinite',
        'caret': 'pulse 1s step-end infinite',
      },
      keyframes: {
        slowpulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .9 },
        },
        flicker: {
          '0%': { opacity: 0.27861 },
          '5%':{ opacity: 0.34769 },
          '10%': { opacity: 0.23604 },
          '15%': { opacity: 0.90626 },
          '20%': { opacity: 0.18128 },
          '25%': { opacity: 0.83891 },
          '30%': { opacity: 0.65583 },
          '35%': { opacity: 0.67807 },
          '40%': { opacity: 0.26559 },
          '45%': { opacity: 0.84693 },
          '50%': { opacity: 0.96019 },
          '55%': { opacity: 0.08594 },
          '60%': { opacity: 0.20313 },
          '65%': { opacity: 0.71988 },
          '70%': { opacity: 0.53455 },
          '75%': { opacity: 0.37288 },
          '80%': { opacity: 0.71428 },
          '85%': { opacity: 0.70419 },
          '90%': { opacity: 0.7003 },
          '95%': { opacity: 0.36108 },
          '100%': { opacity: 0.24387 },
        },
      },
    },
  },
  plugins: [],
}
