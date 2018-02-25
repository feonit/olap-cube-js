import SchemaDimension from "./SchemaDimension.js";
import Tree from "./Tree.js";

export class DimensionException extends Error {
    constructor(dimension){
        super();
        this.message = `For the name "${dimension}" the dimension is already set`;
    }
}

const adapter = schema => {
    const { dependency = [], ...rest } = schema;

    return {
        value: {
            ...rest,
            dependencyNames: dependency.map( dependency => dependency.dimension )
        },
        childNodes: dependency.map(adapter)
    };
};

/**
 * It defines the relationship of generalization and specialization (roll-up/drill-down)
 * @throws {DimensionException}
 * */
export class Schema extends Tree{
    constructor(schema){

        super(adapter(schema));

        this.schema = new SchemaDimension(schema);

        this._dimensionsResolutionOrder = [];
        this._dimensionTable = {};

        this.postOrder( (dimensionTable) => {
            const {dimension} = dimensionTable;
            if ( !this._dimensionTable[dimension] ){
                const {dimension} = dimensionTable;
                this._dimensionTable[dimension] = dimensionTable;
                this._dimensionsResolutionOrder.push(this._dimensionTable[dimension])
            } else {
                throw new DimensionException(dimension)
            }
        });
    }

    createIterator(){
        let i = 0;
        let dimension = this.getDimensionsResolutionOrder();

        return {
            next: ()=>{
                let done = (i >= dimension.length);
                let value = !done ? dimension[i++] : void 0;
                return {
                    done,
                    value
                }
            }
        }
    }

    /**
     * @param {string} dimension
     * @return {DimensionTable|undefined}
     * */
    getDimensionTable(dimension){
        return this._dimensionTable[dimension]
    }
    /**
     * Take an ordered list of dimensions by dependency resolution
     * */
    getDimensionsResolutionOrder(){
        return this._dimensionsResolutionOrder;
    }
    /**
     * Get a dimension by its dependency
     * @return {string|undefined}
     * */
    getByDependency(dimensionOfDep){
        let find = false;
        this.postOrder( ({ dimension }, node) => {

            if (dimensionOfDep === dimension){
                const parent = this.getParentOf(node);
                if (parent){
                    find = parent.value;
                }
            }

        });

        return find;
    }
    /**
     * Get list of dimensions names
     * @return {string[]}
     * */
    getNames(){
        return this._dimensionsResolutionOrder.map( schema => schema.dimension );
    }
    /**
     * Get a list of all dimension related to the selected dimension
     * @return {string[]}
     * */
    getDependenciesNames(currentDimension){
        const names = [];
        this.postOrder( ({ dimension }, node) => {
            if (currentDimension === dimension){
                let tree = new Tree(node);
                tree.postOrder(({ dimension }) => {
                    if (currentDimension !== dimension){
                        names.push(dimension)
                    }
                })
            }
        });

        return names;
    }
    /**
     * take a point measure in the dimension space
     * */
    getMeasure(){
        const root = this.getRoot();
        return root.value;
    }
    /**
     *
     * */
    getColumns(){
        const columns = [];
        this.postOrder((value, node)=>{
            if (!node.childNodes || !node.childNodes.length){
                columns.push(value)
            }
        });
        return columns;
    }
    /**
     * List of all final dimensions forming count of measure
     * @return {SchemaDimension[]}
     * */
    getFinal(){
        return this.getRoot().childNodes.map( childNode => childNode.value);
    }

    isRoot(schemaDimension){
        return schemaDimension === this.getRoot().value;
    }
}