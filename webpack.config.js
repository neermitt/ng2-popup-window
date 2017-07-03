var path = require("path");
var webpack = require("webpack");

var webpackRxjsExternals = require("webpack-rxjs-externals");

var config = {
  entry: {
    "ng2-popup-window": ["./src/index.ts"],
    "ng2-popup-window.min": ["./src/index.ts"]
  },
  output: {
    path: path.resolve(__dirname, "_bundles"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "ng2-popup-window",
    umdNamedDefine: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      include: /\.min\.js$/,
    })
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /(node_modules|__tests__)/
      }
    ]
  },
  externals: [
    webpackRxjsExternals(),
    {
      "@angular/core": {
        root: ["ng", "core"],
        commonjs: "@angular/core",
        commonjs2: "@angular/core",
        amd: "@angular/core"
      },
      "@angular/common": {
        root: ["ng", "common"],
        commonjs: "@angular/common",
        commonjs2: "@angular/common",
        amd: "@angular/common"
      }
    }
  ]
};

module.exports = config;
