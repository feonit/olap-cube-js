import Cube from './Cube.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

describe('test defaultFactOptions', () => {
	let debug;
	it('method fillEmptyCells must use data from defaultFactOptions as default', () => {
		let factTable = {
			defaultFactOptions: {
				isOpen: false
			},
			facts: [
				{ id: 1, x: 1, y: 1, isOpen: true },
				{ id: 2, x: 2, y: 2, isOpen: true },
			]
		};
		let dimensionHierarchies = [
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
		let cube = Cube.create(factTable, dimensionHierarchies);
		cube.fillEmptyCells();
		debug = isEqualObjects(cube.getFacts(), [
			{ id: 1, x: 1, y: 1, isOpen: true },
			{ id: 2, x: 2, y: 2, isOpen: true },
			{ x: 1, y: 2, isOpen: false },
			{ x: 2, y: 1, isOpen: false }
		])
	});
	it('method addDimensionMember must use data from defaultFactOptions as default', () => {
		let factTable = {
			defaultFactOptions: {
				isOpen: false
			},
			facts: [
				{ id: 1, x: 1, y: 1, isOpen: true },
			]
		};
		let dimensionHierarchies = [
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
		let cube = Cube.create(factTable, dimensionHierarchies);
		cube.addDimensionMember('x', { x: 2 });
		debug = isEqualObjects(cube.getFacts(), [
			{ id: 1, x: 1, y: 1, isOpen: true },
			{ x: 2, y: 1, isOpen: false },
		])
	})
});
