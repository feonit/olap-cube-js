import Star from "../src/Star.js";
import {isEqual, jsonParseStringify} from './helpers.js'

describe('[ Star ]', () => {

    describe('common', ()=>{
        let star;

        beforeEach(()=>{

            let factTable = [
                { id: 1, city: 'New York', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
                { id: 2, city: 'Paris', company: 'SkyLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
                { id: 3, city: 'Paris', company: 'AirLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
                { id: 4, city: 'Moscow', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
                { id: 5, city: 'Moscow', company: 'SkyLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 2, price: '25$'},
            ];

            const dimensionTableList = [
                {
                    dimension: 'age',
                    keyProps: ['minAgePlane', 'maxAgePlane']
                },
                {
                    dimension: 'companies',
                    keyProps: ['company']
                },
                {
                    dimension: 'cities',
                    keyProps: ['city']
                },
                {
                    dimension: 'prices',
                    keyProps: ['price'],
                    dependencyNames: ['cities']
                },
                {
                    dimension: 'counts',
                    keyProps: ['planesCount'],
                    dependencyNames: ['prices', 'companies', 'age']
                }
            ];

            star = new Star(factTable, dimensionTableList);
        });

        it('must be equal etalon and expected cube data', () => {
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
                cellTable: [
                    { id: 1, cities_id: 1, companies_id: 1, age_id: 1, prices_id: 1, counts_id: 1 },
                    { id: 2, cities_id: 2, companies_id: 2, age_id: 2, prices_id: 2, counts_id: 3 },
                    { id: 3, cities_id: 2, companies_id: 1, age_id: 2, prices_id: 2, counts_id: 2 },
                    { id: 4, cities_id: 3, companies_id: 1, age_id: 1, prices_id: 3, counts_id: 4 },
                    { id: 5, cities_id: 3, companies_id: 2, age_id: 1, prices_id: 4, counts_id: 5 },
                ]
            };

            star = jsonParseStringify(star);
            expect(isEqual(star, etalon)).toBe(true)
        });

        it('should return same array of data', () => {
            let factTable = [
                { id: 1, city: 'New York', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
                { id: 2, city: 'Paris', company: 'SkyLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
                { id: 3, city: 'Paris', company: 'AirLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
                { id: 4, city: 'Moscow', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
                { id: 5, city: 'Moscow', company: 'SkyLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 2, price: '25$'},
            ];

            let data = jsonParseStringify(star.denormalize());
            expect(isEqual(factTable, data)).toBe(true)
        });
    });

    it('generation unique entity ID name', () => {
        expect(Star.genericId('entity')).toBe('entity_id')
    });
});