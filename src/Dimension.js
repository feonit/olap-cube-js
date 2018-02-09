/**
 * Dimension attributes
 * */
export default class Dimension {
    constructor({ name, keyProps, dependency = null, otherProps = [] }){

        if (!name || !keyProps || !keyProps.length){
            throw Error("Bad dimension description at schema, params 'name' and 'keyProps' is required");
        }

        /** Name of the dimension */
        this.name = name;

        /** The list of dimensions with which the current dimension is directly related */
        this.dependency = dependency && dependency.map( dependency => new Dimension(dependency) );

        /** List of key names properties of the entity belonging to the current dimension */
        this.keyProps = keyProps;

        /** List of additional names properties of the entity belonging to the current dimension */
        this.otherProps = otherProps;
    }
}