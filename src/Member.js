import {ENTITY_ID} from './const.js'

/**
 * Element of dimension. Serving to determine the position and description of the data element
 * */
export default class Member {
	constructor(data) {
		Object.assign(this, data);
	}
	static create(id, props, data) {
		if (!(this === Member || Member.isPrototypeOf(this))) {
			throw Error('this.constructor must be prototype of Member')
		}
		const memberData = {};
		memberData[ENTITY_ID] = id;

		props.forEach(prop => {
			// исключить идентификатор самой сущности
			if (prop !== ENTITY_ID) {
				memberData[prop] = data[prop]
			}
		});
		return new this(memberData)
	}
}
