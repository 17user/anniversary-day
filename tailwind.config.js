/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush:    '#FFF0F3',
        petal:    '#FFD6E0',
        gold:     '#E8A4A4',
        deeprose: '#C97B7B',
        ink:      '#3D2B2B',
        muted:    '#8B6F6F',
        cream:    '#FFF8F5',
      },
      fontFamily: {
        serif:  ['"Noto Serif SC"', 'Georgia', 'serif'],
        sans:   ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'fade-in':     'fadeIn 1.2s ease forwards',
        'fade-in-up':  'fadeInUp 0.8s ease forwards',
        'float':       'float 6s ease-in-out infinite',
        'pulse-soft':  'pulseSoft 2.5s ease-in-out infinite',
        'spin-slow':   'spin 3s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(0.95)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        soft:  '0 4px 24px rgba(201,123,123,0.12)',
        card:  '0 2px 16px rgba(201,123,123,0.10)',
        hover: '0 8px 32px rgba(201,123,123,0.22)',
        gold:  '0 4px 20px rgba(232,164,164,0.35)',
      },
    },
  },
  plugins: [],
}

