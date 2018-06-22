import Cell from './Cell.js'
import EmptyCell from './EmptyCell.js'

export default class CellTable extends Array {
	constructor(array) {
		super();
		if (Array.isArray(array)) {
			Object.assign(this, array.map(item => EmptyCell.isEmptyCell(item) ? new EmptyCell(item) : new Cell(item)))
		}
	}
	/**
	 * @public
	 * @param {Cell} cell
	 * */
	addCell(cell) {
		this.push(cell)
	}
	/**
	 * @public
	 * @param {Cell[]|CellTable} cells
	 * */
	addCells(cells) {
		cells.forEach(cell => {
			this.addCell(cell)
		})
	}
	/**
	 * @public
	 * @param {Cell} cell
	 * */
	removeCell(cell) {
		const index = this.indexOf(cell);
		this.splice(index, 1);
	}
	/**
	 * @public
	 * @param {Cell[]|CellTable} cells
	 * */
	removeCells(cells) {
		cells.forEach(cell => {
			this.removeCell(cell)
		})
	}
}
