import Record from './Record.js';

export default class FactTable extends Array {
    constructor(array){
        super();
        Object.assign(this, array.map(item => new Record(item)))
    }
}