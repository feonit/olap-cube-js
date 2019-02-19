const babelOptions = require('./babel.config.js');

module.exports = require('babel-jest').createTransformer(babelOptions);