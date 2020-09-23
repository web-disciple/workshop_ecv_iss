module.exports = {
  purge: ["./_dev/html/*.html"],
  theme: {
    extend: {
      cyan: '#00CDF7',
      darkBlue: '#0A2540',
      purple: '#635BFF',
      gray: '#425466'
    },
  },
  variants: {},
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
