import Cube from '../src/cube.js';

describe('stand alone', function(){

    it('generation unique entity ID name', () => {
        expect(Cube.prototype.genericId('entity')).toBe('entity_id')
    })

    it('generation unique entity ID from exist entities if they have empty list', () => {
        expect(Cube.prototype.reduceId([])).toBe(1)
    })

    it('generation unique entity ID from exist entities if they have one or more elements', () => {
        expect(Cube.prototype.reduceId([{id: 1}, {id: 3}])).toBe(4)
    })
})