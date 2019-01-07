import Cube from './Cube.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {

	it('should define addDimensionHierarchy', () => {
		expect(Cube.prototype.addDimensionHierarchy).toBeDefined();
	});

	let debug;
	let facts;
	let cells;
	let cube;
	let addDimensionHierarchy;

	describe('level 1', () => {
		beforeEach(() => {
			facts = [
				{ id: 1, x: 1 },
				{ id: 2, x: 2 },
			];
			cells = [
				{ id: 1, x_id: 1 },
				{ id: 2, x_id: 2 }
			];
			cube = new Cube();
			cube.addFacts(facts);

			addDimensionHierarchy = () => {
				cube.addDimensionHierarchy({
					dimensionTable: {
						dimension: 'x',
						keyProps: ['x']
					}
				});
			}
		});
		it('cellTable must be changed', () => {
			debug = isEqualObjects(cube.getCells(), facts);
			addDimensionHierarchy();
			debug = isEqualObjects(cube.getCells(), cells);
		});
		it('getDimensionMembers must return members', () => {
			expect(() => {
				cube.getDimensionMembers('x')
			}).toThrow();
			addDimensionHierarchy();
			debug = isEqualObjects(cube.getDimensionMembers('x'), facts)
		});
	});
	describe('level 2', () => {
		beforeEach(() => {
			facts = [
				{ id: 1, x: 1, xx: 0.9 },
				{ id: 2, x: 2, xx: 1.9 },
			];
			cells = [
				{ id: 1, x_id: 1 },
				{ id: 2, x_id: 2 }
			];
			cube = new Cube();
			cube.addFacts(facts);

			addDimensionHierarchy = () => {
				cube.addDimensionHierarchy({
					dimensionTable: {
						dimension: 'x',
						keyProps: ['x']
					},
					level: [
						{
							dimensionTable: {
								dimension: 'xx',
								keyProps: ['xx']
							},
						}
					]
				});
			};
		});
		it('cellTable must be changed', () => {
			debug = isEqualObjects(cube.getCells(), facts);
			addDimensionHierarchy();
			debug = isEqualObjects(cube.getCells(), cells);
		});
		it('getDimensionMembers must return members', () => {
			expect(() => {
				cube.getDimensionMembers('x')
			}).toThrow();
			expect(() => {
				cube.getDimensionMembers('xx')
			}).toThrow();
			addDimensionHierarchy();
			debug = isEqualObjects(cube.getDimensionMembers('x'), [
				{ id: 1, x: 1, xx_id: 1 },
				{ id: 2, x: 2, xx_id: 2 }
			]);
			debug = isEqualObjects(cube.getDimensionMembers('xx'), [
				{ id: 1, xx: 0.9 },
				{ id: 2, xx: 1.9 }
			]);
		});
	})
};
