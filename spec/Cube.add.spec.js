import Cube from '../src/Cube.js';
import {isEqual, jsonParseStringify} from './helpers/helpers.js'
import { NotCompletelySpaceException, AddDimensionOfCellException, CantAddMemberRollupException } from '../src/errors.js';

describe('[ Cube Edit ][ add ]', () => {

    describe('[ validation data to add ]', () => {

        let cube;

        beforeEach(()=>{

            const schema = {
                dimension: 'xxxx',
                keyProps: ['xxxx'],
                dependency: [
                    {
                        dimension: 'xxx',
                        keyProps: ['xxx'],
                        dependency: [
                            {
                                dimension: 'xx',
                                keyProps: ['xx'],
                                dependency: [
                                    {
                                        dimension: 'x',
                                        keyProps: ['x'],
                                    }
                                ]
                            }
                        ]
                    },{
                        dimension: 'z',
                        keyProps: ['z']
                    }
                ]
            };

            const factTable = [
                { id: 1, x: 0, xx: 0, xxx: 0 , xxxx: 0, z: 0 },
            ];

            cube = new Cube(factTable, schema);

        });

        it('should throw when defined not completely space for added member level 1', ()=>{
            expect(() => {
                cube.addMember('xxx', { xxx: 1 } )
            }).toThrow();
        });

        it('should throw when defined not completely space for added member level 2', ()=>{
            expect(() => {
                cube.addMember('xx', { xx: 1 } )
            }).toThrow();
        });

        it('should throw specified error when defined not completely space for added member', ()=>{
            let err;
            try {
                cube.addMember('xxx', { xxx: 1 } )
            } catch (error) {
                err = error;
            }
            expect( err instanceof NotCompletelySpaceException).toBe(true);
        });

        it('should throw when was try to add a second member to the dimension for the cell ', ()=>{
            expect(() => {
                cube.addMember('xxxx', { xxxx: 1 } )
            }).toThrow();
        });

        it('should throw specified error when was try to add a second member to the dimension for the cell ', ()=>{
            let err;
            try {
                cube.addMember('xxxx', { xxxx: 1 } )
            } catch (error) {
                err = error;
            }
            expect( err instanceof AddDimensionOfCellException).toBe(true);
        });

        it('should throw when was try add member with not existed rollup member', ()=>{
            expect(() => {
                cube.addMember('xx', { xx: 1 }, { x: { id: 1000 } } )
            }).toThrow();
        });

        it('should throw specified error when was try add member with not existed rollup member', ()=>{
            let err;
            try {
                cube.addMember('xx', { xx: 1 }, { x: { id: 1000 } } )
            } catch (error) {
                err = error;
            }
            expect( err instanceof CantAddMemberRollupException).toBe(true);
        });

    });

    describe('[should add member to cube data]', () => {

        let cube;

        beforeEach(()=>{
            const factTable = [
                {id: 1, x: 0, y: 0, value: 10 },
                {id: 2, x: 0, y: 1, value: 100 },
                {id: 3, x: 1, y: 0, value: 1000 },
                {id: 4, x: 1, y: 1, value: 10000 },
            ];

            const schema = {
                dimension: 'valueOfXY',
                keyProps: ['value'],
                dependency: [
                    {
                        dimension: 'coordinateX',
                        keyProps: ['x']
                    },{
                        dimension: 'coordinateY',
                        keyProps: ['y']
                    }
                ]
            };

            cube = new Cube(factTable, schema);
        });

        it('target dimension must be changed', ()=>{
            expect(
                isEqual( jsonParseStringify(cube.query('coordinateX')), [
                    { id: 1, x: 0 },
                    { id: 2, x: 1 }
                ])
            ).toBe(true);

            cube.addMember('coordinateX', { x: 2 });

            expect(
                isEqual( jsonParseStringify(cube.query('coordinateX')), [
                    { id: 1, x: 0 },
                    { id: 2, x: 1 },
                    { id: 3, x: 2 }
                ])
            ).toBe(true);
        });

        it('other dimensions must be not changed', ()=>{
            expect(
                isEqual( jsonParseStringify(cube.query('coordinateY')), [
                    { id: 1, y: 0 },
                    { id: 2, y: 1 }
                ])
            ).toBe(true);

            cube.addMember('coordinateX', { x: 2 });

            expect(
                isEqual( jsonParseStringify(cube.query('coordinateY')), [
                    { id: 1, y: 0 },
                    { id: 2, y: 1 }
                ])
            ).toBe(true);
        });

        it('fact table must be changed', ()=>{
            expect(
                isEqual( jsonParseStringify(cube.query()), [
                    { id: 1, x: 0, y: 0, value: 10 },
                    { id: 2, x: 0, y: 1, value: 100 },
                    { id: 3, x: 1, y: 0, value: 1000 },
                    { id: 4, x: 1, y: 1, value: 10000 },
                ])
            ).toBe(true);

            cube.addMember('coordinateX', { x: 2 });

            expect(
                isEqual( jsonParseStringify(cube.query()), [
                    { id: 1, x: 0, y: 0, value: 10 },
                    { id: 2, x: 0, y: 1, value: 100 },
                    { id: 3, x: 1, y: 0, value: 1000 },
                    { id: 4, x: 1, y: 1, value: 10000 },
                           { x: 2, y: 0, value: null },
                           { x: 2, y: 1, value: null },
                ])
            ).toBe(true);
        });

        it('measure data must be changed', ()=>{
            expect(
                isEqual( jsonParseStringify(cube.query('valueOfXY')), [
                    { id: 1, value: 10 },
                    { id: 2, value: 100 },
                    { id: 3, value: 1000 },
                    { id: 4, value: 10000 }
                ])
            ).toBe(true);

            cube.addMember('coordinateX', { x: 2 });

            expect(
                isEqual( jsonParseStringify(cube.query('valueOfXY')), [
                    { id: 1, value: 10 },
                    { id: 2, value: 100 },
                    { id: 3, value: 1000 },
                    { id: 4, value: 10000 },
                    { id: 5, value: null },
                    { id: 6, value: null },
                ])
            ).toBe(true);
        });

    });

    describe('should add member to cube data with dependency columns', () => {

        let cube;
        let debug;
        let factTable;

        beforeEach(()=>{
            const schema = {
                dimension: 'money',
                keyProps: ['money'],
                dependency: [
                    {
                        dimension: 'product',
                        keyProps: ['product'],
                        // todo fix
                        // dependency: [
                        //     {
                        //         dimension: 'category',
                        //         keyProps: ['category']
                        //     }
                        // ]
                    },
                    {
                        dimension: 'day',
                        keyProps: ['day'],
                        dependency: [
                            {
                                dimension: 'month',
                                keyProps: ['month'],
                                dependency: [
                                    {
                                        dimension: 'year',
                                        keyProps: ['year']
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            factTable = [
                { id: 1, product: 'telephone', category: 'electronic', money: '5$', year: '2017', month: 'january', day: 1},
                { id: 2, product: 'tv', category: 'electronic', money: '50$', year: '2017', month: 'january', day: 2 },
                { id: 3, product: 'telephone', category: 'electronic', money: '10$', year: '2018', month: 'january', day: 2 },
                { id: 4, product: 'telephone', category: 'electronic', money: '15$', year: '2018', month: 'january', day: 3 }
            ];

            cube = new Cube(factTable, schema);
        });

        const year = [
            { id: 1, year: '2017' },
            { id: 2, year: '2018' }
        ];

        const month = [
            { id: 1, month: 'january' },
            { id: 2, month: 'january' }
        ];

        const day = [
            { id: 1, day: 1 },
            { id: 2, day: 2 },
            { id: 3, day: 2 },
            { id: 4, day: 3 },
        ];

        const money = [
            { id: 1, money: '5$' },
            { id: 2, money: '10$' },
            { id: 3, money: '15$' },
            { id: 4, money: '50$' },
        ];

        const product = [
            { id: 1, product: 'telephone' },
            { id: 2, product: 'tv' }
        ];

        it ('level 1, where node has not hierarchy', () => {
            cube.addMember('product', { product: 'clock' } );

            // product
            expect(debug=isEqual( jsonParseStringify(cube.query('product')), product.concat([
                { id: 3, product: 'clock' }
            ]))).toBe(true);

            // day
            expect(debug=isEqual( jsonParseStringify(cube.query('day')), day.concat([

            ]))).toBe(true);

            // month
            expect(debug=isEqual( jsonParseStringify(cube.query('month')), month.concat([

            ]))).toBe(true);

            // year
            expect(debug=isEqual( jsonParseStringify(cube.query('year')), year.concat([

            ]))).toBe(true);

            // money
            expect(debug=isEqual( jsonParseStringify(cube.query('money')), money.concat([
                { id: 5, money: null },
                { id: 6, money: null },
                { id: 7, money: null },
                { id: 8, money: null },
            ]))).toBe(true);

            // fact table
            expect(debug=isEqual( jsonParseStringify(cube.query()), factTable.concat([
                { product: 'clock', money: null, year: '2017', month: 'january', day: 1 },
                { product: 'clock', money: null, year: '2017', month: 'january', day: 2 },
                { product: 'clock', money: null, year: '2018', month: 'january', day: 2 },
                { product: 'clock', money: null, year: '2018', month: 'january', day: 3 }
            ]))).toBe(true);
        });

        it ('level 1', ()=>{

            cube.addMember('day', { day : 4 }, { month: { id: 1 }, year: { id: 1 } } );

            // day
            expect(debug=isEqual( jsonParseStringify(cube.query('day')), day.concat([
                { id: 5, day: 4 }
            ]))).toBe(true);

            // month
            expect(debug=isEqual( jsonParseStringify(cube.query('month')), month.concat([

            ]))).toBe(true);

            // year
            expect(debug=isEqual( jsonParseStringify(cube.query('year')), year.concat([

            ]))).toBe(true);

            // money
            expect(debug=isEqual( jsonParseStringify(cube.query('money')), money.concat([
                { id: 5, money: null },
                { id: 6, money: null }
            ]))).toBe(true);

            // fact table
            expect(debug=isEqual( jsonParseStringify(cube.query()), factTable.concat([
                { product: 'telephone', money: null, year: '2017', month: 'january', day: 4 },
                { product: 'tv', money: null, year: '2017', month: 'january', day: 4 }
            ]))).toBe(true);
        });

        it ('level 2', ()=>{
            cube.addMember('month', { month : 'april' }, { year: { id: 1 } } );

            // day
            expect(debug=isEqual( jsonParseStringify(cube.query('day')), day.concat([
                { id: 5, day: null }
            ]))).toBe(true);

            // month
            expect( isEqual( jsonParseStringify(cube.query('month')), month.concat([
                { id: 3, month: 'april' }
            ]))).toBe(true);

            // year
            expect( isEqual( jsonParseStringify(cube.query('year')), year.concat([

            ]))).toBe(true);

            // money
            expect(debug=isEqual( jsonParseStringify(cube.query('money')), money.concat([
                { id: 5, money: null },
                { id: 6, money: null }
            ]))).toBe(true);

            // fact table
            expect(isEqual( jsonParseStringify(cube.query()), factTable.concat([
                { product: 'telephone', money: null, year: '2017', month: 'april', day: null },
                { product: 'tv', money: null, year: '2017', month: 'april', day: null }
            ]))).toBe(true);

        });

        it ('level 3', ()=>{
            cube.addMember('year', { year : '2019' } );

            // day
            expect(debug=isEqual( jsonParseStringify(cube.query('day')), day.concat([
                { id: 5, day: null }
            ]))).toBe(true);

            // month
            expect(debug=isEqual( jsonParseStringify(cube.query('month')), month.concat([
                { id: 3, month: null }
            ]))).toBe(true);

            // year
            expect(debug=isEqual( jsonParseStringify(cube.query('year')), year.concat([
                { id: 3, year: '2019' }
            ]))).toBe(true);

            // money
            expect(debug=isEqual( jsonParseStringify(cube.query('money')), money.concat([
                { id: 5, money: null },
                { id: 6, money: null }
            ]))).toBe(true);

            // fact table
            expect(isEqual( jsonParseStringify(cube.query()), factTable.concat([
                { product: 'telephone', money: null, year: '2019', month: null, day: null },
                { product: 'tv', money: null, year: '2019', month: null, day: null }
            ]))).toBe(true);
        });
    })
});