module.exports = {
  purge: [
    './src/**/*.njk',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'display': ['ClashDisplay', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      'serif': ['Gambetta', 'Georgia', 'Cambria', "Times New Roman", 'Times', 'serif', 'Apple Color Emoji', 'Segoe UI Emoji']
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
