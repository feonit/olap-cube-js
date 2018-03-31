class Node {
	constructor({value, childNodes = []}){
		this.value = value;
		this.childNodes = childNodes.length ? childNodes.map( childNode => new Node(childNode) ) : childNodes;
	}
}

/**
 *
 * */
export default class Tree {
	constructor(tree){
		this._root = new Node(tree)
	}
	getRoot(){
		return this._root;
	}
	createIterator(order){
		let i = 0;

		return {
			next: ()=>{
				let done = (i >= order.length);
				let value = !done ? order[i++] : void 0;
				return {
					done,
					value
				}
			}
		}
	}
	/**
	 * A walk in which each parent node is traversed before its children
	 */
	preOrder(callback){
		const reqursively = node => {
			callback(node.value, node);
			if (node.childNodes.length){
				node.childNodes.forEach( childNode => {
					reqursively(childNode)
				})
			}
		};
		reqursively(this.getRoot());
	}
	preOrderQueue(){
		const queue = [];
		const reqursively = node => {
			queue.push(node);
			if (node.childNodes.length){
				node.childNodes.forEach( childNode => {
					reqursively(childNode)
				})
			}
		};
		reqursively(this.getRoot());
		return queue;
	}
	/**
	 * A walk in which the children are traversed before their respective parents are traversed
	 * */
	postOrder(callback){
		const reqursively = (node) => {
			if (node.childNodes.length){
				node.childNodes.forEach( childNode => {
					reqursively(childNode);
				});
			}
			callback(node.value, node);
		};
		reqursively(this.getRoot());
	}
	/**
	 * A walk in which a node's left subtree, then the node itself, and finally its right subtree are traversed
	 * */
	inOrder(callback){

	}
	/**
	 * A walk effectively performs a breadth-first search over the entirety of a tree; nodes are traversed level by level, where the root node is visited first
	 * */
	levelOrder(callback){

	}
	isInternal(node){
		return !!node.childNodes.length;
	}
	isExternal(node){
		return !node.childNodes.length;
	}
	isRoot(node){
		return this._root === node;
	}
	getParentOf(node){
		// if (node === this._root){
		//     return null;
		// }
		let find = false;
		this.preOrder((value, currentNode)=>{
			if (currentNode.childNodes && currentNode.childNodes.length && currentNode.childNodes.indexOf(node) !== -1){
				find = currentNode;
			}
		});
		return find;
	}
	search(data){

	}

	getBranches(){
		const final = this.getRoot().childNodes.map( childNode => childNode );
		return final.map( node => {
			const branch = [];

			const recursive = (node)=>{
				branch.push(node.value);

				if (node.childNodes.length){
					node.childNodes.forEach((node)=>{
						recursive(node)
					})
				}
			};

			recursive(node);

			return branch;
		})
	}

	getLeafs(){
		const nodes = this.preOrderQueue();
		const leafs = [];
		nodes.forEach( node => {
			if (node.childNodes.length){
				leafs.push(node);
			}
		});
		return leafs;
	}
}