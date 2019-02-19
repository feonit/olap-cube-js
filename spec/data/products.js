import Cube from '../../src/Cube.js';

export const factTable = [
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

const dimensionHierarchies = [
	{
		dimensionTable: {
			dimension: 'product',
			keyProps: ['product']
		}
	},
	{
		dimensionTable: {
			dimension: 'mark',
			keyProps: ['mark']
		}
	},
	{
		dimensionTable: {
			dimension: 'month',
			keyProps: ['month'],
		},
		level: [
			{
				dimensionTable: {
					dimension: 'qr',
					keyProps: ['qr'],
				},
				level: [
					{
						dimensionTable: {
							dimension: 'year',
							keyProps: ['year']
						}
					}
				]
			}
		]
	},
];

export function createProductCube() {
	const cube = new Cube({dimensionHierarchies});
	cube.addFacts(factTable);
	return cube;
}