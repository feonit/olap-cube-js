import {createProductCube} from './data/products.js'
import Cube from './Cube.js'

describe('method Cube.prototype.getCellsBySet', () => {
	let cube;
	let debug;

	beforeEach(() => {
		cube = createProductCube();
	});

	it('should define getCellsBySet', () => {
		expect(Cube.prototype.getCellsBySet).toBeDefined();
	});

	it('query should return list of members for dimension with space option including one dimension', () => {
		expect(debug = cube.getCellsBySet({ mark: { id: 1 } }).length).toBe(3);
	});
});
