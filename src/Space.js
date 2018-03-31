import MemberList from './MemberList.js'
/**
 * The composed aggregate object, members grouped by dimension names
 * */
export default class Space{
	constructor(options){
		if (options){
			this.getDimensionList.call(options).forEach( dimension => {
				const memberList = options[dimension]
				this.setMemberList(dimension, memberList)
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
		this[dimension] = new MemberList(memberList);
	}
	/**
	 * @return {string[]}
	 * */
	getDimensionList(){
		return Object.keys(this);
	}
}