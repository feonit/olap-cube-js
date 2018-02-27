import Cube from '../src/Cube.js';
import {isEqual, jsonParseStringify} from './helpers.js'

describe('[ Cube Edit ][ fill ]', function(){
    const factTable = [
        { id: 1, x: 0, y: 0, z: 0,is: true },
        { id: 2, x: 0, y: 0, z: 1,is: true },
        { id: 3, x: 0, y: 1, z: 0,is: true },
        { id: 4, x: 0, y: 1, z: 1,is: true },
        { id: 5, x: 1, y: 0, z: 0,is: true },
    ];

    const schema = {
        dimension: 'is',
        keyProps: ['is'],
        dependency: [
            { dimension: 'x', keyProps: ['x']},
            { dimension: 'y', keyProps: ['y']},
            { dimension: 'z', keyProps: ['z']}
        ]
    };

    it('should normalize count of measure for non-normalized data', () => {
        let cube = new Cube(factTable, schema);
        expect(cube.space.getMemberList('is').length).toBe(5);
        cube.fill({ is: false });
        expect(cube.space.getMemberList('is').length).toBe(8);
    });

    it('should normalize count of measure for non-normalized data with default props', () => {
        let cube = new Cube(factTable, schema);
        expect(cube.space.getMemberList('is')[5]).not.toBeDefined();
        expect(cube.space.getMemberList('is')[6]).not.toBeDefined();
        expect(cube.space.getMemberList('is')[7]).not.toBeDefined();
        cube.fill({ is: false });
        expect(cube.space.getMemberList('is')[5]).toBeDefined();
        expect(cube.space.getMemberList('is')[6]).toBeDefined();
        expect(cube.space.getMemberList('is')[7]).toBeDefined();
        const factTableExpectedAfter = factTable.concat([
            { x: 1, y: 0, z: 1,is: false },
            { x: 1, y: 1, z: 0,is: false },
            { x: 1, y: 1, z: 1,is: false }
        ]);
        expect(isEqual(jsonParseStringify(cube.getDataArray()), factTableExpectedAfter )).toBe(true);
    });

    it('should pass for example doc', () => {
        const schema = {
            dimension: 'xy',
            keyProps: ['xy'],
            dependency: [
                {
                    dimension: 'x',
                    keyProps: ['x']
                },{
                    dimension: 'y',
                    keyProps: ['y']
                }
            ]
        }
        const factTable = [
            { id: 1, x: 0, y: 1, xy: true },
            { id: 2, x: 1, y: 0, xy: true }
        ]
        const cube = new Cube(factTable, schema)
        cube.fill({ xy: false })

        expect(isEqual(jsonParseStringify(cube.getDataArray()), [
            { id: 1, x: 0, y: 1, xy: true },
            { id: 2, x: 1, y: 0, xy: true },
            { x: 0, y: 0, xy: false },
            { x: 1, y: 1, xy: false }
        ] )).toBe(true);
    })
});