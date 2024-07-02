const { override, addBabelPreset, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addBabelPreset('@babel/preset-react'),
  addWebpackModuleRule({
    enforce: 'pre',
    test: /\.js$/,
    exclude: [
      /node_modules\/@solana\/buffer-layout/,
      /node_modules\/superstruct/
    ],
    loader: 'source-map-loader'
  })
);