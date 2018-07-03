import { DEFAULT_TEMPLATE_FOREIGN_KEY } from './const.js'

export default class Settings {
	constructor({ templateForeignKey = DEFAULT_TEMPLATE_FOREIGN_KEY } = {}) {
		this.templateForeignKey = templateForeignKey;
	}
}
