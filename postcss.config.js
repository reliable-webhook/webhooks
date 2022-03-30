module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-flexbugs-fixes'),
    require('autoprefixer'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    }),
    require('tailwindcss'),
    process.env.NODE_ENV === 'production' && require('cssnano')
  ].filter(Boolean)
}
