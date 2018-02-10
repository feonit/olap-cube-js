
/**
 *
 * */
export default class Space{
    /**
     * @param {string} dimension
     * */
    getDimensionTable(dimension){
        return this[dimension]
    }

    /**
     * @param {DimensionTable} dimensionTable
     * */
    setDimensionTable(dimension, dimensionTable){
        this[dimension] = dimensionTable;
    }

    getDimensionList(){
        return Object.keys(this);
    }
}