import Cube from '../src/Cube.js';
import {isEqual, jsonParseStringify, isEqualObjects} from '../spec/helpers/helpers.js'

describe('readme', ()=>{
	let debug;

	it('should pass readme example', ()=>{
		// This is an array of data from server
		let facts = [
			{ id: 1, region: 'North', year: 2017, month: 'January', product: 'Product 1', category: 'Category 1', value: 737 },
			{ id: 2, region: 'South', year: 2017, month: 'April',   product: 'Product 2', category: 'Category 1', value: 155 },
			{ id: 3, region: 'West',  year: 2018, month: 'April',   product: 'Product 3', category: 'Category 2', value: 112 },
			{ id: 4, region: 'West',  year: 2018, month: 'April',   product: 'Product 1', category: 'Category 2', value: 319 },
		];

		// This is the data dimensionHierarchies we need to obtain
		let dimensionHierarchies = [
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
				dependency: [
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
		let cube = Cube.create(facts, dimensionHierarchies);

		let structure = {
			dimensionHierarchies: [
				{
					dimensionTable: {
						dimension: 'regions',
						keyProps: ['region'],
						members: [
							{ id: 1, region: 'North' },
							{ id: 2, region: 'South' },
							{ id: 3, region: 'West' }
						],
						otherProps: []
					},
					dependency: []
				},
				{
					dimensionTable: {
						dimension: 'date',
						keyProps: ['year', 'month'],
						members: [
							{ id: 1, year: 2017, month: 'January' },
							{ id: 2, year: 2017, month: 'April' },
							{ id: 3, year: 2018, month: 'April' }
						],
						otherProps: []
					},
					dependency: []
				},
				{
					dimensionTable: {
						dimension: 'products',
						keyProps: ['product'],
						members: [
							{ id: 1, product: 'Product 1', categories_id: 1 },
							{ id: 2, product: 'Product 2', categories_id: 1 },
							{ id: 3, product: 'Product 3', categories_id: 2 },
							{ id: 4, product: 'Product 1', categories_id: 2 },
						],
						otherProps: []
					},
					dependency: [
						{
							dimensionTable: {
								dimension: 'categories',
								keyProps: ['category'],
								members: [
									{ id: 1, category: 'Category 1' },
									{ id: 2, category: 'Category 2' },
								],
								otherProps: []
							},
							dependency: []
						}
					]
				}
			],
			cellTable: [
				{ id: 1, regions_id: 1, date_id: 1, products_id: 1, value: 737 },
				{ id: 2, regions_id: 2, date_id: 2, products_id: 2, value: 155 },
				{ id: 3, regions_id: 3, date_id: 3, products_id: 3, value: 112 },
				{ id: 4, regions_id: 3, date_id: 3, products_id: 4, value: 319 },
			]
		};

		debug=isEqualObjects(cube, structure);


		// Set
		debug=isEqualObjects(
			[
				{ id: 1, region: 'North', year: 2017, month: 'January', product: 'Product 1', category: 'Category 1', value: 737 }
			],
			cube.getFactsBySet({ regions: { id: 1 }, date: { id: 1 }, products: { id: 1 } })
		);

		// Subset
		debug=isEqualObjects(
			[
				{ id: 3, region: 'West',  year: 2018, month: 'April',   product: 'Product 3', category: 'Category 2', value: 112 },
				{ id: 4, region: 'West',  year: 2018, month: 'April',   product: 'Product 1', category: 'Category 2', value: 319 },
			],
			cube.getFactsBySet({ regions: { id: 3 } })
		);

		// EmptySet

		// Multiset
		debug=isEqualObjects(
			[
				{ id: 1, region: 'North', year: 2017, month: 'January', product: 'Product 1', category: 'Category 1', value: 737 },
				{ id: 2, region: 'South', year: 2017, month: 'April',   product: 'Product 2', category: 'Category 1', value: 155 },
			],
			cube.getFactsBySet({ 'regions': [{ id: 1 }, { id: 2 }] } )
		);


		debug=isEqualObjects(
			[
				{ id: 2, product: 'Product 2', categories_id: 1 },
				{ id: 3, product: 'Product 3', categories_id: 2 },
				{ id: 4, product: 'Product 1', categories_id: 2 },
			],
			cube.getDimensionMembersBySet('products', { 'regions': [{ id: 2 }, { id: 3 }] } )
		);

		debug=isEqualObjects(
			[
				{ id: 1, product: 'Product 1', categories_id: 1 },
				{ id: 2, product: 'Product 2', categories_id: 1 },
			],
			cube.getDimensionMembersBySet('products', { 'categories': { id: 1 } })
		);

		debug=isEqualObjects(
			[
				{ id: 1, region: 'North' },
				{ id: 2, region: 'South' },
			],
			cube.getDimensionMembersBySet('regions', { 'categories': { id: 1 } })
		);

		debug=isEqualObjects(
			facts,
			cube.getFactsBySet({})
		);

		debug=isEqualObjects(
			[
				{ id: 1, region: 'North', year: 2017, month: 'January', product: 'Product 1', category: 'Category 1', value: 737 },
				{ id: 2, region: 'South', year: 2017, month: 'April',   product: 'Product 2', category: 'Category 1', value: 155 },
			],
			cube.getFactsBySet({ date: [ { id: 1 }, { id: 2 } ] })
		)
	})

	it('should be pass fill example', ()=>{
		let dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'regions',
					keyProps: ['region']
				}
			},
			{
				dimensionTable: {
					dimension: 'products',
					keyProps: ['product']
				}
			}
		];

		let facts = [
			{ id: 1, region: 'North', product: 'Product 1', value: 10 },
			{ id: 2, region: 'South', product: 'Product 2', value: 20 }
		];
		let cube = Cube.create(facts, dimensionHierarchies);

		let defaultMeasures = { value: 0 }; // properties for empty cells
		cube.fill(defaultMeasures);

		let factsFilled = cube.getFacts();

		isEqualObjects(factsFilled, [
			{ id: 1, region: 'North', product: 'Product 1', value: 10 },
			{ id: 2, region: 'South', product: 'Product 2', value: 20 },
			{ region: 'North', product: 'Product 2', value: 0 },
			{ region: 'South', product: 'Product 1', value: 0 }
		])
	})
});