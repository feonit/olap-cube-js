import Cube from '../src/Cube.js';
import {isEqualObjects} from '../spec/helpers/helpers.js'
import { InsufficientRollupData } from '../src/errors.js';

export default () => {
	let debug;
	
	it('should define addDimensionMember', () =>  {
		expect(Cube.prototype.addDimensionMember).toBeDefined();
	});
	
	describe('[ validation data to add ]', () => {

		let cube;

		beforeEach(() => {

			const dimensionHierarchies = [
				{
					dimensionTable: {
						dimension: 'xxx',
						keyProps: ['xxx'],
					},
					level: [
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
									}
								}
							]
						}
					]
				},
				{
					dimensionTable: {
						dimension: 'z',
						keyProps: ['z']
					}
				}
			];

			const factTable = [
				{ id: 1, x: 0, xx: 0, xxx: 0 , xxxx: 0, z: 0 },
			];

			cube = new Cube({dimensionHierarchies});
			cube.addFacts(factTable);

		});
		
		it('should throw when defined not completely space for added member level 1', () => {
			expect(() => {
				cube.addDimensionMember('xxx', { xxx: 1 })
			}).toThrow();
		});

		it('should throw specified error when defined not completely space for added member level 1', () => {
			let err;
			try {
				cube.addDimensionMember('xxx', { xxx: 1 })
			} catch (error) {
				err = error;
			}
			expect(err instanceof InsufficientRollupData).toBe(true);
		});

		it('should throw when defined not completely space for added member level 2', () => {
			expect(() => {
				cube.addDimensionMember('xx', { xx: 1 })
			}).toThrow();
		});

		it('should throw specified error when defined not completely space for added member level 2', () => {
			let err;
			try {
				cube.addDimensionMember('xx', { xx: 1 })
			} catch (error) {
				err = error;
			}
			expect(err instanceof InsufficientRollupData).toBe(true);
		});

		it('should throw when was try add member with not existed rollup member', () => {
			expect(() => {
				cube.addDimensionMember('xx', { xx: 1 }, { x: { id: 1000 } })
			}).toThrow();
		});

		it('should throw specified error when was try add member with not existed rollup member', () => {
			let err;
			try {
				cube.addDimensionMember('xx', { xx: 1 }, { x: { id: 1000 } })
			} catch (error) {
				err = error;
			}
			expect(err instanceof InsufficientRollupData).toBe(true);
		});

		it('should passed when was try add member with not existed rollup member', () => {
			expect(() => {
				cube.addDimensionMember('xx', { xx: 1 }, { x: { id: 1 } })
			}).not.toThrow()
		});

	});

	describe('[should add member to cube data]', () => {

		let cube;

		beforeEach(() => {
			const factTable = [
				{id: 1, x: 0, y: 0, value: 10 },
				{id: 2, x: 0, y: 1, value: 100 },
				{id: 3, x: 1, y: 0, value: 1000 },
				{id: 4, x: 1, y: 1, value: 10000 },
			];

			const dimensionHierarchies = [
				{
					dimensionTable: {
						dimension: 'coordinateX',
						keyProps: ['x']
					}
				},{
					dimensionTable: {
						dimension: 'coordinateY',
						keyProps: ['y']
					}
				}
			];

			cube = new Cube({dimensionHierarchies});
			cube.addFacts(factTable);
		});

		it('target dimension must be changed', () => {
			debug = isEqualObjects(cube.getDimensionMembers('coordinateX'), [
				{ id: 1, x: 0 },
				{ id: 2, x: 1 }
			]);

			cube.addDimensionMember('coordinateX', { x: 2 });

			debug = isEqualObjects(cube.getDimensionMembers('coordinateX'), [
				{ id: 1, x: 0 },
				{ id: 2, x: 1 },
				{ id: 3, x: 2 }
			])
		});

		it('other dimensions must be not changed', () => {
			debug = isEqualObjects(cube.getDimensionMembers('coordinateY'), [
				{ id: 1, y: 0 },
				{ id: 2, y: 1 }
			]);

			cube.addDimensionMember('coordinateX', { x: 2 });

			debug = isEqualObjects(cube.getDimensionMembers('coordinateY'), [
				{ id: 1, y: 0 },
				{ id: 2, y: 1 }
			])
		});

		it('fact table must be changed', () => {
			debug = isEqualObjects(cube.getFacts(), [
				{ id: 1, x: 0, y: 0, value: 10 },
				{ id: 2, x: 0, y: 1, value: 100 },
				{ id: 3, x: 1, y: 0, value: 1000 },
				{ id: 4, x: 1, y: 1, value: 10000 },
			]);

			cube.addDimensionMember('coordinateX', { x: 2 }, {}, {}, { value: null });

			debug = isEqualObjects(cube.getFacts(), [
				{ id: 1, x: 0, y: 0, value: 10 },
				{ id: 2, x: 0, y: 1, value: 100 },
				{ id: 3, x: 1, y: 0, value: 1000 },
				{ id: 4, x: 1, y: 1, value: 10000 },
				{ x: 2, y: 0, value: null },
				{ x: 2, y: 1, value: null },
			])
		});

	});

	describe('should add member to cube data with level columns', () => {
		let cube;
		let debug;
		let factTable;

		beforeEach(() => {
			const dimensionHierarchies = [
				{
					dimensionTable: {
						dimension: 'product',
						keyProps: ['product'],
					},
					level: [
						{
							dimensionTable: {
								dimension: 'category',
								keyProps: ['category']
							}
						}
					]
				},
				{
					dimensionTable: {
						dimension: 'day',
						keyProps: ['day'],
					},
					level: [
						{
							dimensionTable: {
								dimension: 'month',
								keyProps: ['month'],
							},
							level: [
								{
									dimensionTable: {
										dimension: 'year',
										keyProps: ['year']
									}
								}
							]
						}
					]
				}
			];

			factTable = [
				{ id: 1, product: 'telephone', category: 'electronic', money: '5$', year: '2017', month: 'january', day: 1},
				{ id: 2, product: 'tv', category: 'electronic', money: '50$', year: '2017', month: 'january', day: 2 },
				{ id: 3, product: 'telephone', category: 'electronic', money: '10$', year: '2018', month: 'january', day: 2 },
				{ id: 4, product: 'telephone', category: 'electronic', money: '15$', year: '2018', month: 'january', day: 3 }
			];

			cube = new Cube({dimensionHierarchies});
			cube.addFacts(factTable);
			// todo need fill before add, because actually getFacts method invoke fill method inside, need some to do with this
			cube.fillEmptyCells();
		});

		const year = [
			{ id: 1, year: '2017' },
			{ id: 2, year: '2018' }
		];

		const month = [
			{ id: 1, month: 'january', year_id: 1 },
			{ id: 2, month: 'january', year_id: 2 }
		];

		const day = [
			{ id: 1, day: 1, month_id: 1 },
			{ id: 2, day: 2, month_id: 1 },
			{ id: 3, day: 2, month_id: 2 },
			{ id: 4, day: 3, month_id: 2 },
		];

		const product = [
			{ id: 1, category_id: 1, product: 'telephone' },
			{ id: 2, category_id: 1, product: 'tv' }
		];

		it ('level 1, where dimensionTree has not hierarchy', () => {
			const factTableBefore = cube.getFacts();
			cube.addDimensionMember('product', { product: 'clock' }, { category: { id: 1 } }, {}, { money: null });

			// product
			debug = isEqualObjects(cube.getDimensionMembers('product'), product.concat([
				{ id: 3, product: 'clock', category_id: 1 }
			]));

			// day
			debug = isEqualObjects(cube.getDimensionMembers('day'), day);

			// month
			debug = isEqualObjects(cube.getDimensionMembers('month'), month);

			// year
			debug = isEqualObjects(cube.getDimensionMembers('year'), year);

			// fact table
			debug = isEqualObjects(cube.getFacts(), factTableBefore.concat([
				{ category: 'electronic', product: 'clock', money: null, year: '2017', month: 'january', day: 1 },
				{ category: 'electronic', product: 'clock', money: null, year: '2017', month: 'january', day: 2 },
				{ category: 'electronic', product: 'clock', money: null, year: '2018', month: 'january', day: 2 },
				{ category: 'electronic', product: 'clock', money: null, year: '2018', month: 'january', day: 3 }
			]));
		});

		it ('level 1', () => {
			const factTableBefore = cube.getFacts();
			cube.addDimensionMember('day', { day: 4 }, { month: { id: 1 } }, {}, { money: null });

			// day
			debug = isEqualObjects(cube.getDimensionMembers('day'), day.concat([
				{ id: 5, day: 4, month_id: 1 }
			]))

			// month
			debug = isEqualObjects(cube.getDimensionMembers('month'), month);

			// year
			debug = isEqualObjects(cube.getDimensionMembers('year'), year);

			// fact table
			debug = isEqualObjects(cube.getFacts(), factTableBefore.concat([
				{ category: 'electronic', product: 'telephone', money: null, year: '2017', month: 'january', day: 4 },
				{ category: 'electronic', product: 'tv', money: null, year: '2017', month: 'january', day: 4 }
			]));
		});

		it ('level 2', () => {
			const factTableBefore = cube.getFacts();
			cube.addDimensionMember('month', { month: 'april' }, { year: { id: 1 } }, { day: { day: null } }, { money: null });

			// day
			debug = isEqualObjects(cube.getDimensionMembers('day'), day.concat([
				{ id: 5, day: null, month_id: 3 }
			]));

			// month
			debug = isEqualObjects(cube.getDimensionMembers('month'), month.concat([
				{ id: 3, month: 'april', year_id: 1 }
			]));

			// year
			debug = isEqualObjects(cube.getDimensionMembers('year'), year);

			// fact table
			debug = isEqualObjects(cube.getFacts(), factTableBefore.concat([
				{ category: 'electronic', product: 'telephone', money: null, year: '2017', month: 'april', day: null },
				{ category: 'electronic', product: 'tv', money: null, year: '2017', month: 'april', day: null }
			]));

		});

		it ('level 3', () => {
			const factTableBefore = cube.getFacts();
			cube.addDimensionMember('year', { year: '2019' }, {}, { day: { day: null }, month: { month: null } }, { money: null });

			// day
			debug = isEqualObjects(cube.getDimensionMembers('day'), day.concat([
				{ id: 5, day: null, month_id: 3 }
			]));

			// month
			debug = isEqualObjects(cube.getDimensionMembers('month'), month.concat([
				{ id: 3, month: null, year_id: 3 }
			]));

			// year
			debug = isEqualObjects(cube.getDimensionMembers('year'), year.concat([
				{ id: 3, year: '2019' }
			]));

			// fact table
			debug = isEqualObjects(cube.getFacts(), factTableBefore.concat([
				{ category: 'electronic', product: 'telephone', money: null, year: '2019', month: null, day: null },
				{ category: 'electronic', product: 'tv', money: null, year: '2019', month: null, day: null }
			]));
		});
	})
};
