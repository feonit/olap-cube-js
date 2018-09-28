import DimensionTable from './DimensionTable.js'

export default () => {
	it('throws when trying to create bad dimension', () => {
		expect(() => {
			new DimensionTable({});
		}).toThrow();
	});
	it('generation unique entity ID from exist entities if they have one or more elements', () => {
		expect(DimensionTable.reduceId([{id: 1}, {id: 3}], 'id')).toBe(4)
	});
};
