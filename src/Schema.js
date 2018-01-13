import SchemaMeasurement from "./SchemaMeasurement.js";

class AbstractSchema {
    createIterator(){}
    getByName(){}
    getByDependency(){}
    getNames(){}
    getMeasure(){}
    getColumns(){}
}

let schema = {
    name: 'counts',
    keyProps: ['planesCount'],
    dependency: [
        {
            name: 'prices',
            keyProps: ['price'],
            dependency: [
                {
                    name: 'cities',
                    keyProps: ['city']
                }
            ]
        },
        {
            name: 'companies',
            keyProps: ['company']
        },
        {
            name: 'age',
            keyProps: ['minAgePlane', 'maxAgePlane']
        }
    ]
}

class SchemaMeasurement2 extends SchemaMeasurement{
    constructor(options, indexSchema){
        super(options);
        if (indexSchema){
            indexSchema.push(this);
        }
        if (this.dependency){
            this.dependency = this.dependency.map( dependency => new SchemaMeasurement2(dependency, indexSchema) )
        }
    }
}

class Schema2 extends AbstractSchema{
    constructor(schema){
        super()
        this.indexSchema = [];
        this.schema = new SchemaMeasurement2(schema, this.indexSchema);
    }
    createIterator(){
        let i = 0;
        let schema = this.indexSchema.concat([]).reverse();

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
    getNames(){
        return this.indexSchema.map( schema => schema.name );
    }
    getByName(name){
        const find = this.indexSchema.find(schema => {
            return schema.name === name;
        });
        return find;
    }
    getByDependency(name){
        const find = this.indexSchema.find( schema => {
            if (schema.dependency){
                let find = schema.dependency.find( schema => schema.name === name )
                if (find){
                    return schema;
                } else {
                    return false
                }
            } else {
                return false
            }
        });
        return find;
    }
    getMeasure(){
        return this.schema;
    }
    getColumns(){
        return this.schema.dependency.map(schema => {
            while (schema.dependency){
                if (schema.dependency.length > 1){
                    throw "new case with mix of deps"
                }
                schema = schema.dependency[0]
            }
            return schema;
        });
    }
    getDependencyNames(dependency){
        //todo ref
        const map = dependency.map(dependency => dependency.name);
        return map.length === 1 ? map[0] : map;
    }
}

class Schema extends AbstractSchema{
    constructor(schema){
        super()
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
    getDependencyNames(dependency){
        return dependency;
    }
}

export default Schema2;