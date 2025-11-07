/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',    // 黑色
        secondary: '#4a4a4a',  // 深灰
        accent: '#7a7a7a',     // 中灰
        dark: '#1a1a1a',       // 最深黑
        light: '#ffffff',      // 纯白
        muted: '#f5f5f5',      // 浅灰背景
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
