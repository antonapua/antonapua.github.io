const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

let config = {
  entry: './core/js/core.js',
  output: {
    path: path.resolve(__dirname, './core'),
    filename: './js/core.min.js'
  },
  module:{
    rules: [
      { //js compile
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      { //sass combile
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [ //webpack plugins
    new ExtractTextWebpackPlugin('./css/bundle.min.css')
  ],
  devServer:{
    contentBase: path.resolve(__dirname, './core'),
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true
  },
  devtool: 'eval-source-map'
}


module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
    new OptimizeCSSAssets()
  );
}
