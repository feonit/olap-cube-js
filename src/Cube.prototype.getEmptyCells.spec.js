import Cube from "./Cube.js";

export default () => {
	it('should define getEmptyCells', () =>  {
		expect(Cube.prototype.getEmptyCells).toBeDefined();
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
	
	it('must filter cellTable and return only empty cells', () => {
		cube.fillEmptyCells();
		const emptyCells = cube.getEmptyCells();
		expect(emptyCells.length).toBe(2);
		emptyCells.forEach(emptyCell => {
			expect(cube.isEmptyCell(emptyCell)).toBe(true)
		})
	});
};
