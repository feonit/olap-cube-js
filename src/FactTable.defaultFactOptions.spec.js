import FactTable from './FactTable.js'

export default () => {
	it('should create defaultFactOptions property', () => {
		const factTable = new FactTable();
		expect(
			factTable.hasOwnProperty('defaultFactOptions')
			&& typeof factTable.defaultFactOptions === 'object'
		).toBe(true)
	})
};
