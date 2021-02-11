const webpack = require("webpack");

module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete("pwa");
    config.plugins.delete("workbox");
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: "mapbox-gl",
      }),
    ],
  },
  transpileDependencies: ["vuetify"],
  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
  },
};
