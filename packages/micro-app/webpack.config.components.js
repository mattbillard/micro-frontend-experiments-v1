const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const publicPath = '/micro-components/components/'; // Needs to end in / or paths will be wrong when you serve built version

const config = {
  entry: {
    'index': './src/components/index.tsx',
    // 'golden-spiral': './src/components/golden-spiral.tsx',
    // 'golden-text': './src/components/golden-text.tsx',
    // 'column-chart': './src/components/column-chart.tsx',
    // 'pie-chart': './src/components/pie-chart.tsx',
    // 'stock-chart': './src/components/stock-chart.tsx',
    // 'stock-grid': './src/components/stock-grid.tsx',
    // 'text-tester': './src/components/text-tester.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist/components'),
    publicPath,
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
    // TODO: think through if we want this or not
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
  // devServer: {
  //   injectClient: false,  // Force no hot reloading. Websocket can't connect through proxy
  //   progress: true,

  //   port: 8083,
  //   contentBase: './dist',
  //   publicPath: '/micro-components', // Better UX if doesn't need / on end
      
  //   writeToDisk: true,    // Always write files to disk instead of serving from memory
  // },
  plugins: [
    // new CopyPlugin({ patterns: [{ from: 'public/**' }] }),
    // new CleanWebpackPlugin(),
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
              // TODO: micro-components likes this publicPath b/c it's SVG is referred to from CSS. Cra-components likes the commented code b/c it's SVG is referred to from JS
              publicPath: './' // Necessary or build will fail
              // publicPath,
              // outputPath: 'micro-components/',
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
              // outputPath: 'micro-components/',
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