import {ENTITY_ID} from './const.js';
import Cube from './Cube.js';

export default class NormalizedData {
    constructor(data, options){
        Object.assign(this, data)
        if (!this[ENTITY_ID]){
            throw "data must have id parameter"
        }
    }
    /**
     * @param {NormalizedData[]} normalizedData - array of data to be filtered
     * @param {object} filterData - the composed aggregate object, members grouped by dimension names
     * @returns {NormalizedData[]}
     * */
    static filter(normalizedData, filterData){
        Object.keys(filterData).forEach( dimensionName => {
            const member = filterData[dimensionName];
            const memberId = member[ENTITY_ID];
            const idName = Cube.genericId(dimensionName);
            normalizedData = normalizedData.filter( data => data[idName] == memberId )
        });
        return normalizedData;
    }
}