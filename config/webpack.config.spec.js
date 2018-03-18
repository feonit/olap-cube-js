const path = require('path');

module.exports = {
	entry: {
		spec: path.resolve(__dirname, '../spec/spec.js'),
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js',
		library: "Spec",
		libraryTarget: "var"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader"
			}
		]
	}
};