import Cube from '../src/Cube.js';

describe('[ Cube Static ]', function(){

    it('generation unique entity ID from exist entities if they have empty list', () => {
        expect(Cube.reduceId([])).toBe(1)
    });

    it('generation unique entity ID from exist entities if they have one or more elements', () => {
        expect(Cube.reduceId([{id: 1}, {id: 3}])).toBe(4)
    });
});