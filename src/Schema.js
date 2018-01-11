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
    getByName(name){
        return this.schema.find( schemaMeasurement =>{
            return schemaMeasurement.name === name;
        });
    }
    getByDependency(name){
        return this.schema.find( schemaMeasurement => {
            return schemaMeasurement.dependency === name;
        });
    }
    getNames(){
        return this.schema.map( schemaMeasurement => schemaMeasurement.name );
    }
    getMeasure(){
        return this.schema.find( schemaMeasurement => Array.isArray(schemaMeasurement.dependency));
    }
    getColumns(){
        return this.schema.filter( schemaMeasurement => {
            return !schemaMeasurement.dependency;
        })
    }
}