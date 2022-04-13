const path = require('path')

module.exports = {
  entry : './src/index.tsx',
  output: {
    path    : path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean   : true,
  },
  module: {
    rules: [
      {
        test   : /\.tsx?$/,
        use    : 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use : [
          'style-loader',
          {
            loader : 'css-loader',
            options: {
              modules      : true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
        include: /\.module\.css$/,
      },
      {
        test   : /\.css$/i,
        use    : ['style-loader', 'css-loader', 'postcss-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
  devServer: {
    compress: true,
    port    : 9000,
  },
}
