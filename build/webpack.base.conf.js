const path = require('path')
const utils = require('./utils')
const WebpackNotifierPlugin = require('webpack-notifier')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: config.build.entry,
  devtool: '#source-map',
  output: {
    path: config.build.outPath,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.publicPath
      : config.dev.publicPath
  },
  resolve: {
    extensions: [ '.js', '.vue', '.json' ],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      [ config.name ]: resolve('')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [ resolve('src'), resolve('test') ],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ resolve('src'), resolve('test') ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ],
    noParse: [ /openlayers/ ]
  },
  plugins: [
    new WebpackNotifierPlugin({
      title: config.fullname,
      alwaysNotify: true
    })
  ]
}
