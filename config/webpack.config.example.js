const path = require('path');
const vendors = [
	path.resolve(__dirname, '../node_modules/core-js/library/fn/reflect/construct.js')
];

module.exports = {
	entry: {
		'Reflect': vendors
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js',
		library: ['example', 'Reflect', 'construct'],
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			}
		]
	}
};