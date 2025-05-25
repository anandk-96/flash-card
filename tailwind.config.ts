import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5864',
          dark: '#FF4757',
        },
        secondary: {
          DEFAULT: '#00CC66',
          dark: '#00B359',
        },
        accent: {
          DEFAULT: '#FFB800',
          dark: '#FFA800',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      spacing: {
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
      },
      padding: {
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
      },
      margin: {
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
      },
    },
  },
  plugins: [],
  safelist: [
    'px-4',
    'py-4',
    'mx-4',
    'my-4',
    'p-4',
    'm-4',
    'space-x-4',
    'space-y-4',
  ],
};

export default config; 