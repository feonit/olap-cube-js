const path = require('path');

module.exports = {
    entry: {
        cube: path.resolve(__dirname, '../src/Cube.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        library: "Cube",
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