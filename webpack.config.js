'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry : {
    app : ['./src/js/app.js']
  },

  output : {
    publicPath    : '/',
    path          : path.resolve(__dirname, './dist'),
    filename      : '[name].js',
    library       : 'BRWidget',
    libraryTarget : 'umd'
  },

  plugins : [
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV : JSON.stringify('development')
      }
    }),
  ],

  module : {

    rules : [
      {
        test    : /\.jsx?$/,
        exclude : /(node_modules|bower_components)/,
        use     : [
          'babel-loader',
        ]
      }, {
        test : /\.less$/,
        use  : [{
          loader : 'style-loader' // creates style nodes from JS strings
        }, {
          loader : 'css-loader' // translates CSS into CommonJS
        }, {
          loader : 'less-loader' // compiles Less to CSS
        }]
      },  {
        test   : /\.svg$/,
        use: [
          'svg-inline-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      }, {
        test : /\.pug$/,
        use  : [{
          loader : 'raw-loader' // creates style nodes from JS strings
        }, {
          loader : 'pug-html-loader' // translates CSS into CommonJS
        }]
      }
    ],

  },

  resolve : {

    modules : [
      path.resolve(__dirname, 'src/js'), 'node_modules'
    ],

    alias : {
      actions    : path.resolve(__dirname, 'src/js/actions/'),
      api        : path.resolve(__dirname, 'src/js/api/'),
      components : path.resolve(__dirname, 'src/js/components/'),
      helpers    : path.resolve(__dirname, 'src/js/helpers/'),
      containers : path.resolve(__dirname, 'src/js/containers'),
      constants  : path.resolve(__dirname, 'src/js/constants'),
      config  : path.resolve(__dirname, 'src/js/config'),
    },

    extensions : ['.js', '.jsx', '.less', '.css', '.pug', '.svg'],
  },

  externals : {
    // ga : 'ga',
    // io : 'io'
  },

  target  : 'web',
  devtool : 'source-map',

  watch        : false,
  watchOptions : {
    aggregateTimeout : 300,
    poll             : 1000,
    ignored          : /node_modules/
  },

  devServer : {
    contentBase : path.join(__dirname, './dist'),
    compress    : true,
    port        : 9080,

    proxy : {
      '/api/**' : {
        target : 'http://localhost:4848',
        secure : false
      }
    },

    headers : {
      'Access-Control-Allow-Origin'  : '*',
      'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers' : 'X-Requested-With, content-type, Authorization'
    }
  }
};
