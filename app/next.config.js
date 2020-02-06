const path = require('path');
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
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
  },
  publicRuntimeConfig: {
    NO_PDF: process.env.NO_PDF,
    NO_MATHJAX: process.env.NO_MATHJAX
  }
};
