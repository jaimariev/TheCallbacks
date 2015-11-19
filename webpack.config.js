var webpack = require('webpack');

module.exports = {
  entry: "./js/main.js",
  output: {
    path: __dirname,
    filename: "js/bundle.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      "_": "underscore",
      "$": "jquery"
    })
  ],
  module: {
    loaders: [
      {test:/\.html$/, loader:'mustache'},
      {test: /\.css$/, loader:'style!css'},
      {test: /\.json$/, loader:'json'},
      {test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony'}
    ]
  }
}