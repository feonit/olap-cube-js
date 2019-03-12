import SnowflakeBuilder from '../src/SnowflakeBuilder.js'
import DimensionTree from '../src/DimensionTree.js'
import Cell from '../src/Cell.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {
	let debug;
	describe('common', () => {
		let dimensionHierarchies;
		let cellTable;
		let cells;

		beforeEach(() => {
			let factTable = [
				{ id: 1, city: 'New York', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
				{ id: 2, city: 'Paris', company: 'SkyLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
				{ id: 3, city: 'Paris', company: 'AirLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
				{ id: 4, city: 'Moscow', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
				{ id: 5, city: 'Moscow', company: 'SkyLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 2, price: '25$'},
			];

			const dimensionHierarchiesData = [
				{
					dimensionTable: {
						dimension: 'age',
						keyProps: ['minAgePlane', 'maxAgePlane'],
					}
				},
				{
					dimensionTable: {
						dimension: 'companies',
						keyProps: ['company']
					}
				},
				{
					dimensionTable: {
						dimension: 'prices',
						keyProps: ['price'],
					},
					level: [
						{
							dimensionTable: {
								dimension: 'cities',
								keyProps: ['city'],
							}
						}
					]
				}
			];

			cells = factTable.map(fact => new Cell(fact));
			cellTable = cells;
			dimensionHierarchies = dimensionHierarchiesData.map(dimensionTreeData => DimensionTree.createDimensionTree(dimensionTreeData));
			SnowflakeBuilder.anotherBuild(factTable, cells, dimensionHierarchies, cellTable);
		});

		it('must be equal etalon and expected cube data', () => {
			const expectedDimensionHierarchies = [
				{
					dimensionTable: {
						dimension: 'age',
						members: [
							{ id: 1, minAgePlane: '1 year', maxAgePlane: '5 year' },
							{ id: 2, minAgePlane: '5 year', maxAgePlane: '10 year' },
						]
					}
				},
				{
					dimensionTable: {
						dimension: 'companies',
						members: [
							{ id: 1, company: 'AirLine' },
							{ id: 2, company: 'SkyLine' },
						]
					}
				},
				{
					dimensionTable: {
						dimension: 'prices',
						members: [
							{ id: 1, price: '20$', cities_id: 1 },
							{ id: 2, price: '10$', cities_id: 2 },
							{ id: 3, price: '20$', cities_id: 3 },
							{ id: 4, price: '25$', cities_id: 3 },
						]
					},
					level: [
						{
							dimensionTable: {
								dimension: 'cities',
								members: [
									{ id: 1, city: 'New York' },
									{ id: 2, city: 'Paris' },
									{ id: 3, city: 'Moscow' },
								]
							},
						}
					]
				},
			];

			const expectedMeasure = [
				{ id: 1, planesCount: 1, age_id: 1, companies_id: 1, prices_id: 1 },
				{ id: 2, planesCount: 1, age_id: 2, companies_id: 2, prices_id: 2 },
				{ id: 3, planesCount: 1, age_id: 2, companies_id: 1, prices_id: 2 },
				{ id: 4, planesCount: 1, age_id: 1, companies_id: 1, prices_id: 3 },
				{ id: 5, planesCount: 2, age_id: 1, companies_id: 2, prices_id: 4 }
			]

			debug = isEqualObjects(dimensionHierarchies[0].dimensionTable.members, expectedDimensionHierarchies[0].dimensionTable.members);
			debug = isEqualObjects(dimensionHierarchies[1].dimensionTable.members, expectedDimensionHierarchies[1].dimensionTable.members);
			debug = isEqualObjects(dimensionHierarchies[2].dimensionTable.members, expectedDimensionHierarchies[2].dimensionTable.members);
			debug = isEqualObjects(dimensionHierarchies[2].level[0].dimensionTable.members, expectedDimensionHierarchies[2].level[0].dimensionTable.members);
			debug = isEqualObjects(cellTable, expectedMeasure)
		});
	});

	it('multiple hierarchy must work', () => {
		const dimensionHierarchiesData = [
			{
				dimensionTable: {
					dimension: 'product',
					keyProps: ['product']
				},
				level: [
					{
						dimensionTable: {
							dimension: 'discount',
							keyProps: ['discount']
						}
					},
					{
						dimensionTable: {
							dimension: 'matter',
							keyProps: ['matter']
						}
					}
				]
			}
		];

		const facts = [
			{id: 1, product: 'milk', matter: 'liquid', discount: 10, price: 50},
			{id: 2, product: 'bread', matter: 'solid', discount: 10, price: 60},
			{id: 3, product: 'potato', matter: 'solid', discount: 10, price: 70},
			{id: 4, product: 'apple', matter: 'solid', discount: 20, price: 80},
		];

		const cells = facts.map(fact => new Cell(fact));
		const cellTable = cells;
		const dimensionHierarchies = dimensionHierarchiesData.map(dimensionTreeData => DimensionTree.createDimensionTree(dimensionTreeData));
		SnowflakeBuilder.anotherBuild(facts, cells, dimensionHierarchies, cellTable);

		const products = [
			{id: 1, product: 'milk', matter_id: 1, discount_id: 1},
			{id: 2, product: 'bread', matter_id: 2, discount_id: 1},
			{id: 3, product: 'potato', matter_id: 2, discount_id: 1},
			{id: 4, product: 'apple', matter_id: 2, discount_id: 2},
		];

		const discount = [
			{id: 1, discount: 10},
			{id: 2, discount: 20},
		];

		const matter = [
			{id: 1, matter: 'liquid'},
			{id: 2, matter: 'solid'},
		];

		expect(debug = isEqualObjects(dimensionHierarchies[0].dimensionTable.members, products)).toBe(true)
		expect(debug = isEqualObjects(dimensionHierarchies[0].level[0].dimensionTable.members, discount)).toBe(true)
		expect(debug = isEqualObjects(dimensionHierarchies[0].level[1].dimensionTable.members, matter)).toBe(true)
	});

	it('multiple hierarchy with multiple levels must work', () => {
		const dimensionHierarchiesData = [
			{
				dimensionTable: {
					dimension: 'product',
					keyProps: ['product']
				},
				level: [
					{
						dimensionTable: {
							dimension: 'discount',
							keyProps: ['discount']
						},
						level: [
							{
								dimensionTable: {
									dimension: 'stage',
									keyProps: ['stage']
								},
							}
						]
					},
					{
						dimensionTable: {
							dimension: 'matter',
							keyProps: ['matter']
						},
						level: [
							{
								dimensionTable: {
									dimension: 'pack',
									keyProps: ['pack']
								},
							}
						]
					}
				]
			}
		];

		const facts = [
			{id: 1, product: 'milk', matter: 'liquid', pack: true, discount: 10, stage: 'minimum', price: 50},
			{id: 2, product: 'bread', matter: 'solid', pack: false, discount: 10, stage: 'minimum', price: 60},
			{id: 3, product: 'potato', matter: 'solid', pack: false, discount: 20, stage: 'minimum', price: 70},
			{id: 4, product: 'apple', matter: 'dry', pack: true, discount: 90, stage: 'maximum', price: 80},
		];

		const cells = facts.map(fact => new Cell(fact));
		const cellTable = cells;
		const dimensionHierarchies = dimensionHierarchiesData.map(dimensionTreeData => DimensionTree.createDimensionTree(dimensionTreeData));
		SnowflakeBuilder.anotherBuild(facts, cells, dimensionHierarchies, cellTable);

		const products = [
			{id: 1, product: 'milk', matter_id: 1, discount_id: 1},
			{id: 2, product: 'bread', matter_id: 3, discount_id: 1},
			{id: 3, product: 'potato', matter_id: 3, discount_id: 2},
			{id: 4, product: 'apple', matter_id: 2, discount_id: 3},
		];

		const discount = [
			{id: 1, discount: 10, stage_id: 1},
			{id: 2, discount: 20, stage_id: 1},
			{id: 3, discount: 90, stage_id: 2},
		];

		const matter = [
			{id: 1, matter: 'liquid', pack_id: 1},
			{id: 2, matter: 'dry', pack_id: 1},
			{id: 3, matter: 'solid', pack_id: 2},
		];

		const pack = [
			{id: 1, pack: true},
			{id: 2, pack: false},
		];

		const stage = [
			{id: 1, stage: 'minimum'},
			{id: 2, stage: 'maximum'},
		];

		expect(debug = isEqualObjects(dimensionHierarchies[0].dimensionTable.members, products)).toBe(true)
		expect(debug = isEqualObjects(dimensionHierarchies[0].level[0].dimensionTable.members, discount)).toBe(true)
		expect(debug = isEqualObjects(dimensionHierarchies[0].level[0].level[0].dimensionTable.members, stage)).toBe(true)
		expect(debug = isEqualObjects(dimensionHierarchies[0].level[1].dimensionTable.members, matter)).toBe(true)
		expect(debug = isEqualObjects(dimensionHierarchies[0].level[1].level[0].dimensionTable.members, pack)).toBe(true)
	});
};
