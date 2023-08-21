const webpack = require('webpack');
const path = require('path');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    path: require.resolve('path-browserify'),
    querystring: require.resolve("querystring-es3"),
    os: require.resolve("os-browserify/browser"),
    url: require.resolve("url/"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    fs: require.resolve("browserify-fs"),
    //child_process: 'empty', 
  };
  return config;
};
