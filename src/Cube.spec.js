import Cube from '../src/Cube.js';
import {CreateInstanceException} from '../src/errors.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {
	let debug;
	
	it('should define create static method', () => {
		expect(Cube.create).toBeDefined();
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
			cube = Cube.create(factTable, dimensionHierarchies);
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
		function CustomCube(factTable, dimensionHierarchies) {
			// if Cube.js not esm module
			try {
				Function.prototype.apply.apply(Cube, arguments)
			} catch (error) {
				if (error instanceof TypeError) {
					const cube = Cube.create(factTable, dimensionHierarchies);
					Object.assign(this, cube)
				}
			}
		}
		CustomCube.prototype = Object.create(Cube.prototype);
		Object.setPrototypeOf(CustomCube, Cube);

		const cube = new CustomCube(factTable, dimensionHierarchies);
		expect(debug = (cube instanceof CustomCube)).toBe(true);
		expect(debug = (cube instanceof Cube)).toBe(true)
	});

	it('inheritance of cube must work ES6', () => {
		class CustomCube extends Cube {}
		const cube = CustomCube.create(factTable, dimensionHierarchies);
		expect(debug = (cube instanceof CustomCube)).toBe(true)
		expect(debug = (cube instanceof Cube)).toBe(true)
	});

	it('should throw when execute create static method without context of Cube constructor of its interface', () => {
		class CustomCube extends Cube {}
		const createCube = CustomCube.create;
		expect(() => {
			createCube(factTable, dimensionHierarchies)
		}).toThrow()
	});

	it('should specific throw when execute create static method without context of Cube constructor of its interface', () => {
		class CustomCube extends Cube {}
		const createCube = CustomCube.create;
		let error;
		try {
			const cube = createCube(factTable, dimensionHierarchies);
		} catch (e) {
			error = e;
		}
		expect(error instanceof CreateInstanceException).toBe(true)
	});

};
