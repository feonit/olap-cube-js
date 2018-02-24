import Cube from '../src/Cube.js';

function jsonParseStringify(data){
    return JSON.parse(JSON.stringify(data))
}
describe('[ Cube Edit ][ add ]', () => {
    it('should add member to cube data', () => {
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

        let cube = new Cube(factTable, schema);

        const ealon = {
            "cellTable":[
                {"id":1,"coordinateY_id":1,"coordinateX_id":1,"valueOfXY_id":1},
                {"id":2,"coordinateY_id":2,"coordinateX_id":1,"valueOfXY_id":2},
                {"id":3,"coordinateY_id":1,"coordinateX_id":2,"valueOfXY_id":3},
                {"id":4,"coordinateY_id":2,"coordinateX_id":2,"valueOfXY_id":4}],
            "space":{
                "coordinateY":[
                    {"id":1,"y":0},
                    {"id":2,"y":1}
                ],
                "coordinateX":[
                    {"id":1,"x":0},
                    {"id":2,"x":1}
                ],
                "valueOfXY":[
                    {"id":1,"value":10},
                    {"id":2,"value":100},
                    {"id":3,"value":1000},
                    {"id":4,"value":10000}
                ]
            }
        };

        let isEqual = _.isEqual( jsonParseStringify(cube), ealon);
        expect(isEqual).toBe(true);

        cube.addMember('coordinateX', { x: 2 });

        cube.cellTable[4].id = null;
        cube.cellTable[5].id = null;

        const ealonAfterAdding = {
            "cellTable":[
                {"id":1,"coordinateY_id":1,"coordinateX_id":1,"valueOfXY_id":1},
                {"id":2,"coordinateY_id":2,"coordinateX_id":1,"valueOfXY_id":2},
                {"id":3,"coordinateY_id":1,"coordinateX_id":2,"valueOfXY_id":3},
                {"id":4,"coordinateY_id":2,"coordinateX_id":2,"valueOfXY_id":4},
                {"id":null,"coordinateY_id":1,"coordinateX_id":3,"valueOfXY_id":5},
                {"id":null,"coordinateY_id":2,"coordinateX_id":3,"valueOfXY_id":6},
            ],
            "space":{
                "coordinateY":[
                    {"id":1,"y":0},
                    {"id":2,"y":1}
                ],
                "coordinateX":[
                    {"id":1,"x":0},
                    {"id":2,"x":1},
                    {"id":3,"x":2}
                ],
                "valueOfXY":[
                    {"id":1,"value":10},
                    {"id":2,"value":100},
                    {"id":3,"value":1000},
                    {"id":4,"value":10000},
                    {"id":5,"value":null},
                    {"id":6,"value":null}
                ]
            }
        };

        isEqual = _.isEqual( jsonParseStringify(cube), ealonAfterAdding);
        expect(isEqual).toBe(true);
    });

    it('should add member to cube data with dependency columns', () => {

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
            { id: 3, product: 'telephone', money: '10$', year: '2018', month: 'january', day: '2' }
        ];

        let cube = new Cube(factTable, schema);
        //
        expect(cube.space.getDimensionTable('product').length).toBe(2);
        expect(cube.space.getDimensionTable('money').length).toBe(3);

        cube.addMember('product', { product : 'mp3' } );

        expect(cube.space.getDimensionTable('product').length).toBe(3);
        expect(cube.space.getDimensionTable('money').length).toBe(4);

        //
        cube = new Cube(factTable, schema);

        expect(cube.space.getDimensionTable('year').length).toBe(1);
        expect(cube.space.getDimensionTable('money').length).toBe(3);

        cube.addMember('year', { year : '2019' } );

        expect(cube.space.getDimensionTable('year').length).toBe(2);
        expect(cube.space.getDimensionTable('money').length).toBe(5);

        //
        cube = new Cube(factTable, schema);

        expect(cube.space.getDimensionTable('month').length).toBe(1);
        expect(cube.space.getDimensionTable('money').length).toBe(3);

        cube.addMember('month', { month : 'april' } );

        expect(cube.space.getDimensionTable('month').length).toBe(2);
        expect(cube.space.getDimensionTable('money').length).toBe(5);

        //
        cube = new Cube(factTable, schema);

        expect(cube.space.getDimensionTable('month').length).toBe(1);
        expect(cube.space.getDimensionTable('money').length).toBe(3);

        cube.addMember('month', { month : 'april' } );

        expect(cube.space.getDimensionTable('month').length).toBe(2);
        expect(cube.space.getDimensionTable('money').length).toBe(5);
    })


});