const path = require('path');

module.exports = {
    entry: './src/cube.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'cube.js',
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