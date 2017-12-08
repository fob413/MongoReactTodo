const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  entry: path.join(__dirname, 'client/index.jsx'),
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false,
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
