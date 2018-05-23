import InputCell from './InputCell.js'
import {ENTITY_ID} from './const.js'
import Member from './Member.js'
import InputMember from './InputMember.js'
import DimensionTree from './DimensionTree.js'
import FactTable from './FactTable.js'
import QueryAdapter from './QueryAdapter.js'
import {
	NotCompletelySpaceException,
	CantAddMemberRollupException,
	CreateInstanceException
} from './errors.js';
import SnowflakeBuilder from './SnowflakeBuilder.js'
import console from './console.js'
import CellTable from './CellTable.js'
import TupleTable from './TupleTable.js'
import Space from './Space.js'

/**
 * It a means to retrieve data
 *
 * Base class for normalizing a denormalized data array
 * and analyzing query according to a given scheme
 *
 * @param {{snowflake, dimensionHierarchies}|Cube} factTable - facts which will be subject to analysis
 * */
class Cube {
	constructor(options) {
		const {dimensionHierarchies, cellTable} = options;
		this.dimensionHierarchies = dimensionHierarchies.map(dimensionTree=>{
			return DimensionTree.createDimensionTree(dimensionTree)
		});
		this.cellTable = new CellTable(cellTable);

		// const residuals = this.residuals();
		// const count = residuals.length;
		// if (count > 0){
		// 	console.warn('Fact table has residuals', residuals)
		// }
	}
	/**
	 * @public
	 * Fabric method for creating cube from facts and dimensionHierarchiesData data
	 * @param {object} dimensionHierarchiesData
	 * @param {object[]} facts
	 * @return {Cube}
	 * */
	static create(facts, dimensionHierarchiesData) {
		if (!(DynamicCube.isPrototypeOf(this) || DynamicCube === this)) {
			throw new CreateInstanceException()
		}

		const dimensionHierarchies = dimensionHierarchiesData.map(dimensionTree=>{
			return DimensionTree.createDimensionTree(dimensionTree)
		});
		const factTable = new FactTable(facts);

		const cellTable = new CellTable(factTable);

		SnowflakeBuilder.anotherBuild(factTable, cellTable, dimensionHierarchies);

		const cube = new this({dimensionHierarchies, cellTable});
		return cube;
	}
	/**
	 * @public
	 * */
	addFacts(facts) {
		facts.forEach(this.addFact)
	}
	/**
	 * @public
	 * */
	addFact() {

	}
	/**
	 * @public
	 * @return {FactTable} returns members
	 * */
	getFacts() {
		return this.denormalize(this.getMeasure());
	}
	/**
	 * @public
	 * @param {string} dimension - dimension from which the member will be found
	 * @return {Member[]} returns members
	 * */
	getDimensionMembers(dimension) {
		return this.getSpace()[dimension]
	}
	/**
	 * @public
	 * @param {object} fixSpaceOptions - the composed aggregate object, members grouped by dimension names
	 * @return {FactTable} returns members
	 * */
	getFactsBySet(fixSpaceOptions) {
		return this.denormalize(this.getMeasureBySet(fixSpaceOptions));
	}
	/**
	 * @public
	 * */
	getMeasure() {
		return this.cellTable;
	}
	/**
	 * @public
	 * */
	getMeasureBySet(fixSpaceOptions){
		let { cellTable } = this.projection(fixSpaceOptions);
		return cellTable;
	}
	/**
	 * @public
	 * @param {string} dimension - dimension from which the member will be found
	 * @param {object} fixSpaceOptions - the composed aggregate object, members grouped by dimension names
	 * @return {Member[]} returns members
	 * */
	getDimensionMembersBySet(dimension, fixSpaceOptions){
		let { cellTable } = this.projection(fixSpaceOptions);
		return this.getDimensionMembersFromCells(dimension, cellTable);
	}
	/**
	 * @private
	 * */
	getSpace() {
		const space = {};
		this.dimensionHierarchies.forEach(dimensionHierarchy=>{
			const dimensionSpace = dimensionHierarchy.getSpace();
			Object.assign(space, dimensionSpace)
		});
		return space;
	}
	/**
	 * @private
	 * */
	projection(fixSpaceOptions) {
		if (!fixSpaceOptions) {
			return;
		}
		let cellTable = this.getMeasure();

		const queryAdapter = new QueryAdapter();
		queryAdapter.applyAdapter(fixSpaceOptions, this.getSpace());

		if (Object.keys(fixSpaceOptions).length === 0) {
			return {cellTable};
		}

		const fixSpace = {};
		Object.keys(fixSpaceOptions).forEach(dimension=>{
			fixSpace[dimension] = Array.isArray(fixSpaceOptions[dimension])
				? fixSpaceOptions[dimension]
				: [fixSpaceOptions[dimension]];
		});

		// для каждого измерения
		const totalSpaces = Object.keys(fixSpace).map(dimension=>{

			// ищется его расширенная версия для каждого члена
			const spacesForCells = fixSpace[dimension].map(member => {

				let searchedInTree = this.searchDimensionTreeByDimension(dimension);

				const treeProjection = searchedInTree.recoveryTreeProjectionOfMember(dimension, member);
				const {
					dimension: dimensionProjection,
					members: membersProjection
				} = treeProjection.getRoot().getTreeValue();

				return { [dimensionProjection]: membersProjection };
			});

			// после чего эти расширенные версии объекдиняются
			const totalSpace = Space.union(...spacesForCells);

			return totalSpace;
		});

		// фильтрация продолжается
		let filteredCellTable = cellTable;

		totalSpaces.forEach(space => {
			// и ищутся те ячейки, которые принадлежат получившейся области
			filteredCellTable = filteredCellTable.filter(cell=>{
				return this.cellBelongsToSpace(cell, space)
			});
		});

		return { cellTable: filteredCellTable };
	}
	/**
	 * @private
	 * */
	cellBelongsToSpace(cell, space) {
		const somePropOfCellNotBelongToSpace = Object.keys(space).some(dimension => {
			const members = space[dimension];
			const idAttribute = Cube.genericId(dimension);
			const finded = members.find(member=>{
				return member[ENTITY_ID] === cell[idAttribute]
			});
			return !finded;
		});
		return !somePropOfCellNotBelongToSpace;
	}
	/**
	 * @private
	 * Поиск по всем иерархиям
	 * */
	searchDimensionTreeByDimension(dimension) {
		let findDimensionTree;
		this.dimensionHierarchies.forEach(dimensionTree =>{
			const searchedDimensionTree = dimensionTree.searchValueDimension(dimension);
			if (searchedDimensionTree) {
				findDimensionTree = dimensionTree.searchValueDimension(dimension);
			}
		});
		return findDimensionTree;
	}
	/**
	 * @private
	 * */
	getDimensionMembersFromCells(dimension, cells) {
		const searchedDimensionTree = this.searchDimensionTreeByDimension(dimension);
		let rootMembers;
		let rootDimension;

		if (searchedDimensionTree.isRoot()) {
			rootMembers = searchedDimensionTree.getTreeValue().members;
			rootDimension = searchedDimensionTree.getTreeValue().dimension;
		} else {
			rootMembers = searchedDimensionTree.getRoot().getTreeValue().members;
			rootDimension = searchedDimensionTree.getRoot().getTreeValue().dimension;
		}

		const idAttribute = Cube.genericId(rootDimension);
		const members = [];

		cells.forEach(cell => {
			rootMembers.forEach(rootMember => {
				if (cell[idAttribute] === rootMember[ENTITY_ID]) {
					if (members.indexOf(rootMember) === -1) {
						members.push(rootMember)
					}
				}
			})
		});

		if (searchedDimensionTree.isRoot()) {
			return members
		} else {
			let lastMembers = members;
			let end = false;
			let lastDimension = rootDimension;
			searchedDimensionTree.getRoot().tracePreOrder((nodeValue, tree)=>{
				if (tree.isRoot()) {
					return;
				}
				if (!end) {
					lastMembers = searchedDimensionTree.rollUpDimensionMembers(lastDimension, lastMembers)
					lastDimension = nodeValue.dimension;
				}
				if (nodeValue.dimension === dimension){
					end = true;
				}
			});
			return lastMembers;
		}
	}
	/**
	 * @public
	 * Cartesian product - list of all possible tuples
	 * */
	cartesian() {
		const f = (a, b) => [].concat(...a.map(d => {
			return b.map(e => {
				return [].concat(d, e)
			})
		}));

		const cartesian = (a, b, ...c) => {
			return b ? cartesian(f(a, b), ...c) : a
		};

		const dimensionsOrder = [];

		const sett = this.dimensionHierarchies.map(tree => tree.getTreeValue()).map(dimensionTable => {
			dimensionsOrder.push(dimensionTable.dimension);
			return dimensionTable.members;
		});

		const res = cartesian.apply(null, sett);

		const tupleTable = new TupleTable();

		res.forEach(arr => {
			const item = {};
			dimensionsOrder.forEach((dimension, index) => {
				item[dimension] = arr[index]
			});

			tupleTable.addTuple(item);

			return item;
		});

		return tupleTable;
	}
	/**
	 * @private
	 * Get facts from cube
	 * */
	denormalize(cells = this.getMeasure()) {
		return SnowflakeBuilder.destroy(cells, this.dimensionHierarchies)
	}
	/**
	 * @public
	 * Residuals - list of tuples, according to which there is more than one member
	 * */
	residuals() {
		const tuples = this.cartesian();
		const totalFacts = [];
		tuples.forEach(tuple => {
			const partFacts = this.getFactsBySet(tuple);
			if (partFacts.length > 1) {
				totalFacts.push(tuple)
			}
		});
		return totalFacts;
	}
	/**
	 * @private
	 * A way to create a name for a property in which a unique identifier will be stored
	 * */
	static genericId(entityName) {
		return entityName + '_' + ENTITY_ID;
	}
}

/**
 * Interface providing special methods for the possibility of changing the data in Cube
 * */
class DynamicCube extends Cube {
	/**
	 * @public
	 * @param {string} dimension - dimension in which the member is created
	 * @param {object?} memberOptions - properties for the created member
	 * @param {object?} rollupCoordinatesData
	 * @param {object?} drillDownCoordinatesOptions
	 * @param {object?} measureData
	 * */
	addDimensionMember(dimension, memberOptions = {}, rollupCoordinatesData = {}, drillDownCoordinatesOptions = {}, measureData){
		if (typeof dimension !== 'string') {
			throw TypeError(`parameter dimension expects as string: ${dimension}`)
		}

		const rollupCoordinates = {};
		Object.keys(rollupCoordinatesData).forEach(dimension => {
			const memberData = rollupCoordinatesData[dimension];
			const memberList = this.getDimensionMembers(dimension);
			const id = memberData[ENTITY_ID];
			const find = memberList.find(member => {
				return id === member[ENTITY_ID]
			});
			if (!find) {
				throw new CantAddMemberRollupException(dimension, id)
			} else {
				rollupCoordinates[dimension] = find;
			}
		});

		// todo валидацию
		// this._validateCompletenessRollupCoordinatesData(dimension, memberOptions, rollupCoordinatesData);

		const tree = this.searchDimensionTreeByDimension(dimension);

		const childs = tree.getChildTrees();
		childs.forEach(tree => {
			const { dimension } = tree.getTreeValue();
			const member = rollupCoordinatesData[dimension];
			if (!member) {
				throw new CantAddMemberRollupException(dimension)
			} else {
				memberOptions[Cube.genericId(dimension)] = member[ENTITY_ID];
			}
		});

		let saveMember = this._createMember(tree, memberOptions);
		let saveDimension = dimension;

		tree.traceUpOrder((tracedTree)=>{
			if (tree !== tracedTree) {
				const { dimension: parentDimension } = tracedTree.getTreeValue();
				const drillDownCoordinatesData = { [Cube.genericId(saveDimension)]: saveMember[ENTITY_ID] };
				Object.assign(drillDownCoordinatesData, drillDownCoordinatesOptions[parentDimension]);
				saveMember = this._createMember(tracedTree, drillDownCoordinatesData);
				saveDimension = parentDimension;
			}
		});

		this.fill(measureData);
	}
	/**
	 * @public
	 * @param {string} dimension - dimension from which the member will be removed
	 * @param {Member} member - the member will be removed
	 * */
	removeDimensionMember(dimension, member) {
		const dimensionTree = this.searchDimensionTreeByDimension(dimension);
		const endToBeRemoved = dimensionTree.removeDimensionMember(dimension, member);

		const measures = this.getMeasure();
		const getRemoveMeasures = (dimension, members)=>{
			const removedMeasures = [];
			const idAttribute = Cube.genericId(dimension);
			measures.forEach(measure => {
				members.forEach((member)=>{
					if (measure[idAttribute] == member[ENTITY_ID]) {
						removedMeasures.push(measure)
					}
				})
			});
			return removedMeasures;
		};

		Object.keys(endToBeRemoved).map(dimension =>{
			const removedMeasures = getRemoveMeasures(dimension, endToBeRemoved[dimension]);

			removedMeasures.forEach(measure=>{
				measures.removeCell(measure);
			})
		})
	}
	/**
	 * @private
	 * */
	_validateCompletenessRollupCoordinatesData(dimension, memberOptions, rollupCoordinatesData){
		// const addSpaceOptions = {
		// 	[dimension]: memberOptions,
		// 	...rollupCoordinatesData
		// };
		//
		// const dimensionHierarchy = this.schema.getDimensionHierarchy(dimension);
		//
		// if (dimensionHierarchy.length){
		// 	dimensionHierarchy.forEach( dimension => {
		// 		if ( !addSpaceOptions[dimension]){
		// 			throw new NotCompletelySpaceException(dimension)
		// 		}
		// 	});
		// }
	}
	/**
	 * @private
	 * Get data without random identifiers
	 * */
	denormalize(cells = this.getMeasure(), forSave = true) {
		const data = super.denormalize(cells);
		if (forSave) {
			data.forEach((data, index) => {
				if (cells[index] instanceof InputCell) {
					delete data[ENTITY_ID];
				}
			})
		}
		return data;
	}
	/**
	 * @public
	 * Filling method for full size of cube
	 * @param {object?} props - properties for empty cells
	 * */
	fill(props) {
		if (!this.residuals().length) {
			const tuples = this.cartesian();
			tuples.forEach(combination => {
				const unique = this.getMeasureBySet(combination);
				if (!unique.length) {
					this._createNormalizeData(combination, props);
				}
			});
		}
	}
	/**
	 * @public
	 * Unfilled - list of tuples, in accordance with which there is not a single member
	 * */
	unfilled() {
		const tuples = this.cartesian();
		const unfilled = [];

		tuples.forEach(tuple => {
			const members = this.getFactsBySet(tuple);
			if (members.length === 0) {
				unfilled.push(tuple)
			}
		});
		return unfilled;
	}
	/**
	 * @private
	 * */
	_createNormalizeData(obj, props) {
		let options = {};
		Object.keys(obj).forEach(key => {
			options[Cube.genericId(key)] = obj[key][ENTITY_ID]
		});
		options = {...options, ...props};
		const newNormaliseData = new InputCell(options);
		this.getMeasure().addCell(newNormaliseData);
	}
	/**
	 * @private
	 * @param {Tree} tree
	 * @param {object?} props
	 * */
	_createMember(tree, props = {}) {
		const space = this.getSpace();
		const {keyProps, dimension} = tree.getTreeValue();
		const childDimensions = tree.getChildTrees().map(tree => tree.getTreeValue().dimension);
		const linkProps = [];
		childDimensions.forEach(dimension => {
			linkProps.push(Cube.genericId(dimension))
		});
		const id = DynamicCube.reduceId(space[dimension]);
		const member = InputMember.create(id, keyProps.concat(linkProps), props);
		space[dimension].addMember(member);
		return member;
	}
	/**
	 * @private
	 * Method of generating a unique identifier within the selected space
	 * */
	static reduceId(array) {
		if (array.length) {
			return array.reduce((acc, curValue) => {
				return acc[ENTITY_ID] > curValue[ENTITY_ID] ? acc : curValue;
			}, 0).id + 1
		} else {
			return 1;
		}
	}
}

export default DynamicCube
