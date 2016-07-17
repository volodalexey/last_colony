const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractPlugin = require('extract-text-webpack-plugin'),
  git = require('git-rev-sync'),
  entry_file = 'index.js',
  d_dev = 'dev',
  d_js = 'js',
  d_ejs = 'ejs',
  d_dist = 'dist',
  bundle_name = 'last_colony_bundle',
  js_path = path.join(__dirname, 'js'),
  json_path = path.join(__dirname, 'json'),
  less_path = path.join(__dirname, 'less'),
  package_path = path.join(__dirname, '..', 'package.json'),
  production = process.env.NODE_ENV === 'production',
  development = !production,
  webpack_plugins = [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, d_ejs, 'index.ejs'),
      inject: 'body'
    }),
    new ExtractPlugin(bundle_name + '.' + (production ? 'min' : '') + '.css')
  ],
  dist_file = bundle_name + '.' + (production ? 'min' : '') + '.js';

if (production) {
  webpack_plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'GIT_BRANCH': JSON.stringify(git.branch()),
        'GIT_LONG': JSON.stringify(git.long())
      }
    })
    // ,new webpack.optimize.UglifyJsPlugin({
    //   compress: {warnings: false}
    // })
  )
}

var babel_loader = {
  loader: 'babel',
  test: /\.js$/,
  include: [js_path]
};
if (babel_loader) {
  if (!babel_loader.query) { babel_loader.query = {} }
  babel_loader.query.plugins = ['inferno'];
}

module.exports =  {
  debug: development,
  entry: {
    app: path.join(__dirname, d_js, entry_file)
  },
  output: {
    filename: dist_file,
    path: path.join(__dirname, '..', d_dist)
  },
  module: {
    loaders: [
      babel_loader,
      {
        test: /\.json$/,
        include: [json_path, package_path],
        loader: 'json'
      },
      {
        test: /\.less$/,
        include: [less_path],
        loader: ExtractPlugin.extract('style', 'css!less')
      }
    ]
  },
  plugins: webpack_plugins
};
