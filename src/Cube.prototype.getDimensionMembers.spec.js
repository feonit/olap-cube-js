import {createProductCube} from '../spec/data/products.js'
import Cube from './Cube.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {
	let cube;

	beforeEach(() => {
		cube = createProductCube();
	});

	it('should define getDimensionMembers', () => {
		expect(Cube.prototype.getDimensionMembers).toBeDefined();
	});

	it('query should return list of members for all dimension in first level of hierarchy', () => {
		isEqualObjects([
			{ id: 1, product: 'TV' },
			{ id: 2, product: 'Phone' },
			{ id: 3, product: 'Clock' }
		], cube.getDimensionMembers('product'));
		isEqualObjects([
			{ id: 1, mark: 'SONY' },
			{ id: 2, mark: 'APPLE' },
			{ id: 3, mark: 'LG' }
		], cube.getDimensionMembers('mark'));
		expect(cube.getDimensionMembers('month').length).toBe(13);
	});

	it('query should return list of members for all dimension in other levels of hierarchy', () => {
		expect(cube.getDimensionMembers('year').length).toBe(4);
		expect(cube.getDimensionMembers('qr').length).toBe(11);
	});
};
