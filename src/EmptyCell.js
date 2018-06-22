import Cell from './Cell.js'

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		let r = Math.random() * 16 | 0;
		let v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

export default class EmptyCell extends Cell {
	constructor(data, options) {
		if (!data.id) {
			data.id = EmptyCell.generateId()
		}
		super(data, options)
	}
	/**
	 * @return {EmptyCell}
	 * */
	static createEmptyCell(options) {
		return new EmptyCell(options)
	}
	/**
	 * @param {Cell|{ id: string|number }} cell
	 * @return {boolean}
	 * */
	static isEmptyCell(cell) {
		return typeof cell.id === 'string'
	}
	/**
	 * @return {string}
	 * */
	static generateId() {
		return uuidv4()
	}
}
