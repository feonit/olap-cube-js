import DimensionTable from './DimensionTable.js'

describe('class DimensionTable', function() {
	it('throws when trying to create bad dimension', () => {
		expect(() => {
			new DimensionTable({});
		}).toThrow();
	});
});
