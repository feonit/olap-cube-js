import FactTable from './FactTable.js'

describe('class FactTable', () => {
	let factTable;

	beforeEach(() => {
		factTable = new FactTable();
	});

	it('defaults', () => {
		expect(factTable.primaryKey === 'id').toBe(true);
	})
});
