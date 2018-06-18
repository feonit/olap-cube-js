import {createProductCube} from './data/products.js'
import Cube from './Cube.js'

describe('method Cube.prototype.getMeasure', () => {
	let cube;

	beforeEach(() => {
		cube = createProductCube();
	});

	it('should define getMeasure', () => {
		expect(Cube.prototype.getMeasure).toBeDefined();
	});

	it('query should return list of members for dimension of cells', () => {
		expect(cube.getMeasure().length).toBe(15);
	});
});
