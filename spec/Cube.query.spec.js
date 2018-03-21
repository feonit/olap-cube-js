import Cube from '../src/Cube.js';
import {isEqual, jsonParseStringify} from './helpers/helpers.js'

describe('[ Cube ][ query ]', () => {

	describe('should pass all possible queries', () => {
		const factTable = [
			{ id: 1, year: '2017', qr: 'QR1', month: 1, product: 'TV', mark: 'SONY', money: 100, cents: 99},
			{ id: 2, year: '2017', qr: 'QR2', month: 5, product: 'Phone', mark: 'SONY', money: 115, cents: 99},
			{ id: 3, year: '2017', qr: 'QR3', month: 8, product: 'Clock', mark: 'SONY', money: 50, cents: 99},
			{ id: 4, year: '2018', qr: 'QR1', month: 2, product: 'TV', mark: 'APPLE', money: 120, cents: 0},
			{ id: 5, year: '2018', qr: 'QR2', month: 6, product: 'TV', mark: 'APPLE', money: 125, cents: 99},
			{ id: 6, year: '2018', qr: 'QR3', month: 7, product: 'TV', mark: 'APPLE', money: 125, cents: 90},
			{ id: 7, year: '2018', qr: 'QR1', month: 2, product: 'TV', mark: 'APPLE', money: 122, cents: 99},
			{ id: 8, year: '2019', qr: 'QR1', month: 1, product: 'Phone', mark: 'LG', money: 100, cents: 99},
			{ id: 9, year: '2019', qr: 'QR1', month: 2, product: 'Phone', mark: 'LG', money: 120, cents: 99},
			{ id: 10, year: '2019', qr: 'QR1', month: 2, product: 'Phone', mark: 'LG', money: 130, cents: 90},
			{ id: 11, year: '2019', qr: 'QR2', month: 5, product: 'Phone', mark: 'LG', money: 140, cents: 0},
			{ id: 12, year: '2020', qr: 'QR1', month: 1, product: 'Clock', mark: 'LG', money: 110, cents: 99},
			{ id: 13, year: '2020', qr: 'QR1', month: 5, product: 'Clock', mark: 'LG', money: 130, cents: 99},
			{ id: 14, year: '2020', qr: 'QR3', month: 7, product: 'Clock', mark: 'LG', money: 110, cents: 99},
			{ id: 15, year: '2020', qr: 'QR4', month: 12, product: 'Clock', mark: 'LG', money: 110, cents: 90}
		];

		const schema = {
			dimension: 'money',
			keyProps: ['money', 'cents'],
			dependency: [
				{
					dimension: 'product',
					keyProps: ['product']
				},
				{
					dimension: 'mark',
					keyProps: ['mark']
				},
				{
					dimension: 'month',
					keyProps: ['month'],
					dependency: [
						{
							dimension: 'qr',
							keyProps: ['qr'],
							dependency: [
								{
									dimension: 'year',
									keyProps: ['year']
								}
							]
						}
					]
				},
			]
		};

		let cube;

		beforeEach(() => {
			cube = new Cube(factTable, schema);
		});

		const product = [
			{ id: 1, product: 'TV' },
			{ id: 2, product: 'Phone' },
			{ id: 3, product: 'Clock' }
		];
		
		const mark = [
			{ id: 1, product: 'SONY' },
			{ id: 2, product: 'APPLE' },
			{ id: 3, product: 'LG' }
		];

		it('query should return list of members for all dimension in first level of hierarchy', () => {
			expect(isEqual(product, jsonParseStringify( cube.query('product') )));
			expect(isEqual(mark, jsonParseStringify( cube.query('mark') )));
			expect(cube.query('month').length).toBe(13);
		});

		it('query should return list of members for all dimension in other levels of hierarchy', () => {
			expect(cube.query('year').length).toBe(4);
			expect(cube.query('qr').length).toBe(11);
		});

		it('query should return list of members for dimension of cells', () => {
			expect(cube.query('money').length).toBe(15);
		});

		it('query should return list of members for dimension with space option including one dimension', () => {
			expect(cube.query('mark', { product: { id: 1 } }).length).toBe(2);
			expect(cube.query('money', { mark: { id: 1 } }).length).toBe(3);
		});

		it('query should return list of members for dimension with space option including more than one dimension', () => {
			expect(cube.query('mark', { product: { id: 1 }, year: { id: 1 } }).length).toBe(1);
		});

		it('query without any arguments should return list of members for dimension of all cells', () => {
			expect(cube.query().length).toBe(15);
			expect(cube.query(null).length).toBe(15);
			expect(cube.query(void 0).length).toBe(15);
			expect(cube.query('').length).toBe(15);
		});

		it('query with the space option as the second arguments should return list of members for dimension of relevant cells', () => {
			expect(cube.query(null, { mark: { id: 1} }).length).toBe(3);
		});

		it('query with the space option as the first argument should return list of members for dimension of relevant cells', () => {
			expect(cube.query({ mark: { id: 1 } }).length).toBe(3);
		});

		it('query with the space option in which there can be a list of members of the dimension', () => {
			expect(cube.query({ mark: [{ id: 1 }, { id: 2 }] }).length).toBe(7);
		});

		xit('query with the space option in which there may be a plurality of terms of dimension determined by the represented key - value', () => {
			expect(cube.query({ mark: { mark: 'SONY' } }).length).toBe(3);
			expect(cube.query({ mark: { mark: 'APPLE' } }).length).toBe(4);
		});

		// @deprecated
		it('query with the space option in which there may be a plurality of terms of dimension determined by the represented value', () => {
			expect(cube.query({ mark: 'SONY' }).length).toBe(3);
			expect(cube.query({ mark: 'APPLE' }).length).toBe(4);
		});

		it('query with the space option in which there may be a plurality of terms of dimension determined by the represented values', () => {
			expect(cube.query({ mark: ['SONY', 'APPLE'] }).length).toBe(7);
		});

		it('query with empty the space option', () => {
			const res = cube.query('mark');
			const expectation = cube.query('mark', { product: void 0 });
			const check = isEqual( jsonParseStringify(res), jsonParseStringify(expectation) );
			expect(check).toBe(true);
		})
	})
});
