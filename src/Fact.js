import {ENTITY_ID} from "./const.js";

const DIVIDER = ',';

export default class Fact {
	constructor(data){
		Object.assign(this, data)
		if (!this[ENTITY_ID]){
			throw "data must have id parameter"
		}
	}
	createKeyFromProps(props){
		return props.map( prop => {
			return this[prop]
		}).join(DIVIDER);
	}
}