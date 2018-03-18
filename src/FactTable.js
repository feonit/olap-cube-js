import Fact from './Fact.js';

export default class FactTable extends Array {
	constructor(array){
		super();
		if (Array.isArray(array)){
			Object.assign(this, array.map(item => new Fact(item)))
		}
	}
}