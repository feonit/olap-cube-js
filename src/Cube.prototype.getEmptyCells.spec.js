import Cube from "./Cube.js";

export default () => {
	it('should define getEmptyCells', () =>  {
		expect(Cube.prototype.getEmptyCells).toBeDefined();
	});
	xit('must filter cellTable and return only empty cells', () => {});
};
