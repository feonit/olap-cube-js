import DimensionTree from './DimensionTree.js'

/**
 * The elements of a dimension can be organized as a hierarchy
 * Hierarchy is a dimension hierarchy of a cube
 * */
export default class DimensionHierarchy {
	constructor({ dimensionTree, activeDimension, hierarchy}) {
		if (!hierarchy) {
			throw Error('attribute "hierarchy" must be defined')
		}
		this.dimensionTree = dimensionTree instanceof DimensionTree
			? dimensionTree
			: DimensionTree.createDimensionTree(dimensionTree);
		this.activeDimension = activeDimension || this.dimensionTree.getTreeValue().dimension;
		this.hierarchy = hierarchy;
	}
	getDimensionTree() {
		return this.dimensionTree;
	}
	hasDimension(dimension) {
		return !!this.dimensionTree.getDimensionTreeByDimension(dimension);
	}
	getActiveDimension() {
		return this.activeDimension;
	}
	setActiveDimension(activeDimension) {
		this.activeDimension = activeDimension;
	}
	getHierarchy() {
		return this.hierarchy;
	}
	static createDimensionHierarchy(dimensionHierarchy) {
		return new DimensionHierarchy(dimensionHierarchy)
	}
}
