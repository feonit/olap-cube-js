import DimensionTable from './DimensionTable.js'
import Tree from './Tree.js'
import {DimensionException} from './errors.js'
import { DEFAULT_TEMPLATE_FOREIGN_KEY, ENTITY_ID } from './const.js'

/**
 * It defines the relationship of generalization and specialization (roll-up/drill-down)
 * @throws {DimensionException}
 * */
export default class DimensionTree extends Tree {
	constructor(dimensionTree) {
		super();

		const {dimensionTable, dependency = [], parentNode = null} = dimensionTree;

		Object.defineProperties(this, {
			dimensionTable: {
				/**
				 * @property
				 * @name DimensionTree#dimensionTable
				 * */
				value: new DimensionTable(dimensionTable),
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
			dependency: {
				/**
				 * @property {DimensionTree[]}
				 * @name DimensionTree#dependency
				 * */
				value: dependency.map(dimensionTreeData => {
					return new DimensionTree({ ...dimensionTreeData, parentNode: this })
				}),
				enumerable: true,
				editable: false
			}
		});
	}
	static createDimensionTree(dimensionTreeData, { templateForeignKey = DEFAULT_TEMPLATE_FOREIGN_KEY } = {}) {
		// build 1: idAttributes
		const buildIdAttributeDimensionTable = (dimensionTable) => {
			if (!dimensionTable.idAttribute) {
				dimensionTable.idAttribute = DimensionTree.genericId(dimensionTable.dimension, templateForeignKey)
			}
		};
		const dimensionTree = new DimensionTree(dimensionTreeData);
		dimensionTree.tracePostOrder(buildIdAttributeDimensionTable);
		return dimensionTree;
	}
	/**
	 * @public
	 * A way to create a name for a property in which a unique identifier will be stored
	 * */
	static genericId(dimension, templateForeignKey) {
		return templateForeignKey.replace('%s', dimension);
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
		return this.dependency;
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
		const newDimensionTreeByMember = new DimensionTree(this.getRoot());
		newDimensionTreeByMember.tracePostOrder((dimensionTreeValue, dimensionTree) => {
			const dimensionTable = dimensionTree.getTreeValue();
			dimensionTable.clearMemberList();
		});
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
			newDimensionTreeByMember
				.getDimensionTreeByDimension(tracedDimension)
				.getTreeValue()
				.setMemberList(drillDownedMembers);

			// 5 save current dimension and drill downed members
			lastTracedMembers = drillDownedMembers;
			lastTracedDimensionTree = tracedTree;
		});
		return newDimensionTreeByMember;
	}
	/**
	 * @public
	 * @param {Member} member
	 * */
	removeProjectionOntoMember(member) {
		// 1 get projection
		const projectionDimensionTree = this.createProjectionOntoMember(member);
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
			this.tracePreOrder(tracedDimensionTree => {
				const {members: childMembers, dimension: childDimension} = tracedDimensionTree.getTreeValue();
				toBeRemovedSpace[childDimension] = childMembers;
			})
		}

		// remove removal space
		Object.keys(toBeRemovedSpace).forEach(dimension => {
			const currentDimensionTree = this.getDimensionTreeByDimension(dimension);
			const currentMemberList = currentDimensionTree.getTreeValue().members;
			toBeRemovedSpace[dimension].forEach(member => {
				currentMemberList.removeMember(member);
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
		const { members: parentMembers } = parentTree.getTreeValue();
		const { idAttribute } = this.getTreeValue();
		const drillDownMembers = [];
		members.forEach(member => {
			parentMembers.forEach(parentMember => {
				if (parentMember[idAttribute] === member[ENTITY_ID]) {
					if (drillDownMembers.indexOf(parentMember) === -1) {
						drillDownMembers.push(parentMember)
					}
				}
			})
		});
		return drillDownMembers;
	}
	/**
	 * @public
	 * @this {DimensionTree}
	 * @param {Member[]} members
	 * @return {Member[]}
	 * */
	rollUpDimensionMembers(members = this.getTreeValue().members) {
		if (this.isExternal()) {
			return members;
		}
		const childTree = this.getChildTrees()[0]; // for one child always
		const { members: childMembers, idAttribute } = childTree.getTreeValue();
		const rollUpMembers = [];
		members.forEach(member => {
			childMembers.forEach(childMember => {
				if (member[idAttribute] === childMember[ENTITY_ID]) {
					if (rollUpMembers.indexOf(childMember) === -1) {
						rollUpMembers.push(childMember)
					}
				}
			})
		});
		return rollUpMembers;
	}
	/**
	 * @public
	 * @param {object?} props
	 * */
	createMember(props = {}) {
		const dimensionTable = this.getTreeValue();
		const childIdAttributes = this.getChildTrees().map(dimensionTree =>
			dimensionTree.getTreeValue().idAttribute
		);
		const linkProps = [];
		childIdAttributes.forEach(idAttribute => {
			linkProps.push(idAttribute)
		});
		return dimensionTable.createMember(props, linkProps)
	}
}
