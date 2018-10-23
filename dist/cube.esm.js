/*!
 * Version: "0.15.2"
 * Copyright © 2018 Orlov Leonid. All rights reserved. Contacts: <feonitu@yandex.ru>
 *
 */
class InsufficientRollupData {
	constructor(dimension, id) {
		this.message = `Can't add member, member for rollup dimension: ${dimension} with id: ${id} not found`;
	}
}

class NotFoundFactId {
	constructor(name) {
		this.message = `In fact data, no property was found with the name: ${name}`;
	}
}

class CreateInstanceException {
	constructor() {
		this.message = 'this must have prototype of Cube';
	}
}

class DimensionException {
	constructor(dimension) {
		this.message = `For the name "${dimension}" the dimension is already set`;
	}
}

const handleError = error => {
	error.message = `[Cube] ${error.message}`;
	throw error;
};

const originalConsole = console;
const customConsole = {
	log: string => {
		originalConsole.log(`[Cube] ${string}`);
	},
	warn: string => {
		originalConsole.warn(`[Cube] ${string}`);
	},
	warnOnce: (() => {
		const memory = {};
		return string => {
			if (!memory[string]) {
				memory[string] = true;
				originalConsole.warn(`[Cube] ${string}`);
			}
		};
	})()
};

const isSimple = (value) => {
	let type = typeof value;
	return type !== 'object' && type !== 'function' && type !== 'undefined' || value === null
};

class Fact {
	/**
	 * @throw {NotFoundFactId}
	 * */
	constructor(data) {
		try {
			for (let key in data) {
				if (!data.hasOwnProperty(key)) {
					return;
				}

				if (isSimple(data[key])) {
					this[key] = data[key];
				} else {
					customConsole.warn(`[Fact] value of prop "${key}" has an unspecified value: ${data[key]}`);
				}
			}
		} catch (error) {
			handleError(error);
		}
	}
}

/**
 * Cell. A piece of data obtained by defining one element
 * in each dimension of a multidimensional array.
 * The cells of the hypercube can be empty or full.
 *
 * These are aggregated data
 *
 * summary - to describe the values of data in cells
 *
 * each cell is an intersection of all the dimensions of the cube
 * */
class Cell extends Fact {

}

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		let r = Math.random() * 16 | 0;
		let v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

/**
 * Empty cells - in the fact table there is no data for them
 * The cell is identified by a tuple
 * */
class EmptyCell extends Cell {
	constructor(data, options) {
		if (!data.id) {
			data.id = EmptyCell.generateId();
		}
		super(data, options);
	}
	/**
	 * @return {EmptyCell}
	 * */
	static createEmptyCell(options) {
		return new EmptyCell(options)
	}
	/**
	 * @param {Cell|{ id: string|number }} cell
	 * @return {boolean}
	 * */
	static isEmptyCell(cell) {
		return typeof cell.id === 'string'
	}
	/**
	 * @return {string}
	 * */
	static generateId() {
		return uuidv4()
	}
}

/**
 * Element of dimension. Serving to determine the position and description of the data element
 * */
class Member {
	constructor(data) {
		Object.assign(this, data);
	}
	static create(id, props, data, primaryKey) {
		if (!(this === Member || Member.isPrototypeOf(this))) {
			throw Error('this.constructor must be prototype of Member')
		}
		const memberData = {};
		memberData[primaryKey] = id;

		props.forEach(prop => {
			// исключить идентификатор самой сущности
			if (prop !== primaryKey) {
				memberData[prop] = data[prop];
			}
		});
		return new this(memberData)
	}
}

const DEFAULT_TEMPLATE_FOREIGN_KEY = '%s_id';
const DEFAULT_FACT_ID_PROP = 'id';
const DEFAULT_MEMBER_ID_PROP = 'id';

/**
 * Introductory elements. Input elements have values that are manually loaded
 * that is, they are not the result of calculating data
 * */
class InputMember extends Member {
	static create(id, memberData, data, primaryKey) {
		const defaultValue = null;
		const defaultData = {};

		memberData.forEach(propName => {
			defaultData[propName] = data.hasOwnProperty(propName) ? data[propName] : defaultValue;
		});

		return super.create(id, memberData, defaultData, primaryKey)
	}
}

/**
 * Dimension is a dimension of a cube. A dimension is a primary organizer of measure and attribute information in a cube
 * A dimension will contain some members organized in some hierarchy or hierarchies containing levels.
 * */
class DimensionTable {
	constructor({ dimension, foreignKey = DimensionTable.genericId(dimension), primaryKey = DEFAULT_MEMBER_ID_PROP, keyProps, otherProps = [], members = [], defaultMemberOptions = {}}) {
		if (!dimension || !keyProps) {
			throw Error('Bad definition DimensionTable, params \"dimension\" and \"keyProps\" is required');
		}
		if (Object.keys(defaultMemberOptions).indexOf(primaryKey) !== -1) {
			throw Error('Bad definition DimensionTable, \"defaultMemberOptions\" must not contain a \"primaryKey\" property');
		}
		/** Name of the dimension */
		this.dimension = dimension;
		/** id name */
		this.foreignKey = foreignKey;
		/** id name */
		this.primaryKey = primaryKey;
		/** List of key names properties of the table belonging to the current dimension */
		this.keyProps = [].concat(keyProps);
		/** List of additional names properties of the table belonging to the current dimension */
		this.otherProps = [].concat(otherProps);
		/** member list */
		this.members = members.map(memberData => {
			return new Member(memberData, this.primaryKey)
		});
		/** member default property options */
		this.defaultMemberOptions = {...defaultMemberOptions};
	}
	/**
	 *
	 * */
	setMemberList(members) {
		[].splice.apply(this.members, [0, this.members.length].concat(members));
	}
	/**
	 *
	 * */
	clearMemberList() {
		this.members = [];
	}
	getMemberId(member) {
		return member[this.primaryKey]
	}
	/**
	 * @param {Member} member
	 * */
	addMember(member) {
		if (this.members.indexOf(member) === -1) {
			this.members.push(member);
		} else {
			console.log('boo');
		}
	}
	/**
	 * @public
	 * @param {object} memberOptions
	 * @param {[]} linkProps
	 * */
	createMember(memberOptions = {}, linkProps) {
		// todo тут нужна проверка на то, что все данные для члена измерения присутствуют
		const memberData = {...this.defaultMemberOptions, ...memberOptions};
		const { keyProps, otherProps, members, primaryKey } = this;
		const keys = keyProps.concat(linkProps).concat(otherProps);
		const id = DimensionTable.reduceId(members, primaryKey);
		const member = InputMember.create(id, keys, memberData, primaryKey);
		this.addMember(member);
		return member;
	}
	/**
	 * @public
	 * Method of generating a unique identifier within the selected space
	 * */
	static reduceId(members, primaryKey) {
		if (members.length) {
			return members.reduce((acc, curValue) => {
				return acc[primaryKey] > curValue[primaryKey] ? acc : curValue;
			}, 0)[primaryKey] + 1
		} else {
			return 1;
		}
	}
	/**
	 * @public
	 * A way to create a name for a property in which a unique identifier will be stored
	 * */
	static genericId(dimension) {
		return DEFAULT_TEMPLATE_FOREIGN_KEY.replace('%s', dimension);
	}
	setMemberId(member, id) {
		member[this.primaryKey] = id;
	}
	deleteMemberId(member) {
		delete member[this.primaryKey];
	}
	/**
	 *
	 * */
	removeMember(member) {
		const index = this.members.indexOf(member);
		if (index === -1) {
			throw new Error('represented member was not found', member);
		}
		this.members.splice(index, 1);
	}
	static createDimensionTable(dimensionTable) {
		return new DimensionTable(dimensionTable)
	}
}

/**
 * Tree traversing https://en.wikipedia.org/wiki/Tree_traversal
 * @class Tree
 * @abstract class cannot be instantiated with new
 * */
class Tree {
	/**
	 * @public
	 * @abstract
	 * @return {Object}
	 * */
	getTreeValue() {
		throw 'abstract method'
	}
	/**
	 * @public
	 * @abstract
	 * @return {Tree|null}
	 * */
	getParentTree() {
		throw 'abstract method'
	}
	/**
	 * @public
	 * @abstract
	 * @return {Tree[]}
	 * */
	getChildTrees() {
		throw 'abstract method'
	}
	/**
	 * @public
	 * @return {boolean}
	 * */
	isExternal() {
		return !this.getChildTrees().length;
	}
	/**
	 * @public
	 * @return {boolean}
	 * */
	isRoot() {
		return this.getParentTree() === null;
	}
	/**
	 * @public
	 * Get root for that tree
	 * @return {Tree}
	 * */
	getRoot() {
		let root = this;
		this.traceUpOrder(tracedTree => {
			if (tracedTree.isRoot()) {
				root = tracedTree;
			}
		});
		return root;
	}
	/**
	 * @public
	 * Search method
	 * @return {Tree|undefined}
	 * */
	searchTreeByTreeValue(callback) {
		let search = void 0;
		this.tracePostOrder((treeValue, tree) => {
			if (callback(tree)) {
				search = tree;
			}
		});
		return search;
	}
	/**
	 * @public
	 * A walk to root from current Tree, the current Tree and root entered to the chain
	 * @param {function} callback
	 * */
	traceUpOrder(callback) {
		(function reqursively(tree) {
			const parentNode = tree.getParentTree();
			callback(tree);
			if (parentNode !== null) {
				reqursively(parentNode);
			}
		}(this));
	}
	/**
	 * @public
	 * A walk in which the children are traversed before their respective parents are traversed
	 * @param {function} callback
	 * */
	tracePostOrder(callback) {
		(function reqursively(tree) {
			const childTrees = tree.getChildTrees();
			const treeValue = tree.getTreeValue();
			if (childTrees.length) {
				childTrees.forEach(childTree => {
					reqursively(childTree);
				});
			}
			callback(treeValue, tree);
		}(this));
	}
	/**
	 * @public
	 *  A walk in which each parent tree is traversed before its children is called a pre-order walk
	 * */
	tracePreOrder(callback) {
		(function reqursively(tree) {
			const childTrees = tree.getChildTrees();
			const treeValue = tree.getTreeValue();
			callback(treeValue, tree);
			if (childTrees.length) {
				childTrees.forEach(childTree => {
					reqursively(childTree);
				});
			}
		}(this));
	}
	/**
	 * Check if some thee is present in childs of some level
	 * @param {Tree}
	 * @return {boolean}
	 * */
	hasChild(tree) {
		let has = false;
		this.tracePreOrder((tracedTreeValue, tracedTree) => {
			if (tracedTree === tree) {
				has = true;
			}
		});
		return has;
	}
	/**
	 * Check if some thee is present in parents of some level
	 * @param {Tree}
	 * @return {boolean}
	 * */
	hasParent(tree) {
		let has = false;
		this.traceUpOrder((tracedTree) => {
			if (tracedTree === tree) {
				has = true;
			}
		});
		return has;
	}
}

/**
 * It defines the relationship of generalization and specialization (roll-up/drill-down)
 * @throws {DimensionException}
 * */
class DimensionTree extends Tree {
	constructor(dimensionTree) {
		super();

		const {dimensionTable, level = [], parentNode = null} = dimensionTree;
		
		Object.defineProperties(this, {
			dimensionTable: {
				/**
				 * @property
				 * @name DimensionTree#dimensionTable
				 * */
				value: DimensionTable.createDimensionTable(dimensionTable),
				editable: false,
				enumerable: true
			},
			parentNode: {
				/**
				 * @property {DimensionTree|null}
				 * @name DimensionTree#parentNode
				 * */
				value: parentNode,
				enumerable: false,
				editable: false
			},
			level: {
				/**
				 * @property {DimensionTree[]}
				 * @name DimensionTree#level
				 * */
				value: level.map(dimensionTreeData => {
					return new DimensionTree({ ...dimensionTreeData, parentNode: this })
				}),
				enumerable: true,
				editable: false
			}
		});
		this.validate();
	}
	validate(){
		const dimensions = [];
		this.tracePostOrder((tracedDimensionTreeValue) => {
			const {dimension} = tracedDimensionTreeValue;
			if (dimensions.indexOf(dimension) === -1){
				dimensions.push(dimension);
			} else {
				throw new DimensionException();
			}
		});
	}
	static createDimensionTree(dimensionTreeData) {
		return new DimensionTree(dimensionTreeData);
	}
	static createProxyDimensionTree(dimensionTree){
		const newDimensionTree = dimensionTree.cloneDimensionTreeWithoutMembers();
		dimensionTree.tracePostOrder((tracedTreeValue) => {
			const { dimension: tracedDimension, members } = tracedTreeValue;
			
			newDimensionTree
				.getDimensionTreeByDimension(tracedDimension)
				.getTreeValue()
				.setMemberList(members);
		});
		return newDimensionTree;
	}
	/**
	 * @public
	 * @return {DimensionTable}
	 * */
	getTreeValue() {
		return this.dimensionTable;
	}
	/**
	 * @public
	 * @return {DimensionTree|null}
	 * */
	getParentTree() {
		return this.parentNode;
	}
	/**
	 * @public
	 * @return {DimensionTree[]}
	 * */
	getChildTrees() {
		return this.level;
	}
	/**
	 * @public
	 * @param {string} dimension
	 * @return {DimensionTree|undefined}
	 * */
	getDimensionTreeByDimension(dimension) {
		return this.getRoot().searchTreeByTreeValue(dimensionTree => {
			const dimensionTreeValue = dimensionTree.getTreeValue();
			return dimensionTreeValue.dimension === dimension;
		});
	}
	/**
	 * @public
	 * @param {Member} member
	 * @return {DimensionTree|undefined}
	 * */
	createProjectionOntoMember(member) {
		// 1 create copy of hierarchy with empty members
		const newDimensionTreeByMember = this.cloneDimensionTreeWithoutMembers();

		this.projectDrillDown(newDimensionTreeByMember, member);
		this.projectDrillUp(newDimensionTreeByMember, member);

		return newDimensionTreeByMember;
	}
	// насытить связными данными снизу
	projectDrillDown(dimensionTree, member){
		let lastTracedMembers;
		let lastTracedDimensionTree;
		// 2 trace up
		this.traceUpOrder(tracedTree => {
			const { dimension: tracedDimension } = tracedTree.getTreeValue();

			// 3 get drill down of last members
			const drillDownedMembers = tracedTree == this
				? [member]
				: lastTracedDimensionTree.drillDownDimensionMembers(lastTracedMembers);

			// 4 set members
			dimensionTree
				.getDimensionTreeByDimension(tracedDimension)
				.getTreeValue()
				.setMemberList(drillDownedMembers);

			// 5 save current dimension and drill downed members
			lastTracedMembers = drillDownedMembers;
			lastTracedDimensionTree = tracedTree;
		});
	}
	// насытить связными данными сверху
	projectDrillUp(dimensionTree, member){
		let lastTracedMembers2;
		let lastTracedDimensionTree2;
		this.tracePreOrder((b, tracedTree) => {
			const { dimension: tracedDimension } = tracedTree.getTreeValue();
			const drillUppedMembers = tracedTree == this
				? [member]
				: lastTracedDimensionTree2.drillUpDimensionMembers(lastTracedMembers2);

			dimensionTree
				.getDimensionTreeByDimension(tracedDimension)
				.getTreeValue()
				.setMemberList(drillUppedMembers);

			lastTracedMembers2 = drillUppedMembers;
			lastTracedDimensionTree2 = tracedTree;
		});
	}
	cloneDimensionTreeWithoutMembers(){
		// todo new members must be not created here
		const clone = new DimensionTree(this.getRoot());
		clone.tracePostOrder((dimensionTreeValue, dimensionTree) => {
			const dimensionTable = dimensionTree.getTreeValue();
			dimensionTable.clearMemberList();
		});
		return clone;
	}
	/**
	 * @public
	 * @param {Member} member
	 * */
	removeProjectionOntoMember(member) {
		// 1 get projection
		const projectionDimensionTree = this.cloneDimensionTreeWithoutMembers();
		this.projectDrillDown(projectionDimensionTree, member);

		// 2 subtract projection
		this.subtractDimensionTree(projectionDimensionTree);
		// 3 return first level members of projection
		const endToBeRemovedMember = {};

		const {
			dimension: dimensionProjection,
			members: membersProjection
		} = projectionDimensionTree.getRoot().getTreeValue();

		endToBeRemovedMember[dimensionProjection] = membersProjection;

		return endToBeRemovedMember;
	}
	/**
	 * @private
	 * @param {DimensionTree} dimensionTree
	 * */
	subtractDimensionTree(dimensionTree) {
		// remove intersection
		const toBeRemovedSpace = {};

		dimensionTree.tracePostOrder(dimensionTreeValue => {
			const {dimension, members} = dimensionTreeValue;
			toBeRemovedSpace[dimension] = members;
		});

		const memberList = this.getTreeValue().members;

		// travers down
		if (memberList.length === 1) {
			this.tracePreOrder((dimensionTable, tracedDimensionTree) => {
				const {members: childMembers, dimension: childDimension} = dimensionTable;
				toBeRemovedSpace[childDimension] = childMembers;
			});
		}

		// remove removal space
		Object.keys(toBeRemovedSpace).forEach(dimension => {
			const currentDimensionTree = this.getDimensionTreeByDimension(dimension);
			const dimensionTable = currentDimensionTree.getTreeValue();
			toBeRemovedSpace[dimension].forEach(member => {
				dimensionTable.removeMember(member);
			});
		});
	}
	unionDimensionTree(dimensionTree){
		const toBeAddedSpace = {};
		dimensionTree.tracePostOrder(dimensionTreeValue => {
			const {dimension, members} = dimensionTreeValue;
			toBeAddedSpace[dimension] = members;
		});
		const memberList = this.getTreeValue().members;

		// if (memberList.length === 1){
		// 	this.tracePreOrder((dimensionTable, tracedDimensionTree) => {
		// 		const {members: childMembers, dimension: childDimension} = dimensionTable;
		// 		toBeAddedSpace[childDimension] = childMembers;
		// 	})
		// }
		Object.keys(toBeAddedSpace).forEach(dimension => {
			const currentDimensionTree = this.getDimensionTreeByDimension(dimension);
			const dimensionTable = currentDimensionTree.getTreeValue();
			toBeAddedSpace[dimension].forEach(member => {
				dimensionTable.addMember(member);
			});
		});
	}
	/**
	 * @public
	 * @param {Member[]} members
	 * @return {Member[]}
	 * */
	drillDownDimensionMembers(members = this.getTreeValue().members) {
		if (this.isRoot()) {
			return members;
		}
		const parentTree = this.getParentTree();
		const { members: parentMembers, primaryKey } = parentTree.getTreeValue();
		const dimensionTable = this.getTreeValue();
		const { foreignKey } = dimensionTable;
		const drillDownMembers = [];
		members.forEach(member => {
			parentMembers.forEach(parentMember => {
				if (parentMember[foreignKey] === member[primaryKey]) {
					if (drillDownMembers.indexOf(parentMember) === -1) {
						drillDownMembers.push(parentMember);
					}
				}
			});
		});
		return drillDownMembers;
	}
	/**
	 * @public
	 * @this {DimensionTree}
	 * @param {Member[]} members
	 * @return {Member[]}
	 * */
	drillUpDimensionMembers(members = this.getTreeValue().members) {
		if (this.isExternal()) {
			return members;
		}
		const childTree = this.getChildTrees()[0]; // for one child always
		const dimensionTable = childTree.getTreeValue();
		const { members: childMembers, foreignKey } = dimensionTable;
		const rollUpMembers = [];
		members.forEach(member => {
			childMembers.forEach(childMember => {
				if (member[foreignKey] === dimensionTable.getMemberId(childMember)) {
					if (rollUpMembers.indexOf(childMember) === -1) {
						rollUpMembers.push(childMember);
					}
				}
			});
		});
		return rollUpMembers;
	}
	/**
	 * @public
	 * @param {object?} memberOptions
	 * */
	createMember(memberOptions = {}) {
		const dimensionTable = this.getTreeValue();
		const childIdAttributes = this.getChildTrees().map(dimensionTree =>
			dimensionTree.getTreeValue().foreignKey
		);
		const linkProps = [];
		childIdAttributes.forEach(foreignKey => {
			linkProps.push(foreignKey);
		});
		return dimensionTable.createMember(memberOptions, linkProps)
	}
}

/**
 * The elements of a dimension can be organized as a hierarchy
 * Hierarchy is a dimension hierarchy of a cube
 * */
class DimensionHierarchy {
	constructor({ dimensionTree, activeDimension, hierarchy}) {
		if (!hierarchy) {
			throw Error('attribute "hierarchy" must be defined')
		}
		this.dimensionTree = dimensionTree instanceof DimensionTree
			? dimensionTree
			: DimensionTree.createDimensionTree(dimensionTree);
		this.activeDimension = activeDimension || this.dimensionTree.getTreeValue().dimension;
		this.hierarchy = hierarchy;
	}
	getDimensionTree() {
		return this.dimensionTree;
	}
	hasDimension(dimension) {
		return !!this.dimensionTree.getDimensionTreeByDimension(dimension);
	}
	getActiveDimension() {
		return this.activeDimension;
	}
	setActiveDimension(activeDimension) {
		this.activeDimension = activeDimension;
	}
	getHierarchy() {
		return this.hierarchy;
	}
	static createDimensionHierarchy(dimensionHierarchy) {
		return new DimensionHierarchy(dimensionHierarchy)
	}
}

/**
 * @throw {NotFoundFactId}
 * */
class FactTable {
	constructor({ facts = [], primaryKey = DEFAULT_FACT_ID_PROP } = {}, defaultFactOptions = {}) {
		this.primaryKey = primaryKey;
		this.facts = facts.map(factData => new Fact(factData));
		this.defaultFactOptions = defaultFactOptions;
		this.facts.forEach(this.validateFactData.bind(this));
	}
	getFacts() {
		return this.facts;
	}
	validateFactData(factData) {
		if (!factData.hasOwnProperty(this.primaryKey)) {
			throw new NotFoundFactId(this.primaryKey)
		}
	}
	static deleteProps(fact, props, primaryKey) {
		props.forEach(prop => {
			if (prop !== primaryKey) {
				delete fact[prop];
			}
		});
	}
}

/**
 * The main task is to parse the data array into tables
 *
 * is a special case of snowflake dimensionHierarchies
 * where every dimension is represented by one table even if the dimensions has multiple levels
 *
 * snowflaking - normalization process of measurement tables
 * */
class SnowflakeBuilder {
	static anotherBuild(factTable, cells, dimensionsTrees, cellTable, factPrimaryKey) {

		// for each dimension
		dimensionsTrees.forEach(dimensionTree => {
			SnowflakeBuilder.anotherBuildOne(dimensionTree, cells, cellTable, factTable, factPrimaryKey);
		});
	}

	static anotherBuildOne(dimensionTree, cells, cellTable, factTable, factPrimaryKey) {
		// for each hierarchy and level of dimension
		dimensionTree.tracePostOrder((dimensionTable, dimensionTree) => {
			SnowflakeBuilder.processDimension(dimensionTree, cells, cellTable, factTable, factPrimaryKey);
		});
	}

	static processDimension(dimensionTree, cells, cellTable, factTable, factPrimaryKey) {
		const dimensionTable = dimensionTree.getTreeValue();
		const { dimension, keyProps = [], otherProps = [], members: memberList, foreignKey, primaryKey } = dimensionTable;
		const childIdAttributes = dimensionTree.getChildTrees().map(dimensionTree => dimensionTree.getTreeValue().foreignKey);
		const childDimensions = dimensionTree.getChildTrees().map(dimensionTree => dimensionTree.getTreeValue().dimension);

		let members;

		const existMemberCount = memberList.length;
		const args = [factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, cells, dimension, keyProps, otherProps, cells, cellTable];

		if (!childIdAttributes.length) {
			members = SnowflakeBuilder.makeMemberList.apply(null, args);
		} else {
			let entitiesParts = [];
			const dimensionTable = dimensionTree.getDimensionTreeByDimension(childDimensions[0]).getTreeValue();
			const memberListForFilter = dimensionTable.members;
			entitiesParts = SnowflakeBuilder.mapFilter(childIdAttributes[0], cells, memberListForFilter, dimensionTable);
			members = SnowflakeBuilder.makeMemberListLevel.apply(null, args.concat([childIdAttributes, entitiesParts]));
		}

		// только после того как список сформирован, удалаять данные из ячеек
		cells.forEach(cell => {
			FactTable.deleteProps(cell, keyProps, factPrimaryKey);
			FactTable.deleteProps(cell, otherProps, factPrimaryKey);
		});

		members.forEach(member => {
			dimensionTable.addMember(member);
		});
	}
	/**
	 * Method filter cells by members of a dimension
	 * @param {string} foreignKey
	 * @param {Cell[]} cells
	 * @param {Member[]} memberList
	 * @param {DimensionTable} dimensionTable
	 * @private
	 * @return {Cell[]}
	 * */
	static mapFilter(foreignKey, cells, memberList, dimensionTable) {
		const cellTables = [];
		//todo оптимизировать поиск через хеш
		memberList.forEach(member => {
			const cellTableFiltered = cells.filter(cell => {
				return cell[foreignKey] == dimensionTable.getMemberId(member);
			});
			cellTables.push(cellTableFiltered);
		});
		return cellTables;
	}
	/**
	 * @private
	 * */
	static makeMemberListLevel(factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, whatIsIt, dimension, keyProps, otherProps, cells, cellTable, childIdAttributes, entitiesParts) {
		let totalMemberList = [];

		let countId = 0;
		entitiesParts.forEach(entitiesPart => {
			if (entitiesPart.length) {
				const members = SnowflakeBuilder.makeMemberList(factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, entitiesPart, dimension, keyProps, otherProps, cells, cellTable, countId);
				countId = countId + members.length;

				const etalon = entitiesPart[0];

				childIdAttributes.forEach(childIdAttribute => {

					members.forEach(member => {
						member[childIdAttribute] = etalon[childIdAttribute];
						member[primaryKey] = (existMemberCount + totalMemberList.length + 1);
						totalMemberList.push(member);
					});

					entitiesPart.forEach(entityPart => {
						delete entityPart[childIdAttribute];
					});

				});
			}
		});

		return totalMemberList;
	}

	/**
	 * The method of analyzing the data array and generating new dimension values
	 *
	 * @param {object[]} entitiesPart - Data array to the analysis of values for dimension
	 * @param {number} startFrom
	 * @param {string} dimension - The dimension for which members will be created
	 * @param {string[]} keyProps - Names of properties whose values will be used to generate a key that will determine the uniqueness of the new member for dimension
	 * @param {string[]} otherProps - Names of properties whose values will be appended to the dimension member along with the key properties
	 * @param {Cell} cells
	 * @param {Cell[]} cellTable
	 * @return {[]}
	 * @private
	 * */
	static makeMemberList(
		factPrimaryKey,
		primaryKey,
		foreignKey,
		existMemberCount,
		factTable,
		entitiesPart,
		dimension,
		keyProps = [],
		otherProps = [],
		cells,
		cellTable,
		// It is recommended that the key field be a simple integer because a key value is meaningless
		startFrom = 0
	) {
		// соотношение созданных id к ключам
		const cache = {};
		const restoredCache = {};
		const members = [];

		// need restore cache
		const existedCells = cellTable.filter(cell => {
			return cells.indexOf(cell) === -1
		});
		existedCells.forEach(cell => {
			// собрать ключ на основе ключевых значений
			const fact = factTable.find(fact => fact[factPrimaryKey] === cell[factPrimaryKey]);
			const surrogateKey = SnowflakeBuilder.createKeyFromProps(keyProps, fact);
			// если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)
			if (!(surrogateKey in restoredCache)) {
				restoredCache[surrogateKey] = ++startFrom;
			}
		});

		// создания групп по уникальным ключам
		entitiesPart.forEach(entityPart => {

			// собрать ключ на основе ключевых значений
			const surrogateKey = SnowflakeBuilder.createKeyFromProps(keyProps, entityPart);

			// если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)
			if (!(surrogateKey in cache) && !(surrogateKey in restoredCache)) {
				cache[surrogateKey] = ++startFrom;
			}

			// оставить в нормальной форме ссылку на id под сущности
			const id = cache[surrogateKey];
			entityPart[foreignKey] = id;
		});

		Object.keys(cache).forEach(key => {
			const id = cache[key];
			const entityPart = entitiesPart.find(entityPart => entityPart[foreignKey] === id);
			const member = Member.create(id, [].concat(keyProps).concat(otherProps), entityPart, primaryKey);
			members.push(member);
		});

		return members;
	}

	static createKeyFromProps(props, obj) {
		const DIVIDER = ',';

		return props.map(prop => {
			return obj[prop]
		}).join(DIVIDER);
	}

	static destroy(cellTable, removedCells, dimensionHierarchies, cube) {
		// first remove cells
		removedCells.forEach(removedCell => {
			const index = cellTable.indexOf(removedCell);
			if (index !== -1) {
				cellTable.splice(index, 1);
			}
		});
		// then remove members
		removedCells.forEach(fact => {
			dimensionHierarchies.forEach(dimensionTree => {
				SnowflakeBuilder.travers([fact], dimensionTree, [SnowflakeBuilder.removeMembers.bind(this, cube, dimensionTree), SnowflakeBuilder.restoreCell]);
			});
		});
	}

	/**
	 * Method allows to generate fact tables from cells
	 * */
	static denormalize(cellTable, dimensionTrees) {
		const factTable = new FactTable();
		const facts = factTable.getFacts();
		cellTable.forEach(cell => {
			facts.push({...cell});
		});
		facts.forEach(fact => {
			dimensionTrees.forEach(dimensionTree => {
				SnowflakeBuilder.travers([fact], dimensionTree, [SnowflakeBuilder.restoreCell]);
			});
		});

		return facts;
	}
	static restoreCell(member, memberList, dimension, cell, foreignKey, dimensionTable) {
		const memberCopy = new Member(member);
		dimensionTable.deleteMemberId(memberCopy);
		delete cell[foreignKey];
		Object.assign(cell, memberCopy);
	}
	static removeMembers(cube, dimensionTree, member, memberList, dimension, cell, foreignKey) {
		const dicedCube = cube.dice({ [dimension]: member });
		const dimensionTable = dimensionTree.getDimensionTreeByDimension(dimension).getTreeValue();
		// last cell was removed at the beginning of the algorithm,
		// so if the member is no longer used, the projection will be empty
		if (!dicedCube.getCells().length) {
			dimensionTable.removeMember(member);
		}
	}

	static travers(cellTable, dimensionTree, handlers = () => {}) {
		const handleDimensionTree = (dimensionTree, cell) => {
			const dimensionTable = dimensionTree.getTreeValue();
			const { dimension, members: memberList, foreignKey } = dimensionTable;
			const idValue = cell[foreignKey];
			const member = memberList.find(member => {
				return dimensionTable.getMemberId(member) === idValue;
			});
			handlers.forEach(handler => {
				handler(member, memberList, dimension, cell, foreignKey, dimensionTable);
			});
		};
		cellTable.forEach(cell => {
			dimensionTree.tracePreOrder((value, tracedDimensionTree) => {
				handleDimensionTree(tracedDimensionTree, cell);
			});
		});
	}

	/**
	 * Method allows to delete dimensionTree from cube,
	 * the cells will be restored, and the members of the measurement are also deleted
	 * */
	static destroyDimensionTree(cellTable, removedCells, dimensionTree, cube) {
		SnowflakeBuilder.travers(cellTable, dimensionTree, [SnowflakeBuilder.removeMembers.bind(this, cube, dimensionTree), SnowflakeBuilder.restoreCell]);
	}

}

/**
 * The cell is identified by a tuple
 * tuples can uniquely identify every cell in the cube
 * Tuple is an ordered collection of one or more members from different dimensions
 * */
class Tuple {
	constructor(options) {
		Object.assign(this, options);
	}
}

class Space {
	/**
	 *
	 * */
	static union() {
		const newSpace = {};
		const arg = [...arguments];
		arg.forEach(space => {
			Space.add(newSpace, space);
		});
		return newSpace;
	}
	/**
	 *
	 * */
	static add(targetSpace, otherSpace) {
		Object.keys(otherSpace).forEach(key => {
			if (!targetSpace[key]) {
				targetSpace[key] = [];
			}
			Array.prototype.push.apply(targetSpace[key], otherSpace[key]);
		});
	}
}

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
			customConsole.warnOnce('first argument \"cells\" as array type is deprecated now, use object for describe fact table');
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
		// const residuals = residuals(this);
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
			customConsole.warnOnce('first argument \"facts\" as array type is deprecated now, use object for describe fact table');
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
	 * */
	dice(set) {
		// 1 make one projection on to member
		const fixSpace = {};
		Object.keys(set).forEach(dimension => {
			// work with arrays
			fixSpace[dimension] = Array.isArray(set[dimension])
				? set[dimension]
				: [set[dimension]];

			const dimensionTree = findDimensionTreeByDimension.call(this, dimension);
			
			// discard non-existent dimensions
			if (!dimensionTree) {
				customConsole.warn(`Not existed dimension: ${dimension}`);
				return;
			}
			const dimensionTable = dimensionTree.getTreeValue();
			fixSpace[dimension].forEach((memberData, index) => {
				const members = this.getDimensionMembers(dimension);
				let member = members.find(member => dimensionTable.getMemberId(member) === dimensionTable.getMemberId(memberData));
				fixSpace[dimension][index] = member;
				if (!memberData) {
					customConsole.warn(`Not found member by id ${dimensionTable.getMemberId(member)}`);
				}
			});
		});

		const dimensionHierarchiesLength = this.dimensionHierarchies.length;
		if (Object.keys(fixSpace).length > dimensionHierarchiesLength) {
			throw Error(`Set must have a size not more than ${dimensionHierarchiesLength} dimensions`)
		}

		const projectionDimensionHierarchies = [];

		// for every dimension in set
		const totalSpaces = Object.keys(fixSpace).map(dimension => {

			let dimensionTreeProjection;
			// ищется его расширенная версия для каждого члена
			const spacesForCells = fixSpace[dimension].map(member => {

				let searchedInTree = findDimensionTreeByDimension.call(this, dimension);

				const current = searchedInTree.cloneDimensionTreeWithoutMembers();

				searchedInTree.projectDrillDown(current, member);
				searchedInTree.projectDrillUp(current, member);

				if (dimensionTreeProjection){
					dimensionTreeProjection.unionDimensionTree(current);
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
				const { foreignKey, primaryKey } = findDimensionTreeByDimension.call(this, dimension).getTreeValue();
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
							projectionDimensionHierarchy.removeProjectionOntoMember(member);
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
	 * @return {FactTable} returns facts
	 * */
	getFacts() {
		return denormalize.call(this, this.getCells());
	}
	/**
	 * @public
	 * @param {Object[]} facts
	 * @return {Cube}
	 * */
	addFacts(facts) {
		const newFactTable = new FactTable({facts, primaryKey: this.cellTable.primaryKey});
		const cells = newFactTable.getFacts().map(fact => new Cell(fact));
		[].push.apply(this.getCells(), cells);
		const factTable = this.getFacts();
		SnowflakeBuilder.anotherBuild(factTable, cells, getDimensionTrees.call(this), this.getCells(), this.cellTable.primaryKey);
		return this;
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
	 * @return {Cell[]}
	 * */
	getCells() {
		return this.cellTable.cells;
	}
	/**
	 * @public
	 * @param {Cell[]} cells
	 * */
	removeCells(cells) {
		SnowflakeBuilder.destroy(this.getCells(), cells, this.dimensionHierarchies, this);
	}
	/**
	 * @public
	 * @param {string} dimension - dimension from which the member will be found
	 * @return {Member[]} returns members
	 * */
	getDimensionMembers(dimension) {
		return findDimensionTreeByDimension.call(this, dimension).getTreeValue().members;
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
	addDimensionMember(dimension, customMemberOptions = {}, rollupCoordinatesData = {}, drillDownCoordinatesOptions = {}, cellData) {
		// todo №1, а если члены с такими ключами уже существуют, нужнен варнинг, потому что, после десериализации член исчезнет, если не будут изменены значения ключевых полей
		if (typeof dimension !== 'string') {
			throw TypeError(`parameter dimension expects as string: ${dimension}`)
		}
		Object.keys(rollupCoordinatesData).forEach(dimension => {
			const memberData = rollupCoordinatesData[dimension];
			const memberList = this.getDimensionMembers(dimension);
			const dimensionTable = findDimensionTreeByDimension.call(this, dimension).getTreeValue();
			const { primaryKey } = dimensionTable;
			const id = memberData[primaryKey];
			const find = memberList.find(member => {
				return id === dimensionTable.getMemberId(member)
			});
			if (!find) {
				throw new InsufficientRollupData(dimension, id)
			}
		});
		const dimensionTree = findDimensionTreeByDimension.call(this, dimension);
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
		const dimensionTree = findDimensionTreeByDimension.call(this, dimension);
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
						removedCells.push(cell);
					}
				});
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
			});
		});
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
		const tuples = Cube.cartesian(this);
		tuples.forEach(combination => {
			const unique = this.dice(combination).getCells();
			if (!unique.length) {
				let foreignKeysCellData = {};
				Object.keys(combination).forEach(dimension => {
					const dimensionTable = findDimensionTreeByDimension.call(this, dimension).getTreeValue();
					const { foreignKey } = dimensionTable;
					foreignKeysCellData[foreignKey] = dimensionTable.getMemberId(combination[dimension]);
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
	 * @public
	 * Filling method for full size of cube
	 * @param {object?} customCellOptions - properties for empty cells
	 * */
	fillEmptyCells(customCellOptions = {}) {
		const cellOptions = {...this.cellTable.defaultFactOptions, ...customCellOptions};
		if (!residuals(this).length) {
			const emptyCells = this.createEmptyCells(cellOptions);
			this.addEmptyCells(emptyCells);
		}
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
	/**
	 *
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
				res = set[0].map(i => [i]);
			}
			res.forEach(arr => {
				const item = {};
				dimensionsOrder.forEach((dimension, index) => {
					item[dimension] = arr[index];
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
function findDimensionTreeByDimension(dimension) {
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
				delete data[this.cellTable.primaryKey];
			}
		});
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
			totalTuples.push(tuple);
		}
	});
	return totalTuples;
}

export default Cube;
//# sourceMappingURL=cube.esm.js.map
