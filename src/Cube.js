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
import { NotCompletelySpaceException, AddDimensionOfCellException, CantAddMemberRollupException } from './errors.js';

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
     * @param {(object|null)?} fixSpaceOptions - the composed aggregate object, members grouped by dimension names
     * @param {boolean?} raw - return cell of fact data
     * @return {Member[]|FactTable|CellTable} returns members
     * */
    query(dimension, fixSpaceOptions, raw = false){
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
            return raw ? cells : this.getDataArray(cells);
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

    /**
     *
     * @private
     * */
    _createTupleTable(){
        const tupleTable = new TupleTable();
        const callback = (item) => {
            tupleTable.add(item)
        };
        const branches = this.schema.getBranches();
        // without root
        const size = this.schema.getNames().length - 1;

        const reqursively = (space = {}, branchIndex = 0) => {
            const currentBranch = branches[branchIndex];
            const finalDimensionTable = currentBranch[0];
            const { dimension } = finalDimensionTable;
            const members = this.space.getMemberList(dimension);

            members.forEach( member => {
                const newSpace = Object.assign({}, space);
                const finalSpace = {[dimension]: member};

                Object.assign(newSpace, finalSpace);

                if (branches[branchIndex].length > 1){
                    const categorySpace = this._mapToCategorySpace(finalSpace, currentBranch);
                    Object.assign(newSpace, categorySpace);
                }

                if ( Object.keys(newSpace).length === size ){
                    callback(newSpace)
                } else {

                    if (branches[branchIndex + 1]){
                        reqursively(newSpace, branchIndex + 1);
                    }
                }
            });
        };

        reqursively();

        return tupleTable;
    }

    _mapToCategorySpace(finalSpace, branch){
        let categorySpace = {};

        //hack (may be need change star schema to snowflake)
        const cells = this.query(finalSpace, null, true);
        const etalonCell = cells[0];

        let i = 1;
        while(branch[i]){
            const currentDimension = branch[i].dimension;
            const idName = Star.genericId(currentDimension);
            const id = etalonCell[ idName ];
            const members = this.space.getMemberList(currentDimension);
            const find = members.find( member => {
                return member.id === id;
            });
            if (find){
                categorySpace[currentDimension] = find;
            }
            i += 1;
        }

        return categorySpace;

    }

    /**
     * Residuals - кортеж, в соответствии которому стоит более одного члена
     * */
    residuals(){
        const tuples = this._createTupleTable();
        const residuals = [];
        tuples.forEach( (tuple) => {
            const members = this.query(tuple);
            if (members.length > 1){
                residuals.push(tuple)
            }
        });
        return residuals;
    }

    /**
     * Unfilled - кортеж, в соответсвии которому не стоит ни одного члена
     * */
    unfilled(){
        const tuples = this._createTupleTable();
        const unfilled = [];

        tuples.forEach( (tuple) => {
            const members = this.query(tuple);
            if (members.length === 0 ){
                unfilled.push(tuple)
            }
        });
        return unfilled;
    }

    present(){
        const present = this.query();
        return present;
    }

    countOfPresent(){
        return this.present().length;
    }

    countOfResiduals(){
        return this.residuals().length;
    }

    countOfUnfilled(){
        return this.unfilled().length;
    }

    countOfCardinality(){
        const final = this.schema.getFinal();
        const count = final.map( ({dimension}) => dimension).reduce((acc, dimension)=>{
            return acc * this.query(dimension).length
        }, 1);
        return count;
    }

    countOfEmpty(){
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
    /**
     * @param {string} dimension - dimension in which the member is created
     * @param {object?} memberOptions - properties for the created member
     * @param {object?} rollupCoordinatesData
     * @public
     * */
    addMember(dimension, memberOptions = {}, rollupCoordinatesData = {}){
        if (typeof dimension !== "string"){
            throw Error(`parameter dimension expects as string: ${dimension}`)
        }

        this._validateDimension(dimension);

        const addedCoordinates = {
            [dimension]: this._createMember(dimension, memberOptions)
        };

        const rollupCoordinates = {};
        Object.keys(rollupCoordinatesData).forEach( dimension => {
            const memberData = rollupCoordinatesData[dimension];
            const memberList = this.query(dimension);
            const id = memberData[ENTITY_ID];
            const find = memberList.find( member => {
                return id === member[ENTITY_ID]
            });
            if ( !find ){
                throw new CantAddMemberRollupException(dimension, id)
            } else {
                rollupCoordinates[dimension] = find;
            }
        });

        this._validateCompletenessRollupCoordinatesData(dimension, memberOptions, rollupCoordinatesData);

        const drillDownCoordinates = {};
        this.schema.traceUp(dimension, ({dimension: currentDimension}) => {
            drillDownCoordinates[currentDimension] = this._createMember(currentDimension);
        });

        const coordinates = Object.assign({}, addedCoordinates, rollupCoordinates, drillDownCoordinates);

        // leafs
        const externals = this.schema.getExternals();

        // filter for not defined tables
        const missedDimensionTables = externals.filter(({dimension: externalDimension}) => {
            return dimension !== externalDimension && !rollupCoordinates[externalDimension]
        });

        // место куда будут складываться
        const space = new Space();

        missedDimensionTables.forEach(({dimension})=>{
            space.setMemberList(dimension, this.space.getMemberList(dimension))
        });

        const createCell = (coordinates) => {
            const dimension = this.schema.getMeasure().dimension;
            const member = this._createMember(dimension);
            const value = { [ dimension ]: member };
            const cellData = Object.assign( {}, coordinates, value );
            this._createNormalizeData(cellData);
        };

        const size = this.schema.getNames().length - 1;

        const recursivelyForEach = (dimensions, membersList, index, coordinates) => {
            const dimensionsLength = dimensions.length;
            const currentDimension = dimensions[index];
            const cells = [];
            const parentDimensionTable = this.schema.getByDependency(currentDimension);

            membersList[index].forEach( member => {
                const coordinatesCopy = Object.assign({}, coordinates);
                coordinatesCopy[currentDimension] = member;

                if (parentDimensionTable){
                    // debugger;
                    const members = this.query(parentDimensionTable.dimension, { [currentDimension]: member });

                    recursivelyForEach([parentDimensionTable.dimension], [members], 0, coordinatesCopy);
                }

                if ( (index + 1) === dimensionsLength ){
                    if ( Object.keys(coordinatesCopy).length ===  size ){
                        cells.push(coordinatesCopy)
                    }
                } else {
                    recursivelyForEach(dimensions, membersList, index + 1, coordinatesCopy);
                }
            });

            cells.forEach((cellOptions)=>{
                createCell(cellOptions)
            })
        };

        const dimensions = space.getDimensionList();
        const membersList = dimensions.map(dimension => space.getMemberList(dimension));
        recursivelyForEach(dimensions, membersList, 0, coordinates);
    }
    _validateDimension(dimension){
        const measureDimension = this.schema.getMeasure().dimension;
        if (dimension === measureDimension){
            throw new AddDimensionOfCellException(dimension)
        }
    }
    _validateCompletenessRollupCoordinatesData(dimension, memberOptions, rollupCoordinatesData){
        const addSpaceOptions = {
            [dimension]: memberOptions,
            ...rollupCoordinatesData
        };

        const childDimensionList = this.schema.getPostOrderChildDimensionList(dimension);

        if (childDimensionList.length){
        	const first = childDimensionList[0];

        	// first parent define one member
        	if (addSpaceOptions[first]){
        		return;
	        } else {
		        throw new NotCompletelySpaceException(first)
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
        // "development"
        // if (report.length){
        //     console.log('broken links:', report)
        // }
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

        result[dimension] = this._createMember(dimension, memberOptions);

        this.schema.traceUp(dimension, ({dimension}) => {
            result[dimension] = this._createMember(dimension);
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


}

export default DynamicCube;