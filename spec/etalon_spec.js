import Cube from '../src/Cube.js';
import '../node_modules/lodash/lodash.js';
// const Cube = require('../src/Cube.js')
// const _ = require('../node_modules/lodash/lodash.js')

function jsonParseStringify(data){
    return JSON.parse(JSON.stringify(data))
}

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
    normalizedDataArray: [
        { id: 1, cities_id: 1, companies_id: 1, age_id: 1, prices_id: 1, counts_id: 1 },
        { id: 2, cities_id: 2, companies_id: 2, age_id: 2, prices_id: 2, counts_id: 3 },
        { id: 3, cities_id: 2, companies_id: 1, age_id: 2, prices_id: 2, counts_id: 2 },
        { id: 4, cities_id: 3, companies_id: 1, age_id: 1, prices_id: 3, counts_id: 4 },
        { id: 5, cities_id: 3, companies_id: 2, age_id: 1, prices_id: 4, counts_id: 5 },
    ]
}

let factTable = [
    { id: 1, city: 'New York', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
    { id: 2, city: 'Paris', company: 'SkyLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
    { id: 3, city: 'Paris', company: 'AirLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
    { id: 4, city: 'Moscow', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
    { id: 5, city: 'Moscow', company: 'SkyLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 2, price: '25$'},
]

let schema = [
    { name: 'cities', keyProps: ['city']},
    { name: 'companies', keyProps: ['company']},
    { name: 'age', keyProps: ['minAgePlane', 'maxAgePlane']},
    { name: 'prices', keyProps: ['price'], dependency: 'cities' },
    { name: 'counts', keyProps: ['planesCount'], dependency: ['cities', 'companies']},
]

schema = {
    name: 'counts',
    keyProps: ['planesCount'],
    dependency: [
        {
            name: 'prices',
            keyProps: ['price'],
            dependency: [
                {
                    name: 'cities',
                    keyProps: ['city']
                }
            ]
        },
        {
            name: 'companies',
            keyProps: ['company']
        },
        {
            name: 'age',
            keyProps: ['minAgePlane', 'maxAgePlane']
        }
    ]
}

describe('[ Cube work ]', function(){

    it('must be equal etalon and expected cube data', () => {
        let cube = new Cube(factTable, schema);
        cube = jsonParseStringify(cube);
        expect(_.isEqual(cube, etalon)).toBe(true)
    })

    it('should return same array of data', () => {
        let cube = new Cube(factTable, schema);
        let data = jsonParseStringify(cube.getDataArray());
        expect(_.isEqual(factTable, data)).toBe(true)
    })

    it('should return unique data', () => {
        let cube = new Cube(factTable, schema);
        const res = cube.unique('prices');
        const expectation = [
            { id: 1, price: "20$" },
            { id: 2, price: "10$" },
            { id: 3, price: "20$" },
            { id: 4, price: "25$" },
        ];
        expect(_.isEqual( jsonParseStringify(res), expectation)).toBe(true)
    });

    it('should be equal length of members for specified measurement and result of unique request without filter argument', () => {
        let cube = new Cube(factTable, schema);
        expect(cube.unique('prices').length).toBe(cube.space.getDimensionTable('prices').length);
        expect(cube.unique('counts').length).toBe(cube.space.getDimensionTable('counts').length);
        expect(cube.unique('cities').length).toBe(cube.space.getDimensionTable('cities').length);
        expect(cube.unique('companies').length).toBe(cube.space.getDimensionTable('companies').length);
        expect(cube.unique('age').length).toBe(cube.space.getDimensionTable('age').length);
    });

    it('should return unique data with dependency param', () => {
        let cube = new Cube(factTable, schema);
        const expectation = [
            { id: 3, price: "20$" },
            { id: 4, price: "25$" }
        ];
        let city = { id: 3 /** city: "Moscow"*/ }; // other parameters are optional
        let res = cube.unique('prices', { 'cities': city });
        expect(_.isEqual( jsonParseStringify(res), expectation)).toBe(true)
    });

    it('should add member to cube data', () => {
        const factTable = [
            {id: 1, x: 0, y: 0, value: 10 },
            {id: 2, x: 0, y: 1, value: 100 },
            {id: 3, x: 1, y: 0, value: 1000 },
            {id: 4, x: 1, y: 1, value: 10000 },
        ];

        const schema = {
            name: 'valueOfXY',
            keyProps: ['value'],
            dependency: [
                {
                    name: 'coordinateX',
                    keyProps: ['x']
                },{
                    name: 'coordinateY',
                    keyProps: ['y']
                }
            ]
        };

        let cube = new Cube(factTable, schema);

        const ealon = {
            "normalizedDataArray":[
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

        cube.normalizedDataArray[4].id = null;
        cube.normalizedDataArray[5].id = null;

        const ealonAfterAdding = {
            "normalizedDataArray":[
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
    })

    it('should add member to cube data with dependency columns', () => {

        const schema = {
            name: 'money',
            keyProps: ['money'],
            dependency: [
                {
                    name: 'product',
                    keyProps: ['product']
                },
                {
                    name: 'day',
                    keyProps: ['day'],
                    dependency: [
                        {
                            name: 'month',
                            keyProps: ['month'],
                            dependency: [
                                {
                                    name: 'year',
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

    describe('[ Filling ]', function(){
        const factTable = [
            { id: 1, x: 0, y: 0, z: 0,is: true },
            { id: 2, x: 0, y: 0, z: 1,is: true },
            { id: 3, x: 0, y: 1, z: 0,is: true },
            { id: 4, x: 0, y: 1, z: 1,is: true },
            { id: 5, x: 1, y: 0, z: 0,is: true },
        ];

        const schema = {
            name: 'is',
            keyProps: ['is'],
            dependency: [
                { name: 'x', keyProps: ['x']},
                { name: 'y', keyProps: ['y']},
                { name: 'z', keyProps: ['z']}
            ]
        };

        it('should normalize count of measure for non-normalized data', () => {
            let cube = new Cube(factTable, schema);
            expect(cube.space.getDimensionTable('is').length).toBe(5);
            cube.fill({ is: false });
            expect(cube.space.getDimensionTable('is').length).toBe(8);
        });

        it('should normalize count of measure for non-normalized data with default props', () => {
            let cube = new Cube(factTable, schema);
            expect(cube.space.getDimensionTable('is')[5]).not.toBeDefined();
            expect(cube.space.getDimensionTable('is')[6]).not.toBeDefined();
            expect(cube.space.getDimensionTable('is')[7]).not.toBeDefined();
            cube.fill({ is: false });
            expect(cube.space.getDimensionTable('is')[5]).toBeDefined();
            expect(cube.space.getDimensionTable('is')[6]).toBeDefined();
            expect(cube.space.getDimensionTable('is')[7]).toBeDefined();
            const factTableExpectedAfter = factTable.concat([
                { x: 1, y: 0, z: 1,is: false },
                { x: 1, y: 1, z: 0,is: false },
                { x: 1, y: 1, z: 1,is: false }
            ]);
            expect(_.isEqual(jsonParseStringify(cube.getDataArray()), factTableExpectedAfter )).toBe(true);
        });

        it('should pass for example doc', () => {
            const schema = {
                name: 'xy',
                keyProps: ['xy'],
                dependency: [
                    {
                        name: 'x',
                        keyProps: ['x']
                    },{
                        name: 'y',
                        keyProps: ['y']
                    }
                ]
            }
            const dataArray = [
                { id: 1, x: 0, y: 1, xy: true },
                { id: 2, x: 1, y: 0, xy: true }
            ]
            const cube = new Cube(dataArray, schema)
            cube.fill({ xy: false })

            expect(_.isEqual(jsonParseStringify(cube.getDataArray()), [
                { id: 1, x: 0, y: 1, xy: true },
                { id: 2, x: 1, y: 0, xy: true },
                { x: 0, y: 0, xy: false },
                { x: 1, y: 1, xy: false }
            ] )).toBe(true);
        })
    });

    describe('[ Remove ]', () => {
        const factTable = [
            { id: 1, xxx: 0.49, xx: 0.5, x: 0, y: 0, z: 0, is: true },
            { id: 2, xxx: 1.18, xx: 1.2, x: 1, y: 0, z: 1, is: true },
            { id: 3, xxx: 1.12, xx: 1.1, x: 1, y: 1, z: 0, is: true },
        ];
        const schema = {
            name: 'is',
            keyProps: ['is'],
            dependency: [
                {
                    name: 'xxx',
                    keyProps: ['xxx'],
                    dependency: [{
                        name: 'xx',
                        keyProps: ['xx'],
                        dependency: [{
                            name: 'x',
                            keyProps: ['x']
                        }]
                    }]
                },
                {
                    name: 'y',
                    keyProps: ['y']
                },
                {
                    name: 'z',
                    keyProps: ['z']
                }
            ]
        };
        let debug;
        it('it should remove member and change measure length', () => {
            let cube = new Cube(factTable, schema);
            expect((debug=cube.unique('is')).length).toBe(3);
            expect((debug=cube.unique('z')).length).toBe(2);

            const memberForDelete = cube.unique('z')[0];
            expect(_.isEqual(jsonParseStringify(memberForDelete), {id: 1, z: 0} ));
            cube.removeSubModelDepend('z', memberForDelete);
            expect((debug=cube.unique('z')).length).toBe(1);
            expect((debug=cube.unique('is')).length).toBe(1);
        });
        it('it should remove target member and his own dependencies', () => {
            let cube = new Cube(factTable, schema);
            expect((debug=cube.unique('is')).length).toBe(3);
            expect((debug=cube.unique('x')).length).toBe(2);
            expect((debug=cube.unique('xx')).length).toBe(3);
            expect((debug=cube.unique('xxx')).length).toBe(3);
            const memberForDelete = cube.unique('x')[1];
            expect(_.isEqual(jsonParseStringify(memberForDelete), {id: 1, x: 1} ));
            expect(memberForDelete).toBeDefined();
            cube.removeSubModelDepend('x', memberForDelete);
            expect((debug=cube.unique('is')).length).toBe(1);
            expect((debug=cube.unique('x')).length).toBe(1);
            expect((debug=cube.unique('xx')).length).toBe(1);
            expect((debug=cube.unique('xxx')).length).toBe(1);
        })
    })
});