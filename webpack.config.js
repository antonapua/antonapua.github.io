var webpack = require('webpack');
var debug = process.env.NODE_ENV !== "production";
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: ['./core/js/core.js', './core/scss/bundle.scss'],
  output: {
    path: __dirname,
    filename: './core/js/core.min.js'
  },
  watch: true,
  resolve: {
    extensions: [' ', '.js']
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: '/core/css/bundle.min.css',
      allChunks: true,
    }),
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /(\.scss|\.css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                outFile: './core/css/bundle.min.css',
                outputStyle: 'compressed',
              }
            }
          ],
        })
      },
    ]
  }
};
