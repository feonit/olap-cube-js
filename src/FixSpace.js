import Space from './Space.js'
import {ENTITY_ID} from "./const.js";
import Cell from "./Cell.js";
import Cube from "./Cube.js";

/**
 * Space with fixed dimensions values
 * */
export default class FixSpace extends Space {
    constructor(options){
        super(options)
    }
    /**
     * @param {string} dimension
     * @param {object|object[]} data
     * */
    setDimensionTable(dimension, data){
        if (!Array.isArray(data)){
            data = [data];
        }
        return super.setDimensionTable(dimension, data)
    }
    /**
     * @param {Cell[]} cells - array of data to be filtered
     * @returns {Cell[]}
     * */
    match(cells){
        let filtered = [].concat(cells);
        this.getDimensionList().forEach( dimension => {
            const idAttribute = Cube.genericId(dimension);
            const members = this.getDimensionTable(dimension);
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