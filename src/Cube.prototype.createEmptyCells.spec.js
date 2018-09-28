import Cube from "./Cube.js";

export default () => {
	it('should define createEmptyCells', () =>  {
		expect(Cube.prototype.createEmptyCells).toBeDefined();
	});
	xit('must create empty cells and fill them with data from the argument', () => {});
	xit('re-creation should not cause errors or change data in the cube', () => {});
	xit('data for cells must be validated otherwise throw an error', () => {});
};
