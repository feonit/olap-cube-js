import SchemaMeasurement from "./SchemaMeasurement.js";

class SchemaMeasurement2 extends SchemaMeasurement{
    constructor(options, indexSchema){
        super(options);

        if (this.dependency){
            this.dependency = this.dependency.map( dependency => new SchemaMeasurement2(dependency, indexSchema) )
        }
        if (indexSchema){
            indexSchema.push(this);
        }
    }
}

class Schema {
    constructor(schema){
        this.indexSchema = [];
        this.schema = new SchemaMeasurement2(schema, this.indexSchema);

        // первый сделать последним (меру в конец)
        // this.indexSchema.push(this.indexSchema.splice(0, 1)[0]);

        if (schema.dependency && schema.dependency.length === 1){
            throw Error('такая схема не поддерживается пока что') //todo переписать getDependencyNames
        }
    }
    createIterator(){
        let i = 0;
        let schemaOrder = this.getOrder();

        return {
            next: ()=>{
                let done = (i >= schemaOrder.length);
                let value = !done ? schemaOrder[i++] : void 0;
                return {
                    done,
                    value
                }
            }
        }
    }
    getOrder(){
        const order = [];

        const reqursively = (dependency)=> {
            dependency.forEach(schema => {
                if (schema.dependency){
                    reqursively(schema.dependency)
                }
                order.push(schema);
            })
        };

        reqursively(this.schema.dependency);

        order.push(this.schema)
        return order;
    }
    getNames(){
        return this.indexSchema.map( schema => schema.name );
    }
    getByName(name){
        const find = this.indexSchema.find(schema => {
            return schema.name === name;
        });
        if (!find){
            throw 'schema for name: \"${name}\" not found'
        }
        return find;
    }
    getDependencies(name){
        let dependencies = [this.getMeasure().name];
        let schema = this.getByDependency(name);

        if (schema.dependency){
            dependencies = dependencies.concat( schema.dependency.map( schema => schema.name ) )
        }

        return dependencies;
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
    getInnerColumns(){
        return this.schema.dependency;
    }
    getDependencyNames(dependency){
        //todo ref
        const map = dependency.map(dependency => dependency.name);
        return map.length === 1 ? map[0] : map;
    }
}


export default Schema;