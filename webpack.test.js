config = {
  entry: {
    main: './src/index.ts'
  },
  output: {
    path: './dist',
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.html']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  },
  devtool: 'inline-source-map'
};

module.exports = config;
