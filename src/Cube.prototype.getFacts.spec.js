import {createProductCube, factTable} from './data/products.js'
import Cube from './Cube.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

describe('method Cube.prototype.getFacts', () => {
	let cube;
	let debug;

	beforeEach(() => {
		cube = createProductCube();
	});

	it('should define getFacts', ()=> {
		expect(Cube.prototype.getFacts).toBeDefined();
	});

	it('query without any arguments should return list of members for dimension of all cells', () => {
		const facts = cube.getFacts();
		debug = isEqualObjects(facts, factTable);
	});
});
