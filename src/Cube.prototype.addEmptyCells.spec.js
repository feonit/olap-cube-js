import Cube from "./Cube.js";

export default () => {
	it('should define addEmptyCells', () =>  {
		expect(Cube.prototype.addEmptyCells).toBeDefined();
	});
	xit('must add cells in cellTable', () => {});
	xit('must throw id data is not instance of EmptyCell', () => {});
};
