import Cube from '../src/Cube.js';
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {
	let debug;

	it('should create empty cube with no errors', () => {
		expect(() => {
			new Cube();
		}).not.toThrow();

		expect(() => {
			new Cube(new Cube());
		}).not.toThrow();

		expect(() => {
			class ProductCube extends Cube {}
			new Cube(new ProductCube());
		}).not.toThrow();

		expect(() => {
			new Cube();
		}).not.toThrow();
	});

	it('should create empty cube with no errors via create', () => {
		expect(() => {
			new Cube();
		}).not.toThrow();
	});

	it('should throw error with no plain object or instance of cube as argument', () => {
		expect(() => {
			const cube = new Cube(null);
		}).toThrow();

		expect(() => {
			const cube = new Cube("");
		}).toThrow();

		expect(() => {
			const cube = new Cube(function(){});
		}).toThrow();

		expect(() => {
			const cube = new Cube(123);
		}).toThrow();

		expect(() => {
			const cube = new Cube(new class A {});
		}).toThrow();
	});

	describe('', () => {
		let cube;
		let cubeCopy;

		beforeEach(() => {
			const factTable = [
				{ id: 1, x: 0, y: 0, xy: null },
			];

			const dimensionHierarchies = [
				{
					dimensionTable: {
						dimension: 'x',
						keyProps: ['x']
					}
				},
				{
					dimensionTable: {
						dimension: 'y',
						keyProps: ['y']
					}
				}
			];
			cube = new Cube({dimensionHierarchies});
			cube.addFacts(factTable);
		});

		it('the ability to create a copy cube must work', () => {
			let cubeData = JSON.parse(JSON.stringify(cube));
			cubeCopy = new Cube(cubeData);
			debug = isEqualObjects(cube, cubeCopy)
		});
		it('the ability co create new target cube with shared links with source cube', () => {
			let sharedLinksCube = new Cube(cube);
			expect(debug = sharedLinksCube.getCells() !== cube.getCells()).toBe(true);
			expect(debug = sharedLinksCube.dimensionHierarchies !== cube.dimensionHierarchies).toBe(true);
			expect(debug = sharedLinksCube.getCells()[0] === cube.getCells()[0]).toBe(true);
			expect(debug = sharedLinksCube.getDimensionMembers('x') === cube.getDimensionMembers('x')).toBe(true);
			expect(debug = sharedLinksCube.getDimensionMembers('x')[0] === cube.getDimensionMembers('x')[0]).toBe(true);
			expect(debug = sharedLinksCube.getDimensionMembers('y') === cube.getDimensionMembers('y')).toBe(true);
			expect(debug = sharedLinksCube.getDimensionMembers('y')[0] === cube.getDimensionMembers('y')[0]).toBe(true);
		})
	});

	const factTable = [
		{ id: 1, x: 0, y: 0, xy: null },
	];

	const dimensionHierarchies = [
		{
			dimensionTable: {
				dimension: 'x',
				keyProps: ['x']
			}
		},
		{
			dimensionTable: {
				dimension: 'y',
				keyProps: ['y']
			}
		}
	];

	it('inheritance of cube must work ES5', () => {
		function CustomCube(dimensionHierarchies, factTable) {
			// if Cube.js not esm module
			try {
				Function.prototype.apply.apply(Cube, arguments)
			} catch (error) {
				if (error instanceof TypeError) {
					const cube = new Cube({dimensionHierarchies});
					cube.addFacts(factTable);
					Object.assign(this, cube)
				}
			}
		}
		CustomCube.prototype = Object.create(Cube.prototype);
		Object.setPrototypeOf(CustomCube, Cube);

		const cube = new CustomCube(dimensionHierarchies, factTable);
		expect(debug = (cube instanceof CustomCube)).toBe(true);
		expect(debug = (cube instanceof Cube)).toBe(true)
	});

	it('inheritance of cube must work ES6', () => {
		class CustomCube extends Cube {}
		const cube = new CustomCube({dimensionHierarchies});
		cube.addFacts(factTable);
		expect(debug = (cube instanceof CustomCube)).toBe(true)
		expect(debug = (cube instanceof Cube)).toBe(true)
	});
};
