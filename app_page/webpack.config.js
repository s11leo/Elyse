const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'solana.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      "crypto": require.resolve('crypto-browserify'),
      "stream": require.resolve('stream-browserify'),
      "vm": require.resolve('vm-browserify')
    }
  },
  mode: 'production',
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]
};
