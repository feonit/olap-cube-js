import Member from './Member.js'
import {DEFAULT_MEMBER_ID_PROP} from './const.js'
import InputMember from './InputMember.js'

export default class DimensionTable {
	constructor({ dimension, foreignKey, primaryKey = DEFAULT_MEMBER_ID_PROP, keyProps, otherProps = [], members = [], defaultMemberOptions = {}}) {
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
			if (memberData instanceof Member && memberData.hasOwnProperty(this.primaryKey)) {
				return memberData;
			} else {
				return new Member(memberData, this.primaryKey)
			}
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
	getMemberId(member) {
		return member[this.primaryKey]
	}
	/**
	 * @param {Member} member
	 * */
	addMember(member) {
		if (this.members.indexOf(member) === -1) {
			this.members.push(member)
		} else {
			alert('boo')
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
		const member = InputMember.create(id, keys, memberData, primaryKey);
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
		var index = this.members.indexOf(member);
		if (index === -1) {
			throw new Error('represented member was not found', member);
		}
		this.members.splice(index, 1);
	}
}
