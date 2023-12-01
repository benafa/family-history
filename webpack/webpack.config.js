const path = require('path');

module.exports = {
  entry: {
    dynamic_tree: './js/select_tree.js', // Your entry file
    tree: './js/static_tree.js',
    table: './js/table.js',
    account: './js/memberspace/account.js',
    posts: './js/memberspace/posts.js',
    commentable: './js/memberspace/commentable.js'
  },
  output: {
    filename: '[name].js', // Output bundle
    path: path.resolve(__dirname, '../docs/assets/js'), // Where to output the bundle
  },
  mode: 'production', // Can be 'development' or 'production',
  devtool: 'source-map'
};