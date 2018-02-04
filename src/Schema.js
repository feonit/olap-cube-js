import Measurement from "./Measurement.js";

export default class Schema {
    constructor(schema){
        this.schema = new Measurement(schema);
        if (schema.dependency && schema.dependency.length === 1){
            throw Error('такая схема не поддерживается пока что') //todo переписать getDependencyNames
        }
        this._measurementsResolutionOrder = this.getMeasurementsResolutionOrder();
    }
    createIterator(){
        let i = 0;
        let measurement = this.getMeasurementsResolutionOrder();

        return {
            next: ()=>{
                let done = (i >= measurement.length);
                let value = !done ? measurement[i++] : void 0;
                return {
                    done,
                    value
                }
            }
        }
    }
    /**
     * Take an ordered list of measurements by dependency resolution
     * @return {Measurement[]}
     * */
    getMeasurementsResolutionOrder(){
        if (this._measurementsResolutionOrder){
            return this._measurementsResolutionOrder;
        }
        const order = [];
        if ( this.schema.dependency ){
            const reqursively = dependency => {
                dependency.forEach(schema => {
                    if (schema.dependency){
                        reqursively(schema.dependency)
                    }
                    order.push(schema);
                })
            };
            reqursively(this.schema.dependency);
        }
        order.push(this.schema);
        this._measurementsResolutionOrder = order;
        return order;
    }
    /**
     * Get a measurement by name
     * @return {Measurement}
     * @throw
     * */
    getByName(name){
        const find = this._measurementsResolutionOrder.find(schema => {
            return schema.name === name;
        });
        if (!find){
            throw 'schema for name: \"${name}\" not found'
        }
        return find;
    }
    /**
     * Get a measurement by its dependency
     * @return {string|undefined}
     * */
    getByDependency(name){
        return this._measurementsResolutionOrder.find( schema => {
            return schema.dependency && schema.dependency.find( schema => schema.name === name ) ? schema : false;
        });
    }
    /**
     * Get list of measurements names
     * @return {string[]}
     * */
    getNames(){
        return this._measurementsResolutionOrder.map( schema => schema.name );
    }
    /**
     * Get a list of all measurement names related to the selected measurement by name
     * @return {string[]}
     * */
    getDependenciesNames(name){
        let dependencies = [this.getMeasure().name];
        let schema = this.getByDependency(name);
        if (schema.dependency){
            dependencies = dependencies.concat( schema.dependency.map( schema => schema.name ) )
        }
        return dependencies;
    }
    /**
     * take a point measure in the measurement space
     * */
    getMeasure(){
        return this.schema;
    }
    /**
     *
     * */
    getColumns(){
        const columns = this.schema.dependency.map(schema => {
            while (schema.dependency){
                if (schema.dependency.length > 1){
                    throw "new case with mix of deps"
                }
                schema = schema.dependency[0]
            }
            return schema;
        });
        return columns;
    }
    /**
     * List of all final measurements forming count of measure
     * @return {Measurement[]}
     * */
    getFinal(){
        return this.schema.dependency;
    }
    /**
     *
     * */
    getDependencyNames(dependency){
        //todo ref
        const map = dependency.map(dependency => dependency.name);
        return map.length === 1 ? map[0] : map;
    }
}