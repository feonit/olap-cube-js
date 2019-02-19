import Tree from '../src/Tree.js'
import {isEqualObjects} from '../spec/helpers/helpers.js'

export default () => {

	it('should define getTreeValue', () => { expect(Tree.prototype.getTreeValue).toBeDefined(); });
	it('should define getParentTree', () => { expect(Tree.prototype.getParentTree).toBeDefined(); });
	it('should define getChildTrees', () => { expect(Tree.prototype.getChildTrees).toBeDefined(); });
	it('should define isExternal', () => { expect(Tree.prototype.isExternal).toBeDefined(); });
	it('should define isRoot', () => { expect(Tree.prototype.isRoot).toBeDefined(); });
	it('should define getRoot', () => { expect(Tree.prototype.getRoot).toBeDefined(); });
	it('should define traceUpOrder', () => { expect(Tree.prototype.traceUpOrder).toBeDefined(); });
	it('should define tracePostOrder', () => { expect(Tree.prototype.tracePostOrder).toBeDefined(); });

	let tree;
	let CustomTree;
	let debug;

	beforeEach(() => {
		CustomTree = class CustomTree extends Tree {
			constructor({treeValue, childTrees = [], parentTree = null}) {
				super();
				this.treeValue = treeValue;
				Object.defineProperties(this, {
					parentTree: {
						enumerable: false,
						value: parentTree
					},
					childTrees: {
						enumerable: true,
						value: childTrees.map(tree => new CustomTree({...tree, parentTree: this}))
					}
				});
			}
			getTreeValue() {
				return this.treeValue
			}
			getParentTree() {
				return this.parentTree
			}
			getChildTrees() {
				return this.childTrees
			}
		};
		tree = new CustomTree({
			treeValue: 1,
			childTrees: [
				{
					treeValue: 10,
					childTrees: [
						{
							treeValue: 100
						},
						{
							treeValue: 101
						}
					]
				},
				{
					treeValue: 20,
					childTrees: [
						{
							treeValue: 201
						}
					]
				}
			]
		});
	});

	it('constructor should work with default params', () => {
		debug = isEqualObjects(
			tree,
			{
				treeValue: 1,
				childTrees: [
					{
						treeValue: 10,
						childTrees: [
							{
								treeValue: 100,
								childTrees: []
							},
							{
								treeValue: 101,
								childTrees: []
							}
						]
					},
					{
						treeValue: 20,
						childTrees: [
							{
								treeValue: 201,
								childTrees: []
							}
						]
					}
				]
			}
		);
		expect(debug = (tree.getParentTree() === null)).toBe(true);
		expect(debug = (tree.getChildTrees()[0].getParentTree() === tree)).toBe(true);
	});

	it('the constructor can clone', () => {
		const newTree = new CustomTree(tree);
		isEqualObjects(tree, newTree)
	});

	it('references to child and parent trees are not available for change', () => {
		expect(tree.getParentTree() === null).toBe(true);

		const link = tree.childTrees;
		expect(() => {
			tree.childTrees = [];
		}).toThrow();
		expect(tree.childTrees === link).toBe(true);
	});

	it('should correctly work method traceUpOrder (A walk to root from current tree, the current tree and root entered to the chain)',() => {
		const order = [];
		const lastTree = tree.getChildTrees()[0].getChildTrees()[0];
		lastTree.traceUpOrder((tracedTreeValue, tracedTree) => {
			order.push(tracedTreeValue)
		});
		isEqualObjects(order, [100, 10, 1])
	});

	it('should correctly work method tracePostOrder (A walk in which the children are traversed before their respective parents are traversed)',() => {
		const order = [];
		tree.tracePostOrder(tracedTreeValue => {
			order.push(tracedTreeValue)
		});
		isEqualObjects(order, [100, 101, 10, 201, 20, 1])
	})
};
