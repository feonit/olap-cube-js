import path from 'path';
import fs from 'fs';
import babel from 'rollup-plugin-babel';
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
			babel()
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
			babel(),
			uglify()
		]
	}
]