/**
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
	isFirstLevel() {
		return !this.isRoot() && (this.getParentTree().getParentTree() === null)
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
				search = tree
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
