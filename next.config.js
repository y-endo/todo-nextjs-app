const path = require('path');
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  webpack: config => {
    config.resolve.alias['~'] = path.resolve(__dirname, './src');
    return config;
  }
});
