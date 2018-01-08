import {ENTITY_ID} from './const.js';

export default class Member{
    constructor(id){
        if (typeof id === "string"){
            debugger;
        }
        this[ENTITY_ID] = id;
    }
}