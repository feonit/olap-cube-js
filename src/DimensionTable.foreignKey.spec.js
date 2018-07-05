import Cube from '../src/Cube.js';
import {isEqualObjects} from '../spec/helpers/helpers.js'

describe('test property foreignKey', () => {
	let debug;
	it('foreignKey of dimension table can be any and have high priority', () => {
		let facts = [
			{ id: 1, x: 0 },
		];

		let dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'x',
					keyProps: ['x']
				},
				level: [
					{
						dimensionTable: {
							dimension: 'xx',
							keyProps: ['xx'],
							foreignKey: 'my_foreign_key_xx'
						}
					}
				]
			}
		];
		let options = {
			templateForeignKey: '%sId'
		};
		let cube = Cube.create(facts, dimensionHierarchies, options);
		debug = isEqualObjects(
			cube.getCells()[0],
			{ id: 1, xId: 1 }
		);
		debug = isEqualObjects(
			cube.getDimensionMembers('x')[0],
			{ id: 1, x: 0, my_foreign_key_xx: 1 }
		);
	});
});
