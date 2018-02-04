import {ENTITY_ID} from './const.js';

export default class Member{
    constructor(options){
        const {id} = options;
        if (typeof id === "string"){
            throw 'id is not string'
        }
        Object.assign(this, options);
    }
}