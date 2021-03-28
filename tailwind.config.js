module.exports = {
  purge: ["./src/**/*.njk", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: [
        "ClashDisplay",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      serif: [
        "Gambetta",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
      ],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h2: {
              fontFamily: "'ClashDisplay' system-ui -apple-system Segoe UI Roboto Helvetica Arial sans-serif",
              fontWeight: '500'
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
