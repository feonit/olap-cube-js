import Cube from '../src/Cube.js';
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {
	let debug;
	it('foreignKey of dimension table can be any string', () => {
		let facts = [
			{ id: 1, x: 0 },
		];

		let dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'x',
					keyProps: ['x'],
					foreignKey: 'my_foreign_key_x'
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
		let cube = new Cube({dimensionHierarchies});
		cube.addFacts(facts);
		debug = isEqualObjects(
			cube.getCells()[0],
			{ id: 1, my_foreign_key_x: 1 }
		);
		debug = isEqualObjects(
			cube.getDimensionMembers('x')[0],
			{ id: 1, x: 0, my_foreign_key_xx: 1 }
		);
	});
};
