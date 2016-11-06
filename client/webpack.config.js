const
  path = require('path'),
  constants = require('../common/constants'),
  json_package = require('../package.json'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  gitRevSync = require('git-rev-sync'),
  entry_file = 'router.jsx',
  d_js = 'js', d_jsx = 'jsx', d_ejs = 'ejs', d_dist = 'dist', d_less = 'less',
  jsx_path = path.join(__dirname, d_jsx),
  less_path = path.join(__dirname, d_less),
  dist_path = path.join(__dirname, '..', d_dist, 'public'),
  bundle_name = 'last_colony', vendor_name = 'vendor',
  process_env = process.env,
  node_env = process_env.NODE_ENV,
  isCache = process_env.CACHE_ENV === constants.CACHE_ENV.CACHE,
  isProduction = node_env === constants.NODE_ENV.PRODUCTION,
  isDevelopment = !isProduction,
  dist_bundle_file = bundle_name + (isProduction ? '.min' : '') + '.js' + (isCache ? '?[chunkhash]' : ''),
  dist_vendor_file = vendor_name + (isProduction ? '.min' : '') + '.js' + (isCache ? '?[chunkhash]' : ''),
  extractCSS = new ExtractTextPlugin(bundle_name + (isProduction ? '.min' : '') + '.css' + (isCache ? '?[chunkhash]' : '')),
  webpack_plugins = [
    new HtmlWebpackPlugin({
      'GIT_BRANCH': gitRevSync.branch(),
      'GIT_LONG': gitRevSync.long(),
      'VERSION': json_package.version,
      template: path.join(__dirname, d_ejs, 'index.ejs'),
      inject: 'body'
    }),
    extractCSS,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(node_env)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', dist_vendor_file, Infinity)
  ];

if (isProduction) {
  webpack_plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  )
}

module.exports =  {
  debug: isDevelopment,
  entry: {
    app: path.join(__dirname, d_jsx, entry_file),
    vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux',
      'react-intl', 'react-intl/locale-data/en', 'react-intl/locale-data/ru']
  },
  output: {
    filename: dist_bundle_file,
    path: dist_path,
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        include: [jsx_path],
        loader: 'babel',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.less$/,
        include: [less_path],
        loader: extractCSS.extract(['css', 'less'])
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: webpack_plugins,
  devServer: {
    // hot: true,
    historyApiFallback: true,
    contentBase: dist_path,
    publicPath: '/'
    // proxy: {
    //   '/api': 'http://localhost:9000',
    //   '/auth': 'http://localhost:9000'
    // },
  }
};
