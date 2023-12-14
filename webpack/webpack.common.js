const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    // js
    dynamic_tree: './js/dynamic_tree.js', 
    tree: './js/static_tree.js',
    person_routing: './js/person_routing.js',
    routing_404: './js/routing_404.js',
    all_people: './js/all_people.js',
    all_people_wide: './js/all_people_wide.js',
    table: './js/table.js',
    account: './js/memberspace/account.js',
    posts: './js/memberspace/posts.js',
    commentable: './js/memberspace/commentable.js',
    // css
    layout_common: "./css/layout_common.css",
    pagination_hidden: "./css/pagination-hidden.css",
    pagination: "./css/pagination.css",
    links: "./css/links.css",
    table_style: "./css/table.css",
    tree_style: "./css/tree.css"
  },
  output: {
    filename: 'js/[name].js', // Output bundle
    path: path.resolve(__dirname, '../docs/assets/'), // Where to output the bundle
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Use MiniCssExtractPlugin.loader here
      },
      // ... other rules
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ]
};