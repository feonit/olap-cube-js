import DimensionTable from './DimensionTable.js'
import Tree from './Tree.js'
import {DimensionException} from './errors.js'
import Cube from './Cube.js'
import {ENTITY_ID} from './const.js'
import { DEFUALT_TEMPLATE_FOREIGN_KEY } from './const.js'

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
	static createDimensionTree(dimensionTreeData, { templateForeignKey = DEFUALT_TEMPLATE_FOREIGN_KEY } = {}) {
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
	 * @param {string} dimension
	 * @param {Member} member
	 * @return {DimensionTree|undefined}
	 * */
	createProjectionOntoMember(dimension, member) {
		// 1 create copy of hierarchy with empty members
		const newDimensionTreeByMember = new DimensionTree(this.getRoot());
		newDimensionTreeByMember.tracePostOrder((dimensionTreeValue, dimensionTree)=>{
			const dimensionTable = dimensionTree.getTreeValue();
			dimensionTable.clearMemberList();
		});
		// 2 get dimensionTree by dimension
		const searchedInTree = this.getDimensionTreeByDimension(dimension);
		let lastMembers;
		let lastDimension;
		// 3 trace up
		searchedInTree.traceUpOrder(tracedTree => {
			const { dimension: tracedDimension } = tracedTree.getTreeValue();

			// 4 get drill down of last members
			const drillDownedMembers = tracedTree == searchedInTree
				? [member]
				: this.drillDownDimensionMembers(lastDimension, lastMembers);

			// 5 set members
			newDimensionTreeByMember
				.getDimensionTreeByDimension(tracedDimension)
				.getTreeValue()
				.setMemberList(drillDownedMembers);

			// 6 save current dimension and drill downed members
			lastDimension = tracedDimension;
			lastMembers = drillDownedMembers;
		});
		return newDimensionTreeByMember;
	}
	/**
	 * @public
	 * @param {string} dimension
	 * @param {Member} member
	 * */
	removeDimensionMember(dimension, member) {
		// travers up
		let removalInTree = this.getDimensionTreeByDimension(dimension);

		const projectionDimensionTree = removalInTree.createProjectionOntoMember(dimension, member);

		// remove intersection
		const toBeRemovedSpace = {};
		const endToBeRemovedMember = {};

		projectionDimensionTree.tracePostOrder(dimensionTreeValue => {
			const {dimension, members} = dimensionTreeValue;
			toBeRemovedSpace[dimension] = members;
		});

		const memberList = removalInTree.getTreeValue().members;

		// travers down
		if (memberList.length === 1) {
			removalInTree.tracePreOrder(downTree => {
				const {members: childMembers, dimension: childDimension} = downTree.getTreeValue();
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

		const {
			dimension: dimensionProjection,
			members: membersProjection
		} = projectionDimensionTree.getRoot().getTreeValue();

		endToBeRemovedMember[dimensionProjection] = membersProjection;

		return endToBeRemovedMember;
	}
	/**
	 * @public
	 * @param {string} dimension
	 * @param {Member[]} members
	 * @return {Member[]}
	 * */
	drillDownDimensionMembers(dimension, members) {
		const dimensionTree = this.getRoot().getDimensionTreeByDimension(dimension);
		if (dimensionTree.isRoot()) {
			return members;
		}
		const parentTree = dimensionTree.getParentTree();
		const { members: parentMembers } = parentTree.getTreeValue();
		const { idAttribute } = dimensionTree.getTreeValue();
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
	 * @param {string} dimension
	 * @param {Member[]} members
	 * @return {Member[]}
	 * */
	rollUpDimensionMembers(dimension, members) {
		const dimensionTree = this.getRoot().getDimensionTreeByDimension(dimension);
		if (dimensionTree.isExternal()) {
			return members;
		}
		const childTree = dimensionTree.getChildTrees()[0]; // for one child always
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
