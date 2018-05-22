import MemberList from './MemberList.js'


export default class DimensionTable {
	constructor({ dimension, keyProps, otherProps = [], members = []}){
		if (!dimension || !keyProps){
			throw Error("Bad definition DimensionTable, params 'dimension' and 'keyProps' is required");
		}
		/** Name of the dimension */
		this.dimension = dimension;
		/** List of key names properties of the entity belonging to the current dimension */
		this.keyProps = keyProps.map(keyProp=>keyProp);
		/** List of additional names properties of the entity belonging to the current dimension */
		this.otherProps = otherProps.map(otherProp=>otherProp);
		/** List of members */
		this.members = new MemberList(members);
	}

	setMemberList(members){
		this.members.setMembers(members);
	}
	clearMemberList(){
		this.members = new MemberList([]);
	}
}