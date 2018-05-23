import SnowflakeBuilder from '../src/SnowflakeBuilder.js'
import DimensionTree from '../src/DimensionTree.js'
import CellTable from '../src/CellTable.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

describe('class SnowflakeBuilder', () => {
	let debug;
	describe('common', ()=>{
		let dimensionHierarchies;
		let cellTable;

		beforeEach(()=>{
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
					dependency: [
						{
							dimensionTable: {
								dimension: 'cities',
								keyProps: ['city'],
							}
						}
					]
				}
			];

			cellTable = new CellTable(factTable);
			dimensionHierarchies = dimensionHierarchiesData.map(dimensionTreeData => DimensionTree.createDimensionTree(dimensionTreeData));
			SnowflakeBuilder.anotherBuild(factTable, cellTable, dimensionHierarchies);
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
					dependency: [
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
			debug = isEqualObjects(dimensionHierarchies[2].dependency[0].dimensionTable.members, expectedDimensionHierarchies[2].dependency[0].dimensionTable.members);
			debug = isEqualObjects(cellTable, expectedMeasure)
		});
	});
});
