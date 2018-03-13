export default class Composite {
	constructor({member = {}, category, name, remove, ...rest}){
		this.member = member;
		this.category = category;
		this.name = name;
		this.remove = remove;
		Object.assign(this, rest)
	}
}