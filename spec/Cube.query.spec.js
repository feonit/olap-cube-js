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
});
