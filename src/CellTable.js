import Cell from "./Cell.js";
import {ENTITY_ID} from "./const.js";

export default class CellTable extends Array {
	constructor(array){
		super();
		if (Array.isArray(array)){
			Object.assign(this, array.map(item => new Cell(item)))
		}
	}
	findById(id){
		return this.find( cell => {
			return cell[ENTITY_ID] === id;
		});
	}
}