/**
 * Element of dimension. Serving to determine the position and description of the data element
 * */
export default class Member {
	constructor(data) {
		Object.assign(this, data);
	}
	static create(id, props, data, primaryKey) {
		if (!(this === Member || Member.isPrototypeOf(this))) {
			throw Error('this.constructor must be prototype of Member')
		}
		const memberData = {};
		memberData[primaryKey] = id;

		props.forEach(prop => {
			// исключить идентификатор самой сущности
			if (prop !== primaryKey) {
				memberData[prop] = data[prop]
			}
		});
		return new this(memberData)
	}
}
