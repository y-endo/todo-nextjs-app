const path = require('path');
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack: config => {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    });
    config.resolve.alias['~'] = path.resolve(__dirname, './src');
    return config;
  }
});
