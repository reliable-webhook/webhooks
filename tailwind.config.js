module.exports = {
  darkMode: 'class',
  jit: true,
  enabled: process.env.NODE_ENV === 'production',
  content: [
    './src/**/*.vue',
    './src/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#D4D4D4',
          100: '#CCCCCC',
          200: '#BBBBBB',
          300: '#A6A6A6',
          500: '#707070',
          600: '#404040',
          700: '#3A3D41',
          800: '#252526',
          900: '#1E1E1E'
        }
      }
    }
  },
  plugins: []
}
