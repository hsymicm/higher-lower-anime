module.exports = {
  content: ['./public/**/*.html', './src/**/*.vue'],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1900px',
    
    },
    colors: {
      transparent: 'transparent',
      'white' : '#ffffff',
      'slight-white' : '#cdcdcd',
      'green': {
        DEFAULT: '#2ED75D',
        'hover': '#99F1B2'
      },
      'red': {
        DEFAULT: '#D72E2E',
        'hover': '#EC7373',
      },
      'slate': {
        DEFAULT: '#1e1e1e',
        'light': '#363636',
        'dark': '#111111',
        'dark-transparent': 'rgba(var(--color-dark-transparent), <alpha-value>)',
      },
      'button-color': {
        'idle': '#363636',
        'hover': '#4b4b4b',
        'click': '#2e2e2e',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}