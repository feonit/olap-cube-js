import EmptyCell from './EmptyCell.js'
import Member from './Member.js'
import DimensionTree from './DimensionTree.js'
import DimensionHierarchy from './DimensionHierarchy.js'
import DimensionTable from './DimensionTable.js'
import {
	InsufficientRollupData,
} from './errors.js';
import SnowflakeBuilder from './SnowflakeBuilder.js'
import console from './console.js'
import Tuple from './Tuple.js'
import Space from './Space.js'
import Cell from './Cell.js'
import { DEFAULT_FACT_ID_PROP } from './const.js'
import isPlainObject from "./isPlainObject.js"
import {NotFoundFactId} from "./errors.js";

/**
 * It a means to retrieve data
 *
 * Base class for normalizing a denormalized data array
 * and analyzing query according to a given scheme
 *
 * */
class Cube {
	/**
	 * @param {object | Cube} cube
	 * @throw {TypeError}
	 * */
	constructor(cube = {}) {
		if (!(isPlainObject(cube) || cube instanceof Cube)){
			throw TypeError('The argument must be plain object or instance of Cube')
		}
		let {
			dimensionHierarchies = [],
			cellTable = [],
			defaultFactOptions = {},
			factPrimaryKey = DEFAULT_FACT_ID_PROP
		} = cube;

		this.defaultFactOptions = defaultFactOptions;
		this.factPrimaryKey = factPrimaryKey;

		this.dimensionHierarchies = dimensionHierarchies.map(dimensionHierarchy => {
			// duck
			if (dimensionHierarchy.hierarchy) {
				if (dimensionHierarchy instanceof DimensionHierarchy) {
					return dimensionHierarchy;
				} else {
					return DimensionHierarchy.createDimensionHierarchy(dimensionHierarchy);
				}
			} else if (dimensionHierarchy.dimensionTable) {
				if ( dimensionHierarchy instanceof DimensionTree ){
					return dimensionHierarchy;
				} else {
					return DimensionTree.createDimensionTree(dimensionHierarchy);
				}
			} else {
				if (dimensionHierarchy instanceof DimensionTable) {
					return dimensionHierarchy;
				} else {
					return DimensionTable.createDimensionTable(dimensionHierarchy);
				}
			}
		});

		this.cellTable = cellTable.map(cellData => {
			if (cellData instanceof Cell) {
				return cellData
			} else {
				return EmptyCell.isEmptyCell(cellData) ? new EmptyCell(cellData) : new Cell(cellData)
			}
		});

		// const residuals = residuals(this);
		// const count = residuals.length;
		// if (count > 0) {
		// 	console.warn('Fact table has residuals', residuals)
		// }
	}
	/**
	 * is the act of picking a rectangular subset of a cube by choosing a single value
	 * for one of its dimensions, creating a new cube with one fewer dimension.
	 * @public
	 * @param {string} dimension
	 * @param {Member} member
	 * @return {Cube}
	 * */
	slice(dimension, member) {
		return this.dice({ [dimension]: member })
	}
	/**
	 * @public
	 * @param {object} set
	 * @return {Cube}
	 * @throw {TypeError}
	 * @throw {RangeError}
	 * */
	dice(set) {
		if (!(isPlainObject(set) || set instanceof Tuple)){
			throw TypeError("The argument must be a plain object")
		}
		
		// always work with arrays as value
		const toMultiset = (value) => {
			return Array.isArray(value) ? value : [value];
		};
		
		// change member data to original member objects
		const toOriginal = (membersData, dimension) => {
			const dimensionTree = getDimensionTreeByDimension.call(this, dimension);
			const dimensionTable = dimensionTree.getTreeValue();
			const members = dimensionTable.members;
			//replace memberData with original members
			membersData.forEach((memberData, index) => {
				let member = members.find(member => dimensionTable.getMemberPrimaryKey(member) === dimensionTable.getMemberPrimaryKey(memberData));
				if (!member) {
					throw RangeError(`Not found member by id ${dimensionTable.getMemberPrimaryKey(member)}`)
				}
				if (membersData instanceof Member){
					return;
				}
				membersData[index] = member;
			});
			return membersData;
		};
		
		const originalMultiset = {};
		Object.keys(set).forEach((dimension) => {
			let value = set[dimension];
			value = toMultiset(value);
			value = toOriginal(value, dimension);
			originalMultiset[dimension] = value;
		});
		
		const dimensions = Object.keys(originalMultiset);
		
		// 1 make one projection on to member
		const dimensionHierarchiesLength = this.dimensionHierarchies.length;
		if (dimensions.length > dimensionHierarchiesLength) {
			throw Error(`Set must have a size not more than ${dimensionHierarchiesLength} dimensions`)
		}

		const projectionDimensionHierarchies = [];

		// for every dimension in set
		const totalSpaces = dimensions.map(dimension => {

			let dimensionTreeProjection;
			const members = originalMultiset[dimension];
			// ищется его расширенная версия для каждого члена
			const spacesForCells = members.map(member => {

				let searchedInTree = getDimensionTreeByDimension.call(this, dimension);

				const current = searchedInTree.cloneDimensionTreeWithoutMembers();

				searchedInTree.projectDrillDown(current, member);
				searchedInTree.projectDrillUp(current, member);

				if (dimensionTreeProjection){
					dimensionTreeProjection.unionDimensionTree(current)
				} else {
					dimensionTreeProjection = current;
				}
				const {
					dimension: dimensionProjection,
					members: membersProjection
				} = dimensionTreeProjection.getRoot().getTreeValue();

				return { [dimensionProjection]: membersProjection };
			});

			if (dimensionTreeProjection){
				projectionDimensionHierarchies.push(dimensionTreeProjection);
			}

			// после чего эти расширенные версии объекдиняются
			const totalSpace = Space.union(...spacesForCells);

			return totalSpace;
		});

		// фильтрация продолжается
		let filteredCellTable = this.getCells();

		const cellBelongsToSpace = (cell, space) => {
			const somePropOfCellNotBelongToSpace = Object.keys(space).some(dimension => {
				const members = space[dimension];
				const { foreignKey, primaryKey } = getDimensionTreeByDimension.call(this, dimension).getTreeValue();
				const finded = members.find(member => {
					return member[primaryKey] === cell[foreignKey]
				});
				return !finded;
			});
			return !somePropOfCellNotBelongToSpace;
		};

		totalSpaces.forEach(space => {
			// и ищутся те ячейки, которые принадлежат получившейся области
			filteredCellTable = filteredCellTable.filter(cell => {
				return cellBelongsToSpace(cell, space)
			});
		});

		// 2 create new list of dimensionHierarchies
		const newDimensionHierarchies = [];
		this.dimensionHierarchies.forEach(originalDimensionHierarchy => {
			let finded = false;
			projectionDimensionHierarchies.forEach(projectionDimensionHierarchy => {
				if (originalDimensionHierarchy.getTreeValue().dimension === projectionDimensionHierarchy.getTreeValue().dimension) {
					newDimensionHierarchies.push(projectionDimensionHierarchy);
					finded = true;
				}
			});
			if (!finded) {
				const { members, dimension } = originalDimensionHierarchy.getTreeValue();
				const projectionDimensionHierarchy = DimensionTree.createProxyDimensionTree(originalDimensionHierarchy);
				members.forEach(member => {
					let memberBelongToCells = false;
					filteredCellTable.forEach(filteredCell => {
						if (cellBelongsToSpace(filteredCell, { [dimension]: [member] })) {
							memberBelongToCells = true;
						}
					});
					if (!memberBelongToCells) {
						let has = projectionDimensionHierarchy.getTreeValue().members.indexOf(member) !== -1;
						if (has) {
							projectionDimensionHierarchy.removeProjectionOntoMember(member)
						}
					}
				});

				newDimensionHierarchies.push(projectionDimensionHierarchy);
			}
		});

		return new SubCube({
			cellTable: filteredCellTable,
			dimensionHierarchies: newDimensionHierarchies,
			originalCube: this.originalCube || this,
			previousCube: this
		})
	}
	/**
	 * The cube introduces generalization relations
	 * it's operations on dimension hierarchies
	 * @public
	 * @param {string} hierarchy
	 * @param {string} targetDimension
	 * @return {Cube}
	 * */
	drillUp(hierarchy, targetDimension) {
		const currentHierarchy = getHierarchy.call(this, hierarchy);
		if (currentHierarchy && currentHierarchy.hasDimension(targetDimension)) {
			currentHierarchy.setActiveDimension(targetDimension);
		}
		return this;
	}
	/**
	 * The cube introduced specialization relations
	 * it's operations on dimension hierarchies
	 * @public
	 * @param {string} hierarchy
	 * @param {string} targetDimension
	 * @return {Cube}
	 * */
	drillDown(hierarchy, targetDimension) {
		const currentHierarchy = getHierarchy.call(this, hierarchy);
		if (currentHierarchy && currentHierarchy.hasDimension(targetDimension)) {
			currentHierarchy.setActiveDimension(targetDimension);
		}
		return this;
	}
	/**
	 * @public
	 * @return {Fact[]} returns facts
	 * */
	getFacts() {
		return denormalize.call(this, this.getCells());
	}
	/**
	 * @public
	 * @param {Object[]} facts
	 * @throw {TypeError}
	 * @return {Cube}
	 * */
	addFacts(facts) {
		if (!Array.isArray(facts)){
			throw TypeError('The argument must be instance of Array')
		}
		facts.forEach(validateFactData.bind(null, this.factPrimaryKey));
		const cells = facts.map(fact => new Cell(fact));
		[].push.apply(this.getCells(), cells);
		const factTable = this.getFacts();
		SnowflakeBuilder.anotherBuild(factTable, cells, getDimensionTrees.call(this), this.getCells(), this.factPrimaryKey);
		return this;
	}
	/**
	 * @public
	 * @param {Object[]} facts
	 * @throw {TypeError}
	 * */
	removeFacts(facts) {
		if (!Array.isArray(facts)){
			throw TypeError('The argument must be instance of Array')
		}
		const cellTable = this.getCells();
		const factPrimaryKey = this.factPrimaryKey;
		const removedCells = facts.map(fact => {
			return cellTable.find(cell => cell[factPrimaryKey] === fact[factPrimaryKey])
		});
		this.removeCells(removedCells);
	}
	/**
	 * @public
	 * @return {Cell[]}
	 * */
	getCells() {
		return this.cellTable;
	}
	/**
	 * @public
	 * @param {Cell[]} cells
	 * @throw {TypeError}
	 * */
	removeCells(cells) {
		if (!Array.isArray(cells)){
			throw TypeError('The argument must be instance of Array')
		}
		cells.forEach((cell) => {
			if (!(cell instanceof Cell)){
				throw TypeError('The list of cells must contain only instances of Cell and EmptyCell')
			}
		});
		SnowflakeBuilder.destroy(this.getCells(), cells, this.dimensionHierarchies, this);
	}
	/**
	 * @public
	 * @param {string} dimension - dimension from which the member will be found
	 * @return {Member[]} returns members
	 * @throw {TypeError}
	 * */
	getDimensionMembers(dimension) {
		if (!(typeof dimension === 'string')){
			throw TypeError('The first argument must be string')
		}
		const dimensionTree = getDimensionTreeByDimension.call(this, dimension);
		return dimensionTree.getTreeValue().members;
	}
	/**
	 * @public
	 * @param {string} dimension - dimension in which the member is created
	 * @param {object?} customMemberOptions - properties for the created member
	 * @param {object?} rollupCoordinatesData
	 * @param {object?} drillDownCoordinatesOptions
	 * @param {object?} cellData
	 * @throw {InsufficientRollupData}
	 * */
	addDimensionMember(dimension, customMemberOptions = {}, rollupCoordinatesData = {}, drillDownCoordinatesOptions = {}, cellData = {}) {
		if (!(typeof dimension === 'string')){
			throw TypeError('The first argument must be instance of string')
		}
		if (!(
			isPlainObject(customMemberOptions)
			&& isPlainObject(rollupCoordinatesData)
			&& isPlainObject(drillDownCoordinatesOptions)
			&& isPlainObject(cellData)
		)){
			throw TypeError('The arguments after the first must be plain objects')
		}
		
		// todo №1, а если члены с такими ключами уже существуют, нужнен варнинг, потому что, после десериализации член исчезнет, если не будут изменены значения ключевых полей
		const rollupCoordinates = {};
		Object.keys(rollupCoordinatesData).forEach(dimension => {
			const memberData = rollupCoordinatesData[dimension];
			const memberList = this.getDimensionMembers(dimension);
			const dimensionTable = getDimensionTreeByDimension.call(this, dimension).getTreeValue();
			const { primaryKey } = dimensionTable;
			const id = memberData[primaryKey];
			const find = memberList.find(member => {
				return id === dimensionTable.getMemberPrimaryKey(member)
			});
			if (!find) {
				throw new InsufficientRollupData(dimension, id)
			} else {
				rollupCoordinates[dimension] = find;
			}
		});
		const dimensionTree = getDimensionTreeByDimension.call(this, dimension);
		const childDimensionTrees = dimensionTree.getChildTrees();
		const dimensionTable = dimensionTree.getTreeValue();
		const { foreignKey } = dimensionTable;
		const foreignKeysMemberData = {};
		childDimensionTrees.forEach(childDimensionTree => {
			const dimensionTable = childDimensionTree.getTreeValue();
			const { dimension, foreignKey, primaryKey } = dimensionTable;
			const member = rollupCoordinatesData[dimension];
			if (!member) {
				throw new InsufficientRollupData(dimension)
			} else {
				foreignKeysMemberData[foreignKey] = member[primaryKey];
			}
		});
		// todo проверить, что customMemberOptions не содержит внешних ключей
		const memberOptions = Object.assign({}, customMemberOptions, foreignKeysMemberData);

		let saveMember = dimensionTree.createMember(memberOptions);
		let saveIdAttribute = foreignKey;
		dimensionTree.traceUpOrder((tracedDimensionTable, tracedDimensionTree) => {
			if (dimensionTree !== tracedDimensionTree) {
				const { dimension: parentDimension, foreignKey: parentIdAttribute } = tracedDimensionTable;
				const drillDownCoordinatesData = { [ saveIdAttribute]: dimensionTable.getMemberPrimaryKey(saveMember) };
				Object.assign(drillDownCoordinatesData, drillDownCoordinatesOptions[parentDimension]);
				saveMember = tracedDimensionTree.createMember(drillDownCoordinatesData);
				saveIdAttribute = parentIdAttribute;
			}
		});
		this.fillEmptyCells(cellData);
	}
	/**
	 * @public
	 * @param {string} dimension - dimension from which the member will be removed
	 * @param {Member} member - the member will be removed
	 * throw {TypeError}
	 * */
	removeDimensionMember(dimension, member) {
		if (!(typeof dimension === 'string')){
			throw TypeError('The first argument must be instance of string')
		}
		if (!(member instanceof Member)){
			throw TypeError('The second argument must be instance of Member')
		}
		const dimensionTree = getDimensionTreeByDimension.call(this, dimension);
		const endToBeRemoved = dimensionTree.removeProjectionOntoMember(member);
		const cellTable = this.getCells();
		const getRemoveMeasures = (dimension, members) => {
			const removedCells = [];
			const dimensionTable = dimensionTree.getDimensionTreeByDimension(dimension).getTreeValue();
			const foreignKey = dimensionTable.foreignKey;

			// todo mapFilter похоже
			cellTable.forEach(cell => {
				members.forEach(member => {
					if (cell[foreignKey] == dimensionTable.getMemberPrimaryKey(member)) {
						removedCells.push(cell)
					}
				})
			});
			return removedCells;
		};
		Object.keys(endToBeRemoved).map(dimension => {
			const removedMeasures = getRemoveMeasures(dimension, endToBeRemoved[dimension]);
			removedMeasures.forEach(cell => {
				const index = cellTable.indexOf(cell);
				if (index !== -1) {
					cellTable.splice(index, 1);
				}
			})
		})
	}
	/**
	 * @public
	 * @param {object|DimensionTree} dimensionHierarchy
	 * @throw {TypeError}
	 * */
	addDimensionHierarchy(dimensionHierarchy) {
		const dimensionTree = DimensionTree.createDimensionTree(dimensionHierarchy);
		this.dimensionHierarchies.push(
			dimensionTree
		);
		SnowflakeBuilder.anotherBuildOne(dimensionTree, this.getCells(), this.getCells(), this.getCells(), this.factPrimaryKey);
	}
	/**
	 * @public
	 * @param {DimensionTree} dimensionHierarchy
	 * */
	removeDimensionHierarchy(dimensionHierarchy) {
		if (!(dimensionHierarchy instanceof DimensionTree)){
			throw TypeError('The argument must be instance of DimensionTree')
		}
		// first remove members
		SnowflakeBuilder.destroyDimensionTree(this.getCells(), this.getCells(), dimensionHierarchy, this);
		// then target dimension hierarchy
		this.dimensionHierarchies.splice(this.dimensionHierarchies.indexOf(dimensionHierarchy), 1);
	}
	/**
	 * @public
	 * @return {EmptyCell[]}
	 * @throw {TypeError}
	 * */
	createEmptyCells(cellOptions = {}) {
		if (!isPlainObject(cellOptions)){
			throw TypeError('Cell option argument must be a pure object')
		}
		const emptyCells = [];
		const tuples = Cube.cartesian(this);
		tuples.forEach(tuple => {
			const unique = this.dice(tuple).getCells();
			if (!unique.length) {
				const foreignKeysCellData = {};
				Object.keys(tuple).forEach(dimension => {
					const dimensionTree = getDimensionTreeByDimension.call(this, dimension);
					const dimensionTable = dimensionTree.getTreeValue();
					const { foreignKey } = dimensionTable;
					foreignKeysCellData[foreignKey] = dimensionTable.getMemberPrimaryKey(tuple[dimension])
				});
				const cellData = {
					...this.defaultFactOptions,
					...cellOptions,
					...foreignKeysCellData,
				};
				// todo нужна правеврка на то, что все свойства присутствуют, для этого нужна инф-ия о именах таких полей в схеме
				const cell = EmptyCell.createEmptyCell(cellData);
				emptyCells.push(cell);
			}
		});
		return emptyCells;
	}
	/**
	 * @public
	 * @return {EmptyCell[]}
	 * */
	getEmptyCells() {
		return this.getCells().filter(cell => EmptyCell.isEmptyCell(cell))
	}
	/**
	 * @public
	 * @param {Cell} cell
	 * @return {boolean}
	 * */
	isEmptyCell(cell) {
		return EmptyCell.isEmptyCell(cell);
	}
	/**
	 * @public
	 * @param {EmptyCell[]} emptyCells
	 * @throw {TypeError}
	 * */
	addEmptyCells(emptyCells) {
		if (!Array.isArray(emptyCells)){
			throw TypeError('The argument must be instance of Array')
		}
		emptyCells.forEach((emptyCell, index) => {
			if (!this.isEmptyCell(emptyCell)) {
				throw TypeError(`Some item in list of argument is not instances of EmptyCell, index: ${index}`)
			}
		});
		[].push.apply(this.getCells(), emptyCells);
	}
	/**
	 * @public
	 * Filling method for full size of cube
	 * @param {object?} cellOptions - properties for empty cells
	 * */
	fillEmptyCells(cellOptions) {
		// todo why here residuals? add test for that
		if (!residuals(this).length) {
			const emptyCells = this.createEmptyCells(cellOptions);
			this.addEmptyCells(emptyCells);
		}
	}
	/**
	 * Check that the argument is an instance of SubCube
	 * @return {boolean}
	 * */
	isSubCube(){
		return this instanceof SubCube;
	}
	/**
	 * Cartesian product - list of all possible tuples
	 * @param {Cube} cube
	 * @return {Tuple[]}
	 * */
	static cartesian(cube) {
		if (!(cube instanceof Cube)){
			throw TypeError('The argument must be instance of Cube')
		}
		const f = (a, b) => [].concat(...a.map(d => {
			return b.map(e => {
				return [].concat(d, e)
			})
		}));
		
		const cartesian = (a, b, ...c) => {
			return b ? cartesian(f(a, b), ...c) : a
		};
		
		const dimensionsOrder = [];
		
		const set = cube.dimensionHierarchies.map(dimensionTree => dimensionTree.getTreeValue()).map(dimensionTable => {
			dimensionsOrder.push(dimensionTable.dimension);
			return dimensionTable.members;
		});
		
		const tupleList = [];
		
		let res;
		if (set.length) {
			if (set.length > 1) {
				res = cartesian.apply(null, set);
			} else {
				res = set[0].map(i => [i])
			}
			res.forEach(arr => {
				const item = {};
				dimensionsOrder.forEach((dimension, index) => {
					item[dimension] = arr[index]
				});
				tupleList.push(new Tuple(item));
				return item;
			});
		}
		
		return tupleList;
	}
}

/**
 * SubCube is the target cube whose members are members of the source cube.
 * */
class SubCube extends Cube {
	constructor({originalCube, previousCube, ...rest}){
		super(rest);
		/** link for chaining between operations */
		this.originalCube = originalCube;
		/** link for chaining between operations */
		this.previousCube = previousCube;
	}
}

/**
 * @this {Cube}
 * @return {DimensionHierarchy}
 * */
function getHierarchy(hierarchy) {
	return this.dimensionHierarchies.find(dimensionHierarchy => {
		return dimensionHierarchy.getHierarchy() === hierarchy
	});
}
/**
 * @this {Cube}
 * @return {DimensionTree}
 * */
function getDimensionTreeByDimension(dimension) {
	let findDimensionTree;
	this.dimensionHierarchies.forEach(dimensionTree => {
		const searchedDimensionTree = dimensionTree.getDimensionTreeByDimension(dimension);
		if (searchedDimensionTree) {
			findDimensionTree = dimensionTree.getDimensionTreeByDimension(dimension);
		}
	});
	if (!findDimensionTree) {
		throw RangeError(`Not existed dimension: ${dimension}`);
	}
	return findDimensionTree;
}
/**
 * @this {Cube}
 * @return {DimensionTree[]}
 * */
function getDimensionTrees() {
	return this.dimensionHierarchies.map(dimensionHierarchy => {
		return dimensionHierarchy.getDimensionTree
			? dimensionHierarchy.getDimensionTree()
			: dimensionHierarchy
	})
}
/**
 * @private
 * Get facts from cube
 * */
function denormalize(cells = this.getCells(), forSave = true) {
	const data = SnowflakeBuilder.denormalize(cells, getDimensionTrees.call(this));
	if (forSave) {
		data.forEach((data, index) => {
			if (cells[index] instanceof EmptyCell) {
				delete data[this.factPrimaryKey];
			}
		})
	}
	return data;
}
/**
 * @public
 * Residuals - list of tuples, according to which there is more than one member
 * @return {Tuple[]}
 * */
function residuals(cube) {
	const tuples = Cube.cartesian(cube);
	const totalTuples = [];
	tuples.forEach(tuple => {
		const partFacts = cube.dice(tuple).getFacts();
		if (partFacts.length > 1) {
			totalTuples.push(tuple)
		}
	});
	return totalTuples;
}
/**
 * Unfilled - list of tuples, in accordance with which there is not a single member
 * @@param {Cube} cube
 * */
function unfilled(cube) {
	const tuples = Cube.cartesian(cube);
	const unfilled = [];
	tuples.forEach(tuple => {
		const members = this.dice(tuple).getFacts(tuple);
		if (members.length === 0) {
			unfilled.push(tuple)
		}
	});
	return unfilled;
}

function validateFactData(factPrimaryKey, factData){
	if (!factData.hasOwnProperty(factPrimaryKey)) {
		throw new NotFoundFactId(factPrimaryKey)
	}
}

export default Cube