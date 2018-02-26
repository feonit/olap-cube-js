import MemberList from "./MemberList.js";
import Member from "./Member.js";
import {ENTITY_ID} from "./const.js";
import Space from "./Space.js";
import CellTable from "./CellTable.js";
import FactTable from "./FactTable.js";
import DimensionTable from "./DimensionTable.js";

/**
 * The main task is to parse the data array into tables
 *
 * is a special case of snowflake schema
 * where every dimension is represented by one table even if the dimensions has multiple levels
 * */
export default class Star {
    /**
     * @param {object[]} facts - Data array to the analysis of values for dimension
     * @param {object[]} dimensionTables
     * */
    constructor(facts, dimensionTables){
        const factTable = new FactTable(facts);
        const dimensionTableList = dimensionTables.map( dimensionTable => new DimensionTable(dimensionTable) );

        const { space, cellTable } = this.normalize(factTable, dimensionTableList);

        this.space = space;
        this.cellTable = cellTable;

        Object.defineProperty(this, 'dimensionTableList', { value: dimensionTableList });
    }

    normalize(factTable, dimensionTableList){
        const space = new Space();
        const cellTable = new CellTable(factTable);

        dimensionTableList.forEach( (table, index) => {
            const { dimension, keyProps, otherProps, dependencyNames } = table;
            const isRoot = index === dimensionTableList.length - 1;

            let memberList;
            const args = [factTable, dimension, keyProps, otherProps, cellTable];

            if (!dependencyNames.length){
                memberList = this._makeMemberList.apply(this, args);
            } else {

                let entitiesParts = [];

                // todo заменить на один метод
                if (!isRoot){
                    entitiesParts = this._mapFilter(dependencyNames, cellTable, space.getMemberList(dependencyNames[0]));
                    memberList = this._makeMemberListDependency.apply(this, args.concat([space, dependencyNames, entitiesParts]));
                } else {
                    entitiesParts = this._mapFilterRoot(dependencyNames, cellTable, space);
                    memberList = this._makeMemberListDependency.apply(this, args.concat([space, dependencyNames, entitiesParts]));
                }
            }

            space.setMemberList(dimension, memberList)
        });

        return { space, cellTable };
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

    _mapFilter(dimension, cellTable, memberList){
        const idAttribute = Star.genericId(dimension);
        return memberList.map( member => {
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
                const cellTables = this._mapFilter(dimension, cellTable, space.getMemberList(dimension));
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
     * @return {MemberList}
     * @private
     * */
    _makeMemberList(factTable, dimension, keyProps, otherProps, cellTable, startFrom = 0){
        // соотношение созданных id к ключам
        const cache = {};
        const memberList = new MemberList();
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
                memberList.push(member);
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

        return memberList;
    }

    _makeMemberListDependency(factTable, dimension, keyProps, otherProps, cellTable, space, dependencyNames, entitiesParts){

        let totalMemberList = new MemberList();

        let countId = 0;
        entitiesParts.forEach( entitiesPart => {
            if (entitiesPart.length){
                const memberList = this._makeMemberList(entitiesPart, dimension, keyProps, otherProps, cellTable, countId);
                countId = countId + memberList.length;

                memberList.forEach( member => {
                    member[ENTITY_ID] = totalMemberList.length + 1;
                    totalMemberList.add(member)
                });
            }
        });

        return totalMemberList;
    }
}