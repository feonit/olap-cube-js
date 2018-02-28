import Cube from '../src/Cube.js';
import {isEqual, jsonParseStringify} from './helpers/helpers.js'


describe('[ Cube Edit ][ add ]', () => {

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
                        keyProps: ['product']
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
                { id: 1, product: 'telephone', money: '5$', year: '2018', month: 'january', day: '1'},
                { id: 2, product: 'tv', money: '50$', year: '2018', month: 'january', day: '2' },
                { id: 3, product: 'telephone', money: '10$', year: '2018', month: 'january', day: '2' },
                { id: 4, product: 'telephone', money: '15$', year: '2018', month: 'january', day: '2' }
            ];

            cube = new Cube(factTable, schema);
        });

        it ('level 1', ()=>{

            expect(debug=cube.query('day').length).toBe(2);
            expect(debug=cube.query('money').length).toBe(4);

            cube.addMember('day', { day : '3' }, { month: { id: 1}, year: { id: 1 } } );

            expect(debug=cube.query('day').length).toBe(3);
            expect(debug=cube.query('money').length).toBe(6);
        });

        it ('level 2', ()=>{
            expect(debug=cube.query('month').length).toBe(1);
            expect(debug=cube.query('money').length).toBe(4);

            cube.addMember('month', { month : 'april' }, { year: { id: 1 } } );

            expect(debug=cube.query('month').length).toBe(2);
            expect(debug=cube.query('money').length).toBe(6);
        });

        it ('level 3', ()=>{
            expect(cube.query('year').length).toBe(1);
            expect(cube.query('money').length).toBe(4);

            cube.addMember('year', { year : '2019' } );

            expect(cube.query('year').length).toBe(2);
            expect(cube.query('money').length).toBe(6);
        });

    })


});