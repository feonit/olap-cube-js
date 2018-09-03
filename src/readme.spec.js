import Cube from '../src/Cube.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

describe('readme', () => {
	let debug;
	let facts;
	let dimensionHierarchies;
	let cube;
	let regions;
	let date;
	let products;
	let categories;

	beforeEach(() => {
		// This is an array of data from server
		facts = [
			{ id: 1, region: 'North', year: 2017, month: 'January', product: 'Product 1', category: 'Category 1', value: 737 },
			{ id: 2, region: 'South', year: 2017, month: 'April', product: 'Product 2', category: 'Category 1', value: 155 },
			{ id: 3, region: 'West', year: 2018, month: 'April', product: 'Product 3', category: 'Category 2', value: 112 },
			{ id: 4, region: 'West', year: 2018, month: 'April', product: 'Product 1', category: 'Category 2', value: 319 },
		];

		// This is the data dimensionHierarchies we need to obtain
		dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'regions',
					keyProps: ['region'],
				}
			},
			{
				dimensionTable: {
					dimension: 'date',
					keyProps: ['year', 'month']
				}
			},
			{
				dimensionTable: {
					dimension: 'products',
					keyProps: ['product'],
				},
				level: [
					{
						dimensionTable: {
							dimension: 'categories',
							keyProps: ['category']
						}
					}
				]
			}
		];

		// We send it all to the constructor
		cube = Cube.create(facts, dimensionHierarchies);

		regions = [
			{ id: 1, region: 'North' },
			{ id: 2, region: 'South' },
			{ id: 3, region: 'West' }
		];
		date = [
			{ id: 1, year: 2017, month: 'January' },
			{ id: 2, year: 2017, month: 'April' },
			{ id: 3, year: 2018, month: 'April' }
		];
		products = [
			{ id: 1, product: 'Product 1', categories_id: 1 },
			{ id: 2, product: 'Product 2', categories_id: 1 },
			{ id: 3, product: 'Product 3', categories_id: 2 },
			{ id: 4, product: 'Product 1', categories_id: 2 },
		];
		categories = [
			{ id: 1, category: 'Category 1' },
			{ id: 2, category: 'Category 2' },
		];

		let cellTable = [
			{ id: 1, regions_id: 1, date_id: 1, products_id: 1, value: 737 },
			{ id: 2, regions_id: 2, date_id: 2, products_id: 2, value: 155 },
			{ id: 3, regions_id: 3, date_id: 3, products_id: 3, value: 112 },
			{ id: 4, regions_id: 3, date_id: 3, products_id: 4, value: 319 },
		];
	});

	it('check members', () => {
		debug = isEqualObjects(regions, cube.getDimensionMembers('regions'));
		debug = isEqualObjects(date, cube.getDimensionMembers('date'));
		debug = isEqualObjects(products, cube.getDimensionMembers('products'));
		debug = isEqualObjects(categories, cube.getDimensionMembers('categories'));
	})

	it('check getDimensionMembers', () => {
		const result = cube.dice({ categories: [{ id: 1 }] });

		debug = isEqualObjects(
			[
				{ id: 1, product: 'Product 1', categories_id: 1 },
				{ id: 2, product: 'Product 2', categories_id: 1 },
			],
			cube.dice({ categories: { id: 1 } }).getDimensionMembers('products')
		);

		debug = isEqualObjects(
			[
				{ id: 2, product: 'Product 2', categories_id: 1 },
				{ id: 3, product: 'Product 3', categories_id: 2 },
				{ id: 4, product: 'Product 1', categories_id: 2 },
			],
			cube.dice({ regions: [{ id: 2 }, { id: 3 }] }).getDimensionMembers('products')
		);

		debug = isEqualObjects(
			[
				{ id: 1, region: 'North' },
				{ id: 2, region: 'South' },
			],
			cube.dice({ categories: { id: 1 } }).getDimensionMembers('regions')
		);

	})
	it('check getCells/getFacts', () => {
		{
			let set = { regions: { id: 1 }, date: { id: 1 }, products: { id: 1 } };
			debug = isEqualObjects(
				[
					{ id: 1, value: 737, regions_id: 1, date_id: 1, products_id: 1 }
				],
				cube.dice(set).getCells()
			);
			debug = isEqualObjects(
				[
					{ id: 1, region: 'North', year: 2017, month: 'January', product: 'Product 1', category: 'Category 1', value: 737 }
				],
				cube.dice(set).getFacts()
			);
		}

		{
			let subSet = { regions: { id: 3 } };
			debug = isEqualObjects(
				[
					{ id: 3, value: 112, regions_id: 3, date_id: 3, products_id: 3 },
					{ id: 4, value: 319, regions_id: 3, date_id: 3, products_id: 4 },
				],
				cube.dice(subSet).getCells()
			);
			debug = isEqualObjects(
				[
					{ id: 3, region: 'West', year: 2018, month: 'April', product: 'Product 3', category: 'Category 2', value: 112 },
					{ id: 4, region: 'West', year: 2018, month: 'April', product: 'Product 1', category: 'Category 2', value: 319 },
				],
				cube.dice(subSet).getFacts()
			);
		}

		{
			let emptySet = {};
			debug = isEqualObjects(
				[
					{ id: 1, value: 737, regions_id: 1, date_id: 1, products_id: 1 },
					{ id: 2, value: 155, regions_id: 2, date_id: 2, products_id: 2 },
					{ id: 3, value: 112, regions_id: 3, date_id: 3, products_id: 3 },
					{ id: 4, value: 319, regions_id: 3, date_id: 3, products_id: 4 },
				],
				cube.dice(emptySet).getCells()
			);
			debug = isEqualObjects(
				facts,
				cube.dice(emptySet).getFacts()
			);
		}

		{
			let set = { date: [{ id: 1 }, { id: 2 }] };
			debug = isEqualObjects(
				[
					{ id: 1, value: 737, regions_id: 1, date_id: 1, products_id: 1 },
					{ id: 2, value: 155, regions_id: 2, date_id: 2, products_id: 2 },
				],
				cube.dice(set).getCells()
			);
			debug = isEqualObjects(
				[
					{ id: 1, region: 'North', year: 2017, month: 'January', product: 'Product 1', category: 'Category 1', value: 737 },
					{ id: 2, region: 'South', year: 2017, month: 'April', product: 'Product 2', category: 'Category 1', value: 155 },
				],
				cube.dice(set).getFacts()
			);
		}
	})

	it('check addDimensionHierarchy', () => {
		{
			const facts = [
				{ id: 1, product: 'TV', mark: 'Sony', country: 'China', count: 2 },
				{ id: 1, product: 'TV', mark: 'Samsung', country: 'Niderland', count: 3 }
			];
			const cube = Cube.create(facts, []);
			cube.addDimensionHierarchy({
				dimensionTable: {
					dimension: 'product',
					keyProps: ['product']
				},
				level: [
					{
						dimensionTable: {
							dimension: 'mark',
							keyProps: ['mark']
						},
					}
				]
			});
			debug = isEqualObjects(
				cube.getCells(),
				[
					{ id: 1, product_id: 1, country: 'China', count: 2 },
					{ id: 1, product_id: 2, country: 'Niderland', count: 3 }
				]
			)
		}
	})

	it('Custom members', () => {
		let facts = [{ id: 1, nikname: 'Monkey', group: 'Administrators' }];
		let dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'user',
					keyProps: ['nikname'],
					foreignKey: 'USER_ID'
				},
				level: [
					{
						dimensionTable: {
							dimension: 'group',
							keyProps: ['group'],
							primaryKey: 'ID',
							foreignKey: 'GROUP_ID'
						}
					}
				]
			}
		];
		let cube = Cube.create(facts, dimensionHierarchies);
		let userMember = cube.getDimensionMembers('user')[0];
		let groupMember = cube.getDimensionMembers('group')[0];
		let cell = cube.getCells()[0];
		debug = isEqualObjects(userMember, { id: 1, nikname: 'Monkey', GROUP_ID: 1 });
		debug = isEqualObjects(groupMember, { ID: 1, group: 'Administrators' });
		debug = isEqualObjects(cell, { id: 1, USER_ID: 1 });
	})
});
