import Schema from '../src/Schema.js';
import SchemaDimension from '../src/SchemaDimension.js';
import Cell from '../src/Cell.js';

describe('[ Schema ]', function(){

    it('throws when trying to create bad schema', () => {
        expect(() => {
            new SchemaDimension({});
        }).toThrow();
    });

    it('throws when trying to create bad schema from factTable without id param', () => {
        expect(() => {
            new Cell({});
        }).toThrow();
    });

    it('should find dependent measurement', () => {
        const schema = new Schema({
            dimension: 'regions',
            keyProps: ['regionPropName'],
            dependency: [
                {
                    dimension: 'cities',
                    keyProps: ['cityPropName', 'otherCityPropName']
                },
                {
                    dimension: 'data',
                    keyProps: ['data']
                }
            ]
        });
        const res = schema.getByDependency('cities');
        expect(res && res.dimension === 'regions').toBe(true);
    });

    it('should return all dimensions', () => {
        const schema = new Schema({
            dimension: 'regions',
            keyProps: ['regionPropName'],
            dependency: [
                {
                    dimension: 'cities',
                    keyProps: ['cityPropName', 'otherCityPropName'],
                    dependency: [{
                        dimension: 'countries',
                        keyProps: ['countryPropName']
                    }]
                },
                {
                    dimension: 'data',
                    keyProps: ['data']
                }
            ]
        });
        const res = schema.getNames();
        expect(
            res.length === 4
            && res.indexOf('regions') > -1
            && res.indexOf('cities') > -1
            && res.indexOf('countries') > -1
            && res.indexOf('data') > -1
        ).toBe(true);
    });
});