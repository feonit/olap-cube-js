import Cube from "./Cube.js";

export default () => {
	it('should define addEmptyCells', () =>  {
		expect(Cube.prototype.addEmptyCells).toBeDefined();
	});
	
	let factTable;
	let dimensionHierarchies;
	let cube;
	
	beforeEach(() => {
		factTable = [
			{ id: 1, x: 1, y: 1, count: 5 },
			{ id: 2, x: 2, y: 2, count: 10 },
		];
		dimensionHierarchies = [
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
	
	it('must add cells in cellTable', () => {
		const emptyCells = cube.createEmptyCells();
		expect(cube.getCells().length).toBe(2);
		expect(emptyCells.length).toBe(2);
		cube.addEmptyCells(emptyCells);
		expect(cube.getCells().length).toBe(4)
	});
	
	it('must throw if arguments is not array', () => {
		const emptyCells = cube.createEmptyCells();
		const emptyCell = emptyCells[0];
		expect(() => {
			cube.addEmptyCells(emptyCell);
		}).toThrow();
	});
	
	it('must throw id data is not instance of internal EmptyCell class', () => {
		class EmptyCell {}
		expect(() => {
			cube.addEmptyCells([new EmptyCell]);
		}).toThrow();
	});
};
