import FactRecord from './FactRecord.js';

export default class FactTable extends Array {
    constructor(array){
        super();
        Object.assign(this, array.map(item => new FactRecord(item)))
    }
}