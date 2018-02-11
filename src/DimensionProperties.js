export default class DimensionProperties {
    constructor({ keyProps, otherProps = [] }){

        if (!keyProps || !keyProps.length){
            throw Error("Bad dimension description at schema, params 'dimension' and 'keyProps' is required");
        }

        /** List of key names properties of the entity belonging to the current dimension */
        this.keyProps = keyProps;

        /** List of additional names properties of the entity belonging to the current dimension */
        this.otherProps = otherProps;
    }
}