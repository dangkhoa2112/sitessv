import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem'
      }
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#00397f',
          strong: '#002a5d',
          accent: '#cf9c51'
        }
      },
      borderRadius: {
        md: '0.625rem',
        lg: '0.875rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem'
      },
      boxShadow: {
        soft: '0 10px 28px -18px rgba(0,57,127,0.3)',
        lift: '0 18px 40px -22px rgba(0,57,127,0.4)'
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      transitionDuration: {
        180: '180ms',
        240: '240ms'
      }
    }
  },
  plugins: []
} satisfies Config;
