import Cube from '../src/Cube.js';
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {
	let debug;
	it('members must have special prop name as id', () => {
		let facts = [
			{ id: 1, x: 0, y: 0 },
		];
		let dimensionHierarchies = [
			{
				dimensionTable: {
					primaryKey: 'ID',
					dimension: 'x',
					keyProps: ['x']
				}
			},
			{
				dimensionTable: {
					primaryKey: 'ID_Y',
					dimension: 'y',
					keyProps: ['y']
				}
			}
		];
		let cube = new Cube({dimensionHierarchies});
		cube.addFacts(facts);
		debug = isEqualObjects(
			cube.getDimensionMembers('x')[0],
			{ ID: 1, x: 0 }
		);
		debug = isEqualObjects(
			cube.getDimensionMembers('y')[0],
			{ ID_Y: 1, y: 0 }
		);
	})
};
