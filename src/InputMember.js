import Member from './Member.js';

/**
 * Introductory elements. Input elements have values that are manually loaded
 * that is, they are not the result of calculating data
 * */
export default class InputMember extends Member{
    constructor(options){
        const {id} = options;
        super(id)
        Object.assign(this, options);
    }
}