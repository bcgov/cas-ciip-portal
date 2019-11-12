const path = require('path');
const withCSS = require('@zeit/next-css');
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = withCSS({
  cssModules: true,
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ];

    return config;
  }
});
