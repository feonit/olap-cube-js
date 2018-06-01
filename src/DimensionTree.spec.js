import DimensionTree from '../src/DimensionTree.js';
import {DimensionException} from '../src/errors.js';
import {recursiveObjectsNotHaveCommonLinks, isEqualObjects} from '../spec/helpers/helpers.js'

describe('class DimensionTree', function() {

	let dimensionTreeData;
	let debug;

	beforeEach(()=>{
		dimensionTreeData = {
			dimensionTable: {
				dimension: 'xxx',
				keyProps: ['xxx'],
				otherProps: [],
				members: [
					{ id: 1, xxx: 0.186, xx_id: 1 },
					{ id: 2, xxx: 0.868, xx_id: 2 },
					{ id: 2, xxx: 0.871, xx_id: 2 },
				]
			},
			dependency: [
				{
					dimensionTable: {
						dimension: 'xx',
						keyProps: ['xx'],
						otherProps: [],
						members: [
							{ id: 1, xx: 0.19, x_id: 1 },
							{ id: 2, xx: 0.87, x_id: 2 }
						]
					},
					dependency: [
						{
							dimensionTable: {
								dimension: 'x',
								keyProps: ['x'],
								otherProps: [],
								members: [
									{ id: 1, x: 0.2 },
									{ id: 2, x: 0.9 }
								]
							},
							dependency: []
						}
					]
				}
			]
		};
	});

	xit(('should create dimensionTree', ()=>{
		expect(()=>{
			const dimensionTree = DimensionTree.createDimensionTree(dimensionTreeData);
		}).not.toThrow();
	}));

	xit('should create copy', ()=>{
		const dimensionTree = DimensionTree.createDimensionTree(dimensionTreeData);
		const dimensionTreeCopy = DimensionTree.createDimensionTree(dimensionTree);
		recursiveObjectsNotHaveCommonLinks(dimensionTree, dimensionTreeCopy)
	});

	describe('throws when trying to create bad DimensionTree with duplicate names for dimension', ()=> {
		const dimensionTreeData = {
			dimensionTable: {
				dimension: 'currency',
				keyProps: ['local'],
			},
			dependency: [
				{
					dimensionTable: {
						dimension: 'currency',
						keyProps: ['common'],
					}
				}
			]
		};

		xit('should throw', () => {
			expect(() => {
				try {
					DimensionTree.createDimensionTree(dimensionTreeData);
				} catch (error) {
					throw error;
				}
			}).toThrow();
		});

		xit('should specific throw', () => {
			let catchError;
			try {
				DimensionTree.createDimensionTree(dimensionTreeData);
			} catch (error) {
				catchError = error;
			}
			expect(catchError instanceof Error).toBe(true);
			expect(catchError instanceof DimensionException).toBe(true);
		});
	});

	it('drillDownDimensionMembers and rollUpDimensionMembers methods must work', () => {
		const dimensionTree = DimensionTree.createDimensionTree(dimensionTreeData);
		const memberLevel_1 = dimensionTree.getTreeValue().members[0];
		const memberLevel_2 = dimensionTree.dependency[0].getTreeValue().members[0];
		const memberLevel_3 = dimensionTree.dependency[0].dependency[0].getTreeValue().members[0];
		debug = isEqualObjects(memberLevel_1, { id: 1, xxx: 0.186, xx_id: 1 });
		debug = isEqualObjects(memberLevel_2, { id: 1, xx: 0.19, x_id: 1 });
		debug = isEqualObjects(memberLevel_3, { id: 1, x: 0.2 });
		debug = isEqualObjects(dimensionTree.drillDownDimensionMembers('x', [memberLevel_3]), [memberLevel_2]);
		debug = isEqualObjects(dimensionTree.drillDownDimensionMembers('xx', [memberLevel_2]), [memberLevel_1]);
		debug = isEqualObjects(dimensionTree.drillDownDimensionMembers('xxx', [memberLevel_2]), [memberLevel_2]);
		debug = isEqualObjects(dimensionTree.rollUpDimensionMembers('xxx', [memberLevel_1]), [memberLevel_2]);
		debug = isEqualObjects(dimensionTree.rollUpDimensionMembers('xx', [memberLevel_2]), [memberLevel_3]);
		debug = isEqualObjects(dimensionTree.rollUpDimensionMembers('x', [memberLevel_2]), [memberLevel_2]);
		const secondMemberLevel_1 = dimensionTree.getTreeValue().members[1];
		const thirdMemberLevel_1 = dimensionTree.getTreeValue().members[2];
		const secondMemberLevel_2 = dimensionTree.dependency[0].getTreeValue().members[1];

		debug = isEqualObjects(secondMemberLevel_1, { id: 2, xxx: 0.868, xx_id: 2 });
		debug = isEqualObjects(thirdMemberLevel_1, { id: 2, xxx: 0.871, xx_id: 2 });
		debug = isEqualObjects(secondMemberLevel_2, { id: 2, xx: 0.87, x_id: 2 });

		debug = isEqualObjects(dimensionTree.rollUpDimensionMembers('xxx', [secondMemberLevel_1]), [secondMemberLevel_2]);
		debug = isEqualObjects(dimensionTree.drillDownDimensionMembers('xx', [secondMemberLevel_2]), [secondMemberLevel_1, thirdMemberLevel_1]);

	})
});
