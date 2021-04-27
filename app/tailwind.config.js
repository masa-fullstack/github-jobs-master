module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto'],
      },
      backgroundImage: () => ({
        background: "url('/img/backgroundImg.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
