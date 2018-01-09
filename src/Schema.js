import SchemaMeasurement from "./SchemaMeasurement.js";

export default class Schema{
    constructor(schema){
        this.schema = schema.map( i => new SchemaMeasurement(i) );
    }
    createIterator(){
        let i = 0;
        let schema = this.schema;

        return {
            next: ()=>{
                let done = (i >= schema.length);
                let value = !done ? schema[i++] : void 0;
                return {
                    done,
                    value
                }
            }
        }
    }
    getMeasurement(name){
        return this.schema.find((schema)=>{
            return schema.name === name;
        })
    }
    getMeasurementsNames(){
        return this.schema.map( item => item.name )
    }
    getMesureName(){
        return this.schema.find( schema => Array.isArray(schema.dependency)).name
    }
    getDependencyOf(name){
        return this.schema.find( schemaItem => {
            return schemaItem.dependency === name;
        });
    }
}