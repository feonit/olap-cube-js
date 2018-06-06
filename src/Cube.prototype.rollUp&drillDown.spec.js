import { cloneDeep, isEqualObjects } from './../spec/helpers/helpers.js'
import { exportedDimensionTreeData } from './DimensionTree.spec.js'
import Cube from './Cube.js'

describe('method rollUp must work', () => {
	let dimensionTreeData;
	let debug;

	beforeEach(() => {
		dimensionTreeData = cloneDeep(exportedDimensionTreeData);
	});
	it('rollUp and drillDown', () => {
		const cube = Cube.create([], [dimensionTreeData]);
		const membersLevel_1 = cube.dimensionHierarchies[0].getTreeValue().members;
		const membersLevel_2 = cube.dimensionHierarchies[0].dependency[0].getTreeValue().members;
		const membersLevel_3 = cube.dimensionHierarchies[0].dependency[0].dependency[0].getTreeValue().members;
		debug = isEqualObjects(cube.drillDown('x', membersLevel_3, 'xx'), membersLevel_2);
		debug = isEqualObjects(cube.drillDown('xx', membersLevel_2), membersLevel_1);
		debug = isEqualObjects(cube.drillDown('xxx', membersLevel_2), membersLevel_2);
		debug = isEqualObjects(cube.rollUp('xxx', membersLevel_1, 'xx'), membersLevel_2);
		debug = isEqualObjects(cube.rollUp('xxx', membersLevel_1), membersLevel_2);
		debug = isEqualObjects(cube.rollUp('xx', membersLevel_2, 'x'), membersLevel_3);
		debug = isEqualObjects(cube.rollUp('xx', membersLevel_2), membersLevel_3);
		debug = isEqualObjects(cube.rollUp('x', membersLevel_3), membersLevel_3);
		debug = isEqualObjects(cube.rollUp('x', membersLevel_3, 'x'), membersLevel_3);
		debug = isEqualObjects(cube.rollUp('x', membersLevel_3, 'xx'), membersLevel_3);
		debug = isEqualObjects(cube.rollUp('x', membersLevel_3, 'xxx'), membersLevel_3);
		const memberLevel_1 = membersLevel_1[0];
		const memberLevel_2 = membersLevel_2[0];
		const memberLevel_3 = membersLevel_3[0];
		debug = isEqualObjects(memberLevel_1, { id: 1, xxx: 0.186, xx_id: 1 });
		debug = isEqualObjects(memberLevel_2, { id: 1, xx: 0.19, x_id: 1 });
		debug = isEqualObjects(memberLevel_3, { id: 1, x: 0.2 });
		debug = isEqualObjects(cube.drillDown('x', [memberLevel_3]), [memberLevel_2]);
		debug = isEqualObjects(cube.drillDown('xx', [memberLevel_2]), [memberLevel_1]);
		debug = isEqualObjects(cube.drillDown('xxx', [memberLevel_2]), [memberLevel_2]);
		debug = isEqualObjects(cube.rollUp('xxx', [memberLevel_1]), [memberLevel_2]);
		debug = isEqualObjects(cube.rollUp('xx', [memberLevel_2]), [memberLevel_3]);
		debug = isEqualObjects(cube.rollUp('x', [memberLevel_3]), [memberLevel_3]);
		const secondMemberLevel_1 = cube.dimensionHierarchies[0].getTreeValue().members[1];
		const thirdMemberLevel_1 = cube.dimensionHierarchies[0].getTreeValue().members[2];
		const secondMemberLevel_2 = cube.dimensionHierarchies[0].dependency[0].getTreeValue().members[1];
		debug = isEqualObjects(secondMemberLevel_1, { id: 2, xxx: 0.868, xx_id: 2 });
		debug = isEqualObjects(thirdMemberLevel_1, { id: 2, xxx: 0.871, xx_id: 2 });
		debug = isEqualObjects(secondMemberLevel_2, { id: 2, xx: 0.87, x_id: 2 });
		debug = isEqualObjects(cube.rollUp('xxx', [secondMemberLevel_1]), [secondMemberLevel_2]);
		debug = isEqualObjects(cube.drillDown('xx', [secondMemberLevel_2]), [secondMemberLevel_1, thirdMemberLevel_1]);
	})
});