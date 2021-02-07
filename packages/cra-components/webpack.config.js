const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const publicPath = './';

const config = {
  entry: {
    'index': './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/cra-components/', // Needs to end in / or paths will be wrong when you serve built version
    filename: '[name].js',
    // These are IMPORTANT
    libraryTarget: 'umd',
    // libraryTarget: 'commonjs',
  },
  // Uncomment to not minify+uglify
  // optimization: {
  //   minimize: false
  // },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    // alias: {}
  },
  externals: {
    // This is IMPORTANT
    // Don't bundle react or react-dom or you will get errors about having multiple versions of React and violating the rule of hooks
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    },
  },
  devServer: {
    injectClient: false,  // Force no hot reloading. Websocket can't connect through proxy
    
    port: 8086,
    contentBase: './dist',
    publicPath: '/cra-components', // Better UX if doesn't need / on end
      
    writeToDisk: true,    // Always write files to disk instead of serving from memory
  },
  plugins: [
    // new CopyPlugin({ patterns: [{ from: 'public/**' }] }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
    // new HtmlWebpackPlugin({ template: './src/index.html' }),
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
        use: [
          {
            loader: 'file-loader',
            options: {
              mimetype: 'image/svg+xml',
              publicPath: './' // Necessary or build will fail
              // publicPath,
              // outputPath: 'cra-app',
              // useRelativePath: true,
              // publicPath: '',
              // outputPath: 'cra-components/', // is place where your want to save files
              // publicPath: '/cra-components/', // is what url you have in js, css and etc files.
            }
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
              publicPath: './' // Necessary or build will fail
              // publicPath,
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