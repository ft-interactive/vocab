/**
 * ESLint config
 */

const config = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: ['babel'],
  rules: {
    'no-console': 0,
    'generator-star-spacing': 0,
    'babel/generator-star-spacing': [2, { before: false, after: true }],
    'global-require': 0
  },
  settings: {
    'import/core-modules': ['electron']
  }
};

module.exports = config;
