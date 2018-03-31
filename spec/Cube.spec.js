import Cube from '../src/Cube.js';

describe('[ Cube Static ]', function(){

	it('generation unique entity ID from exist entities if they have empty list', () => {
		expect(Cube.reduceId([])).toBe(1)
	});

	it('generation unique entity ID from exist entities if they have one or more elements', () => {
		expect(Cube.reduceId([{id: 1}, {id: 3}])).toBe(4)
	});

	describe('[ API ]',()=>{

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

		it('the ability to create a copy cube must work', () => {
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

			const cube = new Cube(factTable, schema);
			const cube2 = new Cube(cube);

			let debug;

			function recursiveObjectsNotHaveCommonLinks(obj1, obj2){
				Object.keys(obj1).forEach(key => {

					if (typeof obj1[key] === "object" && obj1[key] !== null){
						expect(obj1[key] !== obj2[key]).toBe(true);

						recursiveObjectsNotHaveCommonLinks(obj1[key], obj2[key])
					}
				})
			}

			recursiveObjectsNotHaveCommonLinks(cube, cube2)
			expect(debug=cube !== cube2).toBe(true);
			expect(debug=cube.space !== cube2.space).toBe(true);
			expect(debug=cube.getDimensionMembers('x') !== cube2.getDimensionMembers('x')).toBe(true);
			expect(debug=cube.getDimensionMembers('x')[0] !== cube2.getDimensionMembers('x')[0]).toBe(true);
			expect(debug=cube.getDimensionMembers('y') !== cube2.getDimensionMembers('y')).toBe(true);
			expect(debug=cube.getDimensionMembers('y')[0] !== cube2.getDimensionMembers('y')[0]).toBe(true);
			expect(debug=cube.getDimensionMembers('xy') !== cube2.getDimensionMembers('xy')).toBe(true);
			expect(debug=cube.getDimensionMembers('xy')[0] !== cube2.getDimensionMembers('xy')[0]).toBe(true);
			expect(debug=cube.cellTable !== cube2.cellTable).toBe(true);
			expect(debug=cube.cellTable[0] !== cube2.cellTable[0]).toBe(true);
			expect(debug=cube.schema !== cube2.schema).toBe(true);
		})
	});

	it('generation unique entity ID name', () => {
		expect(Cube.genericId('entity')).toBe('entity_id')
	});
});