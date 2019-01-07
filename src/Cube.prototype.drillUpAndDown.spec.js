import Cube from './Cube.js'

export default () => {
	let dimensionHierarchies;
	let facts;
	let cube;
	let debug;
	beforeEach(() => {
		dimensionHierarchies = [
			{
				hierarchy: 'humans',
				activeDimension: 'name',
				dimensionTree: {
					dimensionTable: {
						dimension: 'name',
						keyProps: ['name']
					},
					level: [
						{
							dimensionTable: {
								dimension: 'group',
								keyProps: ['group']
							}
						}
					]
				}
			}
		];
		facts = [
			{ id: 1, name: 'leo', group: 'admin' },
			{ id: 1, name: 'foo', group: 'customer' },
		];
	});
	
	it('should define drillUp', () =>  {
		expect(Cube.prototype.drillUp).toBeDefined();
	});
	
	it('should define drillDown', () =>  {
		expect(Cube.prototype.drillDown).toBeDefined();
	});
	
	it('drillUp ', () => {
		cube = new Cube({dimensionHierarchies});
		cube.addFacts(facts);
		expect(debug = cube.dimensionHierarchies[0].activeDimension === 'name');
		cube.drillUp('humans', 'group');
		expect(debug = cube.dimensionHierarchies[0].activeDimension === 'group').toBe(true)
	});
	it('drillDown', () => {
		dimensionHierarchies[0].activeDimension = 'group';
		cube = new Cube({dimensionHierarchies});
		cube.addFacts(facts);
		expect(debug = cube.dimensionHierarchies[0].activeDimension === 'group');
		cube.drillDown('humans', 'name');
		expect(debug = cube.dimensionHierarchies[0].activeDimension === 'name').toBe(true)
	});
};
