'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

  entry : {
    'widget.bestrate' : ['./src/js/app.js']
  },

  output : {
    publicPath    : '/',
    path          : path.resolve(__dirname, './dist'),
    filename      : '[name].js',
    library       : 'BRWidget',
    libraryTarget : 'umd'
  },

  plugins : [
    new CleanWebpackPlugin([
      path.resolve(__dirname, './dist'),
    ], {
      exclude       : ['fonts'],
      verbose       : true,
      dry           : false,
      allowExternal : true,
    }),
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV : JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      filename : 'index.html',
      title    : 'Bestrate Widget v0.2',
      template : 'src/html/index.html'
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
          'babel-loader'
        ]
      }, {
        test : /\.less$/,
        use  : [{
          loader : 'style-loader'
        }, {
          loader  : 'css-loader',
          options : {
            minimize  : true,
            sourceMap : false
          }
        }, {
          loader  : 'less-loader',
          options : {
            sourceMap : false
          }
        }]
      }, {
        test : /\.svg$/,
        use  : [
          'svg-inline-loader',
          {
            loader  : 'image-webpack-loader',
            options : {
              bypassOnDebug : true,
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
      path.resolve(__dirname, 'src/js'), 'node_modules'
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
