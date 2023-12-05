const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new Dotenv({
      defaut: `./.env.common`,
      path: `./.env.dev`, // Path to .env file
      systemvars: true, // to set dev configs in terminal 
    }),
  ],
});