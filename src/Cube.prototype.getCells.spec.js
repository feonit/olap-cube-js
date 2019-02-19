import {createProductCube} from '../spec/data/products.js'
import Cube from './Cube.js'

export default () => {
	let cube;

	beforeEach(() => {
		cube = createProductCube();
	});

	it('should define getCells', () => {
		expect(Cube.prototype.getCells).toBeDefined();
	});

	it('query should return list of members for dimension of cells', () => {
		expect(cube.getCells().length).toBe(15);
	});
};
