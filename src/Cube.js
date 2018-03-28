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

		const count = this.residuals().length;
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
	 * @deprecated
	 * */
	query(dimension, fixSpaceOptions, raw = false){
		const args = [].slice.call(arguments);
		if (args.length > 0 && args[0]){
			if (typeof args[0] === "object"){
				fixSpaceOptions = args[0];
				dimension = null;
			}
		}

		let cells = this.filterCells(fixSpaceOptions);

		if (!dimension){
			return raw ? cells : this.denormalize(cells);
		} else {
			return this.getDimensionMembersFromCells(dimension, cells);
		}
	}
	/**
	 * @public
	 * */
	getFacts(){
		return this.facts;
	}
	/**
	 * @public
	 * */
	getDimensionMembers(dimension){
		this.space.getMemberList(dimension)
	}
	/**
	 * @public
	 * */
	getFactsBySet(fixSpaceOptions, raw = false){
		let cells = this.filterCells(fixSpaceOptions);
		return raw ? cells : this.denormalize(cells);
	}
	/**
	 * @public
	 * */
	getDimensionMembersBySet(dimension, fixSpaceOptions){
		let cells = this.filterCells(fixSpaceOptions);
		return this.getDimensionMembersFromCells(dimension, cells);
	}
	/**
	 * @private
	 * */
	filterCells(fixSpaceOptions){
		let cells = this.cellTable;

		if (fixSpaceOptions){
			const queryAdapter = new QueryAdapter();
			queryAdapter.applyAdapter(fixSpaceOptions, this.space);
			const fixSpace = new FixSpace(fixSpaceOptions);
			cells = fixSpace.match(cells)
		}

		return cells;
	}
	/**
	 * @private
	 * */
	getDimensionMembersFromCells(dimension, cells){
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

	/**
	 * Get facts from cube
	 * @private
	 * */
	denormalize(cells = this.cellTable){
		return this.star.denormalize(cells)
	}

	/**
	 * Cartesian product - list of all possible tuples
	 * @public
	 * */
	cartesian(){
		const branches = this.schema.getBranches();

		const f = (a, b) => [].concat(...a.map(d => {
			return b.map(e => {
				return [].concat(d, e)
			})
		}));

		const cartesian = (a, b, ...c) => {
			return b ? cartesian(f(a, b), ...c) : a
		};

		const sets = branches.map(branch => {
			const dimensions = branch.map(({ dimension }) => dimension).reverse();
			if (dimensions.length > 1) {

				const acc = [];

				const reqursive = (dimensions, index, space = {}) => {
					const dimension = dimensions[index];
					index = index + 1;
					this.query(dimension, space).map((item) => {
						const newSpace = Object.assign({}, space);
						newSpace[dimension] = item;
						if (index === dimensions.length) {
							acc.push(newSpace);
						} else {
							reqursive(dimensions, index, newSpace);
						}
					});
				};

				reqursive(dimensions, 0);

				return acc;
			} else {
				return [].concat(this.query( dimensions[0] )).map( member => {
					return { [dimensions[0]]: member }
				})
			}
		});

		const res = cartesian.apply(null, sets);

		const items = res.map(arr => arr.reduce( (acc, arr) => {
			return Object.assign(acc, arr);
		}, {}));

		const tupleTable = new TupleTable();

		items.forEach( item => {
			tupleTable.add(item)
		});

		return tupleTable;
	}

	/**
	 * Residuals - list of tuples, according to which there is more than one member
	 * @public
	 * */
	residuals(){
		const tuples = this.cartesian();
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
	 * Unfilled - list of tuples, in accordance with which there is not a single member
	 * @public
	 * */
	unfilled(){
		const tuples = this.cartesian();
		const unfilled = [];

		tuples.forEach( (tuple) => {
			const members = this.query(tuple);
			if (members.length === 0 ){
				unfilled.push(tuple)
			}
		});
		return unfilled;
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
	addDimensionMember(dimension, memberOptions = {}, rollupCoordinatesData = {}){
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
	removeDimensionMember(dimension, member){
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
	 * @private
	 * */
	denormalize(cells = this.cellTable, forSave = true){
		const data = super.denormalize(cells);
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
		if (!this.residuals().length){
			const measureName = this.schema.getMeasure().dimension;
			const tuples = this.cartesian();
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