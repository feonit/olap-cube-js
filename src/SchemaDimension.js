/**
 * Dimension attributes
 * */
export default class SchemaDimension {
    constructor({ dimension, keyProps, dependency = null, otherProps = [] }){

        if (!dimension || !keyProps || !keyProps.length){
            throw Error("Bad dimension description at schema, params 'dimension' and 'keyProps' is required");
        }

        /** Name of the dimension */
        this.dimension = dimension;

        /** The list of dimensions with which the current dimension is directly related */
        this.dependency = dependency && dependency.map( dependency => new SchemaDimension(dependency) );

        /** List of key names properties of the entity belonging to the current dimension */
        this.keyProps = keyProps;

        /** List of additional names properties of the entity belonging to the current dimension */
        this.otherProps = otherProps;
    }
}