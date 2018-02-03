const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const path = require('path');

module.exports = () => ({
  devtool: 'source-map',
  entry: {
    main: [
      'babel-polyfill',
      'whatwg-fetch',
      './src/styles/main.scss',
      './src/main.js'
    ]
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: `${__dirname}/build`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?minimize&-autoprefixer',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        loader: 'file-loader?mimetype=image/svg+xml'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/font-woff'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      chunksSortMode: 'dependency'
    }),
    new CommonsChunkPlugin({
      names: ['config', 'vendor'],
      filename: 'js/[name].[hash].js'
    })
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'assets'),
      root: path.resolve(__dirname, 'src')
    },
    modules: [
      'node_modules'
    ],
    extensions: [
      '.js', '.json', '.scss'
    ]
  }
});
