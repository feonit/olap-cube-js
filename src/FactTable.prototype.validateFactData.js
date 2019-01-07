import FactTable from "./FactTable.js";
import {NotFoundFactId} from "./errors.js";

export default () => {
	it('should define validateFactData', () => {
		expect(FactTable.prototype.validateFactData).toBeDefined();
	});

	it('should throw error if not found id param', () => {
		expect(() => {
			new FactTable({
				facts: [
					{ name: 'Gagarin' }
				],
				factPrimaryKey: 'id'
			});
		}).toThrow();
	});

	it('should throw special error if not found id param', () => {
		let err;
		try {
			new FactTable({
				facts: [
					{ name: 'Gagarin' }
				],
				factPrimaryKey: 'id'
			});
		} catch (error) {
			err = error
		}
		expect(err instanceof NotFoundFactId).toBe(true)
	})
};