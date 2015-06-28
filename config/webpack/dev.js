import path from 'path';
import webpack from 'webpack';

//Must be a better way
const ROOT = path.join(__dirname, '../..') + '/';

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './client/src/js/index'
  ],
  output: {
    path: ROOT + 'dist',
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
    {
      test: /\.js$|.jsx$/,
      loaders: ['react-hot', 'babel'],
      include: ROOT + 'client/src'
    },
    {
      test: /\.scss$/,
      loader: 'style!css!sass?sourceMap'
    }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    modulesDirectories: ['node_modules', 'client', 'server']
  }
};
