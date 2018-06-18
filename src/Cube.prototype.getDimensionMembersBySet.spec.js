import {createProductCube} from './data/products.js'
import Cube from './Cube.js'

describe('method Cube.prototype.getDimensionMembersBySet', () => {
	let cube;
	let debug;

	beforeEach(() => {
		cube = createProductCube();
	});

	it('should define getDimensionMembersBySet', () => {
		expect(Cube.prototype.getDimensionMembersBySet).toBeDefined();
	});

	// это тоже надуманно, фильтрация в схеме снежинки нужна особая
	it('query should return list of members for dimension with space option including one dimension', () => {
		expect(debug = cube.getDimensionMembersBySet('mark', { product: { id: 1 } }).length).toBe(2);
	});

	// пример надуманный, по сути другой функционал todo после выделения области measure от области иерархичного space (year находится внутри потому-что)
	it('query should return list of members for dimension with space option including more than one dimension', () => {
		expect(debug = cube.getDimensionMembersBySet('mark', { product: { id: 1 }, year: { id: 1 } }).length).toBe(1);
	});

	it('query without any arguments should return list of members for dimension of all cells', () => {
		expect(debug = cube.getFacts().length).toBe(15);
	});

	it('query with the space option as the first argument should return list of members for dimension of relevant cells', () => {
		expect(debug = cube.getFactsBySet({ mark: { id: 1 } }).length).toBe(3);
	});

	it('query with the space option in which there can be a list of members of the dimension', () => {
		expect(debug = cube.getFactsBySet({ mark: [{ id: 1 }, { id: 2 }] }).length).toBe(7);
	});
});
