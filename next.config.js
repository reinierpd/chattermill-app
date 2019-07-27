/* eslint no-param-reassign:
["error", { "props": true, "ignorePropertyModificationsFor": ["config"] }] */

const path = require('path');

const srcDir = path.resolve('./src');
const assetPrefix = process.env.ASSET_PREFIX || '';
module.exports = {
  env: {
    STATIC_URL: assetPrefix,
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL || 'https://chattermill-challenge.com/api/',
  },
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [...config.plugins];

    // Absolute path
    config.resolve.modules.push(srcDir);

    return config;
  },
  assetPrefix,
};
