import { cloneDeep, isEqualObjects } from './../spec/helpers/helpers.js'
import { exportedDimensionTreeData } from './DimensionTree.spec.js'
import Cube from './Cube.js'

describe('method drill must work', () => {
	let dimensionTreeData;
	let debug;

	beforeEach(() => {
		dimensionTreeData = cloneDeep(exportedDimensionTreeData);
	});
	it('drillUpMembers and drillDownMembers', () => {
		const cube = Cube.create([], [dimensionTreeData]);
		const membersLevel_1 = cube.dimensionHierarchies[0].getTreeValue().members;
		const membersLevel_2 = cube.dimensionHierarchies[0].level[0].getTreeValue().members;
		const membersLevel_3 = cube.dimensionHierarchies[0].level[0].level[0].getTreeValue().members;
		debug = isEqualObjects(cube.drillDownMembers(membersLevel_3, 'x', 'xx'), membersLevel_2);
		debug = isEqualObjects(cube.drillDownMembers(membersLevel_2, 'xx'), membersLevel_1);
		debug = isEqualObjects(cube.drillDownMembers(membersLevel_2, 'xxx'), membersLevel_2);
		debug = isEqualObjects(cube.drillUpMembers(membersLevel_1, 'xxx', 'xx'), membersLevel_2);
		debug = isEqualObjects(cube.drillUpMembers(membersLevel_1, 'xxx'), membersLevel_2);
		debug = isEqualObjects(cube.drillUpMembers(membersLevel_2, 'xx', 'x'), membersLevel_3);
		debug = isEqualObjects(cube.drillUpMembers(membersLevel_2, 'xx'), membersLevel_3);
		debug = isEqualObjects(cube.drillUpMembers(membersLevel_3, 'x'), membersLevel_3);
		debug = isEqualObjects(cube.drillUpMembers(membersLevel_3, 'x', 'x'), membersLevel_3);
		debug = isEqualObjects(cube.drillUpMembers(membersLevel_3, 'x', 'xx'), membersLevel_3);
		debug = isEqualObjects(cube.drillUpMembers(membersLevel_3, 'x', 'xxx'), membersLevel_3);
		const memberLevel_1 = membersLevel_1[0];
		const memberLevel_2 = membersLevel_2[0];
		const memberLevel_3 = membersLevel_3[0];
		debug = isEqualObjects(memberLevel_1, { id: 1, xxx: 0.186, xx_id: 1 });
		debug = isEqualObjects(memberLevel_2, { id: 1, xx: 0.19, x_id: 1 });
		debug = isEqualObjects(memberLevel_3, { id: 1, x: 0.2 });
		debug = isEqualObjects(cube.drillDownMembers([memberLevel_3], 'x'), [memberLevel_2]);
		debug = isEqualObjects(cube.drillDownMembers([memberLevel_2], 'xx'), [memberLevel_1]);
		debug = isEqualObjects(cube.drillDownMembers([memberLevel_2], 'xxx'), [memberLevel_2]);
		debug = isEqualObjects(cube.drillUpMembers([memberLevel_1], 'xxx'), [memberLevel_2]);
		debug = isEqualObjects(cube.drillUpMembers([memberLevel_2], 'xx'), [memberLevel_3]);
		debug = isEqualObjects(cube.drillUpMembers([memberLevel_3], 'x'), [memberLevel_3]);
		const secondMemberLevel_1 = cube.dimensionHierarchies[0].getTreeValue().members[1];
		const thirdMemberLevel_1 = cube.dimensionHierarchies[0].getTreeValue().members[2];
		const secondMemberLevel_2 = cube.dimensionHierarchies[0].level[0].getTreeValue().members[1];
		debug = isEqualObjects(secondMemberLevel_1, { id: 2, xxx: 0.868, xx_id: 2 });
		debug = isEqualObjects(thirdMemberLevel_1, { id: 2, xxx: 0.871, xx_id: 2 });
		debug = isEqualObjects(secondMemberLevel_2, { id: 2, xx: 0.87, x_id: 2 });
		debug = isEqualObjects(cube.drillUpMembers([secondMemberLevel_1], 'xxx'), [secondMemberLevel_2]);
		debug = isEqualObjects(cube.drillDownMembers([secondMemberLevel_2], 'xx'), [secondMemberLevel_1, thirdMemberLevel_1]);
	})
});