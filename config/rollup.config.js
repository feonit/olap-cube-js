import path from 'path';
import fs from 'fs';
import babel from 'rollup-plugin-babel';
const babelConfig = require('./babel.config.js');
import { uglify } from "rollup-plugin-uglify";
import { terser } from "rollup-plugin-terser";
const version = JSON.stringify(require('../package.json').version);
const input = path.resolve(__dirname, '../src/Cube.js');
const libName = 'Cube';

const banner = `/*!
 * Version: ${version}
 * ${fs.readFileSync('./LICENSE', 'utf8')}
 *
 */`;

//https://github.com/rollup/rollup-plugin-babel/issues/249
const babelOptions = {
	babelrc: false,
	...babelConfig
};
export default [
	{
		input,
		output: {
			file: path.resolve(__dirname, `../dist/cube.esm.js`),
			format: 'esm',
			banner,
			sourcemap: true
		}
	},
	{
		input,
		output: {
			file: path.resolve(__dirname, `../dist/cube.js`),
			format: 'umd',
			name: libName,
			banner,
			sourcemap: true
		},
		plugins: [
			babel(babelOptions)
		]
	},
	{
		input,
		output: {
			file: path.resolve(__dirname, `../dist/cube.esm.min.js`),
			format: 'esm',
			banner,
			sourcemap: true
		},
		plugins: [
			terser()
		]
	},
	{
		input,
		output: {
			file: path.resolve(__dirname, `../dist/cube.min.js`),
			format: 'umd',
			name: libName,
			banner,
			sourcemap: true
		},
		plugins: [
			babel(babelOptions),
			uglify()
		]
	}
]