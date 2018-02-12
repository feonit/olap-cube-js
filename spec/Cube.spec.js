import Cube from '../src/Cube.js';
import '../node_modules/lodash/lodash.js';

function jsonParseStringify(data){
    return JSON.parse(JSON.stringify(data))
}

const etalon = {
    space: {
        cities: [
            { id: 1, city: 'New York' },
            { id: 2, city: 'Paris' },
            { id: 3, city: 'Moscow' },
        ],
        companies: [
            { id: 1, company: 'AirLine' },
            { id: 2, company: 'SkyLine' },
        ],
        age: [
            { id: 1, minAgePlane: '1 year', maxAgePlane: '5 year' },
            { id: 2, minAgePlane: '5 year', maxAgePlane: '10 year' },
        ],
        prices: [
            { id: 1, price: '20$' },
            { id: 2, price: '10$' },
            { id: 3, price: '20$' },
            { id: 4, price: '25$' },
        ],
        counts: [
            { id: 1, planesCount: 1 },
            { id: 2, planesCount: 1 },
            { id: 3, planesCount: 1 },
            { id: 4, planesCount: 1 },
            { id: 5, planesCount: 2 },
        ]
    },
    normalizedDataArray: [
        { id: 1, cities_id: 1, companies_id: 1, age_id: 1, prices_id: 1, counts_id: 1 },
        { id: 2, cities_id: 2, companies_id: 2, age_id: 2, prices_id: 2, counts_id: 3 },
        { id: 3, cities_id: 2, companies_id: 1, age_id: 2, prices_id: 2, counts_id: 2 },
        { id: 4, cities_id: 3, companies_id: 1, age_id: 1, prices_id: 3, counts_id: 4 },
        { id: 5, cities_id: 3, companies_id: 2, age_id: 1, prices_id: 4, counts_id: 5 },
    ]
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

describe('[ Cube Instance ]', function(){
    it('must be equal etalon and expected cube data', () => {
        let cube = new Cube(factTable, schema);
        cube = jsonParseStringify(cube);
        expect(_.isEqual(cube, etalon)).toBe(true)
    });

    it('should return same array of data', () => {
        let cube = new Cube(factTable, schema);
        let data = jsonParseStringify(cube.getDataArray());
        expect(_.isEqual(factTable, data)).toBe(true)
    });

    it('should be equal length of members for specified measurement and result of query request without filter argument', () => {
        let cube = new Cube(factTable, schema);
        expect(cube.query('prices').length).toBe(cube.space.getDimensionTable('prices').length);
        expect(cube.query('counts').length).toBe(cube.space.getDimensionTable('counts').length);
        expect(cube.query('cities').length).toBe(cube.space.getDimensionTable('cities').length);
        expect(cube.query('companies').length).toBe(cube.space.getDimensionTable('companies').length);
        expect(cube.query('age').length).toBe(cube.space.getDimensionTable('age').length);
    });
});

describe('[ Cube Static ]', function(){
    it('generation unique entity ID name', () => {
        expect(Cube.genericId('entity')).toBe('entity_id')
    });

    it('generation unique entity ID from exist entities if they have empty list', () => {
        expect(Cube.reduceId([])).toBe(1)
    });

    it('generation unique entity ID from exist entities if they have one or more elements', () => {
        expect(Cube.reduceId([{id: 1}, {id: 3}])).toBe(4)
    });
});