import Space from './Space.js'
import {ENTITY_ID} from "./const.js";
import Cell from "./Cell.js";
import Star from "./Star.js";

class DimensionDataException extends Error {
    constructor(data){
        super();
        this.message = `data attribute for dimension is "${data}"`;
    }
}
/**
 * Space with fixed dimensions values
 * @throws {DimensionDataException}
 * */
export default class FixSpace extends Space {
    constructor(options){
        super(options)
    }
    /**
     * @param {string} dimension
     * @param {object|object[]} data
     * */
    setMemberList(dimension, data){
        if (!data){
            throw new DimensionDataException()
        }
        if (!Array.isArray(data)){
            data = [data];
        }
        return super.setMemberList(dimension, data)
    }
    /**
     * @param {Cell[]} cells - array of data to be filtered
     * @returns {Cell[]}
     * */
    match(cells){
        let filtered = [].concat(cells);
        this.getDimensionList().forEach( dimension => {
            const idAttribute = Star.genericId(dimension);
            const members = this.getMemberList(dimension);
            const totalPart = [];
            members.forEach( member => {
                const memberId = member[ENTITY_ID];
                const result = filtered.filter( cell => cell[idAttribute] == memberId );
                const args = [totalPart.length, 0].concat(result);
                [].splice.apply(totalPart, args);
            });
            filtered = totalPart;
        });
        return filtered;
    }
}