import Tree from '../src/Tree.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

describe('class Tree', ()=>{

	it('should define getTreeValue', ()=> { expect(Tree.prototype.getTreeValue).toBeDefined(); });
	it('should define getParentTree', ()=> { expect(Tree.prototype.getParentTree).toBeDefined(); });
	it('should define getChildTrees', ()=> { expect(Tree.prototype.getChildTrees).toBeDefined(); });
	it('should define isExternal', ()=> { expect(Tree.prototype.isExternal).toBeDefined(); });
	it('should define isRoot', ()=> { expect(Tree.prototype.isRoot).toBeDefined(); });
	it('should define getRootTree', ()=> { expect(Tree.prototype.getRootTree).toBeDefined(); });
	it('should define searchValue', ()=> { expect(Tree.prototype.searchValue).toBeDefined(); });
	it('should define traceUpOrder', ()=> { expect(Tree.prototype.traceUpOrder).toBeDefined(); });
	it('should define tracePostOrder', ()=> { expect(Tree.prototype.tracePostOrder).toBeDefined(); });

	let tree;
	let CustomTree;
	let debug;

	beforeEach(()=>{
		CustomTree = class CustomTree extends Tree {
			constructor({nodeValue, childNodes = [], parentNode = null}) {
				super();
				this.nodeValue = nodeValue;
				Object.defineProperties(this, {
					parentNode: {
						enumerable: false,
						value: parentNode
					},
					childNodes: {
						enumerable: true,
						value: childNodes.map(node => new CustomTree({...node, parentNode: this}))
					}
				});
			}
			getTreeValue() {
				return this.nodeValue
			}
			getParentTree() {
				return this.parentNode
			}
			getChildTrees() {
				return this.childNodes
			}
		};
		tree = new CustomTree({
			nodeValue: 1,
			childNodes: [
				{
					nodeValue: 10,
					childNodes: [
						{
							nodeValue: 100
						},
						{
							nodeValue: 101
						}
					]
				},
				{
					nodeValue: 20,
					childNodes: [
						{
							nodeValue: 201
						}
					]
				}
			]
		});
	});

	it('constructor should work with default params', ()=>{
		debug = isEqualObjects(
			tree,
			{
				nodeValue: 1,
				childNodes: [
					{
						nodeValue: 10,
						childNodes: [
							{
								nodeValue: 100,
								childNodes: []
							},
							{
								nodeValue: 101,
								childNodes: []
							}
						]
					},
					{
						nodeValue: 20,
						childNodes: [
							{
								nodeValue: 201,
								childNodes: []
							}
						]
					}
				]
			}
		);
		expect(debug = (tree.getParentTree() === null)).toBe(true);
		expect(debug = (tree.getChildTrees()[0].getParentTree() === tree)).toBe(true);
	});

	it('the constructor can clone', ()=>{
		const newTree = new CustomTree(tree);
		isEqualObjects(tree, newTree)
	});

	it('references to child and parent nodes are not available for change', ()=>{
		expect(tree.getParentTree() === null).toBe(true);

		const link = tree.childNodes;
		expect(()=>{
			tree.childNodes = [];
		}).toThrow();
		expect(tree.childNodes === link).toBe(true);
	});

	it('should correctly work method traceUpOrder (A walk to root from current node, the current node and root entered to the chain)',()=>{
		const order = [];
		const lastNode = tree.getChildTrees()[0].getChildTrees()[0];
		lastNode.traceUpOrder((node)=>{
			order.push(node.getTreeValue())
		});
		isEqualObjects(order, [100, 10, 1])
	});

	it('should correctly work method tracePostOrder (A walk in which the children are traversed before their respective parents are traversed)',()=>{
		const order = [];
		tree.tracePostOrder((nodeValue, node)=>{
			order.push(nodeValue)
		});
		isEqualObjects(order, [100, 101, 10, 201, 20, 1])
	})
});
