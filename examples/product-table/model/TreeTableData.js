export default class TreeTableData {
	constructor({member = {}, rows, headerName, categoryName, remove, add}){
		this.member = member;
		this.rows = rows;
		this.headerName = headerName;
		this.categoryName = categoryName;
		this.remove = remove;
		this.add = add;
	}
}