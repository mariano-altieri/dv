//This will transpile ES6 server files except this one, thus we use ES5 here
require('babel/register');

//Imports
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./../config/webpack/dev');

//Instantiating new Webpack Dev Server
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:3000');
});
