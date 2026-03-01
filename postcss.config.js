const { plugin } = require('postcss')
const tailwindConfig = require('./tailwind.config')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
