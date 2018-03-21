
/**
 * The composed aggregate object, members grouped by dimension names
 * */
export default class Space{
	constructor(options){
		if (options){
			this.getDimensionList.call(options).forEach( dimension => {
				this.setMemberList(dimension, options[dimension])
			})
		}
	}
	/**
	 * @param {string} dimension
	 * */
	getMemberList(dimension){
		const memberList = this[dimension];
		if (!memberList){
			throw Error(`dimension "${dimension}" not found`)
		}
		return memberList;
	}
	/**
	 * @param {string} dimension
	 * @param {MemberList|object[]} memberList
	 * */
	setMemberList(dimension, memberList){
		this[dimension] = memberList;
	}
	/**
	 * @return {string[]}
	 * */
	getDimensionList(){
		return Object.keys(this);
	}
}