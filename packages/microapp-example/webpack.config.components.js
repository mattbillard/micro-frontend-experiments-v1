const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const publicPath = '/example-components/components/'; // Needs to end in / or paths will be wrong when you serve built version

const config = {
  entry: {
    'index': './src/components/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist/example-components'),
    publicPath,
    filename: '[name].js',
    libraryTarget: 'umd', // IMPORTANT
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
  externals: {
    // IMPORTANT: don't bundle react or react-dom or you will get errors about having multiple versions of React and violating the rule of hooks
    // react: {
    //   commonjs: "react",
    //   commonjs2: "react",
    //   amd: "React",
    //   root: "React"
    // },
    // "react-dom": {
    //   commonjs: "react-dom",
    //   commonjs2: "react-dom",
    //   amd: "ReactDOM",
    //   root: "ReactDOM"
    // },
    /**
     * NOTE: 
     * If you wanted to you could exclude highcharts and slickgrid from this build and have site provide them as global vars instead 
     * Pros: if multiple micro apps used these, they'd be shared and the browser would have less JS to download
     * Cons: different micro apps would be more coupled and need to upgrade at the same time
     */
    // "highcharts": {
    //   commonjs: "highcharts",
    //   commonjs2: "highcharts",
    //   amd: "Highcharts",
    //   root: "Highcharts"
    // },
    // "slickgrid-es6": {
    //   commonjs: "slickgrid-es6",
    //   commonjs2: "slickgrid-es6",
    //   amd: "Slick",
    //   root: "Slick"
    // }
  },
  plugins: [
    new MiniCssExtractPlugin()
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
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     publicPath,
          //   },
          // },
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
              // TODO: example-components likes this publicPath b/c it's SVG is referred to from CSS. Cra-components likes the commented code b/c it's SVG is referred to from JS
              publicPath: './' // Necessary or build will fail
              // publicPath,
              // outputPath: 'example-components/',
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
              // outputPath: 'example-components/',
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