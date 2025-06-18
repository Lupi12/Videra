/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'float': 'float 15s ease-in-out infinite',
        'float-slow': 'float-slow 20s ease-in-out infinite',
        'float-reverse': 'float-reverse 18s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'spin-very-slow': 'spin-very-slow 30s linear infinite',
        'spin-ultra-slow': 'spin-ultra-slow 40s linear infinite',
        'spin-reverse': 'spin-reverse 25s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
        'gradient-shift-reverse': 'gradient-shift-reverse 10s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(120deg)' },
          '66%': { transform: 'translateY(10px) rotate(240deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '25%': { transform: 'translateY(-15px) translateX(10px)' },
          '50%': { transform: 'translateY(-5px) translateX(-8px)' },
          '75%': { transform: 'translateY(-20px) translateX(5px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(15px) translateX(-10px) rotate(90deg)' },
          '50%': { transform: 'translateY(5px) translateX(8px) rotate(180deg)' },
          '75%': { transform: 'translateY(20px) translateX(-5px) rotate(270deg)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-very-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-ultra-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'gradient-shift': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        'gradient-shift-reverse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '0.3' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};