import {ENTITY_ID} from './const.js';

/**
 * Cell. A piece of data obtained by defining one element
 * in each dimension of a multidimensional array.
 * The cells of the hypercube can be empty or full.
 * */
export default class Cell {
    constructor(data){
        Object.assign(this, data)
        if (!this[ENTITY_ID]){
            throw "data must have id parameter"
        }
    }
}