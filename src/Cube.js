import InputCell from './InputCell.js'
import {ENTITY_ID} from './const.js';
import Member from './Member.js';
import InputMember from './InputMember.js';
import {Schema} from './Schema.js';
import Space from './Space.js';
import FactTable from './FactTable.js';
import FixSpace from "./FixSpace.js";
import QueryAdapter from "./QueryAdapter.js";
import TupleTable from "./TupleTable.js";
import Star from "./Star.js";
import DimensionTable from "./DimensionTable.js";

/**
 * It a means to retrieve data
 *
 * Base class for normalizing a denormalized data array
 * and analyzing query according to a given scheme
 *
 * @param {object[]} factTable - facts which will be subject to analysis
 * */
class Cube{
    constructor(facts, dimensionsSchema){
        const schema = new Schema(dimensionsSchema);
        const factTable = new FactTable(facts);
        Object.defineProperty(this, 'schema', { value: schema });
        Object.defineProperty(this, 'factTable', { value: factTable });

        const resolution = schema.getDimensionsResolutionOrder();
        const dimensionTableList = resolution.map( resolution => new DimensionTable(resolution) );
        const {space, cellTable} = new Star(factTable, dimensionTableList);

        this.space = space;
        this.cellTable = cellTable;
    }
    /**
     * A method that allows you to find all members of a specified dimension
     * or part of the members using a filter if they are in a hierarchy
     *
     * @public
     * @param {(string|null|object)?} dimension - dimension from which the member will be found
     * @param {object?} fixSpaceOptions - the composed aggregate object, members grouped by dimension names
     * @return {Member[]|FactTable} returns members
     * */
    query(dimension, fixSpaceOptions){
        const args = [].slice.call(arguments);
        if (args.length > 0 && args[0]){
            if (typeof args[0] === "object"){
                fixSpaceOptions = args[0];
                dimension = null;
            }
        }

        let cells = this.cellTable;

        if (fixSpaceOptions){
            const queryAdapter = new QueryAdapter();
            queryAdapter.applyAdapter(fixSpaceOptions, this.space);
            const fixSpace = new FixSpace(fixSpaceOptions);
            cells = fixSpace.match(cells)
        }

        if (!dimension){
            return this.getDataArray(cells);
        } else {
            const idAttribute = Star.genericId(dimension);
            const ids = cells.map( cell => cell[idAttribute]);

            const uniq = (items) => {
                const hash = {};
                items.forEach((item) => {
                    hash[item] = item
                });
                return Object.keys(hash).map(key => hash[key]);
            };

            const uniqueIds = uniq(ids);
            const result = [];
            const members = this.space.getMemberList(dimension);

            // filtering without loss of order in the array
            members.forEach( member => {
                if (uniqueIds.indexOf(member[ENTITY_ID]) !== -1){
                    result.push(member)
                }
            });
            return result;
        }
    }

    /**
     *
     * @public
     * */
    getDataArray(cells = this.cellTable){
        const factTable = new FactTable();
        cells.forEach( cell => {
            factTable.push(Object.assign({}, cell))
        });

        factTable.forEach( fact => {
            const handleDimension = dimensionSchema => {
                const idAttribute = Star.genericId(dimensionSchema.dimension);
                const idValue = fact[idAttribute];
                const member = this.space.getMemberList(dimensionSchema.dimension).find( member => {
                    return member[ENTITY_ID] === idValue;
                });
                const memberCopy = Object.assign({}, member);
                delete memberCopy[ENTITY_ID];
                delete fact[idAttribute];
                Object.assign(fact, memberCopy);
            };

            const iterator = this.schema.createIterator();
            let next;
            while ( !(next = iterator.next()) || !next.done){
                handleDimension(next.value)
            }
        });

        return factTable;
    }
}

/**
 * Is a means of replenishing data
 *
 * A helper class that provides methods for adding and removing values,
 * as well as generating missing values for possible display of data
 * */
class DynamicCube extends Cube{
    constructor(factTable, dimensionsSchema){
        super(factTable, dimensionsSchema)
    }
    /**
     * @param {string} dimension - dimension in which the member is created
     * @param {object} memberOptions - properties for the created member
     * @param {object} cellOptions -
     * @public
     * */
    addMember(dimension, memberOptions, cellOptions = {}){
        const columns = this.schema.getColumns();

        const space = new Space();

        // остальные измерения этого уровня
        columns.forEach((dimensionSchema)=>{
            if (dimensionSchema.dimension !== dimension){
                if (!cellOptions[dimensionSchema.dimension]){
                    space.setMemberList(dimensionSchema.dimension, this.space.getMemberList(dimensionSchema.dimension))
                }
            }
        });

        const memberDepOptions = this._createMemberDependency(dimension, memberOptions);

        cellOptions = Object.assign({}, cellOptions, memberDepOptions);

        const recursivelyForEach = (cellOptions, space, index, isDependency) => {
            const dimensionNames = space.getDimensionList();
            const dimensionNamesLength = dimensionNames.length;

            if (index !== dimensionNamesLength){
                const members = space.getMemberList(dimensionNames[index]);

                members.forEach( member => {
                    cellOptions[dimensionNames[index]] = member;
                    let dependency = this.schema.getByDependency(dimensionNames[index]);
                    if (dependency){
                        const queryOptions = { [dimensionNames[index]]: member };
                        const query = this.query(dependency.dimension, queryOptions);
                        const space = new Space();
                        space.setMemberList(dependency.dimension, query);

                        recursivelyForEach(cellOptions, space, 0, true);
                    }
                    recursivelyForEach(cellOptions, space, index + 1, isDependency);

                    if (isDependency){
                        return;
                    }

                    if ( (index + 1) === dimensionNamesLength ){
                        // create cell
                        const measureName = this.schema.getMeasure().dimension;
                        const member = this._createMember(measureName);
                        const options = Object.assign({}, cellOptions, { [measureName]: member });
                        this._createNormalizeData(options);
                    }
                })

            }
        };

        recursivelyForEach(cellOptions, space, 0);
    }
    /**
     *
     * @param {string} dimension - dimension from which the member will be removed
     * @param {Member} member - the member will be removed
     * @public
     * */
    removeMember(dimension, member){
        const dependenciesDimensionNames = this.schema.getDependenciesNames(dimension);
        const index = this.space.getMemberList(dimension).indexOf(member);
        if (index === -1){
            throw new Error('represented member was not found in the ' + dimension + ' dimension')
        }
        this.space.getMemberList(dimension).splice(index, 1);

        const filterData = this.cellTable.filter(data => {
            return data[Star.genericId(dimension)] == member[ENTITY_ID];
        });

        filterData.forEach( data => {
            const index = this.cellTable.indexOf(data);
            this.cellTable.splice(index, 1);

            dependenciesDimensionNames.forEach( dimension => {
                this._removeSubModel(data, dimension);
            });
        });
        this._normalize();
    }
    /**
     * Get data without random identifiers
     * */
    getDataArray(cells = this.cellTable, forSave = true){
        const data = super.getDataArray(cells);
        if (forSave){
            data.forEach( (data, index) => {
                if (cells[index] instanceof InputCell){
                    delete data[ENTITY_ID];
                }
            })
        }
        return data;
    }
    /**
     * Remove subentity, links to which none of the model does not remain
     * @private
     * */
    /**
     *
     * @private
     * */
    _removeSubModel(normalizeData, dimension){
        // подчистить суб-модельку
        const filtered = this.space.getMemberList(dimension).filter(record => {
            return record[ENTITY_ID] == normalizeData[Star.genericId(dimension)]
        });

        // и подчистить суб-модельку
        filtered.forEach( data => {
            const index = this.space.getMemberList(dimension).indexOf(data);
            this.space.getMemberList(dimension).splice(index, 1);
        })
    }
    /**
     *
     * @private
     * */
    _normalize(){
        const names = this.schema.getNames();
        const report = [];
        names.forEach( dimension => {
            if (this.space.getMemberList(dimension).length){
                const copy = [].concat(this.space.getMemberList(dimension));
                // чтобы splice корректно отработал
                copy.forEach( (member, index) => {
                    const idAttribute = Star.genericId(dimension);
                    const findLink = this.cellTable.find( data => {
                        return data[idAttribute] == member[ENTITY_ID]
                    });
                    if (!findLink){
                        this.space.getMemberList(dimension).splice(index - (copy.length - this.space.getMemberList(dimension).length), 1);
                        report.push(member)
                    }
                })
            }
        });
        if (report.length){
            console.log('битые ссылки:', report)
        }
    }
    /**
     *
     * @public
     * */
    /**
     * Filling method for full size of cube
     * @param {object?} props - properties for empty cells
     * @public
     * */
    fill(props){
        const measureName = this.schema.getMeasure().dimension;
        const combinations = this._createTupleTable();
        const emptyMemberOptions = [];
        combinations.forEach( combination => {
            const unique = this.query(measureName, combination );
            if ( !unique.length ){
                emptyMemberOptions.push( combination );
            }
        });

        emptyMemberOptions.forEach( cellOptions => {
            const member = this._createMemberDependency( measureName, props );
            const options = Object.assign({}, cellOptions, member );
            this._createNormalizeData(options);
        });
    }
    /**
     *
     * @private
     * */
    _createNormalizeData(obj){
        const options = {};
        Object.keys(obj).forEach( key => {
            options[Star.genericId(key)] = obj[key][ENTITY_ID]
        });
        const newNormaliseData = new InputCell(options);
        this.cellTable.push(newNormaliseData);
    }
    /**
     *
     * @private
     * */
    _createTupleTable(){
        const tupleTable = new TupleTable();
        const callback = (item) => {
            tupleTable.add(item)
        };
        const finalDimensions = this.schema.getFinal();
        const dimensionsMembers = {};
        const reqursively = (dimensionsMembers, index) => {
            let finalDimension = finalDimensions[index];
            let members = this.space.getMemberList(finalDimension.dimension);
            members.forEach( member => {
                let newDimensionsMembers = Object.assign({}, dimensionsMembers, {[finalDimension.dimension]: member} );
                if ( Object.keys(newDimensionsMembers).length === finalDimensions.length ){
                    callback(newDimensionsMembers)
                } else {
                    dimensionsMembers[finalDimension.dimension] = member;
                    reqursively(dimensionsMembers, index + 1);
                }
            });
        };

        reqursively(dimensionsMembers, 0);

        return tupleTable;
    }
    /**
     * @param {string} dimension
     * @param {object?} props
     * @private
     * */
    _createMember(dimension, props = {}){
        if (!dimension){
            throw 'attribute \"dimension\" nor found';
        }

        const {keyProps} = this.schema.getDimensionTable(dimension);
        const id = DynamicCube.reduceId(this.space.getMemberList(dimension));
        const member = new InputMember(id, keyProps, props);
        this.space.getMemberList(dimension).push(member);
        return member;
    }
    /**
     *
     * @private
     * */
    _createMemberDependency(dimension, memberOptions = {}){
        const result = {};
        const reqursive = (dimension, memberOptions = {}) => {
            // create
            const member = this._createMember(dimension, memberOptions);
            result[dimension] = member;
        };
        reqursive(dimension, memberOptions);
        return result;
    }
    /**
     * Method of generating a unique identifier within the selected space
     * */
    static reduceId(array){
        if (array.length){
            return array.reduce( (acc, curValue) => {
                return acc[ENTITY_ID] > curValue[ENTITY_ID] ? acc : curValue;
            }, 0).id + 1
        } else {
            return 1;
        }
    }
}

export default DynamicCube;