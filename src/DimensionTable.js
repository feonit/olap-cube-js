export default class DimensionTable extends Array {
    constructor(array){
        super();
        Object.assign(this, array)
    }
    filter(){
        return [].filter.apply(this, arguments);
    }
}