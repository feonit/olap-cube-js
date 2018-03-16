export default class Composite {
	constructor({member = {}, rows, headerName, categoryName, remove, ...rest}){
		this.member = member;
		this.rows = rows;
		this.headerName = headerName;
		this.categoryName = categoryName;
		this.remove = remove;
		Object.assign(this, rest)
	}
}