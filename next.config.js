const path = require('path');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

module.exports = withCSS(
  withSass({
    cssModules: true,
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
  })
);
