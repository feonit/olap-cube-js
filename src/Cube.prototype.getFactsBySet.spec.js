import {createProductCube} from './data/products.js'
import Cube from './Cube.js'

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
});
