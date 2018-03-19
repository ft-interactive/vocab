/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { homedir } from 'os';
import { dependencies as externals } from './app/package.json';

const vvtPath = path.join(homedir(), '.vocab/', 'visual-vocabulary-templates/');
const categoriesDataPath = path.join(vvtPath, 'docs', 'categories');
console.log(`CATEGORIES DATA PATH: ${categoriesDataPath}`);
export default {
  externals: [...Object.keys(externals || {}), categoriesDataPath],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, 'app', 'renderer'),
    filename: 'renderer.dev.js',
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.join(__dirname, 'app'), 'node_modules']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),

    new webpack.NamedModulesPlugin()
  ]
};
