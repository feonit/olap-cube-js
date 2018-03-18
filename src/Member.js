import {ENTITY_ID} from './const.js';

/**
 * Element of dimension. Serving to determine the position and description of the data element
 * */
export default class Member{
	constructor(id, props, data){
		this[ENTITY_ID] = id;

		props.forEach( prop => {
			// исключить идентификатор самой сущности
			if (prop !== ENTITY_ID){
				this[prop] = data[prop]
			}
		});
	}
}