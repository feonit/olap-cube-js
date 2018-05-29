import Fact from '../src/Fact.js'
import {isEqual, jsonParseStringify} from '../spec/helpers/helpers.js'
import {NotFoundFactId} from '../src/errors.js'

describe('class Fact', () => {
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
		expect(isEqual(
			{ id: 1, prop1: 'prop1', prop2: 100, prop4: null },
			jsonParseStringify(fact)
		)).toBe(true)
	});

	it('should throw error if not found id param', () => {
		expect(() => {
			new Fact({name: 'me'})
		}).toThrow();
	});

	it('should throw special error if not found id param', () => {
		let err;
		try {
			new Fact({ region: 'North' })
		} catch (error) {
			err = error
		}
		expect(err instanceof NotFoundFactId).toBe(true)
	})
});
