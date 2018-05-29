import MemberList from './MemberList.js'
/**
 * The composed aggregate object, members grouped by dimension names
 * */
export default class Space {
	constructor(options) {
		if (options) {
			this.getDimensionList.call(options).forEach(dimension => {
				const memberList = options[dimension];
				this.setMemberList(dimension, memberList)
			})
		}
	}
	/**
	 * @param {string} dimension
	 * @param {MemberList|object[]} memberList
	 * */
	setMemberList(dimension, memberList) {
		this[dimension] = new MemberList(memberList);
	}
	/**
	 * @return {string[]}
	 * */
	getDimensionList() {
		return Object.getOwnPropertyNames(this);
	}

	static union() {
		const newSpace = {};
		const arg = [...arguments];
		arg.forEach(space => {
			Space.add(newSpace, space);
		});
		return newSpace;
	}

	static add(targetSpace, otherSpace) {
		Object.keys(otherSpace).forEach(dimension => {
			if (!targetSpace[dimension]) {
				targetSpace[dimension] = [];
			}
			Array.prototype.push.apply(targetSpace[dimension], otherSpace[dimension])
		})
	}
}
