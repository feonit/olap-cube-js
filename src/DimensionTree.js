import DimensionTable from "./DimensionTable.js";
import Tree from "./Tree.js";
import {DimensionException} from './errors.js'
import Cube from "./Cube.js";
import {ENTITY_ID} from "./const.js";

/**
 * It defines the relationship of generalization and specialization (roll-up/drill-down)
 * @throws {DimensionException}
 * */
export default class DimensionTree extends Tree {
	constructor(tree){
		super();

		const {dimensionTable, dependency = [], parentNode = null} = tree;

		Object.defineProperties(this, {
			/**
			 * @property
			 * @name Tree#nodeValue
			 * */
			'dimensionTable': {
				value: new DimensionTable(dimensionTable),
				enumerable: true,
				editable: false
			},
			/**
			 * @property {Tree|null}
			 * @name Tree#parentNode
			 * */
			'parentNode': {
				value: parentNode,
				enumerable: false,
				editable: false
			},
			/**
			 * @property {Tree[]}
			 * @name Tree#childNodes
			 * */
			'dependency': {
				value: dependency.map( (dimensionTreeData) => {
					return new DimensionTree({ ...dimensionTreeData, parentNode: this })
				}
			),
				enumerable: true,
				editable: false
			}
		});
	}
	static createDimensionTree(dimensionTreeData){
		return new DimensionTree(dimensionTreeData);
	}
	getTreeValue(){
		return this.dimensionTable;
	}
	getParentTree(){
		return this.parentNode;
	}
	getChildTrees(){
		return this.dependency;
	}
	getSpace(){
		const space = {};
		this.getRoot().tracePostOrder(({dimension, members})=>{
			space[dimension] = members
		});
		return space
	}
	traceUp(dimension, callback){
		let node = this.searchValueDimension(dimension);
		node.traceUpOrder((tracedNode)=>{
			callback(tracedNode.getTreeValue())
		});
	}

	searchValueDimension(dimension){
		return this.searchValue( tree => {
			const treeValue = tree.getTreeValue();
			return treeValue.dimension === dimension;
		});
	}

	recoveryTreeProjectionOfMember(dimension, member){
		const searchedInTree = this.searchValueDimension(dimension);

		let lastMembers;
		let lastDimension;

		const newDimensionTreeByMember = new DimensionTree(this.getRoot());
		newDimensionTreeByMember.clearDimensionTablesMembers();

		searchedInTree.traceUpOrder((tracedTree)=>{
			const {
				members: tracedMembers,
				dimension: tracedDimension
			} = tracedTree.getTreeValue();

			if (tracedTree == searchedInTree){
				const searchedMember = tracedMembers.find(childMember=>{
					return childMember[ENTITY_ID] === member[ENTITY_ID]
				});
				if (!searchedMember){
					throw 'member not found'
				}
				lastMembers = [searchedMember];
				lastDimension = tracedDimension;

			} else {
				const idAttribute = Cube.genericId(lastDimension);
				const relations = [];
				tracedMembers.forEach(tracedMember=>{
					lastMembers.forEach(lastMember=>{
						if (tracedMember[idAttribute]===lastMember[ENTITY_ID]){
							relations.push(tracedMember)
						}
					});
				});
				lastMembers = relations;
				lastDimension = tracedDimension;
			}

			const dimensionTree = newDimensionTreeByMember.searchValueDimension(lastDimension);
			dimensionTree.getTreeValue().setMemberList(lastMembers);
		});

		return newDimensionTreeByMember;
	}

	removeDimensionMember(dimension, member){
		// travers up
		let removalInTree = this.searchValueDimension(dimension);

		const treeProjection = removalInTree.recoveryTreeProjectionOfMember(dimension, member);

		const toBeRemovedSpace = {};
		const endToBeRemovedMember = {};

		treeProjection.tracePostOrder((treeValue)=>{
			const {dimension, members} = treeValue;
			toBeRemovedSpace[dimension] = members;
		});

		const space = this.getSpace();

		// travers down
		if (space[dimension].members === 1){
			removalInTree.tracePreOrder((downTree)=>{
				const {members: childMembers, dimension: childDimension} = downTree.getTreeValue();
				toBeRemovedSpace[childDimension] = childMembers;
			})
		}

		// remove removal space
		Object.keys(toBeRemovedSpace).forEach(dimension=>{
			toBeRemovedSpace[dimension].forEach(member=>{
				space[dimension].removeMember(member);
			})
		});

		const {
			dimension: dimensionProjection,
			members: membersProjection
		} = treeProjection.getRoot().getTreeValue();

		endToBeRemovedMember[dimensionProjection] = membersProjection;

		return endToBeRemovedMember;
	}

	clearDimensionTablesMembers(){
		this.tracePostOrder((treeValue, tree)=>{
			const dimensionTable = tree.getTreeValue();
			dimensionTable.clearMemberList();
		})
	}

	/**
	 *
	 * */
	drillDownDimensionMembers(dimension, members){
		const tree = this.getRoot().searchValueDimension(dimension);
		if (tree.isRoot()){
			return members;
		}
		const parentTree = tree.getParentTree();
		const { members: parentMembers } = parentTree.getTreeValue();
		const idAttribute = Cube.genericId(dimension);
		const drillDownMembers = [];
		members.forEach(member => {
			parentMembers.forEach(parentMember => {
				if (parentMember[idAttribute] === member[ENTITY_ID]){
					if (drillDownMembers.indexOf(parentMember)=== -1){
						drillDownMembers.push(parentMember)
					}
				}
			})
		});
		return drillDownMembers;
	}
	/**
	 *
	 * */
	rollUpDimensionMembers(dimension, members){
		const tree = this.getRoot().searchValueDimension(dimension);
		if (tree.isExternal()){
			return members;
		}
		const childTree = tree.getChildTrees()[0]; // for one child always
		const { members: childMembers, dimension: childDimension } = childTree.getTreeValue();
		const idAttribute = Cube.genericId(childDimension);
		const rollUpMembers = [];
		members.forEach(member => {
			childMembers.forEach(childMember => {
				if (member[idAttribute] === childMember[ENTITY_ID]){
					if (rollUpMembers.indexOf(childMember)=== -1){
						rollUpMembers.push(childMember)
					}
				}
			})
		});
		return rollUpMembers;
	}
}