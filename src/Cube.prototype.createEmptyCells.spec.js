import Cube from "./Cube.js";

export default () => {
	it('should define createEmptyCells', () =>  {
		expect(Cube.prototype.createEmptyCells).toBeDefined();
	});
	
	describe('', () => {
		let debug;
		let factTable;
		let dimensionHierarchies;
		let cube;
		
		beforeEach(() => {
			factTable = [
				{ id: 1, x: 0, y: 0, z: 0, is: true },
				{ id: 2, x: 0, y: 0, z: 1, is: true },
				{ id: 3, x: 0, y: 1, z: 0, is: true },
				{ id: 4, x: 0, y: 1, z: 1, is: true },
				{ id: 5, x: 1, y: 0, z: 0, is: true },
				// { id: 6, x: 1, y: 0, z: 1, is: true },
				// { id: 7, x: 1, y: 1, z: 0, is: true },
				// { id: 8, x: 1, y: 1, z: 1, is: true },
			];
			
			dimensionHierarchies = [
				{ dimensionTable: { dimension: 'x', keyProps: ['x'] }},
				{ dimensionTable: { dimension: 'y', keyProps: ['y'] }},
				{ dimensionTable: { dimension: 'z', keyProps: ['z'] }}
			];
			cube = new Cube({dimensionHierarchies});
			cube.addFacts(factTable);
		});
		
		it('creation should not cause errors', () => {
			const argValue = false;
			expect(() => {
				const emptyCells = cube.createEmptyCells({ is: argValue });
			}).not.toThrow()
		});
		
		it('must create a certain number of empty cells', () => {
			const cartesianLength = Cube.cartesian(cube).length;
			const factsLength = cube.getFacts().length;
			const argValue = false;
			const emptyCells = cube.createEmptyCells({ is: argValue });
			expect(debug = cartesianLength).toBe(8);
			expect(debug = factsLength).toBe(5);
			expect(debug = emptyCells.length).toBe(8 - 5);
		});
		
		it('must fill created empty cells with data from the argument', () => {
			const argValue = false;
			const emptyCells = cube.createEmptyCells({ is: argValue });
			emptyCells.forEach(emptyCell => {
				const { is } = emptyCell;
				expect(Object.is(is, argValue)).toBe(true);
			})
		});
		
		it('argument for cells must be plain object otherwise throw an error', () => {
			expect(() => {
				const emptyCells = cube.createEmptyCells(null);
			}).toThrow();
		});
	});
	
	describe('', () => {
		it('cell data must contain default fact data', () => {
			const expectedValue = false;
			const factTable = [
				{ id: 1, x: 1, y: 1, isOpen: true },
				{ id: 2, x: 2, y: 2, isOpen: true },
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
			const options = {
				defaultFactOptions: {
					isOpen: expectedValue
				}
			};
			const cube = new Cube({dimensionHierarchies, ...options});
			cube.addFacts(factTable);
			const emptyCells = cube.createEmptyCells();
			
			emptyCells.forEach(emptyCell => {
				const {isOpen} = emptyCell;
				expect(Object.is(isOpen, expectedValue)).toBe(true)
			});
		});
	});
	
	it('cell options must rewrite default fact options', () => {
		const countValue = 0;
		const factTable = [
			{ id: 1, x: 1, y: 1, count: 5 },
			{ id: 2, x: 2, y: 2, count: 10 },
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
		const options = {
			defaultFactOptions: {
				count: countValue
			}
		};
		const expectedCountValue = 100;
		const cube = new Cube({dimensionHierarchies, ...options});
		cube.addFacts(factTable);
		const emptyCells = cube.createEmptyCells({count: expectedCountValue});
		emptyCells.forEach(emptyCell => {
			const {count} = emptyCell;
			expect(Object.is(count, expectedCountValue)).toBe(true);
		})
	});
	
	// wrong case of use, but must be properly processed
	it('foreign key props must rewrite cell options', () => {
		const countValue = 0;
		const factTable = [
			{ id: 1, x: 1, y: 1, count: 5 },
			{ id: 2, x: 2, y: 2, count: 10 },
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
		const options = {
			defaultFactOptions: {
				count: countValue
			}
		}
		const expectedValue = 'some value';
		const cube = new Cube({dimensionHierarchies, ...options});
		cube.addFacts(factTable);
		const emptyCells = cube.createEmptyCells({ x_id: expectedValue });
		emptyCells.forEach(emptyCell => {
			const {x_id} = emptyCell;
			expect(Object.is(x_id, expectedValue)).toBe(false);
		})
	});
	
	xit('data for cells must be validated otherwise throw an error', () => {
	
	});
};
