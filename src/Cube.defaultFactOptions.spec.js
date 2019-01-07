import Cube from "./Cube.js";

export default () => {
	it('should create defaultFactOptions property', () => {
		const cube = new Cube({defaultFactOptions: { some: 'value' }});
		expect(
			cube.hasOwnProperty('defaultFactOptions')
			&& typeof cube.defaultFactOptions === 'object'
		).toBe(true)
	});
	xit('add inevitability for defaultFactOptions property', () => {

	})
};