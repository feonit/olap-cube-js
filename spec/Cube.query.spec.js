import Cube from '../src/Cube.js';
import {isEqual, jsonParseStringify} from './helpers/helpers.js'


let factTable = [
    { id: 1, city: 'New York', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
    { id: 2, city: 'Paris', company: 'SkyLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
    { id: 3, city: 'Paris', company: 'AirLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
    { id: 4, city: 'Moscow', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
    { id: 5, city: 'Moscow', company: 'SkyLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 2, price: '25$'},
]

let schema = {
    dimension: 'counts',
    keyProps: ['planesCount'],
    dependency: [
        {
            dimension: 'prices',
            keyProps: ['price'],
            dependency: [
                {
                    dimension: 'cities',
                    keyProps: ['city']
                }
            ]
        },
        {
            dimension: 'companies',
            keyProps: ['company']
        },
        {
            dimension: 'age',
            keyProps: ['minAgePlane', 'maxAgePlane']
        }
    ]
}

describe('[ Cube ][ query ]', () => {

    it('should return query data', () => {
        let cube = new Cube(factTable, schema);
        const res = cube.query('prices');
        const expectation = [
            { id: 1, price: "20$" },
            { id: 2, price: "10$" },
            { id: 3, price: "20$" },
            { id: 4, price: "25$" },
        ];
        expect(isEqual( jsonParseStringify(res), expectation)).toBe(true)
    });

    it('should return query data with dependency param', () => {
        let cube = new Cube(factTable, schema);
        const expectation = [
            { id: 3, price: "20$" },
            { id: 4, price: "25$" }
        ];
        let city = { id: 3 /** city: "Moscow"*/ }; // other parameters are optional
        let res = cube.query('prices', { 'cities': city });
        expect(isEqual( jsonParseStringify(res), expectation)).toBe(true)
    });

    describe('should pass all possible queries', () => {
        const factTable = [
            { id: 1, place: 'P_1', year: '2017', qr: 'QR1', month: 1, product: 'TV', mark: 'sony', money: 100, cents: 99},
            { id: 2, place: 'P_2', year: '2017', qr: 'QR2', month: 5, product: 'phone', mark: 'sony', money: 115, cents: 99},
            { id: 3, place: 'P_1', year: '2017', qr: 'QR3', month: 8, product: 'clock', mark: 'sony', money: 50, cents: 99},
            { id: 4, place: 'P_1', year: '2018', qr: 'QR1', month: 2, product: 'TV', mark: 'samsung', money: 120, cents: 0},
            { id: 5, place: 'P_2', year: '2018', qr: 'QR2', month: 6, product: 'TV', mark: 'samsung', money: 125, cents: 99},
            { id: 6, place: 'P_1', year: '2018', qr: 'QR3', month: 7, product: 'TV', mark: 'samsung', money: 125, cents: 90},
            { id: 7, place: 'P_2', year: '2018', qr: 'QR1', month: 2, product: 'TV', mark: 'samsung', money: 122, cents: 99},
            { id: 8, place: 'P_1', year: '2019', qr: 'QR1', month: 1, product: 'phone', mark: 'LG', money: 100, cents: 99},
            { id: 9, place: 'P_1', year: '2019', qr: 'QR1', month: 2, product: 'phone', mark: 'LG', money: 120, cents: 99},
            { id: 10, place: 'P_2', year: '2019', qr: 'QR1', month: 2, product: 'phone', mark: 'LG', money: 130, cents: 90},
            { id: 11, place: 'P_2', year: '2019', qr: 'QR2', month: 5, product: 'phone', mark: 'LG', money: 140, cents: 0},
            { id: 12, place: 'P_1', year: '2020', qr: 'QR1', month: 1, product: 'clock', mark: 'LG', money: 110, cents: 99},
            { id: 13, place: 'P_1', year: '2020', qr: 'QR1', month: 5, product: 'clock', mark: 'LG', money: 130, cents: 99},
            { id: 14, place: 'P_1', year: '2020', qr: 'QR3', month: 7, product: 'clock', mark: 'LG', money: 110, cents: 99},
            { id: 15, place: 'P_1', year: '2020', qr: 'QR4', month: 12, product: 'clock', mark: 'LG', money: 110, cents: 90}
        ];

        const schema = {
            dimension: 'money',
            keyProps: ['money', 'cents'],
            dependency: [
                {
                    dimension: 'place',
                    keyProps: ['place']
                },
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

        it('query should return list of members for all dimension in first level of hierarchy', () => {
            expect(cube.query('mark').length).toBe(3);
            expect(cube.query('place').length).toBe(2);
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
            expect(cube.query('mark', {
                product: { id: 1 }
            }).length).toBe(2);

            expect(cube.query('money', {
                mark: { id: 1 }
            }).length).toBe(3);
        });

        it('query should return list of members for dimension with space option including more than one dimension', () => {
            expect(cube.query('mark', {
                product: { id: 1 },
                year: { id: 1 }
            }).length).toBe(1);
        });

        it('query without any arguments should return list of members for dimension of all cells', () => {
            expect(cube.query().length).toBe(15);
            expect(cube.query(null).length).toBe(15);
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

        it('query with the space option in which there may be a plurality of terms of dimension determined by the represented value', () => {
            expect(cube.query({ mark: 'sony' }).length).toBe(3);
            expect(cube.query({ mark: 'samsung' }).length).toBe(4);
        });

        it('query with the space option in which there may be a plurality of terms of dimension determined by the represented values', () => {
            expect(cube.query({ mark: ['sony', 'samsung'] }).length).toBe(7);
        });

        it('query with empty the space option', ()=>{
            const res = cube.query('mark');
            const expectation = cube.query('mark', { product: void 0, place: void 0 });
            const check = isEqual( jsonParseStringify(res), jsonParseStringify(expectation) );
            expect(check).toBe(true);
        })
    })
});
