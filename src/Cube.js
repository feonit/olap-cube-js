import InputCell from './InputCell.js'
import {ENTITY_ID} from './const.js'
import Member from './Member.js'
import DimensionTree from './DimensionTree.js'
import FactTable from './FactTable.js'
import {
	CantAddMemberRollupException,
	CreateInstanceException
} from './errors.js';
import SnowflakeBuilder from './SnowflakeBuilder.js'
import console from './console.js'
import CellTable from './CellTable.js'
import TupleTable from './TupleTable.js'
import Space from './Space.js'
import Cell from './Cell.js'

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
		const { dimensionHierarchies = [], cellTable = [], settings = {} } = cube;

		this.settings = { ...settings };
		this.dimensionHierarchies = [];
		dimensionHierarchies.map(this._addDimensionHierarchy.bind(this));
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
	 * @param {object} dimensionHierarchies
	 * @param {object[]} facts
	 * @param {object} options
	 * @param {string} options.templateForeignKey
	 * @return {Cube}
	 * */
	static create(facts = [], dimensionHierarchies = [], options = {}) {
		if (!(Cube.isPrototypeOf(this) || Cube === this)) {
			throw new CreateInstanceException()
		}

		const cube = new this({
			dimensionHierarchies: dimensionHierarchies,
			settings: options
		});

		// build 2: members
		cube.addFacts(facts);

		return cube;
	}
	/**
	 * @public
	 * @param {Object[]} facts
	 * */
	addFacts(facts) {
		const newFactTable = new FactTable(facts);
		const cells = newFactTable.map(fact => new Cell(fact));
		this.cellTable.addCells(cells);
		const factTable = this.getFacts();
		SnowflakeBuilder.anotherBuild(factTable, cells, this.dimensionHierarchies, this.cellTable);
	}
	/**
	 * @public
	 * @param {Object[]} facts
	 * */
	removeFacts(facts) {
		const cellTable = this.cellTable;
		const removedCells = facts.map(fact => {
			return cellTable.find(cell => cell[ENTITY_ID] === fact[ENTITY_ID])
		});
		SnowflakeBuilder.destroy(cellTable, removedCells, this.dimensionHierarchies, this);
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
		return this.findDimensionTreeByDimension(dimension).getTreeValue().members;
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
	getMeasureBySet(fixSpaceOptions) {
		let { cellTable } = this.projection(fixSpaceOptions);
		return cellTable;
	}
	/**
	 * @public
	 * @param {string} dimension - dimension from which the member will be found
	 * @param {object} fixSpaceOptions - the composed aggregate object, members grouped by dimension names
	 * @return {Member[]} returns members
	 * */
	getDimensionMembersBySet(dimension, fixSpaceOptions) {
		let { cellTable } = this.projection(fixSpaceOptions);
		return this.getDimensionMembersFromCells(dimension, cellTable);
	}
	/**
	 * @private
	 * */
	projection(fixSpaceOptions) {
		if (!fixSpaceOptions) {
			return;
		}
		let cellTable = this.getMeasure();
		if (Object.keys(fixSpaceOptions).length === 0) {
			return {cellTable};
		}

		const fixSpace = {};
		Object.keys(fixSpaceOptions).forEach(dimension => {
			fixSpace[dimension] = Array.isArray(fixSpaceOptions[dimension])
				? fixSpaceOptions[dimension]
				: [fixSpaceOptions[dimension]];
		});

		const dimensionHierarchiesLength = this.dimensionHierarchies.length;
		if (Object.keys(fixSpaceOptions).length > dimensionHierarchiesLength) {
			throw `set must have length: ${dimensionHierarchiesLength}`
		}

		const dimensionHierarchies = [];

		// для каждого измерения
		const totalSpaces = Object.keys(fixSpace).map(dimension => {

			// ищется его расширенная версия для каждого члена
			const spacesForCells = fixSpace[dimension].map(member => {

				let searchedInTree = this.findDimensionTreeByDimension(dimension);

				const dimensionTreeProjection = searchedInTree.createProjectionOntoMember(member);
				const {
					dimension: dimensionProjection,
					members: membersProjection
				} = dimensionTreeProjection.getRoot().getTreeValue();

				dimensionHierarchies.push(dimensionTreeProjection);
				return { [dimensionProjection]: membersProjection };
			});

			// после чего эти расширенные версии объекдиняются
			const totalSpace = Space.union(...spacesForCells);

			return totalSpace;
		});

		// фильтрация продолжается
		let filteredCellTable = cellTable;

		const cellBelongsToSpace = (cell, space) => {
			const somePropOfCellNotBelongToSpace = Object.keys(space).some(dimension => {
				const members = space[dimension];
				const { idAttribute } = this.findDimensionTreeByDimension(dimension).getTreeValue();
				const finded = members.find(member => {
					return member[ENTITY_ID] === cell[idAttribute]
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

		return { cellTable: filteredCellTable, dimensionHierarchies };
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
	/**
	 * @private
	 * */
	getDimensionMembersFromCells(dimension, cells) {
		const searchedDimensionTree = this.findDimensionTreeByDimension(dimension);

		const {
			members: rootMembers,
			dimension: rootDimension,
			idAttribute: rootIdAttribute
		} = searchedDimensionTree.getRoot().getTreeValue();

		const members = [];

		// todo смахивает на mapFilter
		cells.forEach(cell => {
			rootMembers.forEach(rootMember => {
				if (cell[rootIdAttribute] === rootMember[ENTITY_ID]) {
					if (members.indexOf(rootMember) === -1) {
						members.push(rootMember)
					}
				}
			})
		});

		if (searchedDimensionTree.isRoot()) {
			return members
		} else {
			let lastTracedMembers = members;
			let end = false;
			let lastTracedDimensionTree = searchedDimensionTree;
			searchedDimensionTree.getRoot().tracePreOrder((tracedDimensionTreeValue, tracedDimensionTree) => {
				if (tracedDimensionTree.isRoot()) {
					return;
				}
				if (!end) {
					lastTracedMembers = lastTracedDimensionTree.rollUpDimensionMembers(lastTracedMembers);
					lastTracedDimensionTree = tracedDimensionTree;
				}
				if (tracedDimensionTreeValue.dimension === dimension) {
					end = true;
				}
			});
			return lastTracedMembers;
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

		const set = this.dimensionHierarchies.map(dimensionTree => dimensionTree.getTreeValue()).map(dimensionTable => {
			dimensionsOrder.push(dimensionTable.dimension);
			return dimensionTable.members;
		});

		const tupleTable = new TupleTable();

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
				tupleTable.addTuple(item);
				return item;
			});
		}

		return tupleTable;
	}
	/**
	 * @private
	 * Get facts from cube
	 * */
	denormalize(cells = this.getMeasure(), forSave = true) {
		const data = SnowflakeBuilder.denormalize(cells, this.dimensionHierarchies);
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
	 * @public
	 * @param {string} dimension - dimension in which the member is created
	 * @param {object?} memberOptions - properties for the created member
	 * @param {object?} rollupCoordinatesData
	 * @param {object?} drillDownCoordinatesOptions
	 * @param {object?} measureData
	 * */
	addDimensionMember(dimension, memberOptions = {}, rollupCoordinatesData = {}, drillDownCoordinatesOptions = {}, measureData) {
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
		const dimensionTree = this.findDimensionTreeByDimension(dimension);
		const childDimensionTrees = dimensionTree.getChildTrees();
		childDimensionTrees.forEach(childDimensionTree => {
			const dimensionTable = childDimensionTree.getTreeValue();
			const { dimension, idAttribute } = dimensionTable;
			const member = rollupCoordinatesData[dimension];
			if (!member) {
				throw new CantAddMemberRollupException(dimension)
			} else {
				memberOptions[idAttribute] = member[ENTITY_ID];
			}
		});
		const dimensionTable = dimensionTree.getTreeValue();
		const { idAttribute } = dimensionTable;
		let saveMember = dimensionTree.createMember(memberOptions);
		let saveIdAttribute = idAttribute;
		dimensionTree.traceUpOrder(tracedDimensionTree => {
			if (dimensionTree !== tracedDimensionTree) {
				const { dimension: parentDimension, idAttribute: parentIdAttribute } = tracedDimensionTree.getTreeValue();
				const drillDownCoordinatesData = { [ saveIdAttribute]: saveMember[ENTITY_ID] };
				Object.assign(drillDownCoordinatesData, drillDownCoordinatesOptions[parentDimension]);
				saveMember = tracedDimensionTree.createMember(drillDownCoordinatesData);
				saveIdAttribute = parentIdAttribute;
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
		const dimensionTree = this.findDimensionTreeByDimension(dimension);
		const endToBeRemoved = dimensionTree.removeProjectionOntoMember(member);
		const cellTable = this.getMeasure();
		const getRemoveMeasures = (dimension, members) => {
			const removedCells = [];
			const idAttribute = dimensionTree.getDimensionTreeByDimension(dimension).getTreeValue().idAttribute;

			// todo mapFilter похоже
			cellTable.forEach(cell => {
				members.forEach(member => {
					if (cell[idAttribute] == member[ENTITY_ID]) {
						removedCells.push(cell)
					}
				})
			});
			return removedCells;
		};
		Object.keys(endToBeRemoved).map(dimension => {
			const removedMeasures = getRemoveMeasures(dimension, endToBeRemoved[dimension]);
			removedMeasures.forEach(cell => {
				cellTable.removeCell(cell);
			})
		})
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
					let options = {};
					Object.keys(combination).forEach(dimension => {
						const { idAttribute } = this.findDimensionTreeByDimension(dimension).getTreeValue();
						options[idAttribute] = combination[dimension][ENTITY_ID]
					});
					options = {...options, ...props};
					const cell = InputCell.createCell(options);
					this.cellTable.addCell(cell);
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
	 * @param {object} dimensionHierarchy
	 * */
	_addDimensionHierarchy(dimensionHierarchy) {
		const dimensionTree = DimensionTree.createDimensionTree(dimensionHierarchy, this.settings);
		this.dimensionHierarchies.push(
			dimensionTree
		);
		return dimensionTree;
	}
	/**
	 * @public
	 * @param {DimensionTree} dimensionHierarchy
	 * */
	addDimensionHierarchy(dimensionHierarchy) {
		const dimensionTree = this._addDimensionHierarchy(dimensionHierarchy);
		SnowflakeBuilder.anotherBuildOne(dimensionTree, this.cellTable, this.cellTable, this.cellTable);
	}
	/**
	 * @public
	 * @param {DimensionTree} dimensionHierarchy
	 * */
	removeDimensionHierarchy(dimensionHierarchy) {
		// first remove members
		SnowflakeBuilder.destroyDimensionTree(this.cellTable, this.cellTable, dimensionHierarchy, this);
		// then target dimension hierarchy
		this.dimensionHierarchies.splice(this.dimensionHierarchies.indexOf(dimensionHierarchy), 1);
	}
	/**
	 * @public
	 * @param {string} currentDimension
	 * @param {object[]} members
	 * @param {string?} targetDimension
	 * */
	rollUp(currentDimension, members, targetDimension) {
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
				lastTracedMembers = lastTracedDimensionTree.rollUpDimensionMembers(lastTracedMembers);
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
	 * @param {string} currentDimension
	 * @param {object[]} members
	 * @param {string?} targetDimension
	 * */
	drillDown(currentDimension, members, targetDimension) {
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
	 * @return {Cube}
	 * */
	slice(dimension, member) {
		return this._createProjectionOfCube({ [dimension]: member })
	}
	/**
	 *
	 * */
	dice(fixSpaceOptions) {
		return this._createProjectionOfCube(fixSpaceOptions)
	}
	/**
	 *
	 * */
	_createProjectionOfCube(fixSpaceOptions) {
		// 1 make one projection on to member
		const projection = this.projection(fixSpaceOptions);
		const { cellTable, dimensionHierarchies } = projection;
		// 2 create new list of dimensionHierarchies
		const newDimensionHierarchies = [].concat(this.dimensionHierarchies);
		// 3 replace original by projected dimensionHierarchy
		dimensionHierarchies.forEach(projectionDimensionHierarchy => {
			// find original dimensionHierarchy
			const originalDimensionHierarchy = this.dimensionHierarchies.find(dimensionTree => {
				return dimensionTree.getTreeValue().dimension === projectionDimensionHierarchy.getTreeValue().dimension;
			});
			// define index
			const index = newDimensionHierarchies.indexOf(originalDimensionHierarchy);
			// replace it
			newDimensionHierarchies.splice(index, 1, projectionDimensionHierarchy);
		});
		return new Cube({ cellTable, dimensionHierarchies: newDimensionHierarchies })
	}
}
export default Cube
