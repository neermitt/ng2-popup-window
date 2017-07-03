var path = require("path");
var webpack = require("webpack");


var config = {
  entry: {
    "app": "./demo/main.ts"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /(node_modules|__tests__)/
      },
      {
        test: /\.css$/,
        loaders: 'style-loader!css-loader'
      }
    ]
  }
};

module.exports = config;
