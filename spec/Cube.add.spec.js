import Cube from '../src/Cube.js';
import {isEqual, jsonParseStringify} from './helpers/helpers.js'
import { NotCompletelySpaceException, AddDimensionOfCellException } from '../src/errors.js';

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

        it('should throw whet defined not completely space for added member level 1', ()=>{
            expect(() => {
                cube.addMember('xxx', { xxx: 1 } )
            }).toThrow();
        });

        it('should throw whet defined not completely space for added member level 2', ()=>{
            expect(() => {
                cube.addMember('xx', { xx: 1 } )
            }).toThrow();
        });

        it('should throw specified error whet defined not completely space for added member', ()=>{
            let err;
            try {
                cube.addMember('xxx', { xxx: 1 } )
            } catch (error) {
                err = error;
            }
            expect( err instanceof NotCompletelySpaceException).toBe(true);
        });

        it('should throw whet was try to add a second member to the dimension for the cell ', ()=>{
            expect(() => {
                cube.addMember('xxxx', { xxxx: 1 } )
            }).toThrow();
        });

        it('should throw specified error whet was try to add a second member to the dimension for the cell ', ()=>{
            let err;
            try {
                cube.addMember('xxxx', { xxxx: 1 } )
            } catch (error) {
                err = error;
            }
            expect( err instanceof AddDimensionOfCellException).toBe(true);
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

            const factTable = [
                { id: 1, product: 'telephone', category: 'electronic', money: '5$', year: '2017', month: 'january', day: 1},
                { id: 2, product: 'tv', category: 'electronic', money: '50$', year: '2017', month: 'january', day: 2 },
                { id: 3, product: 'telephone', category: 'electronic', money: '10$', year: '2018', month: 'january', day: 2 },
                { id: 4, product: 'telephone', category: 'electronic', money: '15$', year: '2018', month: 'january', day: 2 }
            ];

            cube = new Cube(factTable, schema);
        });

        it ('level 1', ()=>{
            let debug;

            expect(debug=cube.countOfCardinality()).toBe(6);

            expect(debug=cube.query('day').length).toBe(3);
            expect(debug=cube.query('money').length).toBe(4);

            cube.addMember('day', { day : 3 }, { month: { id: 1 }, year: { id: 1 } } );

            expect(debug=cube.countOfCardinality()).toBe(8);
            expect(debug=cube.query('day').length).toBe(4);
            expect(debug=cube.query('money').length).toBe(6);
        });

        it ('level 2', ()=>{
            let debug;

            expect(debug=cube.countOfCardinality()).toBe(6);
            expect(debug=cube.query('month').length).toBe(2);
            expect(debug=cube.query('day').length).toBe(3);
            expect(debug=cube.query('money').length).toBe(4);

            cube.addMember('month', { month : 'april' }, { year: { id: 1 } } );

            expect(debug=cube.countOfCardinality()).toBe(8);
            expect(debug=cube.query('month').length).toBe(3);
            expect(debug=cube.query('day').length).toBe(4);
            expect(debug=cube.query('money').length).toBe(6);
        });

        it ('level 3', ()=>{
            let debug;

            expect(debug=cube.countOfCardinality()).toBe(6);
            expect(debug=cube.query('year').length).toBe(2);
            expect(debug=cube.query('month').length).toBe(2);
            expect(debug=cube.query('day').length).toBe(3);
            expect(debug=cube.query('money').length).toBe(4);

            cube.addMember('year', { year : '2019' } );

            expect(debug=cube.countOfCardinality()).toBe(8);
            expect(debug=cube.query('year').length).toBe(3);
            expect(debug=cube.query('month').length).toBe(3);
            expect(debug=cube.query('day').length).toBe(4);
            expect(debug=cube.query('money').length).toBe(6);
        });

    })


});