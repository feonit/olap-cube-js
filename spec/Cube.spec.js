import Cube from '../src/Cube.js';
import {CreateInstanceException} from '../src/errors.js'

describe('[ Cube Static ]', function(){

	it('generation unique entity ID from exist entities if they have empty list', () => {
		expect(Cube.reduceId([])).toBe(1)
	});

	it('generation unique entity ID from exist entities if they have one or more elements', () => {
		expect(Cube.reduceId([{id: 1}, {id: 3}])).toBe(4)
	});

	const checkPrototypeApi = (Cube)=>{
		describe(`[ API prototype ${Cube.name}]`,()=>{

			it('should define getDimensionMembers', ()=> {
				expect(Cube.prototype.getDimensionMembers).toBeDefined();
			});

			it('should define getDimensionMembersBySet', ()=> {
				expect(Cube.prototype.getDimensionMembersBySet).toBeDefined();
			});

			it('should define getFacts', ()=> {
				expect(Cube.prototype.getFacts).toBeDefined();
			});

			it('should define getFactsBySet', ()=> {
				expect(Cube.prototype.getFactsBySet).toBeDefined();
			});

			it('should define cartesian', ()=> {
				expect(Cube.prototype.cartesian).toBeDefined();
			});

			it('should define residuals', ()=> {
				expect(Cube.prototype.residuals).toBeDefined();
			});

			it('should define denormalize', ()=> {
				expect(Cube.prototype.denormalize).toBeDefined();
			});

			it('should define addDimensionMember', ()=> {
				expect(Cube.prototype.addDimensionMember).toBeDefined();
			});

			it('should define removeDimensionMember', ()=> {
				expect(Cube.prototype.removeDimensionMember).toBeDefined();
			});

			it('should define fill', ()=> {
				expect(Cube.prototype.fill).toBeDefined();
			});

			it('should define unfilled', ()=> {
				expect(Cube.prototype.unfilled).toBeDefined();
			});
		});

		describe(`[ API static ${Cube.name}]`,()=>{

			it('should define create', ()=> {
				expect(Cube.create).toBeDefined();
			});
		});
	};

	checkPrototypeApi(Cube);

	describe('[ Analytical tools ]', ()=>{
		let cube;

		beforeEach(()=>{
			const factTable = [
				{ id: 1, x: 0, y: 0, z: 0 },
				{ id: 2, x: 0, y: 0, z: 1 },
				{ id: 3, x: 0, y: 1, z: 0 },
				{ id: 4, x: 1, y: 0, z: 0 },
				{ id: 5, x: 0, y: 1, z: 1 },
				// { id: 6, x: 1, y: 1, z: 0 },
				// { id: 7, x: 1, y: 0, z: 1 },
				// { id: 8, x: 1, y: 1, z: 1 },
			];

			const schema = {
				dimension: 'xyz',
				keyProps: ['xyz'],
				dependency: [
					{
						dimension: 'x',
						keyProps: ['x'],
					},
					{
						dimension: 'y',
						keyProps: ['y'],
					},
					{
						dimension: 'z',
						keyProps: ['z'],
					}
				]
			};
			cube = new Cube(factTable, schema);
		});

		it('should return cartesian count', ()=>{
			const result = cube.cartesian().length;
			expect(result).toBe(8)
		});

		it('should return empty count', ()=>{
			const result = cube.cartesian().length - cube.getFacts().length;
			expect(result).toBe(3)
		});

	});

	describe('[ Validation ]', ()=>{

		it('has non normalized fact data over declared dimension tables', ()=>{
			const factTable = [
				{ id: 1, x: 0, y: 0, xy: null },
				{ id: 2, x: 1, y: 1, xy: null },
				{ id: 3, x: 1, y: 1, xy: null }, // <- bad record
			];

			const schema = {
				dimension: 'xy',
				keyProps: ['xy'],
				dependency: [
					{
						dimension: 'x',
						keyProps: ['x']
					},
					{
						dimension: 'y',
						keyProps: ['y']
					}
				]
			};

			const cube = new Cube(factTable, schema);
			const result = cube.residuals().length;
			expect(result === 1).toBe(true);
		})

	});

	describe('[ Copy ]', () => {

		let cube, cubeCopy
		beforeEach(()=>{
			const factTable = [
				{ id: 1, x: 0, y: 0, xy: null },
			];

			const schema = {
				dimension: 'xy',
				keyProps: ['xy'],
				dependency: [
					{
						dimension: 'x',
						keyProps: ['x']
					},
					{
						dimension: 'y',
						keyProps: ['y']
					}
				]
			};
			cube = new Cube(factTable, schema);
			cubeCopy = new Cube(cube);
		});

		it('the ability to create a copy cube must work', () => {
			let debug;
			function recursiveObjectsNotHaveCommonLinks(obj1, obj2){
				Object.keys(obj1).forEach(key => {

					if (typeof obj1[key] === "object" && obj1[key] !== null){
						expect(obj1[key] !== obj2[key]).toBe(true);

						recursiveObjectsNotHaveCommonLinks(obj1[key], obj2[key])
					}
				})
			}
			recursiveObjectsNotHaveCommonLinks(cube, cubeCopy)
			expect(debug=cube !== cubeCopy).toBe(true);
			expect(debug=cube.space !== cubeCopy.space).toBe(true);
			expect(debug=cube.getDimensionMembers('x') !== cubeCopy.getDimensionMembers('x')).toBe(true);
			expect(debug=cube.getDimensionMembers('x')[0] !== cubeCopy.getDimensionMembers('x')[0]).toBe(true);
			expect(debug=cube.getDimensionMembers('y') !== cubeCopy.getDimensionMembers('y')).toBe(true);
			expect(debug=cube.getDimensionMembers('y')[0] !== cubeCopy.getDimensionMembers('y')[0]).toBe(true);
			expect(debug=cube.getDimensionMembers('xy') !== cubeCopy.getDimensionMembers('xy')).toBe(true);
			expect(debug=cube.getDimensionMembers('xy')[0] !== cubeCopy.getDimensionMembers('xy')[0]).toBe(true);
			expect(debug=cube.cellTable !== cubeCopy.cellTable).toBe(true);
			expect(debug=cube.cellTable[0] !== cubeCopy.cellTable[0]).toBe(true);
			expect(debug=cube.schema !== cubeCopy.schema).toBe(true);
		});

	});

	const factTable = [
		{ id: 1, x: 0, y: 0, xy: null },
	];

	const schema = {
		dimension: 'xy',
		keyProps: ['xy'],
		dependency: [
			{
				dimension: 'x',
				keyProps: ['x']
			},
			{
				dimension: 'y',
				keyProps: ['y']
			}
		]
	};

	it('inheritance of cube must work ES5', ()=>{
		function CustomCube(factTable, schema){
			// if Cube.js not esm module
			try {
				Function.prototype.apply.apply(Cube, arguments)
			} catch (error){
				if (error instanceof TypeError){
					const cube = new Cube(factTable, schema);
					Object.assign(this, cube)
				}
			}
		}
		CustomCube.prototype = Object.create(Cube.prototype);
		Object.setPrototypeOf(CustomCube, Cube);

		const cube = new CustomCube(factTable, schema);
		expect(cube instanceof CustomCube).toBe(true);
		expect(cube instanceof Cube).toBe(true)
	});

	it('inheritance of cube must work ES6', ()=>{
		class CustomCube extends Cube {}
		const cube = new CustomCube(factTable, schema);
		expect(cube instanceof CustomCube).toBe(true)
		expect(cube instanceof Cube).toBe(true)
	});

	it('fabric method create of cube must work', ()=>{
		let cube;
		class CustomCube extends Cube{}
		cube = new Cube(factTable, schema)
		cube = new CustomCube(factTable, schema)
		cube = Cube.create(factTable, schema)
		expect(cube instanceof Cube).toBe(true)
	});

	it('should throw when execute create static method without context of Cube constructor of its interface', ()=>{
		class CustomCube extends Cube{}
		const createCube = CustomCube.create;
		expect(()=>{
			createCube(factTable, schema)
		}).toThrow()
	});

	it('should specific throw when execute create static method without context of Cube constructor of its interface', ()=>{
		class CustomCube extends Cube{}
		const createCube = CustomCube.create;
		let error;
		try{
			const cube = createCube(factTable, schema);
		} catch (e){
			error = e;
		}
		expect(error instanceof CreateInstanceException).toBe(true)
	});

	it('generation unique entity ID name', () => {
		expect(Cube.genericId('entity')).toBe('entity_id')
	});
});
