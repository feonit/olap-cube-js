import DimensionTable from "./DimensionTable.js";
import Member from "./Member.js";
import {ENTITY_ID} from "./const.js";
import Space from "./Space.js";
import CellTable from "./CellTable.js";

/**
 * The main task is to parse the data array into tables
 *
 * is a special case of snowflake schema
 * where every dimension is represented by one table even if the dimensions has multiple levels
 * */
export default class Star {
    /**
     * @param {FactTable} factTable - Data array to the analysis of values for dimension
     * @param {Schema} schema
     * */
    constructor(factTable, schema){
        const space = new Space();
        const iterator = schema.createIterator();
        const cellTable = new CellTable(factTable);

        let next;
        while ( !(next = iterator.next()) || !next.done){
            const isRoot = schema.isRoot(next.value);
            const {dimension, dependency} = next.value;
            const { keyProps, otherProps } = schema.getDimensionProperties(dimension);
            const dependencyNames = schema.getDependencyNames(dependency);

            let dimensionTable;
            const args = [factTable, dimension, keyProps, otherProps, cellTable];

            if (!dependencyNames){
                dimensionTable = this._makeDimensionTable.apply(this, args);
            } else {

                let entitiesParts = [];

                if (!isRoot){
                    entitiesParts = this._mapFilter(dependencyNames, cellTable, space.getDimensionTable(dependencyNames));
                    dimensionTable = this._makeDimensionTableDependency.apply(this, args.concat([space, dependencyNames, entitiesParts]));
                } else {
                    entitiesParts = this._mapFilterRoot(dependencyNames, cellTable, space);
                    dimensionTable = this._makeDimensionTableDependency.apply(this, args.concat([space, dependencyNames, entitiesParts]));
                }
            }

            space.setDimensionTable(dimension, dimensionTable)
        }

        return { space, cellTable };
    }

    /**
     * A way to create a name for a property in which a unique identifier will be stored
     * */
    static genericId(entityName) {
        return entityName + '_' + ENTITY_ID;
    }

    _mapFilter(dimension, cellTable, dimensionTable){
        const idAttribute = Star.genericId(dimension);
        return dimensionTable.map( member => {
            return cellTable.filter( cell => {
                return cell[idAttribute] == member[ENTITY_ID];
            });
        });
    }

    _mapFilterRoot(dimensions, cellTable, space){
        let cellTables = [cellTable];
        dimensions.forEach( dimension => {
            let newParts = [];
            cellTables.forEach( cellTable => {
                const cellTables = this._mapFilter(dimension, cellTable, space.getDimensionTable(dimension));
                cellTables.forEach( cellTable => {
                    newParts.push(cellTable);
                })
            });
            cellTables = newParts;
        });
        return cellTables;
    }

    /**
     * The method of analyzing the data array and generating new dimension values
     *
     * @param {object[]} factTable - Data array to the analysis of values for dimension
     * @param {number} startFrom
     * @param {string} dimension - The dimension for which members will be created
     * @param {string[]} keyProps - Names of properties whose values will be used to generate a key that will determine the uniqueness of the new member for dimension
     * @param {string[]} otherProps - Names of properties whose values will be appended to the dimension member along with the key properties
     * @param {CellTable} cellTable
     * @return {DimensionTable}
     * @private
     * */
    _makeDimensionTable(factTable, dimension, keyProps, otherProps, cellTable, startFrom = 0){
        // соотношение созданных id к ключам
        const cache = {};
        const dimensionTable = new DimensionTable();
        // полный список свойств подлежащих стриранию из натуральной формы и записи в подсущности
        const totalProps = [].concat(keyProps, otherProps);

        // создания групп по уникальным ключам
        factTable.forEach( fact => {

            // собрать ключ на основе ключевых значений
            const surrogateKey = fact.createKeyFromProps(keyProps);

            // если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)
            if (! (surrogateKey in cache) ){
                const id = cache[surrogateKey] = ++startFrom;
                const member = new Member(id, totalProps, fact);
                dimensionTable.push(member);
            }

            const id = fact[ENTITY_ID];

            // удалаять данные из нормальной формы
            const cell = cellTable.findById(id);

            //
            cell.deleteProps(totalProps);

            // оставить в нормальной форме ссылку на id под сущности
            const value = cache[surrogateKey];
            const idAttribute = Star.genericId(dimension);

            cell[idAttribute] = value;
        });

        return dimensionTable;
    }

    _makeDimensionTableDependency(factTable, dimension, keyProps, otherProps, cellTable, space, dependencyNames, entitiesParts){

        let totalDimensionTable = new DimensionTable();

        let countId = 0;
        entitiesParts.forEach( entitiesPart => {
            if (entitiesPart.length){
                const dimensionTable = this._makeDimensionTable(entitiesPart, dimension, keyProps, otherProps, cellTable, countId);
                countId = countId + dimensionTable.length;

                dimensionTable.forEach( member => {
                    member[ENTITY_ID] = totalDimensionTable.length + 1;
                    totalDimensionTable.add(member)
                });
            }
        });

        return totalDimensionTable;
    }
}