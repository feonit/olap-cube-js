import Cube from '../src/Cube.js';

describe('[ Cube Static ]', function(){

    it('generation unique entity ID from exist entities if they have empty list', () => {
        expect(Cube.reduceId([])).toBe(1)
    });

    it('generation unique entity ID from exist entities if they have one or more elements', () => {
        expect(Cube.reduceId([{id: 1}, {id: 3}])).toBe(4)
    });

    describe('[ API ]',()=>{

        it('should define query', ()=> {
            expect(Cube.prototype.query).toBeDefined();
        });

        it('should define countOfCardinality', ()=> {
            expect(Cube.prototype.countOfCardinality).toBeDefined();
        });

        it('should define countOfEmpty', ()=> {
            expect(Cube.prototype.countOfEmpty).toBeDefined();
        });

        it('should define getDataArray', ()=> {
            expect(Cube.prototype.getDataArray).toBeDefined();
        });

        it('should define addMember', ()=> {
            expect(Cube.prototype.addMember).toBeDefined();
        });

        it('should define removeMember', ()=> {
            expect(Cube.prototype.removeMember).toBeDefined();
        });

        it('should define fill', ()=> {
            expect(Cube.prototype.fill).toBeDefined();
        });

        it('should define countOfResiduals', ()=> {
            expect(Cube.prototype.countOfResiduals).toBeDefined();
        });

        it('should define countOfUnfilled', ()=> {
            expect(Cube.prototype.countOfUnfilled).toBeDefined();
        });
    });

    describe('[ Analytical tools ]', ()=>{
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
            const result = cube.countOfCardinality();
            expect(result).toBe(8)
        });

        it('should return empty count', ()=>{
            const result = cube.countOfEmpty();
            expect(result).toBe(3)
        });

    });

    describe('[ Validation ]', ()=>{

        it('has non normalized fact data over declared dimension tables', ()=>{
            const factTable = [
                { id: 1, x: 0, y: 0, xy: null },
                { id: 2, x: 1, y: 1, xy: null },
                { id: 3, x: 1, y: 1, xy: null }, // <- bad record
            ];

            const schema = {
                dimension: 'xy',
                keyProps: ['xy'],
                dependency: [
                    {
                        dimension: 'x',
                        keyProps: ['x']
                    },
                    {
                        dimension: 'y',
                        keyProps: ['y']
                    }
                ]
            };

            const cube = new Cube(factTable, schema);
            const result = cube.countOfResiduals();
            expect(result === 1).toBe(true);
        })

    });

});