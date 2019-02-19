/*!
 * Version: "0.16.0"
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
	getMemberPrimaryKey(member) {
		return member[this.primaryKey]
	}
	getMemberForeignKey(member) {
		return member[this.foreignKey]
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
		this.traceUpOrder((tracedTreeValue, tracedTree) => {
			if (tracedTree.isRoot()) {
				root = tracedTree;
			}
		});
		return root;
	}
	/**
	 * @public
	 * A walk to root from current Tree, the current Tree and root entered to the chain
	 * @param {function} callback
	 * */
	traceUpOrder(callback) {
		const tree = this;
		const parentTree = tree.getParentTree();
		const treeValue = tree.getTreeValue();
		callback(treeValue, tree);
		if (parentTree !== null) {
			parentTree.traceUpOrder(callback);
		}
	}
	/**
	 * @public
	 * A walk in which the children are traversed before their respective parents are traversed
	 * @param {function} callback
	 * */
	tracePostOrder(callback) {
		const tree = this;
		const childTrees = tree.getChildTrees();
		const treeValue = tree.getTreeValue();
		if (childTrees.length) {
			childTrees.forEach(childTree => {
				childTree.tracePostOrder(callback);
			});
		}
		callback(treeValue, tree);
	}
	/**
	 * @public
	 *  A walk in which each parent tree is traversed before its children is called a pre-order walk
	 * */
	tracePreOrder(callback) {
		const tree = this;
		const childTrees = tree.getChildTrees();
		const treeValue = tree.getTreeValue();
		callback(treeValue, tree);
		if (childTrees.length) {
			childTrees.forEach(childTree => {
				childTree.tracePreOrder(callback);
			});
		}
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
		this.validateDimensions();
	}
	validateDimensions(){
		const dimensions = [];
		this.tracePostOrder(tracedDimensionTreeValue => {
			const {dimension} = tracedDimensionTreeValue;
			if (dimensions.indexOf(dimension) === -1){
				dimensions.push(dimension);
			} else {
				throw new DimensionException();
			}
		});
	}
	static createDimensionTree(dimensionTreeData) {
		// todo add validation
		return new DimensionTree(dimensionTreeData);
	}
	static createProxyDimensionTree(dimensionTree){
		const newDimensionTree = dimensionTree.cloneDimensionTreeWithoutMembers();
		dimensionTree.tracePostOrder(tracedTreeValue => {
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
		const root = this.getRoot();
		let search = void 0;
		root.tracePostOrder((dimensionTreeValue, dimensionTree) => {
			if (dimensionTreeValue.dimension === dimension){
				search = dimensionTree;
			}
		});
		return search;
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
	projectDrillDown(dimensionTree, member){
		this.projectDrill(dimensionTree, member, "traceUpOrder", "drillDownDimensionMembers");
	}
	projectDrillUp(dimensionTree, member){
		this.projectDrill(dimensionTree, member, "tracePreOrder", "drillUpDimensionMembers");
	}
	projectDrill(dimensionTree, member, traceMethodName, method){
		let lastTracedMembers;
		let lastTracedDimensionTree;
		this[traceMethodName]((tracedDimensionTreeValue, tracedDimensionTree) => {
			const { dimension: tracedDimension } = tracedDimensionTreeValue;

			const drillMembers = tracedDimensionTree == this
				? [member]
				: lastTracedDimensionTree[method](lastTracedMembers);

			dimensionTree
				.getDimensionTreeByDimension(tracedDimension)
				.getTreeValue()
				.setMemberList(drillMembers);

			lastTracedMembers = drillMembers;
			lastTracedDimensionTree = tracedDimensionTree;
		});
	}
	cloneDimensionTreeWithoutMembers(){
		// todo new members must be not created here
		const clone = new DimensionTree(this.getRoot());
		clone.tracePostOrder(dimensionTreeValue => {
			dimensionTreeValue.clearMemberList();
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
			this.tracePreOrder((tracedDimensionTable, tracedDimensionTree) => {
				const {members: childMembers, dimension: childDimension} = tracedDimensionTable;
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
		const parentDimensionTable = parentTree.getTreeValue();
		const dimensionTable = this.getTreeValue();
		const { members: parentMembers } = parentDimensionTable;
		const drillMembers = [];
		members.forEach(member => {
			parentMembers.forEach(parentMember => {
				if (dimensionTable.getMemberForeignKey(parentMember) === parentDimensionTable.getMemberPrimaryKey(member)) {
					if (drillMembers.indexOf(parentMember) === -1) {
						drillMembers.push(parentMember);
					}
				}
			});
		});
		return drillMembers;
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
		const childDimensionTable = childTree.getTreeValue();
		const { members: childMembers } = childDimensionTable;
		const drillMembers = [];
		members.forEach(member => {
			childMembers.forEach(childMember => {
				if (childDimensionTable.getMemberForeignKey(member) === childDimensionTable.getMemberPrimaryKey(childMember)) {
					if (drillMembers.indexOf(childMember) === -1) {
						drillMembers.push(childMember);
					}
				}
			});
		});
		return drillMembers;
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

		function deleteProps(fact, props, factPrimaryKey) {
			props.forEach(prop => {
				if (prop !== factPrimaryKey) {
					delete fact[prop];
				}
			});
		}

		// только после того как список сформирован, удалаять данные из ячеек
		cells.forEach(cell => {
			deleteProps(cell, keyProps, factPrimaryKey);
			deleteProps(cell, otherProps, factPrimaryKey);
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
				return cell[foreignKey] == dimensionTable.getMemberPrimaryKey(member);
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
		const facts = [];
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
		const handleDimensionTree = (dimensionTable, cell) => {
			const { dimension, members: memberList, foreignKey } = dimensionTable;
			const idValue = cell[foreignKey];
			const member = memberList.find(member => {
				return dimensionTable.getMemberPrimaryKey(member) === idValue;
			});
			handlers.forEach(handler => {
				handler(member, memberList, dimension, cell, foreignKey, dimensionTable);
			});
		};
		cellTable.forEach(cell => {
			dimensionTree.tracePreOrder((tracedDimensionTable, tracedDimensionTree) => {
				handleDimensionTree(tracedDimensionTable, cell);
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

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

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
					foreignKeysCellData[foreignKey] = dimensionTable.getMemberPrimaryKey(tuple[dimension]);
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

function validateFactData(factPrimaryKey, factData){
	if (!factData.hasOwnProperty(factPrimaryKey)) {
		throw new NotFoundFactId(factPrimaryKey)
	}
}

export default Cube;
//# sourceMappingURL=cube.esm.js.map
