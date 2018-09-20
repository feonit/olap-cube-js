import Fact from './Fact.js'
import { DEFAULT_FACT_ID_PROP } from './const.js'
import {NotFoundFactId} from './errors.js'

/**
 * @throw {NotFoundFactId}
 * */
export default class FactTable {
	constructor({ facts = [], primaryKey = DEFAULT_FACT_ID_PROP } = {}, defaultFactOptions = {}) {
		this.primaryKey = primaryKey;
		this.facts = facts.map(factData => new Fact(factData));
		this.defaultFactOptions = defaultFactOptions;
		this.facts.forEach(this.validateFactData.bind(this))
	}
	getFacts() {
		return this.facts;
	}
	validateFactData(factData) {
		if (!factData.hasOwnProperty(this.primaryKey)) {
			throw new NotFoundFactId(this.primaryKey)
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
