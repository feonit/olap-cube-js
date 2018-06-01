import Cell from './Cell.js'
import {ENTITY_ID} from './const.js'
import Cube from "./Cube.js";
import InputCell from "./InputCell.js";

export default class CellTable extends Array {
	constructor(array) {
		super();
		if (Array.isArray(array)) {
			Object.assign(this, array.map(item => new Cell(item)))
		}
	}
	findById(id) {
		return this.find(cell => {
			return cell[ENTITY_ID] === id;
		});
	}
	addCell(cell) {
		this.push(cell)
	}
	addCells(cells) {
		cells.forEach(cell => {
			this.addCell(cell)
		})
	}
	removeCell(cell) {
		const index = this.indexOf(cell);
		this.splice(index, 1);
	}
	/**
	 * @public
	 * */
	createCell(options) {
		const cell = new InputCell(options);
		this.addCell(cell);
	}
}
