/**
 * Dimension attributes
 * */
export default class Dimension {
	constructor({ dimension, keyProps, otherProps = [] }){

		if (!dimension || !keyProps || !keyProps.length){
			throw Error("Bad dimension description at schema, params 'dimension' and 'keyProps' is required");
		}

		/** Name of the dimension */
		this.dimension = dimension;

		/** List of key names properties of the entity belonging to the current dimension */
		this.keyProps = keyProps;

		/** List of additional names properties of the entity belonging to the current dimension */
		this.otherProps = otherProps;
	}
}