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
import { NotCompletelySpaceException, AddDimensionOfCellException } from './errors.js';

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
        Object.defineProperty(this, 'schema', { value: schema });
        Object.defineProperty(this, 'facts', { value: facts });

        const dimensionTables = schema.getDimensionsResolutionOrder();
        const star = new Star(facts, dimensionTables);

        const {space, cellTable} = star;
        Object.defineProperty(this, 'star', { value: star });

        this.space = space;
        this.cellTable = cellTable;

        const count = this.countOfResiduals();
        if (count > 0){
            console.warn('Fact table has residuals')
        }

        const final = this.schema.getFinal();
        if (final.length == 0){
            console.warn('Fact table not has final dimension')
        }
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
        return this.star.denormalize(cells)
    }

    countOfCardinality(){
        return this.schema.getFinal().map( ({dimension}) => dimension).reduce((acc, dimension)=>{
            return acc * this.query(dimension).length
        }, 1)
    }

    getEmptyCount(){
        return this.countOfCardinality() - this.query().length;
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
    //todo добавить исключение, когда принадлежность измерения категории не определено
    // refactor
    /**
     * @param {string} dimension - dimension in which the member is created
     * @param {object} memberOptions - properties for the created member
     * @param {object} categorySpace - space of category for current dimension
     * @public
     * */
    addMember(dimension, memberOptions, categorySpace = {}){
        this._validateAddMemberParams(dimension, memberOptions, categorySpace);

        // взять все листья
        const externals = this.schema.getExternals();

        // место куда будут складываться
        const space = new Space();

        // остальные измерения этого уровня
        externals.forEach( ({dimension: externalDimension}) => {
            if (dimension !== externalDimension){
                if (!categorySpace[externalDimension]){
                    space.setMemberList(externalDimension, this.space.getMemberList(externalDimension))
                }
            }
        });

        const memberDepOptions = this._createMemberDependency(dimension, memberOptions);

        const cellSpace = Object.assign({}, categorySpace, memberDepOptions);

        const createCell = (cellOptions)=>{
            const measureName = this.schema.getMeasure().dimension;
            const member = this._createMember(measureName);
            cellOptions = Object.assign({}, cellOptions, { [measureName]: member });
            this._createNormalizeData(Object.assign({}, cellOptions));
        };


        const recursivelyForEach = (dimensionNames, membersList, index, cellSpace) => {
            const dimensionNamesLength = dimensionNames.length;
            const currentDimension = dimensionNames[index];
            const cells = [];
            const cellSpaceCopy = Object.assign({}, cellSpace);

            membersList[index].forEach( member => {
                cellSpaceCopy[currentDimension] = member;
                let parentDimensionTable = this.schema.getByDependency(currentDimension);

                if (parentDimensionTable){
                    const members = this.query(parentDimensionTable.dimension, { [currentDimension]: member });

                    recursivelyForEach([parentDimensionTable.dimension], [members], 0);
                }

                if ( (index + 1) === dimensionNamesLength ){
                    cells.push(Object.assign({}, cellSpaceCopy))
                } else {
                    recursivelyForEach(dimensionNames, membersList, index + 1);
                }
            });

            cells.forEach((cellOptions)=>{
                createCell(cellOptions)
            })
        };

        const dimensions = space.getDimensionList();
        const membersList = dimensions.map(dimension => space.getMemberList(dimension));
        recursivelyForEach(dimensions, membersList, 0, cellSpace);
    }
    _validateAddMemberParams(dimension, memberOptions, categorySpace){
        const measureDimension = this.schema.getMeasure().dimension;
        if (dimension === measureDimension){
            throw new AddDimensionOfCellException(dimension)
        }

        const addSpaceOptions = {
            [dimension]: memberOptions,
            ...categorySpace
        };

        const childDimensionList = this.schema.getChildDimensionList(dimension);
        if (childDimensionList.length){
            const find = childDimensionList.find( childDimension => {
                return addSpaceOptions[childDimension] ? false : childDimension;
            });
            if (find){
                throw new NotCompletelySpaceException(find)
            }
        }
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
        if (!this.countOfResiduals()){
            const measureName = this.schema.getMeasure().dimension;
            const tuples = this._createTupleTable();
            const emptyMemberOptions = [];
            tuples.forEach( combination => {
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
        const {keyProps} = this.schema.getDimensionTable(dimension);
        const id = DynamicCube.reduceId(this.space.getMemberList(dimension));
        const member = new InputMember(id, keyProps, props);
        this.space.getMemberList(dimension).add(member);
        return member;
    }
    /**
     * create space
     * @private
     * */
    _createMemberDependency(dimension, memberOptions = {}){
        const result = {};
        const rootDimension = this.schema.getRoot().value.dimension;

        this.schema.traceUp(dimension, ({dimension}) => {
            result[dimension] = this._createMember(dimension, memberOptions);
        });

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

    countOfResiduals(){
        const tuples = this._createTupleTable();
        return tuples.reduce( (acc, tuple) => {
            const members = this.query(tuple);
            return members.length > 1 ? ++acc : acc;
        }, 0);
    }
    countOfUnfilled(){
        const tuples = this._createTupleTable();
        return tuples.reduce( (acc, tuple) => {
            const members = this.query(tuple);
            return members.length == 0 ? ++acc : acc;
        }, 0);
    }
}

export default DynamicCube;