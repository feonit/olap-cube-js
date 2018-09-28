import DimensionTree from '../src/DimensionTree.js';
import {DimensionException} from '../src/errors.js';
import {recursiveObjectsNotHaveCommonLinks, isEqualObjects, cloneDeep} from '../spec/helpers/helpers.js'

export const exportedDimensionTreeData = {
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
	level: [
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
			level: [
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
					level: []
				}
			]
		}
	]
};

export default () => {

	let dimensionTreeData;
	let debug;

	beforeEach(() => {
		dimensionTreeData = cloneDeep(exportedDimensionTreeData);
	});

	it('should create dimensionTree', () => {
		expect(() => {
			const dimensionTree = DimensionTree.createDimensionTree(dimensionTreeData);
		}).not.toThrow();
	});

	it('should create copy dimensionTree', () => {
		const dimensionTree = DimensionTree.createDimensionTree(dimensionTreeData);
		const dimensionTreeCopy = DimensionTree.createDimensionTree(dimensionTree);
		recursiveObjectsNotHaveCommonLinks(dimensionTree, dimensionTreeCopy)
	});
	
	it('should create proxy dimensionTree', () => {
		const dimensionTree = DimensionTree.createDimensionTree(dimensionTreeData);
		const dimensionTreeProxy = DimensionTree.createProxyDimensionTree(dimensionTree);
		dimensionTreeProxy.tracePostOrder(tracedTreeValue => {
			const {dimension: tracedDimension} = tracedTreeValue;
			const originalDimensionTreeValue = dimensionTree.getDimensionTreeByDimension(tracedDimension).getTreeValue();
			// arrays not common
			expect(originalDimensionTreeValue.members !== tracedTreeValue).toBe(true);
			// but members all common
			originalDimensionTreeValue.members.forEach((member, index) => {
				expect(member === tracedTreeValue.members[index]).toBe(true);
			})
		})
	});

	describe('throws when trying to create bad DimensionTree with duplicate names for dimension', () => {
		const dimensionTreeData = {
			dimensionTable: {
				dimension: 'currency',
				keyProps: ['local'],
			},
			level: [
				{
					dimensionTable: {
						dimension: 'currency',
						keyProps: ['common'],
					}
				}
			]
		};

		it('should throw', () => {
			expect(() => {
				try {
					DimensionTree.createDimensionTree(dimensionTreeData);
				} catch (error) {
					throw error;
				}
			}).toThrow();
		});

		it('should specific throw', () => {
			let catchError;
			try {
				DimensionTree.createDimensionTree(dimensionTreeData);
			} catch (error) {
				catchError = error;
			}
			expect(catchError instanceof DimensionException).toBe(true);
		});
	});

	it('drillDownDimensionMembers and drillUpDimensionMembers methods must work', () => {
		const dimensionTree = DimensionTree.createDimensionTree(dimensionTreeData);
		const membersLevel_1 = dimensionTree.getTreeValue().members;
		const membersLevel_2 = dimensionTree.level[0].getTreeValue().members;
		const membersLevel_3 = dimensionTree.level[0].level[0].getTreeValue().members;
		debug = isEqualObjects(dimensionTree.getDimensionTreeByDimension('x').drillDownDimensionMembers(membersLevel_3), membersLevel_2);
		debug = isEqualObjects(dimensionTree.getDimensionTreeByDimension('xx').drillDownDimensionMembers(membersLevel_2), membersLevel_1);
		debug = isEqualObjects(dimensionTree.getDimensionTreeByDimension('xxx').drillDownDimensionMembers(membersLevel_2), membersLevel_2);
		debug = isEqualObjects(dimensionTree.getDimensionTreeByDimension('xxx').drillUpDimensionMembers(membersLevel_1), membersLevel_2);
		debug = isEqualObjects(dimensionTree.getDimensionTreeByDimension('xx').drillUpDimensionMembers(membersLevel_2), membersLevel_3);
		debug = isEqualObjects(dimensionTree.getDimensionTreeByDimension('x').drillUpDimensionMembers(membersLevel_3), membersLevel_3);
		const memberLevel_1 = membersLevel_1[0];
		const memberLevel_2 = membersLevel_2[0];
		const memberLevel_3 = membersLevel_3[0];
		debug = isEqualObjects(memberLevel_1, { id: 1, xxx: 0.186, xx_id: 1 });
		debug = isEqualObjects(memberLevel_2, { id: 1, xx: 0.19, x_id: 1 });
		debug = isEqualObjects(memberLevel_3, { id: 1, x: 0.2 });
		debug = isEqualObjects(dimensionTree.getDimensionTreeByDimension('x').drillDownDimensionMembers([memberLevel_3]), [memberLevel_2]);
		debug = isEqualObjects(dimensionTree.getDimensionTreeByDimension('xx').drillDownDimensionMembers([memberLevel_2]), [memberLevel_1]);
		debug = isEqualObjects(dimensionTree.getDimensionTreeByDimension('xxx').drillDownDimensionMembers([memberLevel_2]), [memberLevel_2]);
		debug = isEqualObjects(dimensionTree.getDimensionTreeByDimension('xxx').drillUpDimensionMembers([memberLevel_1]), [memberLevel_2]);
		debug = isEqualObjects(dimensionTree.getDimensionTreeByDimension('xx').drillUpDimensionMembers([memberLevel_2]), [memberLevel_3]);
		debug = isEqualObjects(dimensionTree.getDimensionTreeByDimension('x').drillUpDimensionMembers([memberLevel_3]), [memberLevel_3]);
		const secondMemberLevel_1 = dimensionTree.getTreeValue().members[1];
		const thirdMemberLevel_1 = dimensionTree.getTreeValue().members[2];
		const secondMemberLevel_2 = dimensionTree.level[0].getTreeValue().members[1];
		debug = isEqualObjects(secondMemberLevel_1, { id: 2, xxx: 0.868, xx_id: 2 });
		debug = isEqualObjects(thirdMemberLevel_1, { id: 2, xxx: 0.871, xx_id: 2 });
		debug = isEqualObjects(secondMemberLevel_2, { id: 2, xx: 0.87, x_id: 2 });
		debug = isEqualObjects(dimensionTree.getDimensionTreeByDimension('xxx').drillUpDimensionMembers([secondMemberLevel_1]), [secondMemberLevel_2]);
		debug = isEqualObjects(dimensionTree.getDimensionTreeByDimension('xx').drillDownDimensionMembers([secondMemberLevel_2]), [secondMemberLevel_1, thirdMemberLevel_1]);
	})

	// todo заменить на projectDrillDown/UP
	// xit('createProjectionOntoMember must work', () => {
	// 	const dimensionTree = DimensionTree.createDimensionTree(dimensionTreeData);
	// 	const memberLevel_1 = { id: 2, xxx: 0.868, xx_id: 2 };
	// 	const newDimensionTree = dimensionTree.createProjectionOntoMember(memberLevel_1);
	//
	// 	isEqualObjects(newDimensionTree.getDimensionTreeByDimension('xxx').getTreeValue().members, [{ id: 2, xxx: 0.868, xx_id: 2 }])
	// 	isEqualObjects(newDimensionTree.getDimensionTreeByDimension('xx').getTreeValue().members, [{ id: 2, xx: 0.87, x_id: 2 }])
	// 	isEqualObjects(newDimensionTree.getDimensionTreeByDimension('x').getTreeValue().members, [{ id: 2, x: 0.9 }])
	// })
};
