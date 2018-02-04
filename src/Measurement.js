/**
 * Measurement attributes
 * */
export default class Measurement {
    constructor({ name, keyProps, dependency = null, otherProps = [] }){

        if (!name || !keyProps || !keyProps.length){
            throw Error("Bad measurement description at schema, params 'name' and 'keyProps' is required");
        }

        /** Name of the measurement */
        this.name = name;

        /** The list of measurements with which the current measurement is directly related */
        this.dependency = dependency && dependency.map( dependency => new Measurement(dependency) );

        /** List of key names properties of the entity belonging to the current dimension */
        this.keyProps = keyProps;

        /** List of additional names properties of the entity belonging to the current dimension */
        this.otherProps = otherProps;
    }
}