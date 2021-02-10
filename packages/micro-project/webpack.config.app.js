const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: {
    // 'react-hot-loader/patch',
    'index': './src/app/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist/micro-standalone-app'),
    publicPath: '/micro-url/', // Needs to end in / or paths will be wrong when you serve built version
    filename: '[name].js',
  },
  devtool: 'source-map',
  optimization: {
    // minimize: false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      // This is IMPORTANT
      // This provides React to the component
      'react': path.resolve(__dirname, './node_modules/react'),
      // 'react-dom': '@hot-loader/react-dom'
    }
  },
  // devServer: {
  //   injectClient: false,  // Force no hot reloading. Websocket can't connect through proxy
  //   progress: true,

  //   port: 8082,
  //   contentBase: './dist/micro-standalone-app',
  //   publicPath: '/micro-url', // Better UX if doesn't need / on end
  //   historyApiFallback: {
  //     index: '/micro-url/index.html'
  //   }
  // },
  plugins: [
    // new CleanWebpackPlugin(),
    // new CopyPlugin({ patterns: [{ from: 'public/**' }] }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ template: './src/app/index.html' }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
        exclude: /\.module\.css$/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: 'file-loader'
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        include: /\.module\.css$/
      }
    ]
  },
};

module.exports = config;