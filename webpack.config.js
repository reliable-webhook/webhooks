const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = (env = {}) => ({
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? false : 'eval-source-map',
  output: {
    path: path.resolve(__dirname, env.electron ? './electron/dist' : (env.vscode ? './vscode/media' : './dist')),
    filename: env.vscode ? '[name].js' : '[name]-[fullhash].js',
    publicPath: (env.electron || env.vscode) ? '' : '/app'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules')
    ],
    extensions: ['.js', '.vue', '.json', '.scss', '.css']
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        API_URL: (env.electron || env.vscode)
          ? (env.production ? "'https://www.reliablewebhook.com/api'" : "'http://localhost:3000/api'")
          : "'/api'",
        WS_URL: (env.electron || env.vscode)
          ? (env.production ? "'wss://www.reliablewebhook.com/cable'" : "'http://localhost:3000/cable'")
          : "'/cable'",
        BASE_PATH: (env.electron || env.vscode) ? "'/'" : "'/app'",
        ELECTRON: !!env.electron,
        VSCODE: !!env.vscode
      }
    }),
    new MiniCssExtractPlugin({
      filename: env.vscode ? '[name].css' : '[name]-[fullhash].css'
    }),
    new VueLoaderPlugin(),
    (env.production || env.electron || env.vscode) && new CleanWebpackPlugin(),
    !env.vscode && new HtmlWebpackPlugin({
      title: 'Reliable Webhook'
    }),
    (!env.vscode && !env.electron) && new FaviconsWebpackPlugin({
      logo: './logo.png',
      mode: 'webapp',
      devMode: 'webapp',
      favicons: {
        appName: 'Reliable Webhook',
        appDescription: 'Webhooks development and reliability service',
        icons: {
          coast: false,
          yandex: false
        }
      }
    }),
    process.env.BUNDLE_ANALYZE && new BundleAnalyzerPlugin()
  ].filter(Boolean),
  devServer: {
    port: 9099,
    hot: false,
    liveReload: true,
    historyApiFallback: true
  }
})
