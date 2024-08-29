const { defineConfig } = require('@vue/cli-service');
const path = require.resolve('path-browserify');
const util = require.resolve('util/');

module.exports = defineConfig({
  transpileDependencies: [
    'stream-browserify',
    'crypto-browserify',
    'jsonwebtoken'
  ],
  configureWebpack: {
    resolve: {
      fallback: {
        "path": path,
        "util": util
      }
    }
  }
});
