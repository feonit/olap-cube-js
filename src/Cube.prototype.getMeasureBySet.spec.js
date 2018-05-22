import {isEqual, jsonParseStringify} from '../spec/helpers/helpers.js'
import {createProductCube} from './data/products.js';
import Cube from "./Cube.js";

describe('method Cube.prototype.getMeasureBySet', () => {
	let cube, debug;

	beforeEach(() => {
		cube = createProductCube();
	});

	it('should define getMeasureBySet', ()=> {
		expect(Cube.prototype.getMeasureBySet).toBeDefined();
	});

	it('query should return list of members for dimension with space option including one dimension', () => {
		expect(debug=cube.getMeasureBySet({ mark: { id: 1 } }).length).toBe(3);
	});

});
