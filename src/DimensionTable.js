import MemberList from './MemberList.js'

export default class DimensionTable {
	constructor({ dimension, idAttribute, keyProps, otherProps = [], members = []}) {
		if (!dimension || !keyProps) {
			throw Error("Bad definition DimensionTable, params 'dimension' and 'keyProps' is required");
		}
		/** Name of the dimension */
		this.dimension = dimension;
		/** id name */
		this.idAttribute = idAttribute;
		/** List of key names properties of the table belonging to the current dimension */
		this.keyProps = keyProps.map(keyProp=>keyProp);
		/** List of additional names properties of the table belonging to the current dimension */
		this.otherProps = [].concat(otherProps);
		/** member list */
		this.members = new MemberList(members);
	}
	/**
	 *
	 * */
	setMemberList(members) {
		this.members.setMembers(members);
	}
	/**
	 *
	 * */
	clearMemberList() {
		this.members = new MemberList([]);
	}
	/**
	 * @public
	 * @param {object} props
	 * @param {[]} linkProps
	 * @param {object?} props
	 * */
	createMember(props = {}, linkProps) {
		const { keyProps, otherProps, members } = this;
		return members.createMember(keyProps.concat(linkProps).concat(otherProps), props);
	}
}
