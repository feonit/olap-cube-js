import Cube from '../src/Cube.js';

describe('[ Cube Static ]', function(){

    it('generation unique entity ID from exist entities if they have empty list', () => {
        expect(Cube.reduceId([])).toBe(1)
    });

    it('generation unique entity ID from exist entities if they have one or more elements', () => {
        expect(Cube.reduceId([{id: 1}, {id: 3}])).toBe(4)
    });

    describe('[ API ]',()=>{
        let cube;

        beforeEach(()=>{
            cube = new Cube([{id: 1, name: 'me'}], {
                dimension: 'name',
                keyProps: ['name']
            });
        });

        it('should define query', ()=> {
            expect(cube.query).toBeDefined();
        });

        it('should define getCardinalityCount', ()=> {
            expect(cube.getCardinalityCount).toBeDefined();
        });

        it('should define getEmptyCount', ()=> {
            expect(cube.getEmptyCount).toBeDefined();
        });

        it('should define getDataArray', ()=> {
            expect(cube.getDataArray).toBeDefined();
        });

        it('should define addMember', ()=> {
            expect(cube.addMember).toBeDefined();
        });

        it('should define removeMember', ()=> {
            expect(cube.removeMember).toBeDefined();
        });

        it('should define fill', ()=> {
            expect(cube.fill).toBeDefined();
        });
    });

    describe('[ analytical tools ]', ()=>{
        let cube;

        beforeEach(()=>{
            const factTable = [
                { id: 1, x: 0, y: 0, z: 0 },
                { id: 2, x: 0, y: 0, z: 1 },
                { id: 3, x: 0, y: 1, z: 0 },
                { id: 4, x: 1, y: 0, z: 0 },
                { id: 5, x: 0, y: 1, z: 1 },
                // { id: 6, x: 1, y: 1, z: 0 },
                // { id: 7, x: 1, y: 0, z: 1 },
                // { id: 8, x: 1, y: 1, z: 1 },
            ];

            const schema = {
                dimension: 'xyz',
                keyProps: ['xyz'],
                dependency: [
                    {
                        dimension: 'x',
                        keyProps: ['x'],
                    },
                    {
                        dimension: 'y',
                        keyProps: ['y'],
                    },
                    {
                        dimension: 'z',
                        keyProps: ['z'],
                    }
                ]
            };
            cube = new Cube(factTable, schema);
        });

        it('should return cardinality count', ()=>{
            const result = cube.getCardinalityCount();
            expect(result).toBe(8)
        });

        it('should return empty count', ()=>{
            const result = cube.getEmptyCount();
            expect(result).toBe(3)
        });
    })

});