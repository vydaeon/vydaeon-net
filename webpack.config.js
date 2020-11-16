const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {

  entry: {
    app: './src/main/ts/index.ts'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ],
  },

  plugins: [
    new MiniCssExtractPlugin
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/npm'),
  },

  devServer: {
    contentBase: path.join(__dirname, 'src/main/resources/static'),
    port: 9000
  }
};
