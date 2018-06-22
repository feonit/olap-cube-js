import Cube from '../src/Cube.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

describe('method Cube.prototype.removeDimensionMember', () => {

	let cube;

	beforeEach(() => {
		const factTable = [
			{ id: 1, xxx: 0.49, xx: 0.5, x: 0, yy: 1.2, y: 0, z: 0, is: true },
			{ id: 2, xxx: 1.18, xx: 1.2, x: 1, yy: 1.3, y: 1, z: 1, is: true },
			{ id: 3, xxx: 1.12, xx: 1.1, x: 1, yy: 1.4, y: 1, z: 0, is: true },
			{ id: 4, xxx: 1.13, xx: 1.2, x: 0, yy: 1.5, y: 1, z: 1, is: true },
		];
		const dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'z',
					keyProps: ['z']
				}
			},
			{
				dimensionTable: {
					dimension: 'xxx',
					keyProps: ['xxx'],
				},
				dependency: [
					{
						dimensionTable: {
							dimension: 'xx',
							keyProps: ['xx'],
						},
						dependency: [
							{
								dimensionTable: {
									dimension: 'x',
									keyProps: ['x']
								}
							}
						]
					}
				]
			},
			{
				dimensionTable: {
					dimension: 'yy',
					keyProps: ['yy']
				},
				dependency: [
					{
						dimensionTable: {
							dimension: 'y',
							keyProps: ['y']
						}
					}
				]
			}
		];
		cube = Cube.create(factTable, dimensionHierarchies);
	});

	let debug;

	it('should define removeDimensionMember', () => {
		expect(Cube.prototype.removeDimensionMember).toBeDefined();
	});

	it('it should remove member and change length of cells/facts', () => {
		expect(debug = cube.getFacts().length).toBe(4);
		expect(debug = cube.getDimensionMembers('z').length).toBe(2);

		const memberForDelete = cube.getDimensionMembers('z')[0];
		debug = isEqualObjects(memberForDelete, { id: 1, z: 0 });
		cube.removeDimensionMember('z', memberForDelete);
		expect(debug = cube.getDimensionMembers('z').length).toBe(1);
		expect(debug = cube.getFacts().length).toBe(2);
	});
	it('it should remove target member from last level of multilevel dimension and his own dependencies', () => {
		expect(debug = cube.getFacts().length).toBe(4);
		expect(debug = cube.getDimensionMembers('x').length).toBe(2);
		expect(debug = cube.getDimensionMembers('xx').length).toBe(4);
		expect(debug = cube.getDimensionMembers('xxx').length).toBe(4);

		const memberForDelete = cube.getDimensionMembers('x')[0];
		debug = isEqualObjects(memberForDelete, { id: 1, x: 0 });
		expect(memberForDelete).toBeDefined();

		cube.removeDimensionMember('x', memberForDelete);
		expect(debug = cube.getFacts().length).toBe(2);
		expect(debug = cube.getDimensionMembers('x').length).toBe(1);
		expect(debug = cube.getDimensionMembers('xx').length).toBe(2);
		expect(debug = cube.getDimensionMembers('xxx').length).toBe(2);
	});
	it('it should remove target member from medium level of multilevel dimension and his own dependencies', () => {
		expect(debug = cube.getFacts().length).toBe(4);
		expect(debug = cube.getDimensionMembers('x').length).toBe(2);
		expect(debug = cube.getDimensionMembers('xx').length).toBe(4);
		expect(debug = cube.getDimensionMembers('xxx').length).toBe(4);

		const memberForDelete = cube.getDimensionMembers('xx')[0];
		debug = isEqualObjects(memberForDelete, { id: 1, xx: 0.5, x_id: 1 });
		expect(memberForDelete).toBeDefined();

		cube.removeDimensionMember('xx', memberForDelete);
		expect(debug = cube.getFacts().length).toBe(3);
		expect(debug = cube.getDimensionMembers('x').length).toBe(2);
		expect(debug = cube.getDimensionMembers('xx').length).toBe(3);
		expect(debug = cube.getDimensionMembers('xxx').length).toBe(3);
	})

	it('must additionally remove categories if the member to be deleted last', () => {
		expect(debug = cube.getFacts().length).toBe(4);
		expect(debug = cube.getDimensionMembers('y').length).toBe(2);
		expect(debug = cube.getDimensionMembers('yy').length).toBe(4);

		const memberForDelete = cube.getDimensionMembers('y')[0];
		debug = isEqualObjects(memberForDelete, { id: 1, y: 0 });
		expect(memberForDelete).toBeDefined();

		cube.removeDimensionMember('y', memberForDelete);
		expect(debug = cube.getFacts().length).toBe(3);
		expect(debug = cube.getDimensionMembers('y').length).toBe(1);
		expect(debug = cube.getDimensionMembers('yy').length).toBe(3);
	})
});
