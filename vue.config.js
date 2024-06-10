const { defineConfig } = require('@vue/cli-service');
const path = require('path');

// const fs = require('fs');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/': {
        target: 'http://127.0.0.1:8018',
        ws: false,
        changeOrigin: true,
        pathRewrite: {}
      }
    },
    hot: true,
  },
  assetsDir: 'static',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  css: {
    loaderOptions: {
      less: {
        additionalData: `@import "${path.resolve(__dirname, './src/common/style/variables.less')}";`
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, './src'));
    config.resolve.extensions.add('.js');
    config.resolve.modules
      .add(path.resolve(__dirname, 'src'))
      .add('node_modules');
    config.module.rule('js')
      .include.add(path.resolve(__dirname, './src/engine-template')).end()
      .include.add(path.resolve(__dirname, './src/common')).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options;
      });

    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunks: true,
        }
      }
    });
  }
});
