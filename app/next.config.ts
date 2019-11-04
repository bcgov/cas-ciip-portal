import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import Dotenv from 'dotenv-webpack';
import withCSS from '@zeit/next-css';

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
