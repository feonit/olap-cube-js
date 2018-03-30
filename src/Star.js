import {ENTITY_ID} from "./const.js";
import FactTable from "./FactTable.js";
import DimensionTable from "./DimensionTable.js";
import StarBuilder from "./StarBuilder.js";
import Space from "./Space.js";
import Cell from "./Cell.js";

/**
 * The main task is to parse the data array into tables
 *
 * is a special case of snowflake schema
 * where every dimension is represented by one table even if the dimensions has multiple levels
 * */
export default class Star {

	constructor(space = {}, cellTable = [], dimensionTableList){
		this.space = new Space(space);
		this.cellTable = cellTable.map( cell => new Cell(cell) );
		Object.defineProperty(this, 'dimensionTableList', { value: dimensionTableList });
	}
	/**
	 * @param {object[]} facts - Data array to the analysis of values for dimension
	 * @param {object[]} dimensionTables
	 * */
	static create(facts, dimensionTables){
		const factTable = new FactTable(facts);
		const dimensionTableList = dimensionTables.map( dimensionTable => new DimensionTable(dimensionTable) );
		const { space, cellTable } = StarBuilder.build(factTable, dimensionTableList);
		return new Star(space, cellTable, dimensionTableList);
	}

	denormalize(cells = this.cellTable, dimensionTableList = this.dimensionTableList){
		const factTable = new FactTable();
		cells.forEach( cell => {
			factTable.push(Object.assign({}, cell))
		});

		factTable.forEach( fact => {
			const handleDimension = dimensionSchema => {
				const idAttribute = Star.genericId(dimensionSchema.dimension);
				const idValue = fact[idAttribute];
				const member = this.space.getMemberList(dimensionSchema.dimension).find( member => {
					return member[ENTITY_ID] === idValue;
				});
				const memberCopy = Object.assign({}, member);
				delete memberCopy[ENTITY_ID];
				delete fact[idAttribute];
				Object.assign(fact, memberCopy);
			};

			dimensionTableList.forEach( dimensionTable => {
				handleDimension(dimensionTable)
			})
		});

		return factTable;
	}

	/**
	 * A way to create a name for a property in which a unique identifier will be stored
	 * */
	static genericId(entityName) {
		return entityName + '_' + ENTITY_ID;
	}
}