// import all the requires npm packages needed for the functionality of the application.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// all of the webpack settings for bundling, handling a service worker, naming conventions, and style loaders.
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // defines what the bundled js file is going to be named, along with the location in which it will live after the build has been processed
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'TextEditPWA',
      }),
      // defines information about the application incuding name, shortname, colors, and the start URL
      new WebpackPwaManifest({
        name: 'Text Edit PWA',
        short_name: 'TEPWA',
        description: 'Progressive web application Text editor for saving code on the go!',
        background_color: '#bdfff6',
        theme_color: '#bdfff6',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      // defines the source location for our service worker, along with creating the name of the service worker that will be created when the build has processed
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      })
    ],
    // define that the css-loader that we will be using is babel-loader.
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
