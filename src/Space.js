
/**
 * The composed aggregate object, members grouped by dimension names
 * */
export default class Space{
    constructor(options){
        if (options){
            this.getDimensionList.call(options).forEach( dimension => {
                this.setDimensionTable(dimension, options[dimension])
            })
        }
    }
    /**
     * @param {string} dimension
     * */
    getDimensionTable(dimension){
        return this[dimension]
    }
    /**
     * @param {string} dimension
     * @param {DimensionTable|object[]} dimensionTable
     * */
    setDimensionTable(dimension, dimensionTable){
        this[dimension] = dimensionTable;
    }
    /**
     * @return {string[]}
     * */
    getDimensionList(){
        return Object.keys(this);
    }
}