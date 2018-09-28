import Cube from '../src/Cube.js';
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {
	let debug;

	it('should define addFacts', () => {
		expect(Cube.prototype.addFacts).toBeDefined();
	});

	it('method should work, level 1', () => {
		const dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'x',
					keyProps: ['x']
				}
			},
			{
				dimensionTable: {
					dimension: 'y',
					keyProps: ['y']
				}
			}
		];

		const cube = new Cube({dimensionHierarchies});

		debug = isEqualObjects(cube.getCells(), []);
		debug = isEqualObjects(cube.dimensionHierarchies[0].dimensionTable.members, []);
		debug = isEqualObjects(cube.dimensionHierarchies[1].dimensionTable.members, []);

		cube.addFacts([
			{ id: 1, x: 0, y: 0 },
			{ id: 2, x: 1, y: 1 }
		]);

		debug = isEqualObjects(cube.getCells(), [
			{ id: 1, x_id: 1, y_id: 1 },
			{ id: 2, x_id: 2, y_id: 2 }
		]);
		debug = isEqualObjects(cube.dimensionHierarchies[0].dimensionTable.members, [{ id: 1, x: 0 }, { id: 2, x: 1 }]);
		debug = isEqualObjects(cube.dimensionHierarchies[1].dimensionTable.members, [{ id: 1, y: 0 }, { id: 2, y: 1 }]);

		cube.addFacts([
			{ id: 3, x: 3, y: 3 }
		]);

		debug = isEqualObjects(cube.getCells(), [
			{ id: 1, x_id: 1, y_id: 1 },
			{ id: 2, x_id: 2, y_id: 2 },
			{ id: 3, x_id: 3, y_id: 3 }
		]);
		debug = isEqualObjects(cube.dimensionHierarchies[0].dimensionTable.members, [{ id: 1, x: 0 }, { id: 2, x: 1 }, { id: 3, x: 3 }]);
		debug = isEqualObjects(cube.dimensionHierarchies[1].dimensionTable.members, [{ id: 1, y: 0 }, { id: 2, y: 1 }, { id: 3, y: 3 }]);
	});

	it('method should work, level 2', () => {
		const dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'x',
					keyProps: ['x']
				}
			},
			{
				dimensionTable: {
					dimension: 'y',
					keyProps: ['y']
				},
				level: [
					{
						dimensionTable: {
							dimension: 'yy',
							keyProps: ['yy']
						}
					}
				]
			}
		];

		const cube = new Cube({dimensionHierarchies});

		debug = isEqualObjects(cube.dimensionHierarchies[1].level[0].dimensionTable.members, []);

		cube.addFacts([
			{ id: 1, x: 0, y: 0, yy: 0.1 },
			{ id: 2, x: 1, y: 1, yy: 0.9 }
		]);

		debug = isEqualObjects(cube.dimensionHierarchies[1].level[0].dimensionTable.members, [{ id: 1, yy: 0.1 }, { id: 2, yy: 0.9 }]);

		cube.addFacts([
			{ id: 3, x: 3, y: 3, yy: 2.8 }
		]);

		debug = isEqualObjects(cube.getCells(), [
			{ id: 1, x_id: 1, y_id: 1 },
			{ id: 2, x_id: 2, y_id: 2 },
			{ id: 3, x_id: 3, y_id: 3 }
		]);

		// first level
		debug = isEqualObjects(cube.dimensionHierarchies[1].dimensionTable.members, [{ id: 1, y: 0, yy_id: 1 }, { id: 2, y: 1, yy_id: 2 }, { id: 3, y: 3, yy_id: 3 }]);
		// second level
		debug = isEqualObjects(cube.dimensionHierarchies[1].level[0].dimensionTable.members, [{ id: 1, yy: 0.1 }, { id: 2, yy: 0.9 }, { id: 3, yy: 2.8 }]);
	})
};
