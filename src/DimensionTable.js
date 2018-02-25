import Dimension from "./Dimension.js";

export default class DimensionTable extends Dimension{
    constructor({ dependencyNames = [], ...rest }){
        super(rest);

        /** The list of dimensions with which the current dimension is directly related */
        this.dependencyNames = dependencyNames;
    }
}