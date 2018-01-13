import Cube from '../src/cube.js';
import _ from 'lodash';

describe('stand alone', function(){

    it('generation unique entity ID name', () => {
        expect(Cube.genericId('entity')).toBe('entity_id')
    })

    it('generation unique entity ID from exist entities if they have empty list', () => {
        expect(Cube.reduceId([])).toBe(1)
    })

    it('generation unique entity ID from exist entities if they have one or more elements', () => {
        expect(Cube.reduceId([{id: 1}, {id: 3}])).toBe(4)
    })
})