const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
module.exports = (env) => {
  return {
    entry: './src/main.ts',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(html)$/,
          use: 'html-loader',
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    //   new webpack.DefinePlugin({
    //     'process.env': JSON.stringify(env)
    //   }),
      new Dotenv({
        path: `./.env.${env.NODE_ENV}`
      })
    ],
    devServer: {
      static: './dist',
      port: 4200,
      open: true,
      historyApiFallback: true,
    },
    mode: env.NODE_ENV === 'production' ? 'production' : 'development'
  };
};
