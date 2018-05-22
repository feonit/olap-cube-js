import {isEqual, jsonParseStringify} from '../spec/helpers/helpers.js'
import {createProductCube} from './data/products.js';
import Cube from "./Cube.js";

describe('method Cube.prototype.getFactsBySet', () => {
	let cube;

	beforeEach(() => {
		cube = createProductCube();
	});

	it('should define getFactsBySet', ()=> {
		expect(Cube.prototype.getFactsBySet).toBeDefined();
	});

	it('query with the space option as the first argument should return list of members for dimension of relevant cells', () => {
		expect(cube.getFactsBySet({ mark: { id: 1 } }).length).toBe(3);
	});

	it('query with the space option in which there can be a list of members of the dimension', () => {
		expect(cube.getFactsBySet({ mark: [{ id: 1 }, { id: 2 }] }).length).toBe(7);
	});

	xit('query with the space option in which there may be a plurality of terms of dimension determined by the represented key - value', () => {
		expect(cube.getFactsBySet({ mark: { mark: 'SONY' } }).length).toBe(3);
		expect(cube.getFactsBySet({ mark: { mark: 'APPLE' } }).length).toBe(4);
	});

	// @deprecated
	it('query with the space option in which there may be a plurality of terms of dimension determined by the represented value', () => {
		expect(cube.getFactsBySet({ mark: 'SONY' }).length).toBe(3);
		expect(cube.getFactsBySet({ mark: 'APPLE' }).length).toBe(4);
	});

	it('query with the space option in which there may be a plurality of terms of dimension determined by the represented values', () => {
		expect(cube.getFactsBySet({ mark: ['SONY', 'APPLE'] }).length).toBe(7);
	});
});
