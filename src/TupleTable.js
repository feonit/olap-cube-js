import Tuple from "./Tuple.js";

export default class TupleTable extends Array {
    constructor(array){
        super();
        if (Array.isArray(array)){
            Object.assign(this, array.map(item => new Tuple(item)))
        }
    }
    add(data){
        this.push(new Tuple(data))
    }
}