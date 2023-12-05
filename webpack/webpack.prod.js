const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
     new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['js/*', 'css/*'], // Clean only js and css subdirectories
    }),
    new Dotenv({
       defaut: `./.env.common`,
      path: `./.env.prod`, // Path to .env file 
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Remove console logs
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  // Add any other production-specific configurations here
});
