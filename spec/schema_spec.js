import Schema from '../src/Schema.js';
import SchemaMeasurement from '../src/SchemaMeasurement.js';
import _ from 'lodash';

describe('test schema', function(){

    it('throws when trying to create bad schema', () => {
        expect(() => {
            new SchemaMeasurement({});
        }).toThrow();
    });

    it('should find by name', () => {
        const mesurement = { name: 'boo', keyProps: ['prop'] };
        const schema = new Schema([mesurement]);
        const res = schema.getByName('boo');
        expect(res.name).toBe('boo');
    });

    it('should find dependent measurement', () => {
        const schema = new Schema([
            { name: 'regions', dependency: 'cities', keyProps: ['propName'] },
            { name: 'cities', keyProps: ['otherPropName'] }
        ]);
        const res = schema.getByDependency('cities');
        expect(res && res.name === 'regions').toBe(true);
    });

    it('should return all name of measurements', () => {
        const schema = new Schema([
            { name: 'regions', dependency: 'cities', keyProps: ['propName'] },
            { name: 'cities', keyProps: ['otherPropName'] },
            { name: 'countries', keyProps: ['else'] },
        ]);
        const res = schema.getNames();
        expect(
            res.length === 3
            && res.indexOf('regions') > -1
            && res.indexOf('cities') > -1
            && res.indexOf('countries') > -1
        ).toBe(true);
    });

})