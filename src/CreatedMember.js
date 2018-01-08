import Member from './Member.js';

export default class CreatedMember extends Member{
    constructor(options){
        const {id} = options;
        super(id)
        Object.assign(this, options);
    }
}