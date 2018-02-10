import {ENTITY_ID} from './const.js';

/**
 * Element of dimension. Serving to determine the position and description of the data element
 * */
export default class Member{
    constructor(options){
        const {id} = options;
        if (typeof id === "string"){
            throw 'id is not string'
        }
        Object.assign(this, options);
    }
}