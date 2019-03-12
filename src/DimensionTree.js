import DimensionTable from './DimensionTable.js'
import Tree from './Tree.js'
import {DimensionException} from './errors.js'
/**
 * It defines the relationship of generalization and specialization (roll-up/drill-down)
 * @throws {DimensionException}
 * */
export default class DimensionTree extends Tree {
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
				dimensions.push(dimension)
			} else {
				throw new DimensionException();
			}
		})
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
		this.projectDrill(dimensionTree, member, "traceUpOrder", "drillDownDimensionMembers")
	}
	projectDrillUp(dimensionTree, member){
		this.projectDrill(dimensionTree, member, "tracePreOrder", "drillUpDimensionMembers")
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
			})
		}

		// remove removal space
		Object.keys(toBeRemovedSpace).forEach(dimension => {
			const currentDimensionTree = this.getDimensionTreeByDimension(dimension);
			const dimensionTable = currentDimensionTree.getTreeValue();
			toBeRemovedSpace[dimension].forEach(member => {
				dimensionTable.removeMember(member);
			})
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
			})
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
						drillMembers.push(parentMember)
					}
				}
			})
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
		const childTrees = this.getChildTrees();
		const childTree = childTrees[0]; // todo not for one child always
		const childDimensionTable = childTree.getTreeValue();
		const { members: childMembers } = childDimensionTable;
		const drillMembers = [];
		members.forEach(member => {
			childMembers.forEach(childMember => {
				if (childDimensionTable.getMemberForeignKey(member) === childDimensionTable.getMemberPrimaryKey(childMember)) {
					if (drillMembers.indexOf(childMember) === -1) {
						drillMembers.push(childMember)
					}
				}
			})
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
			linkProps.push(foreignKey)
		});
		return dimensionTable.createMember(memberOptions, linkProps)
	}
}
