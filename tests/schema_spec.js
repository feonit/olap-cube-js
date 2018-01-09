import Schema from '../src/Schema.js';
import SchemaMeasurement from '../src/SchemaMeasurement.js';

describe('test schema', function(){

    it('throws when trying to create bad schema', () => {
        expect(() => {
            new Measurement({});
        }).toThrow();
    });

    it('should find Measurement by name', () => {
        const mesurement = { name: 'boo', keyProps: ['prop'] };
        const schema = new Schema([mesurement]);
        const res = schema.getMeasurement('boo');
        expect(res.name).toBe('boo');
    });

})