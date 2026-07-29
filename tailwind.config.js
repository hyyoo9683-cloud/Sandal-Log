/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#faf8f3',
        forest: '#1a3d0a',
        sage: '#97c459',
        cardgreen: '#eaf3de'
      },
      borderRadius: {
        card: '14px'
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      maxWidth: {
        app: '390px'
      }
    }
  },
  plugins: []
}
