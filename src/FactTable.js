import Fact from './Fact.js'
import { DEFAULT_FACT_ID_PROP } from './const.js'
import {NotFoundFactId} from './errors.js'

/**
 *
 * */
export default class FactTable extends Array {
	constructor({ facts = [], primaryKey = DEFAULT_FACT_ID_PROP } = {}) {
		super();
		this.primaryKey = primaryKey;
		this.facts = facts.map(factData => {
			FactTable.validateFactData(factData, primaryKey);
			return new Fact(factData)
		});
	}
	getFacts() {
		return this.facts;
	}
	static validateFactData(factData, primaryKey) {
		if (!factData[primaryKey]) {
			throw NotFoundFactId
		}
	}
	static deleteProps(fact, props, primaryKey) {
		props.forEach(prop => {
			if (prop !== primaryKey) {
				delete fact[prop];
			}
		});
	}
}
