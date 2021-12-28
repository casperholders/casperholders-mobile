// This file provides alias supports for JetBrains IDE, as those do not support
// only inspecting babel config at this time.

const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
