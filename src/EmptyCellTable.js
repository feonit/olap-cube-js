import EmptyCell from './EmptyCell.js'

export default class EmptyCellTable {
	/**
	 * @param {EmptyCell[]} emptyCells
	 * @throw {TypeError}
	 * */
	static validateInstance(emptyCells) {
		emptyCells.forEach(emptyCell => {
			if (!(emptyCell instanceof EmptyCell)) {
				throw new TypeError('some item in list of argument is not instances of EmptyCell')
			}
		});
	}
}