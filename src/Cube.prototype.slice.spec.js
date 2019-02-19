import Cube from './Cube.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {
	let facts;
	let dimensionHierarchies;
	let cube;
	let debug;
	beforeEach(() => {
		facts = [
			{ id: 1, x: 1, xx: 1.1, y: 1 },
			{ id: 1, x: 2, xx: 2.3, y: 2 },
			{ id: 1, x: 3, xx: 3.5, y: 3 },
		];
		dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'xx',
					keyProps: ['xx'],
				},
				level: [
					{
						dimensionTable: {
							dimension: 'x',
							keyProps: ['x'],
						},
					}
				]
			},
			{
				dimensionTable: {
					dimension: 'y',
					keyProps: ['y'],
				},
			}
		];
		cube = new Cube({dimensionHierarchies});
		cube.addFacts(facts);
	});
	it('should define slice', () => {
		expect(Cube.prototype.slice).toBeDefined();
	});
	const yMember = { id: 1, y: 1 };
	it('slice must return instance of Cube', () => {
		const subCube = cube.slice('y', yMember);
		expect(debug = subCube instanceof Cube).toBe(true)
	});
	it('slice target dimensionTable must contain one member as passed in arguments', () => {
		const subCube = cube.slice('y', yMember);
		debug = isEqualObjects(subCube.getDimensionMembers('y'), [yMember]);
		expect(debug = subCube.getDimensionMembers('y')[0] === cube.getDimensionMembers('y')[0]).toBe(true)
	});
};
