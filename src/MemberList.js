import {ENTITY_ID} from "./const.js";

/**
 * */
export default class MemberList extends Array {
	constructor(array){
		super();
		if (Array.isArray(array)){
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
	add(member){
		if (this.indexOf(member[ENTITY_ID] === -1)){
			this.push(member)
		} else {
			debugger;
		}
	}
}