const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed || {};

// Determine if running in Docker
const isDocker = process.env.IS_DOCKER === 'true';
console.log('IS_DOCKER environment variable:', process.env.IS_DOCKER);

const backendUrlDocker = env.BACKEND_URL_DOCKER || process.env.BACKEND_URL_DOCKER || 'http://backend:3001';
const backendUrlLocal = env.BACKEND_URL_LOCAL || process.env.BACKEND_URL_LOCAL || 'http://localhost:3001';
const backendUrl = isDocker ? backendUrlDocker : backendUrlLocal;
console.log('Using backend URL:', backendUrl);

const apiKey = env.API_KEY || process.env.API_KEY || 'api-here';
console.log('API Key (last 4 chars):', apiKey.slice(-4));

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.BACKEND_URL_DOCKER': JSON.stringify(backendUrlDocker),
      'process.env.BACKEND_URL_LOCAL': JSON.stringify(backendUrlLocal)
    })
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    host: '0.0.0.0',
    proxy: [
      {
        context: ['/api'],
        target: backendUrl,
        changeOrigin: true
      }
    ]
  }
}; 