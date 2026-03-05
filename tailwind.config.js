/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A192F',
          light: '#112240',
          lighter: '#1D3461',
        },
        aqua: {
          DEFAULT: '#64FFDA',
          electric: '#00E5FF',
          dim: '#45B8A0',
        },
        slate: {
          text: '#8892B0',
          light: '#CCD6F6',
          lightest: '#E6F1FF',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'navy-gradient': 'linear-gradient(135deg, #0A192F 0%, #112240 50%, #0A192F 100%)',
        'aqua-gradient': 'linear-gradient(135deg, #64FFDA 0%, #00E5FF 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'aqua': '0 0 20px rgba(100, 255, 218, 0.3)',
        'aqua-lg': '0 0 40px rgba(100, 255, 218, 0.4)',
        'navy': '0 25px 50px rgba(10, 25, 47, 0.7)',
      },
    },
  },
  plugins: [],
};
