import Schema from '../src/Schema.js';
import SchemaMeasurement from '../src/SchemaMeasurement.js';
import NormalizedData from '../src/NormalizedData.js';

describe('[ Schema work ]', function(){

    it('throws when trying to create bad schema', () => {
        expect(() => {
            new SchemaMeasurement({});
        }).toThrow();
    });

    it('throws when trying to create bad schema from arrayData without id param', () => {
        expect(() => {
            new NormalizedData({});
        }).toThrow();
    });


    it('should find by name', () => {
        const mesurement = { name: 'boo', keyProps: ['prop'] };
        const schema = new Schema(mesurement);
        const res = schema.getByName('boo');
        expect(res.name).toBe('boo');
    });

    it('should find dependent measurement', () => {
        const schema = new Schema({
            name: 'regions',
            keyProps: ['regionPropName'],
            dependency: [
                {
                    name: 'cities',
                    keyProps: ['cityPropName', 'otherCityPropName']
                },
                {
                    name: 'data',
                    keyProps: ['data']
                }
            ]
        });
        const res = schema.getByDependency('cities');
        expect(res && res.name === 'regions').toBe(true);
    });

    it('should return all name of measurements', () => {
        const schema = new Schema({
            name: 'regions',
            keyProps: ['regionPropName'],
            dependency: [
                {
                    name: 'cities',
                    keyProps: ['cityPropName', 'otherCityPropName'],
                    dependency: [{
                        name: 'countries',
                        keyProps: ['countryPropName']
                    }]
                },
                {
                    name: 'data',
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