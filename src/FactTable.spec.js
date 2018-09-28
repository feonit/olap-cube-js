import FactTable from './FactTable.js'

export default () => {
	let factTable;

	beforeEach(() => {
		factTable = new FactTable();
	});

	it('defaults', () => {
		expect(factTable.primaryKey === 'id').toBe(true);
	})
};
