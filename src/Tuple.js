/**
 * The cell is identified by a tuple
 * tuples can uniquely identify every cell in the cube
 * Tuple is an ordered collection of one or more members from different dimensions
 * */
export default class Tuple {
	constructor(options) {
		Object.assign(this, options)
	}
}
