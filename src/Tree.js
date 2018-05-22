/**
 * Data definition for Tree
 * @typedef {object} INode
 * @property {any} nodeValue
 * @property {INode[]} childNodes
 * @property {INode} parentNode
 * */

/**
 * @class Tree
 * @abstract class cannot be instantiated with new
 * */
export default class Tree {
	/**
	 * method
	 * */
	getTreeValue(){
		throw 'abstract method'
	}
	/**
	 * method
	 * */
	getParentTree(){
		throw 'abstract method'
	}
	/**
	 * method
	 * */
	getChildTrees(){
		throw 'abstract method'
	}
	/**
	 * @return {boolean}
	 * */
	isExternal(){
		return !this.getChildTrees().length;
	}
	/**
	 * @return {boolean}
	 * */
	isRoot(){
		return this.getParentTree() === null;
	}
	isFirstLevel(){
		return !this.isRoot() && ( this.getParentTree().getParentTree() === null )
	}
	/**
	 * @return {Tree}
	 * */
	getRootTree(){
		let root;
		this.traceUpOrder((Tree)=>{
			if (Tree.isRoot()){
				root = Tree;
			}
		});
		return root;
	}
	/**
	 * Search method
	 * */
	searchValue(callback){
		let search = void 0;
		this.tracePostOrder((nodeValue, tree)=>{
			if ( callback(tree) ){
				search = tree
			}
		});
		return search;
	}
	/**
	 * A walk to root from current Tree, the current Tree and root entered to the chain
	 * @param {function} callback
	 * */
	traceUpOrder(callback){
		(function reqursively(tree) {
			const parentNode = tree.getParentTree();
			callback(tree);
			if ( parentNode !== null ){
				reqursively(parentNode);
			}
		})(this);
	}
	/**
	 * A walk in which the children are traversed before their respective parents are traversed
	 * @param {function} callback
	 * */
	tracePostOrder(callback){
		(function reqursively(tree) {
			const childNodes = tree.getChildTrees();
			const nodeValue = tree.getTreeValue();
			if (childNodes.length){
				childNodes.forEach( childNode => {
					reqursively(childNode);
				});
			}
			callback(nodeValue, tree);
		})(this);
	}
	/**
	 *  A walk in which each parent node is traversed before its children is called a pre-order walk
	 * */
	tracePreOrder(callback){
		(function reqursively(tree) {
			const childNodes = tree.getChildTrees();
			const nodeValue = tree.getTreeValue();
			callback(nodeValue, tree);
			if (childNodes.length){
				childNodes.forEach( childNode => {
					reqursively(childNode);
				});
			}
		})(this);
	}
	/**
	 * A child nodes with no children.
	 * @return {Tree[]}
	 * */
	getExternals(){
		const externals = [];
		this.tracePostOrder((nodeValue, tree)=>{
			if (tree.isExternal(tree)){
				externals.push(tree)
			}
		});
		return externals;
	}
	/**
	 * Get root for that tree
	 * */
	getRoot(){
		let root;
		this.traceUpOrder((tracedTree)=>{
			if (tracedTree.isRoot()){
				root = tracedTree;
			}
		})
		return root;
	}
}