import {ENTITY_ID} from './const.js';

export default class NormalizedData {
    constructor(data, options){
        Object.assign(this, data)
        if (!this[ENTITY_ID]){
            throw "data must have id parameter"
        }
    }
}