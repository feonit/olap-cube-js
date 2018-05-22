import {ENTITY_ID} from "./const.js";
import Member from "./Member.js";

/**
 * */
export default class MemberList extends Array {
	constructor(array){
		super();
		if (Array.isArray(array)){
			array = array.map( member => new Member(member) )
			Object.assign(this, array)
		}
	}
	filter(){
		return [].filter.apply(this, arguments);
	}
	/**
	 * search members for all properties by some value
	 * */
	searchValue(value){
		return this.filter( member => {
			return Object.keys(member).find((key)=>{
				return key !== ENTITY_ID && member[key] === value;
			});
		});
	}
	searchData(data){
		if (data && typeof data === "object"){
			const keys = Object.keys(data);
			return this.filter( member => {
				return keys.some( key => {
					return member.hasOwnProperty(key) && member[key] !== data[key];
				});
			});
		}
	}
	addMember(member){
		if (this.indexOf(member[ENTITY_ID] === -1)){
			this.push(member)
		} else {
			debugger;
		}
	}
	removeMember(member){
		var index = this.indexOf(member);
		if (index === -1) {
			throw new Error('represented member was not found', member);
		}
		this.splice(index, 1);
	}
	setMembers(members){
		this.splice(0, this.length)
		Object.assign(this, members)
	}
}