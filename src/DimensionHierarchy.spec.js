import Cube from './Cube.js'

export default () => {
	it('', () => {
		const dimensionHierarchies = [
			{
				hierarchy: 'users',
				dimensionTree: {
					dimensionTable: {
						dimension: 'user',
						keyProps: ['user']
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
			},
			{
				hierarchy: 'locating',
				dimensionTree: {
					dimensionTable: {
						dimension: 'apartment',
						keyProps: ['apartment']
					},
					level: [
						{
							dimensionTable: {
								dimension: 'floor',
								keyProps: ['floor']
							}
						}
					]
				}
			}
		];
		const facts = [
			{ id: 1, user: 'leo', apartment: 'star', floor: 4 },
			{ id: 1, user: 'merlin', apartment: 'star', floor: 5 },
		];
		const cube = new Cube({dimensionHierarchies});
		cube.addFacts(facts);
		expect(cube.dimensionHierarchies.length === 2).toBe(true)
	});

	it('cube can have dimensions as organized in the hierarchy and not', () => {
		const dimensionHierarchies = [
			{
				hierarchy: 'yes_hierarchy',
				dimensionTree: {
					dimensionTable: {
						dimension: 'user',
						keyProps: ['user']
					}
				}
			},
			{
				dimensionTable: {
					dimension: 'no_hierarchy',
					keyProps: ['group']
				}
			}
		];
		const facts = [
			{ id: 1, user: 'leo', group: 1 },
			{ id: 1, user: 'merlin', group: 2 },
		];
		const cube = new Cube({dimensionHierarchies});
		cube.addFacts(facts);
		expect(cube.dimensionHierarchies.length === 2).toBe(true)
	})
};
