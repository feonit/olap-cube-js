import Fact from '../src/Fact.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {
	let debug;
	it('must assign properties with only simple values', () => {
		class Data {
			constructor() {
				Object.assign(this, {
					id: 1,
					prop1: 'prop1',
					prop2: 100,
					prop3: {},
					prop4: null,
					prop5: void 0,
					prop6: [],
					prop7: function() {},
					prop8: new Date(),
					prop9: /[0-9]/
				})
			}
			getId() {
				return this.id
			}
		}
		Data.prototype.counter = 100;

		const data = new Data();

		const fact = new Fact(data);
		debug = isEqualObjects({ id: 1, prop1: 'prop1', prop2: 100, prop4: null }, fact);
	});
};
