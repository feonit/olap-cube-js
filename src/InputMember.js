import Member from './Member.js';

/**
 * Introductory elements. Input elements have values that are manually loaded
 * that is, they are not the result of calculating data
 * */
export default class InputMember extends Member{
    constructor(id, props, data){
        const defaultValue = null;
        const defaultData = {};

        props.forEach( propName => {
            defaultData[propName] = data.hasOwnProperty(propName) ? data[propName] : defaultValue
        });

        super(id, props, defaultData)
    }
}