import Fact from './Fact.js'
import { DEFAULT_FACT_ID_PROP } from './const.js'
import {NotFoundFactId} from './errors.js'

/**
 * @throw {NotFoundFactId}
 * */
export default class FactTable {
	constructor({ facts = [], factPrimaryKey = DEFAULT_FACT_ID_PROP } = {}, defaultFactOptions = {}) {
		this.factPrimaryKey = factPrimaryKey;
		this.facts = facts.map(factData => new Fact(factData));
		this.defaultFactOptions = defaultFactOptions;
		this.facts.forEach(this.validateFactData.bind(this, factPrimaryKey))
	}
	getFacts() {
		return this.facts;
	}
	validateFactData(factPrimaryKey, factData) {
		if (!factData.hasOwnProperty(factPrimaryKey)) {
			throw new NotFoundFactId(factPrimaryKey)
		}
	}
	static deleteProps(fact, props, factPrimaryKey) {
		props.forEach(prop => {
			if (prop !== factPrimaryKey) {
				delete fact[prop];
			}
		});
	}
}
