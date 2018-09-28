import Cube from '../src/Cube.js';
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {
	let debug;
	it('should define removeFacts', () => {
		expect(Cube.prototype.addFacts).toBeDefined();
	});
	it('method should work, level 1', () => {
		const dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'x',
					keyProps: ['x'],
					members: [
						{ id: 1, x: 100 },
						{ id: 2, x: 200 },
						{ id: 3, x: 300 }
					]
				}
			}
		];
		const cellTable = [
			{ id: 1, x_id: 1 },
			{ id: 2, x_id: 2 },
			{ id: 3, x_id: 3 },
		];
		const cube = new Cube({dimensionHierarchies, cellTable});
		cube.removeFacts([
			{ id: 1, x: 100 }
		]);
		debug = isEqualObjects(cube.getCells(), [
			{ id: 2, x_id: 2 },
			{ id: 3, x_id: 3 },
		]);
		debug = isEqualObjects(cube.dimensionHierarchies[0].dimensionTable.members, [
			{ id: 2, x: 200 },
			{ id: 3, x: 300 }
		]);
	});
	it('method should work, level 2', () => {
		const dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'x',
					keyProps: ['x'],
					members: [
						{ id: 1, x: 100, xx_id: 1 },
						{ id: 2, x: 200, xx_id: 2 },
						{ id: 3, x: 300, xx_id: 3 }
					]
				},
				level: [
					{
						dimensionTable: {
							dimension: 'xx',
							keyProps: ['xx'],
							members: [
								{ id: 1, xx: 101 },
								{ id: 2, xx: 201 },
								{ id: 3, xx: 301 }
							]
						}
					}
				]
			}
		];
		const cellTable = [
			{ id: 1, x_id: 1 },
			{ id: 2, x_id: 2 },
			{ id: 3, x_id: 3 },
		];
		const cube = new Cube({dimensionHierarchies, cellTable});
		cube.removeFacts([
			{ id: 1, x: 100, xx: 101 }
		]);
		// just check
		debug = isEqualObjects(cube.getCells(), [
			{ id: 2, x_id: 2 },
			{ id: 3, x_id: 3 },
		]);
		// level 1 removed
		debug = isEqualObjects(cube.dimensionHierarchies[0].dimensionTable.members, [
			{ id: 2, x: 200, xx_id: 2 },
			{ id: 3, x: 300, xx_id: 3 }
		]);
		// level 2 removed too
		debug = isEqualObjects(cube.dimensionHierarchies[0].level[0].dimensionTable.members, [
			{ id: 2, xx: 201 },
			{ id: 3, xx: 301 }
		]);
	})
	it('method should work, level 1, check if member still used by other members', () => {
		const dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'x',
					keyProps: ['x'],
					members: [
						{ id: 1, x: 100 },
						{ id: 2, x: 200 }
					]
				}
			}
		];
		const cellTable = [
			{ id: 1, x_id: 1 },
			{ id: 2, x_id: 1 },
			{ id: 3, x_id: 2 },
		];
		const cube = new Cube({dimensionHierarchies, cellTable});
		cube.removeFacts([
			{ id: 1, x: 100 }
		]);
		debug = isEqualObjects(cube.getCells(), [
			{ id: 2, x_id: 1 },
			{ id: 3, x_id: 2 },
		]);
		// member still used, so no change
		debug = isEqualObjects(cube.dimensionHierarchies[0].dimensionTable.members, [
			{ id: 1, x: 100 },
			{ id: 2, x: 200 }
		]);
	});
};
