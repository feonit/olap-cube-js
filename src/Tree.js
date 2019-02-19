/**
 * Tree traversing https://en.wikipedia.org/wiki/Tree_traversal
 * @class Tree
 * @abstract class cannot be instantiated with new
 * */
export default class Tree {
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
