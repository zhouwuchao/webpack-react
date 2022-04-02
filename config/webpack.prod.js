const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  entry: join(__dirname, '../src/index.js'),
  output: {
    filename: 'js/[contenthash].[name].js',
    path: join(__dirname, '../dist'),
    clean: true
  },
  resolve: {
    alias: {
      '@pub': join(__dirname, '../public')
    },
    extensions: ['.js', '.ts', '.jsx'],
    // extensions: ['.js', '.jsx', '.json'],
    modules: [join(__dirname, '../node_modules')]
  },
  optimization: {
    minimize: true,
    usedExports: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, '../public/index.html'),
      filename: 'index.html',
      favicon: join(__dirname, '../public/favicon.ico'),
      minify: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[contenthash].css'
    }),
    new CssMinimizerWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif)/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash].[name][ext]'
        }
      },
      {
        test: /\.(jpe?g|png|gif)/,
        type: 'asset/inline',
      },
      {
        test: /\.(jpe?g|png|gif)/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024
          }
        }
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              // plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        ]
      }
    ]
  }
}