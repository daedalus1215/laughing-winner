// webpack.config.js
const webpack = require('webpack');

module.exports = {
  // ... other configurations
  plugins: [
    new webpack.ProvidePlugin({
      global: 'globalThis', // or 'window'
    }),
  ],
};
