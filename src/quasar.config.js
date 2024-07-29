// quasar.config.js
const path = require('path');

module.exports = function (ctx) {
  return {
    // ... other configurations
    build: {
      extendWebpack(cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          '@': path.resolve(__dirname, './src'),
        };
        cfg.plugins.push(
          new webpack.ProvidePlugin({
            global: 'globalThis', // or 'window'
          })
        );
      },
    },
  };
};
