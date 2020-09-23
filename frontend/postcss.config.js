const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')
const dotenv = require('dotenv')
const result = dotenv.config()
if (result.error) {
  throw result.error
}
console.log("postcss :", process.env.ENV_MODE)
module.exports = {
  plugins: [
    require('tailwindcss'),
    process.env.ENV_MODE === "production" ? require('autoprefixer') : null,
    process.env.ENV_MODE === "production" ? cssnano({
      preset: 'default'
    }) : null,
    process.env.ENV_MODE === "production" ? purgecss({
      content: ['./_dev/**/*.html'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }) : null
  ]
}