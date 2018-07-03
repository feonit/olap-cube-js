import Cube from '../src/Cube.js';
import {isEqualObjects} from '../spec/helpers/helpers.js'

describe('test property templateForeignKey', () => {
	let debug;
	it('setting for templateForeignKey must work', () => {
		let facts = [
			{ id: 1, x: 0 },
		];

		let dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'x',
					keyProps: ['x']
				},
				dependency: [
					{
						dimensionTable: {
							dimension: 'xx',
							keyProps: ['xx']
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
			{ id: 1, x: 0, xxId: 1 }
		);
	});
});
