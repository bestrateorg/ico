'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry : {
    widget : ['./src/js/widget.js']
  },

  output : {
    publicPath : '/',
    path       : path.resolve(__dirname, './dist'),
    filename   : '[name].[chunkhash].js',
  },

  plugins : [
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV : JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      filename : 'widget.html',
      title    : 'Bestrate Widget v0.2',
      template : 'src/html/widget.html'
    })
  ],

  module : {

    rules : [
      {
        enforce : 'pre',
        test    : /hosts\.js?$/,
        exclude : /(node_modules)/,
        loader  : 'string-replace-loader',
        options : {
          search  : '~host.origin~',
          replace : 'https://localhost:9080',
        }
      },
      {
        enforce : 'pre',
        test    : /hosts\.js?$/,
        exclude : /(node_modules)/,
        loader  : 'string-replace-loader',
        options : {
          search  : '~host.originRoute~',
          replace : '',
        }
      },
      {
        test    : /\.jsx?$/,
        exclude : /(node_modules|bower_components)/,
        use     : [
          'babel-loader',
        ]
      }, {
        test : /\.less$/,
        use  : ExtractTextPlugin.extract({
          fallback : 'style-loader',
          use      : [{
            loader  : 'css-loader',
            options : {
              url : false,
            }
          }, {
            loader  : 'less-loader',
            options : {
              relativeUrls : false
            }
          }]
        }),

      }, {
        test : /\.svg$/,
        use  : [
          'svg-inline-loader',
          {
            loader  : 'image-webpack-loader',
            options : {
              bypassOnDebug : false,
            },
          },
        ],
      }, {
        test : /\.pug$/,
        use  : [{
          loader : 'raw-loader'
        }, {
          loader : 'pug-html-loader'
        }]
      }, {
        test    : /\.jsx?$/,
        enforce : 'pre',
        exclude : /(node_modules|bower_components|\.spec\.js)/,
        use     : [
          {
            loader : 'webpack-strip-block'
          }
        ]
      }
    ],

  },

  resolve : {

    modules : [
      path.resolve(__dirname, 'src/js'),
      'node_modules'
    ],

    alias : {
      config  : path.resolve(__dirname, 'src/js/config'),
      helpers : path.resolve(__dirname, 'src/js/helpers'),
      client  : path.resolve(__dirname, 'src/js/client'),
      server  : path.resolve(__dirname, 'src/js/server'),
      types   : path.resolve(__dirname, 'src/js/types'),
    },

    extensions : ['.js', '.jsx', '.less', '.css', '.pug', '.svg'],
  },

  target : 'web',
};
