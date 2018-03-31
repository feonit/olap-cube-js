import {ENTITY_ID} from "./const.js";

export default class Fact {
	constructor(data){
		Object.assign(this, data)
		if (!this[ENTITY_ID]){
			throw "data must have id parameter"
		}
	}
}