import Dimension from "./Dimension.js";

export default class SchemaDimension extends Dimension{
	constructor({ dependency = [], ...rest}){
		super(rest);

		/** The list of dimensions with which the current dimension is directly related */
		this.dependency = dependency && dependency.map( dependency => new SchemaDimension(dependency) );
	}
}