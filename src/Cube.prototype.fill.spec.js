import Cube from '../src/Cube.js';
import {isEqualObjects} from '../spec/helpers/helpers.js'

describe('method Cube.prototype.fill', function() {
	let debug;

	const factTable = [
		{ id: 1, x: 0, y: 0, z: 0, is: true },
		{ id: 2, x: 0, y: 0, z: 1, is: true },
		{ id: 3, x: 0, y: 1, z: 0, is: true },
		{ id: 4, x: 0, y: 1, z: 1, is: true },
		{ id: 5, x: 1, y: 0, z: 0, is: true },
		// { id: 6, x: 1, y: 0, z: 1, is: true },
		// { id: 7, x: 1, y: 1, z: 0, is: true },
		// { id: 8, x: 1, y: 1, z: 1, is: true },
	];

	const dimensionHierarchies = [
		{ dimensionTable: { dimension: 'x', keyProps: ['x'] }},
		{ dimensionTable: { dimension: 'y', keyProps: ['y'] }},
		{ dimensionTable: { dimension: 'z', keyProps: ['z'] }}
	];

	it('should define fill', () => {
		expect(Cube.prototype.fill).toBeDefined();
	});

	it('should normalize count of cells for non-normalized data', () => {
		let cube = Cube.create(factTable, dimensionHierarchies);
		expect(debug = cube.cartesian().length).toBe(8);
		expect(debug = cube.getFacts().length).toBe(5);
		cube.fill({ is: false });
		expect(debug = cube.cartesian().length).toBe(8);
		expect(debug = cube.getFacts().length).toBe(8);
	});

	it('should normalize count of cells for non-normalized data with default props', () => {
		let cube = Cube.create(factTable, dimensionHierarchies);

		cube.fill({ is: false });

		const factTableExpectedAfter = factTable.concat([
			{ x: 1, y: 0, z: 1,is: false },
			{ x: 1, y: 1, z: 0,is: false },
			{ x: 1, y: 1, z: 1,is: false }
		]);
		const localFacts = cube.getFacts();
		debug = isEqualObjects(localFacts, factTableExpectedAfter);
	});

	describe('[should normalize for hierarchy of dimensions]', () => {
		let dimensionHierarchies;

		beforeEach(() => {
			dimensionHierarchies = [
				{
					dimensionTable: {
						dimension: 'city',
						keyProps: ['city'],
					},
					dependency: [
						{
							dimensionTable: {
								dimension: 'country',
								keyProps: ['country'],
							},
							dependency: [
								{
									dimensionTable: {
										dimension: 'planet',
										keyProps: ['planet']
									}
								}
							]
						}
					]
				},
				{
					dimensionTable: {
						dimension: 'nationality',
						keyProps: ['nationality']
					}
				}
			];
		});

		it('should work level 1', () => {
			const factTable = [
				{ id: 1, humans: 10, city: 'Moscow', nationality: 'Russian', country: 'Russia', planet: 'Earth' },
				{ id: 2, humans: 5, city: 'Paris', nationality: 'French', country: 'France', planet: 'Earth' },
			];

			const cube = Cube.create(factTable, dimensionHierarchies);
			expect(debug = cube.cartesian().length).toBe(4);
			expect(debug = cube.cartesian().length - cube.getFacts().length).toBe(2);
			cube.fill({ humans: 0 });
			expect(debug = cube.cartesian().length).toBe(4);
			expect(debug = cube.cartesian().length - cube.getFacts().length).toBe(0);
		});

		it('should work level 3', () => {
			const factTable = [
				{ id: 1, humans: 10, city: 'Moscow', nationality: 'Russian', country: 'Russia', planet: 'Earth' },
				{ id: 2, humans: 5, city: 'Paris', nationality: 'French', country: 'France', planet: 'Earth' },
				{ id: 3, humans: 1, city: 'Paris', nationality: 'French', country: 'France', planet: 'Mars' },
			];

			const cube = Cube.create(factTable, dimensionHierarchies);
			expect(debug = cube.cartesian().length).toBe(6);
			expect(debug = cube.cartesian().length - cube.getFacts().length).toBe(3);
			cube.fill({ humans: 0 });
			expect(debug = cube.cartesian().length).toBe(6);
			expect(debug = cube.cartesian().length - cube.getFacts().length).toBe(0);
		})

	});

	it('should pass for example doc', () => {
		const dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'x',
					keyProps: ['x']
				}
			},{
				dimensionTable: {
					dimension: 'y',
					keyProps: ['y']
				}
			}
		];
		const factTable = [
			{ id: 1, x: 0, y: 1, xy: true },
			{ id: 2, x: 1, y: 0, xy: true }
		];
		const cube = Cube.create(factTable, dimensionHierarchies)
		cube.fill({ xy: false });

		debug = isEqualObjects(cube.denormalize(), [
			{ id: 1, x: 0, y: 1, xy: true },
			{ id: 2, x: 1, y: 0, xy: true },
			{ x: 0, y: 0, xy: false },
			{ x: 1, y: 1, xy: false }
		]);
	})
});
