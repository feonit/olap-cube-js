import Cube from '../src/Cube.js';
import '../node_modules/lodash/lodash.js';

function jsonParseStringify(data){
    return JSON.parse(JSON.stringify(data))
}

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

describe('[ Cube Edit ][ query ]', () => {
    it('should return query data', () => {
        let cube = new Cube(factTable, schema);
        const res = cube.query('prices');
        const expectation = [
            { id: 1, price: "20$" },
            { id: 2, price: "10$" },
            { id: 3, price: "20$" },
            { id: 4, price: "25$" },
        ];
        expect(_.isEqual( jsonParseStringify(res), expectation)).toBe(true)
    });
    it('should return query data with dependency param', () => {
        let cube = new Cube(factTable, schema);
        const expectation = [
            { id: 3, price: "20$" },
            { id: 4, price: "25$" }
        ];
        let city = { id: 3 /** city: "Moscow"*/ }; // other parameters are optional
        let res = cube.query('prices', { 'cities': city });
        expect(_.isEqual( jsonParseStringify(res), expectation)).toBe(true)
    });
    it('should pass all possible query requests', () => {
        const factTable = [
            { id: 1, point: 'P_1', year: '2017', qr: 'QR1', month: 1, product: 'TV', mark: 'sony', money: 100, cents: 99},
            { id: 2, point: 'P_2', year: '2017', qr: 'QR2', month: 5, product: 'phone', mark: 'sony', money: 115, cents: 99},
            { id: 3, point: 'P_1', year: '2017', qr: 'QR3', month: 8, product: 'clock', mark: 'sony', money: 50, cents: 99},
            { id: 4, point: 'P_1', year: '2018', qr: 'QR1', month: 2, product: 'TV', mark: 'samsung', money: 120, cents: 0},
            { id: 5, point: 'P_2', year: '2018', qr: 'QR2', month: 6, product: 'TV', mark: 'samsung', money: 125, cents: 99},
            { id: 6, point: 'P_1', year: '2018', qr: 'QR3', month: 7, product: 'TV', mark: 'samsung', money: 125, cents: 90},
            { id: 7, point: 'P_2', year: '2018', qr: 'QR1', month: 2, product: 'TV', mark: 'samsung', money: 122, cents: 99},
            { id: 8, point: 'P_1', year: '2019', qr: 'QR1', month: 1, product: 'phone', mark: 'LG', money: 100, cents: 99},
            { id: 9, point: 'P_1', year: '2019', qr: 'QR1', month: 2, product: 'phone', mark: 'LG', money: 120, cents: 99},
            { id: 10, point: 'P_2', year: '2019', qr: 'QR1', month: 2, product: 'phone', mark: 'LG', money: 130, cents: 90},
            { id: 11, point: 'P_2', year: '2019', qr: 'QR2', month: 5, product: 'phone', mark: 'LG', money: 140, cents: 0},
            { id: 12, point: 'P_1', year: '2020', qr: 'QR1', month: 1, product: 'clock', mark: 'LG', money: 110, cents: 99},
            { id: 13, point: 'P_1', year: '2020', qr: 'QR1', month: 5, product: 'clock', mark: 'LG', money: 130, cents: 99},
            { id: 14, point: 'P_1', year: '2020', qr: 'QR3', month: 7, product: 'clock', mark: 'LG', money: 110, cents: 99},
            { id: 15, point: 'P_1', year: '2020', qr: 'QR4', month: 12, product: 'clock', mark: 'LG', money: 110, cents: 90}
        ];

        const schema = {
            dimension: 'money',
            keyProps: ['money', 'cents'],
            dependency: [
                {
                    dimension: 'point',
                    keyProps: ['point']
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
        }

        let cube = new Cube(factTable, schema);

        expect(cube.query('mark').length).toBe(3);
        expect(cube.query('point').length).toBe(2);
        expect(cube.query('year').length).toBe(4);
        expect(cube.query('qr').length).toBe(11);
        expect(cube.query('month').length).toBe(13);
        // expect(cube.query('qr', { year: { id: cube.getIdOf('year', '2018') } } ).length).toBe(3);
        // debugger;
        // expect(cube.query().length).toBe(15);
        // debugger;
        // expect(cube.query({ product: 'TV' }).length).toBe(5);
        // expect(cube.query({ year: '2017' }).length).toBe(4);
        // expect(cube.query({ product: 'mark', year: 'samsung' }).length).toBe(4);
    })
});
