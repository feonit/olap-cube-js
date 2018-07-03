import Cell from '../src/Cell.js'

describe('class Cell', function() {
	xit('throws when trying to create bad cell without id param', () => {
		expect(() => {
			try {
				new Cell({});
			} catch (error) {
				throw error;
			}
		}).toThrow();
	});
});
