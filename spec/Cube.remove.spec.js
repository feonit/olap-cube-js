import Cube from '../src/Cube.js';

function jsonParseStringify(data){
    return JSON.parse(JSON.stringify(data))
}
describe('[ Cube Edit ][ remove ]', () => {
    const factTable = [
        { id: 1, xxx: 0.49, xx: 0.5, x: 0, y: 0, z: 0, is: true },
        { id: 2, xxx: 1.18, xx: 1.2, x: 1, y: 0, z: 1, is: true },
        { id: 3, xxx: 1.12, xx: 1.1, x: 1, y: 1, z: 0, is: true },
    ];
    const schema = {
        dimension: 'is',
        keyProps: ['is'],
        dependency: [
            {
                dimension: 'xxx',
                keyProps: ['xxx'],
                dependency: [{
                    dimension: 'xx',
                    keyProps: ['xx'],
                    dependency: [{
                        dimension: 'x',
                        keyProps: ['x']
                    }]
                }]
            },
            {
                dimension: 'y',
                keyProps: ['y']
            },
            {
                dimension: 'z',
                keyProps: ['z']
            }
        ]
    };
    let debug;
    it('it should remove member and change measure length', () => {
        let cube = new Cube(factTable, schema);
        expect((debug=cube.query('is')).length).toBe(3);
        expect((debug=cube.query('z')).length).toBe(2);

        const memberForDelete = cube.query('z')[0];
        expect(_.isEqual(jsonParseStringify(memberForDelete), {id: 1, z: 0} ));
        cube.removeMember('z', memberForDelete);
        expect((debug=cube.query('z')).length).toBe(1);
        expect((debug=cube.query('is')).length).toBe(1);
    });
    it('it should remove target member and his own dependencies', () => {
        let cube = new Cube(factTable, schema);
        expect((debug=cube.query('is')).length).toBe(3);
        expect((debug=cube.query('x')).length).toBe(2);
        expect((debug=cube.query('xx')).length).toBe(3);
        expect((debug=cube.query('xxx')).length).toBe(3);
        const memberForDelete = cube.query('x')[1];
        expect(_.isEqual(jsonParseStringify(memberForDelete), {id: 1, x: 1} ));
        expect(memberForDelete).toBeDefined();
        cube.removeMember('x', memberForDelete);
        expect((debug=cube.query('is')).length).toBe(1);
        expect((debug=cube.query('x')).length).toBe(1);
        expect((debug=cube.query('xx')).length).toBe(1);
        expect((debug=cube.query('xxx')).length).toBe(1);
    })
})