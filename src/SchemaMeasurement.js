export default class SchemaMeasurement {
    constructor({name, keyProps, dependency = null, otherProps = null}){
        if (!name || !keyProps || !keyProps.length){
            throw Error("Bad measurement description at schema, params 'name' and 'keyProps' is required");
        }
        this.name = name;
        this.dependency = dependency;
        this.keyProps = keyProps;
        this.otherProps = otherProps;
    }
}