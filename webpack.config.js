const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')

const path = require('path')

const IS_NATIVE = !!process.env.IS_NATIVE
const IS_RELEASE = !!process.env.IS_RELEASE

const resolveAlias = {
  img: path.resolve(__dirname, 'src/img/'),
  views: path.resolve(__dirname, 'src/views/'),
  services: path.resolve(__dirname, 'src/services/'),
  actions: path.resolve(__dirname, 'src/actions/'),
  utils: path.resolve(__dirname, 'src/utils/'),
  constants: path.resolve(__dirname, 'src/constants/'),
  selectors: path.resolve(__dirname, 'src/selectors/'),
  sources: path.resolve(__dirname, 'src/sources/'),
  src: path.resolve(__dirname, 'src/')
}

let entries = {
  app: path.resolve(__dirname, 'src/index.js')
}

let plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
    filename: 'index.html',
    inject: 'body',
    chunks: ['app']
  }),
  new DefinePlugin({
    ENV: {
      NATIVE: IS_NATIVE
    }
  })
]

module.exports = {
  mode: IS_RELEASE ? 'production' : 'development',
  entry: entries,
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: resolveAlias
  },
  devtool: IS_RELEASE ? 'hidden-source-map' : 'source-map',
  output: {
    path: path.resolve(__dirname, IS_NATIVE ? 'cordova/movienight/www' : 'build'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css)$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          }
        ]
      }
    ]
  },
  plugins: plugins
}
