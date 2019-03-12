import Member from './Member.js'
import {DEFAULT_MEMBER_ID_PROP, DEFAULT_TEMPLATE_FOREIGN_KEY} from './const.js'
import SnowflakeBuilder from "./SnowflakeBuilder.js";

/**
 * Dimension is a dimension of a cube. A dimension is a primary organizer of measure and attribute information in a cube
 * A dimension will contain some members organized in some hierarchy or hierarchies containing levels.
 * */
export default class DimensionTable {
	constructor({ dimension, foreignKey = DimensionTable.genericId(dimension), primaryKey = DEFAULT_MEMBER_ID_PROP, keyProps, otherProps = [], members = [], defaultMemberOptions = {}}) {
		if (!dimension || !keyProps) {
			throw Error('Bad definition DimensionTable, params \"dimension\" and \"keyProps\" is required');
		}
		if (Object.keys(defaultMemberOptions).indexOf(primaryKey) !== -1) {
			throw Error('Bad definition DimensionTable, \"defaultMemberOptions\" must not contain a \"primaryKey\" property');
		}
		/** Name of the dimension */
		this.dimension = dimension;
		/** id name */
		this.foreignKey = foreignKey;
		/** id name */
		this.primaryKey = primaryKey;
		/** List of key names properties of the table belonging to the current dimension */
		this.keyProps = [].concat(keyProps);
		/** List of additional names properties of the table belonging to the current dimension */
		this.otherProps = [].concat(otherProps);
		/** member list */
		this.members = members.map(memberData => {
			return new Member(memberData, this.primaryKey)
		});
		/** member default property options */
		this.defaultMemberOptions = {...defaultMemberOptions};
	}
	/**
	 *
	 * */
	setMemberList(members) {
		[].splice.apply(this.members, [0, this.members.length].concat(members))
	}
	/**
	 *
	 * */
	clearMemberList() {
		this.members = [];
	}
	getMemberPrimaryKey(member) {
		return member[this.primaryKey]
	}
	getMemberForeignKey(member) {
		return member[this.foreignKey]
	}
	/**
	 * @param {Member} member
	 * */
	addMember(member) {
		if (this.members.indexOf(member) === -1) {
			this.members.push(member)
		} else {
			console.log('boo')
		}
	}
	/**
	 * @public
	 * @param {object} memberOptions
	 * @param {[]} linkProps
	 * */
	createMember(memberOptions = {}, linkProps) {
		// todo тут нужна проверка на то, что все данные для члена измерения присутствуют
		const memberData = {...this.defaultMemberOptions, ...memberOptions};
		const { keyProps, otherProps, members, primaryKey } = this;
		const keys = keyProps.concat(linkProps).concat(otherProps);
		const id = DimensionTable.reduceId(members, primaryKey);
		const member = SnowflakeBuilder.createInputMember(id, keys, memberData, primaryKey);// todo убрать отсюда
		this.addMember(member);
		return member;
	}
	/**
	 * @public
	 * Method of generating a unique identifier within the selected space
	 * */
	static reduceId(members, primaryKey) {
		if (members.length) {
			return members.reduce((acc, curValue) => {
				return acc[primaryKey] > curValue[primaryKey] ? acc : curValue;
			}, 0)[primaryKey] + 1
		} else {
			return 1;
		}
	}
	/**
	 * @public
	 * A way to create a name for a property in which a unique identifier will be stored
	 * */
	static genericId(dimension) {
		return DEFAULT_TEMPLATE_FOREIGN_KEY.replace('%s', dimension);
	}
	setMemberId(member, id) {
		member[this.primaryKey] = id;
	}
	deleteMemberId(member) {
		delete member[this.primaryKey]
	}
	/**
	 *
	 * */
	removeMember(member) {
		const index = this.members.indexOf(member);
		if (index === -1) {
			throw new Error('represented member was not found', member);
		}
		this.members.splice(index, 1);
	}
	static createDimensionTable(dimensionTable) {
		return new DimensionTable(dimensionTable)
	}
}
