const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
    extensions: ['.js', '.jsx', '.json'],
    modules: [join(__dirname, '../node_modules')]
  },
  optimization: {
    minimize: true,
    usedExports: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: 'eval-source-map',
  devServer: {
    compress: true,
    port: 8088,
    open: true,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, '../public/index.html'),
      filename: 'index.html',
      favicon: join(__dirname, '../public/favicon.ico'),
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      // {
      //   test: /\.m?js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // },
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
            maxSize: 60 * 1024
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
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