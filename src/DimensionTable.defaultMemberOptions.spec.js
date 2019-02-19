import Cube from './Cube.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {
	let debug;
	it('defaultMemberOptions must work with method addDimensionMember, level 1', () => {
		let factTable = [
			{ id: 1, latitude: 30}
		];
		let dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'latitude',
					keyProps: ['latitude'],
					defaultMemberOptions: {
						latitude: 0
					}
				}
			}
		];
		let cube = new Cube({dimensionHierarchies});
		cube.addFacts(factTable);
		cube.addDimensionMember('latitude');
		let members = cube.getDimensionMembers('latitude');
		debug = isEqualObjects({ id: 2, latitude: 0 }, members[1])
	});
	it('defaultMemberOptions must work with method addDimensionMember, level 1, otherProps must work too', () => {
		let factTable = [
			{ id: 1, latitude: 30, description: 'Central point'}
		];
		let dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'latitude',
					keyProps: ['latitude'],
					otherProps: ['description'],
					defaultMemberOptions: {
						latitude: 0,
						description: 'Initial point'
					}
				}
			}
		];
		let cube = new Cube({dimensionHierarchies});
		cube.addFacts(factTable);
		cube.addDimensionMember('latitude');
		let members = cube.getDimensionMembers('latitude');
		debug = isEqualObjects({ id: 2, latitude: 0, description: 'Initial point' }, members[1])
	});

	describe('defaultMemberOptions must work with method addDimensionMember, level 2', () => {
		let dimensionHierarchies;

		beforeEach(() => {
			dimensionHierarchies = [
				{
					dimensionTable: {
						dimension: 'latitude',
						keyProps: ['latitude'],
						defaultMemberOptions: {
							latitude: 0
						}
					},
					level: [
						{
							dimensionTable: {
								dimension: 'region',
								keyProps: ['region'],
								defaultMemberOptions: {
									region: 'North'
								}
							},
						}
					]
				}
			];
		});
		it('test 1, new leveled member no need', () => {
			let factTable = [
				{ id: 1, latitude: 30, region: 'South'}
			];
			let cube = new Cube({dimensionHierarchies});
			cube.addFacts(factTable);
			let customMemberOptions = {};
			let rollupCoordinatesData = cube.getDimensionMembers('region')[0];
			cube.addDimensionMember('latitude', customMemberOptions, { region: rollupCoordinatesData });

			let latitudeMembers = cube.getDimensionMembers('latitude');
			debug = isEqualObjects([
				{ id: 1, latitude: 30, region_id: 1 },
				{ id: 2, latitude: 0, region_id: 1 }
			], latitudeMembers);
		});
		it('test 2, new leveled member must been created, (but with warning?)', () => {
			// todo №1 may be not need create new members here?
			let factTable = [
				{ id: 1, latitude: 0, region: 'North'}
			];
			let cube = new Cube({dimensionHierarchies});
			cube.addFacts(factTable);
			cube.addDimensionMember('region');
			let latitudeMembers = cube.getDimensionMembers('latitude');
			debug = isEqualObjects([
				{ id: 1, latitude: 0, region_id: 1 },
				{ id: 2, latitude: 0, region_id: 2 }
			], latitudeMembers);
			let regionMembers = cube.getDimensionMembers('region');
			debug = isEqualObjects([
				{ id: 1, region: 'North' },
				{ id: 2, region: 'North' },
			], regionMembers)
		});
		it('test 3, new leveled member must been created', () => {
			let factTable = [
				{ id: 1, latitude: 30, region: 'South'}
			];
			let cube = new Cube({dimensionHierarchies});
			cube.addFacts(factTable);
			cube.addDimensionMember('region');
			let latitudeMembers = cube.getDimensionMembers('latitude');
			debug = isEqualObjects([
				{ id: 1, latitude: 30, region_id: 1 },
				{ id: 2, latitude: 0, region_id: 2 }
			], latitudeMembers);
			let regionMembers = cube.getDimensionMembers('region');
			debug = isEqualObjects([
				{ id: 1, region: 'South' },
				{ id: 2, region: 'North' }
			], regionMembers)
		});
	});

	it('defaultMemberOptions must work with method addDimensionMember, level 2, otherProps must work too', () => {
		let factTable = [
			{ id: 1, region: 'South', description: 'Not our region'}
		];
		let dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'latitude',
					keyProps: ['latitude'],
					defaultMemberOptions: {
						latitude: '30'
					}
				},
				level: [
					{
						dimensionTable: {
							dimension: 'region',
							keyProps: ['region'],
							otherProps: ['description'],
							defaultMemberOptions: {
								description: 'Our region',
								region: 'North'
							}
						},
					}
				]
			}
		];
		let cube = new Cube({dimensionHierarchies});
		cube.addFacts(factTable);
		cube.addDimensionMember('region');
		let members = cube.getDimensionMembers('region');
		debug = isEqualObjects({ id: 2, region: 'North', description: 'Our region' }, members[1])
	})
};
