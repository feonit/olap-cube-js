import EmptyCell from './EmptyCell.js'

describe('class EmptyCell', () => {
	it('static method should define createEmptyCell', () => {
		expect(EmptyCell.createEmptyCell).toBeDefined();
	});
	it('static method should define generateId', () => {
		expect(EmptyCell.generateId).toBeDefined();
	});
	it('static method should define generateId', () => {
		expect(EmptyCell.generateId).toBeDefined();
	});
	it('method createEmptyCell must work correctly', () => {
		expect(EmptyCell.createEmptyCell({ id: 1 }) instanceof EmptyCell).toBe(true)
	});
	it('method generateId must work correctly', () => {
		expect(typeof EmptyCell.generateId() === 'string').toBe(true)
	});
	it('method isEmptyCell must work correctly', () => {
		let cellData = { id: 1 };
		let cell = EmptyCell.createEmptyCell(cellData);
		expect(EmptyCell.isEmptyCell(cell)).toBe(false);
		expect(EmptyCell.isEmptyCell(cellData)).toBe(false);
		expect(EmptyCell.isEmptyCell({ id: EmptyCell.generateId() })).toBe(true)
	})
});
