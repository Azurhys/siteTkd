const webpack = require('webpack');

module.exports = {
  // autres configurations webpack
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VITE_BACKEND_URL': JSON.stringify(process.env.VITE_BACKEND_URL),
    }),
  ],
};