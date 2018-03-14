export default class Composite {
	constructor({member = {}, category, headerName, categoryName, remove, ...rest}){
		this.member = member;
		this.category = category;
		this.headerName = headerName;
		this.categoryName = categoryName;
		this.remove = remove;
		Object.assign(this, rest)
	}
}