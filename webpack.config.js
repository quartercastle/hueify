const path = require('path')

module.exports = {
  entry: path.resolve('./src/App.jsx'),
  output: {
    path: path.resolve('static'),
    filename: 'app.js'
  },
  target: 'electron',
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      components: path.resolve(__dirname, './src/components'),
      views: path.resolve(__dirname, './src/views'),
      store: path.resolve(__dirname, './src/store'),
      helpers: path.resolve(__dirname, './src/helpers')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devtool: 'source-map'
}
