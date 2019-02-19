import Cube from '../src/Cube.js';
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {
	let debug;
	let cube;
	let facts;
	beforeEach(() => {
		facts = [
			{ id: 1, name: 'Leonid', nickname: 'Feonit', country: 'Russia' },
		];
		const dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'user',
					keyProps: ['nickname'],
					otherProps: ['name']
				}
			}
		];
		cube = new Cube({dimensionHierarchies});
		cube.addFacts(facts);
	});
	it('additional properties of dimension must be present in returned fact table', () => {
		debug = isEqualObjects(cube.getFacts(), facts);
	});
	it('additional properties of dimension must be present in new facts of table', () => {
		const user = { name: 'Sasha', nickname: 'Monkey', wrongProp: 'some' };
		const cellData = { country: 'Paris' };
		cube.addDimensionMember('user', user, void 0, void 0, cellData);
		const newCell = cube.getCells()[1];
		const newCellExpected = { user_id: 2, country: 'Paris' };
		newCellExpected.id = newCell.id; // auto generated uuid
		debug = isEqualObjects(cube.getCells()[1], newCellExpected);
		const newUserMember = cube.getDimensionMembers('user')[1];
		const newUserMemberExpected = { id: 2, name: 'Sasha', nickname: 'Monkey' };
		debug = isEqualObjects(newUserMember, newUserMemberExpected);
	});
};
