import Cube from '../src/Cube.js';
import {CreateInstanceException} from '../src/errors.js'
import {recursiveObjectsNotHaveCommonLinks} from '../spec/helpers/helpers.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'


describe('class Cube', function() {
	let debug;

	describe(`[ API prototype ${Cube.name}]`,() => {

		it('should define residuals', () => {
			expect(Cube.prototype.residuals).toBeDefined();
		});

		it('should define denormalize', () => {
			expect(Cube.prototype.denormalize).toBeDefined();
		});

		it('should define unfilled', () => {
			expect(Cube.prototype.unfilled).toBeDefined();
		});
	});

	describe(`[ API static ${Cube.name}]`,() => {

		it('should define create', () => {
			expect(Cube.create).toBeDefined();
		});
	});

	describe('[ Copy ]', () => {
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
			cubeCopy = new Cube(cube);
		});

		it('the ability to create a copy cube must work', () => {
			let debug;

			recursiveObjectsNotHaveCommonLinks(cube, cubeCopy)
			expect(debug = cube !== cubeCopy).toBe(true);
			expect(debug = cube.getDimensionMembers('x') !== cubeCopy.getDimensionMembers('x')).toBe(true);
			expect(debug = cube.getDimensionMembers('x')[0] !== cubeCopy.getDimensionMembers('x')[0]).toBe(true);
			expect(debug = cube.getDimensionMembers('y') !== cubeCopy.getDimensionMembers('y')).toBe(true);
			expect(debug = cube.getDimensionMembers('y')[0] !== cubeCopy.getDimensionMembers('y')[0]).toBe(true);
			expect(debug = cube.getFacts() !== cubeCopy.getFacts()).toBe(true);
			expect(debug = cube.getFacts()[0] !== cubeCopy.getFacts()[0]).toBe(true);
			expect(debug = cube.dimensionHierarchies !== cubeCopy.dimensionHierarchies).toBe(true);
		});

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
		function CustomCube(factTable, dimensionHierarchies){
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

	it('should define cartesian', () => {
		expect(Cube.prototype.cartesian).toBeDefined();
	});

	it('setting for templateForeignKey must work', () => {
		const factTable = [
			{ id: 1, x: 0 },
		];

		const dimensionHierarchies = [
			{
				dimensionTable: {
					dimension: 'x',
					keyProps: ['x']
				}
			}
		];

		const options = {
			templateForeignKey: '%sId'
		};
		const cube = Cube.create(factTable, dimensionHierarchies, options);

		isEqualObjects(
			cube.cellTable[0],
			{ id: 1, xId: 1 }
		)
	});

	describe('otherProps must work', () => {
		let cube;
		let facts;
		beforeEach(() => {
			facts = [
				{ id: 1, name: 'Leonid', nickname: 'Feonit', country: 'Russia' },
			];
			const dimensionHierarchies = [
				{
					dimensionTable: {
						dimension: 'user',
						keyProps: ['nickname'],
						otherProps: ['name']
					}
				}
			];
			cube = Cube.create(facts, dimensionHierarchies);
		});
		it('additional properties of dimension must be present in returned fact table', () => {
			debug = isEqualObjects(cube.getFacts(), facts);
		});
		it('additional properties of dimension must be present in new facts of table', () => {
			const user = { name: 'Sasha', nickname: 'Monkey', wrongProp: 'some' };
			const cellData = { country: 'Paris' };
			cube.addDimensionMember('user', user, void 0, void 0, cellData);
			const newCell = cube.getCells()[1];
			const newCellExpected = { user_id: 2, country: 'Paris' };
			newCellExpected.id = newCell.id; // auto generated uuid
			debug = isEqualObjects(cube.getCells()[1], newCellExpected);
			const newUserMember = cube.getDimensionMembers('user')[1];
			const newUserMemberExpected = { id: 2, name: 'Sasha', nickname: 'Monkey' };
			debug = isEqualObjects(newUserMember, newUserMemberExpected);
		});
	});
});
