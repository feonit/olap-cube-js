import {Schema, DimensionException} from '../src/Schema.js';
import SchemaDimension from '../src/SchemaDimension.js';
import Cell from '../src/Cell.js';

describe('[ Schema ]', function(){

    it('throws when trying to create bad schema dimension', () => {
        expect(() => {
            new SchemaDimension({});
        }).toThrow();
    });

    describe('[ throws when trying to create bad schema with duplicate names for dimension] ', ()=> {
        const schema = {
            dimension: 'sum',
            keyProps: ['sum'],
            dependency: [
                {
                    dimension: 'currency',
                    keyProps: ['local'],
                },{
                    dimension: 'currency',
                    keyProps: ['common'],
                }
            ]
        };

        it('should throw', () => {
            expect(() => {
                try {
                    new Schema(schema);
                } catch (error) {
                    throw error;
                }
            }).toThrow();
        });

        it('should specific throw', () => {
            let catchError;
            try {
                new Schema(schema);
            } catch (error) {
                catchError = error;
            }
            expect(catchError instanceof Error).toBe(true);
            expect(catchError instanceof DimensionException).toBe(true);
        });
    });


    it('throws when trying to create bad schema from factTable without id param', () => {
        expect(() => {
            try {
                new Cell({});
            } catch (error){
                throw error;
            }
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

    it ('should contain multi hierarchy', ()=>{
        const schema = new Schema({
            dimension: 'sale',
            keyProps: ['income'],
            dependency: [
                {
                    dimension: 'product',
                    keyProps: ['productName'],
                    dependency: [
                        {
                            dimension: 'category',
                            keyProps: ['categoryID']
                        },
                        {
                            dimension: 'companySupplier',
                            keyProps: 'companyName'
                        }
                    ]
                },
                {
                    dimension: 'date',
                    keyProps: ['date'],
                    dependency: [
                        {
                            dimension: 'calendar',
                            keyProps: ['calendarYear']
                        },
                        {
                            dimension: 'financial',
                            keyProps: ['financialYear']
                        }
                    ]
                }
            ]
        });

        const res = schema.getNames();
        expect(
            res.length === 7
            && res.indexOf('sale') > -1
            && res.indexOf('product') > -1
            && res.indexOf('category') > -1
            && res.indexOf('companySupplier') > -1
            && res.indexOf('date') > -1
            && res.indexOf('calendar') > -1
            && res.indexOf('financial') > -1
        ).toBe(true);

    })
});