import Cube from './Cube.js'

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
	it('should define dice', () => {
		expect(Cube.prototype.dice).toBeDefined();
	});
	const yMember = { id: 1, y: 1 };
	const xMember = { id: 1, x: 1 };

	it('dice must return instance of Cube', () => {
		const subCube = cube.dice({ y: yMember, x: xMember });
		expect(debug = subCube instanceof Cube).toBe(true)
	});

	it('dice target dimensionTable must contain all members as passed in arguments', () => {
		const subCube = cube.dice({ y: yMember, x: xMember });
		expect(debug = subCube.getDimensionMembers('y')[0] === cube.getDimensionMembers('y')[0]).toBe(true);
		expect(debug = subCube.getDimensionMembers('x')[0] === cube.getDimensionMembers('x')[0]).toBe(true);
	});
};
