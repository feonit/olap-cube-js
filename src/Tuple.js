/**
 * The cell is identified by a tuple
 * tuples can uniquely identify every cell in the cube
 * tuple - the set of members of each of the dimensions
 * */
export default class Tuple {
	constructor(options) {
		Object.assign(this, options)
	}
}
