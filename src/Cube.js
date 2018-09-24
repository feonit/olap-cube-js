import EmptyCell from './EmptyCell.js'
import Member from './Member.js'
import DimensionTree from './DimensionTree.js'
import DimensionHierarchy from './DimensionHierarchy.js'
import DimensionTable from './DimensionTable.js'
import FactTable from './FactTable.js'
import {
	CantAddMemberRollupException,
	CreateInstanceException
} from './errors.js';
import SnowflakeBuilder from './SnowflakeBuilder.js'
import console from './console.js'
import Space from './Space.js'
import Cell from './Cell.js'
import { DEFAULT_FACT_ID_PROP } from './const.js'

class CellTable {
	constructor({ cells, primaryKey, defaultFactOptions = {} }) {
		this.cells = cells.map(cellData => {
			if (cellData instanceof Cell) {
				return cellData
			} else {
				return EmptyCell.isEmptyCell(cellData) ? new EmptyCell(cellData) : new Cell(cellData)
			}
		});
		this.primaryKey = primaryKey;
		this.defaultFactOptions = defaultFactOptions;
	}
}

/**
 * @this {Cube}
 * @private
 * */
function getHierarchy(hierarchy) {
	return this.dimensionHierarchies.find(dimensionHierarchy => {
		return dimensionHierarchy.getHierarchy() === hierarchy
	});
}
/**
 * It a means to retrieve data
 *
 * Base class for normalizing a denormalized data array
 * and analyzing query according to a given scheme
 *
 * @param {{snowflake, dimensionHierarchies}|Cube} factTable - facts which will be subject to analysis
 * */
class Cube {
	constructor(cube) {
		let { dimensionHierarchies = [], cellTable = {} } = cube;
		if (Array.isArray(cellTable)) {
			cellTable = { cells: cellTable };
			console.warnOnce('first argument \"cells\" as array type is deprecated now, use object for describe fact table')
		}
		const { cells = [], primaryKey = DEFAULT_FACT_ID_PROP, defaultFactOptions = {} } = cellTable;

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
		this.cellTable = new CellTable({ cells, primaryKey, defaultFactOptions: {...defaultFactOptions} });
		// const residuals = this.residuals();
		// const count = residuals.length;
		// if (count > 0) {
		// 	console.warn('Fact table has residuals', residuals)
		// }
	}
	/**
	 * @public
	 * Fabric method for creating cube from facts and dimensionHierarchiesData data
	 * @param {object} factTable
	 * @param {object} dimensionHierarchies
	 * @return {Cube}
	 * */
	static create(factTable, dimensionHierarchies = []) {
		if (Array.isArray(factTable)) {
			factTable = { facts: factTable };
			console.warnOnce('first argument \"facts\" as array type is deprecated now, use object for describe fact table')
		}
		const { facts = [], primaryKey, defaultFactOptions = {} } = factTable;
		if (!(Cube.isPrototypeOf(this) || Cube === this)) {
			throw new CreateInstanceException()
		}

		const cube = new this({
			cellTable: { primaryKey, defaultFactOptions },
			dimensionHierarchies: dimensionHierarchies,
		});

		// build 2: members
		cube.addFacts(facts);

		return cube;
	}
	/**
	 * is the act of picking a rectangular subset of a cube by choosing a single value for one of its dimensions, creating a new cube with one fewer dimension.
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
	 * */
	dice(set) {
		// 1 make one projection on to member
		const cellTable = this.getCells();
		const fixSpace = {};
		Object.keys(set).forEach(dimension => {
			fixSpace[dimension] = Array.isArray(set[dimension])
				? set[dimension]
				: [set[dimension]];

			// todo замена на оригинальные члены измерений
			const dimensionTree = this.findDimensionTreeByDimension(dimension);
			if (!dimensionTree) {
				return;
			}
			const dimensionTable = dimensionTree.getTreeValue();
			fixSpace[dimension].forEach((memberData, index) => {
				const members = this.getDimensionMembers(dimension);
				let member = members.find(member => dimensionTable.getMemberId(member) === dimensionTable.getMemberId(memberData));
				fixSpace[dimension][index] = member;
				if (!memberData) {
					console.warn(`not founded member by id ${dimensionTable.getMemberId(member)}`)
				}
			})
		});

		const dimensionHierarchiesLength = this.dimensionHierarchies.length;
		if (Object.keys(fixSpace).length > dimensionHierarchiesLength) {
			throw `set must have length: ${dimensionHierarchiesLength}`
		}

		const projectionDimensionHierarchies = [];

		// для каждого измерения
		const totalSpaces = Object.keys(fixSpace).map(dimension => {

			let dimensionTreeProjection;
			// ищется его расширенная версия для каждого члена
			const spacesForCells = fixSpace[dimension].map(member => {

				let searchedInTree = this.findDimensionTreeByDimension(dimension);

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
		let filteredCellTable = cellTable;

		const cellBelongsToSpace = (cell, space) => {
			const somePropOfCellNotBelongToSpace = Object.keys(space).some(dimension => {
				const members = space[dimension];
				const { foreignKey, primaryKey } = this.findDimensionTreeByDimension(dimension).getTreeValue();
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
				const projectionDimensionHierarchy = new DimensionTree(originalDimensionHierarchy);
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

		return new Cube({ cellTable: filteredCellTable, dimensionHierarchies: newDimensionHierarchies })
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
	 * @param {object[]} members
	 * @param {string} currentDimension
	 * @param {string?} targetDimension
	 * @deprecated as unnecessary
	 * */
	drillUpMembers(members, currentDimension, targetDimension) {
		const currentDimensionTree = this.findDimensionTreeByDimension(currentDimension);
		// first rollUp if no target
		const targetDimensionTree = targetDimension ? this.findDimensionTreeByDimension(targetDimension) : currentDimensionTree.getChildTrees()[0];
		// if cant rollUp
		if (!targetDimension && !targetDimensionTree) {
			return members;
		}
		if (!currentDimensionTree.hasChild(targetDimensionTree)) {
			return members;
		}
		let targetDimensionWasAchieved = false;
		let lastTracedDimensionTree = currentDimensionTree;
		let lastTracedMembers = members;
		currentDimensionTree.tracePreOrder((treeValue, tracedDimensionTree) => {
			if (tracedDimensionTree === currentDimensionTree) {
				return;
			}
			if (!targetDimensionWasAchieved) {
				lastTracedMembers = lastTracedDimensionTree.drillUpDimensionMembers(lastTracedMembers);
				if (targetDimensionTree === tracedDimensionTree) {
					targetDimensionWasAchieved = true;
				} else {
					lastTracedDimensionTree = tracedDimensionTree;
				}
			}
		});
		return lastTracedMembers;
	}
	/**
	 * @public
	 * @param {object[]} members
	 * @param {string} currentDimension
	 * @param {string?} targetDimension
	 * @deprecated as unnecessary
	 * */
	drillDownMembers(members, currentDimension, targetDimension) {
		const currentDimensionTree = this.findDimensionTreeByDimension(currentDimension);
		// first drillDown if no target
		const targetDimensionTree = targetDimension ? this.findDimensionTreeByDimension(targetDimension) : currentDimensionTree.getParentTree();
		// if cant drillDown
		if (!targetDimension && !targetDimensionTree) {
			return members;
		}
		if (!currentDimensionTree.hasParent(targetDimensionTree)) {
			return members;
		}
		let targetDimensionWasAchieved = false;
		let lastTracedDimensionTree = currentDimensionTree;
		let lastTracedMembers = members;
		currentDimensionTree.traceUpOrder((tracedDimensionTree) => {
			if (tracedDimensionTree === currentDimensionTree) {
				return;
			}
			if (!targetDimensionWasAchieved) {
				lastTracedMembers = lastTracedDimensionTree.drillDownDimensionMembers(lastTracedMembers);
				if (targetDimensionTree === tracedDimensionTree) {
					targetDimensionWasAchieved = true;
				} else {
					lastTracedDimensionTree = tracedDimensionTree;
				}
			}
		});
		return lastTracedMembers;
	}
	/**
	 * @public
	 * @param {Object[]} facts
	 * */
	addFacts(facts) {
		const newFactTable = new FactTable({facts, primaryKey: this.cellTable.primaryKey});
		const cells = newFactTable.getFacts().map(fact => new Cell(fact));
		[].push.apply(this.getCells(), cells);
		const factTable = this.getFacts();
		SnowflakeBuilder.anotherBuild(factTable, cells, this._getDimensionTrees(), this.getCells(), this.cellTable.primaryKey);
	}
	/**
	 * @public
	 * @param {Object[]} facts
	 * */
	removeFacts(facts) {
		const cellTable = this.getCells();
		const primaryKey = this.cellTable.primaryKey;
		const removedCells = facts.map(fact => {
			return cellTable.find(cell => cell[primaryKey] === fact[primaryKey])
		});
		this.removeCells(removedCells);
	}
	/**
	 * @public
	 * */
	removeCells(cells) {
		SnowflakeBuilder.destroy(this.getCells(), cells, this.dimensionHierarchies, this);
	}
	/**
	 * @public
	 * @return {FactTable} returns members
	 * @deprecated
	 * */
	getFacts() {
		return this.denormalize(this.getCells());
	}
	/**
	 * @public
	 * @param {string} dimension - dimension from which the member will be found
	 * @return {Member[]} returns members
	 * */
	getDimensionMembers(dimension) {
		return this.findDimensionTreeByDimension(dimension).getTreeValue().members;
	}
	/**
	 * @public
	 * */
	getCells() {
		return this.cellTable.cells;
	}
	/**
	 * @private
	 * Поиск по всем иерархиям
	 * */
	findDimensionTreeByDimension(dimension) {
		let findDimensionTree;
		this.dimensionHierarchies.forEach(dimensionTree => {
			const searchedDimensionTree = dimensionTree.getDimensionTreeByDimension(dimension);
			if (searchedDimensionTree) {
				findDimensionTree = dimensionTree.getDimensionTreeByDimension(dimension);
			}
		});
		return findDimensionTree;
	}
	_getDimensionTrees() {
		return this.dimensionHierarchies.map(dimensionHierarchy => {
			return dimensionHierarchy.getDimensionTree
				? dimensionHierarchy.getDimensionTree()
				: dimensionHierarchy
		})
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

		const set = this.dimensionHierarchies.map(dimensionTree => dimensionTree.getTreeValue()).map(dimensionTable => {
			dimensionsOrder.push(dimensionTable.dimension);
			return dimensionTable.members;
		});

		const tupleTable = [];

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
				tupleTable.push(item);
				return item;
			});
		}

		return tupleTable;
	}
	/**
	 * @private
	 * Get facts from cube
	 * */
	denormalize(cells = this.getCells(), forSave = true) {
		const data = SnowflakeBuilder.denormalize(cells, this._getDimensionTrees());
		if (forSave) {
			data.forEach((data, index) => {
				if (cells[index] instanceof EmptyCell) {
					delete data[this.cellTable.primaryKey];
				}
			})
		}
		return data;
	}
	/**
	 * @public
	 * Residuals - list of tuples, according to which there is more than one member
	 * */
	residuals() {
		const tuples = this.cartesian();
		const totalFacts = [];
		tuples.forEach(tuple => {
			const partFacts = this.dice(tuple).getFacts();
			if (partFacts.length > 1) {
				totalFacts.push(tuple)
			}
		});
		return totalFacts;
	}
	/**
	 * @public
	 * @param {string} dimension - dimension in which the member is created
	 * @param {object?} customMemberOptions - properties for the created member
	 * @param {object?} rollupCoordinatesData
	 * @param {object?} drillDownCoordinatesOptions
	 * @param {object?} cellData
	 * */
	addDimensionMember(dimension, customMemberOptions = {}, rollupCoordinatesData = {}, drillDownCoordinatesOptions = {}, cellData) {
		// todo №1, а если члены с такими ключами уже существуют, нужнен варнинг, потому что, после десериализации член исчезнет, если не будут изменены значения ключевых полей
		if (typeof dimension !== 'string') {
			throw TypeError(`parameter dimension expects as string: ${dimension}`)
		}
		const rollupCoordinates = {};
		Object.keys(rollupCoordinatesData).forEach(dimension => {
			const memberData = rollupCoordinatesData[dimension];
			const memberList = this.getDimensionMembers(dimension);
			const dimensionTable = this.findDimensionTreeByDimension(dimension).getTreeValue();
			const { primaryKey } = dimensionTable;
			const id = memberData[primaryKey];
			const find = memberList.find(member => {
				return id === dimensionTable.getMemberId(member)
			});
			if (!find) {
				throw new CantAddMemberRollupException(dimension, id)
			} else {
				rollupCoordinates[dimension] = find;
			}
		});
		const dimensionTree = this.findDimensionTreeByDimension(dimension);
		const childDimensionTrees = dimensionTree.getChildTrees();
		const dimensionTable = dimensionTree.getTreeValue();
		const { foreignKey } = dimensionTable;
		const foreignKeysMemberData = {};
		childDimensionTrees.forEach(childDimensionTree => {
			const dimensionTable = childDimensionTree.getTreeValue();
			const { dimension, foreignKey, primaryKey } = dimensionTable;
			const member = rollupCoordinatesData[dimension];
			if (!member) {
				throw new CantAddMemberRollupException(dimension)
			} else {
				foreignKeysMemberData[foreignKey] = member[primaryKey];
			}
		});
		// todo проверить, что customMemberOptions не содержит внешних ключей
		const memberOptions = Object.assign({}, customMemberOptions, foreignKeysMemberData);

		let saveMember = dimensionTree.createMember(memberOptions);
		let saveIdAttribute = foreignKey;
		dimensionTree.traceUpOrder(tracedDimensionTree => {
			if (dimensionTree !== tracedDimensionTree) {
				const { dimension: parentDimension, foreignKey: parentIdAttribute } = tracedDimensionTree.getTreeValue();
				const drillDownCoordinatesData = { [ saveIdAttribute]: dimensionTable.getMemberId(saveMember) };
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
	 * */
	removeDimensionMember(dimension, member) {
		const dimensionTree = this.findDimensionTreeByDimension(dimension);
		const endToBeRemoved = dimensionTree.removeProjectionOntoMember(member);
		const cellTable = this.getCells();
		const getRemoveMeasures = (dimension, members) => {
			const removedCells = [];
			const dimensionTable = dimensionTree.getDimensionTreeByDimension(dimension).getTreeValue();
			const foreignKey = dimensionTable.foreignKey;

			// todo mapFilter похоже
			cellTable.forEach(cell => {
				members.forEach(member => {
					if (cell[foreignKey] == dimensionTable.getMemberId(member)) {
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
	 * Filling method for full size of cube
	 * @param {object?} customCellOptions - properties for empty cells
	 * */
	fillEmptyCells(customCellOptions = {}) {
		const cellOptions = {...this.cellTable.defaultFactOptions, ...customCellOptions};
		if (!this.residuals().length) {
			const emptyCells = this.createEmptyCells(cellOptions);
			this.addEmptyCells(emptyCells);
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
			const members = this.dice(tuple).getFacts(tuple);
			if (members.length === 0) {
				unfilled.push(tuple)
			}
		});
		return unfilled;
	}
	/**
	 * @public
	 * @param {object|DimensionTree} dimensionHierarchy
	 * */
	addDimensionHierarchy(dimensionHierarchy) {
		const dimensionTree = DimensionTree.createDimensionTree(dimensionHierarchy);
		this.dimensionHierarchies.push(
			dimensionTree
		);
		SnowflakeBuilder.anotherBuildOne(dimensionTree, this.getCells(), this.getCells(), this.getCells(), this.cellTable.primaryKey);
	}
	/**
	 * @public
	 * @param {DimensionTree} dimensionHierarchy
	 * */
	removeDimensionHierarchy(dimensionHierarchy) {
		// first remove members
		SnowflakeBuilder.destroyDimensionTree(this.getCells(), this.getCells(), dimensionHierarchy, this);
		// then target dimension hierarchy
		this.dimensionHierarchies.splice(this.dimensionHierarchies.indexOf(dimensionHierarchy), 1);
	}
	/**
	 * @public
	 * @return {EmptyCell[]}
	 * */
	createEmptyCells(cellOptions) {
		const emptyCells = [];
		const tuples = this.cartesian();
		tuples.forEach(combination => {
			const unique = this.dice(combination).getCells();
			if (!unique.length) {
				let foreignKeysCellData = {};
				Object.keys(combination).forEach(dimension => {
					const dimensionTable = this.findDimensionTreeByDimension(dimension).getTreeValue();
					const { foreignKey } = dimensionTable;
					foreignKeysCellData[foreignKey] = dimensionTable.getMemberId(combination[dimension])
				});
				const cellData = {...foreignKeysCellData, ...cellOptions};
				// todo нужна правеврка на то, что все свойства присутствуют
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
	 * @return {boolean}
	 * */
	isEmptyCell(cell) {
		return EmptyCell.isEmptyCell(cell);
	}
	/**
	 * @public
	 * @throw {TypeError}
	 * */
	addEmptyCells(emptyCells) {
		Cube.validateInstance(emptyCells);
		[].push.apply(this.getCells(), emptyCells);
	}
	/**
	 * @param {EmptyCell[]} emptyCells
	 * @throw {TypeError}
	 * */
	static validateInstance(emptyCells) {
		emptyCells.forEach(emptyCell => {
			if (!(emptyCell instanceof EmptyCell)) {
				throw new TypeError('some item in list of argument is not instances of EmptyCell')
			}
		});
	}
}
export default Cube
