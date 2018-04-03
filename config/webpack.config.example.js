const path = require('path');

module.exports = {
	entry: {
		'product-table': path.resolve(__dirname, '../examples/product-table/product-table.js')
	},
	output: {
		path: path.resolve(__dirname, '../examples/product-table/dist'),
		filename: '[name].js',
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