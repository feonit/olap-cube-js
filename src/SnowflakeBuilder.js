import MemberList from './MemberList.js'
import Member from './Member.js'
import {ENTITY_ID} from './const.js'
import Cube from './Cube.js'
import FactTable from './FactTable.js'

/**
 * The main task is to parse the data array into tables
 *
 * is a special case of snowflake dimensionHierarchies
 * where every dimension is represented by one table even if the dimensions has multiple levels
 * */
export default class SnowflakeBuilder {
	static anotherBuild(factTable, cells, dimensionsTrees, cellTable) {

		// for each dimension
		dimensionsTrees.forEach(dimensionTree => {
			SnowflakeBuilder.anotherBuildOne(dimensionTree, cells, cellTable, factTable);
		});
	}

	static anotherBuildOne(dimensionTree, cells, cellTable, factTable) {
		// for each hierarchy and level of dimension
		dimensionTree.tracePostOrder((dimensionTable, dimensionTree) =>{
			SnowflakeBuilder.processDimension(dimensionTree, cells, cellTable, factTable)
		});
	}

	static processDimension(dimensionTree, cells, cellTable, factTable) {
		const isFirstLevel = dimensionTree.isFirstLevel();
		const dimensionTable = dimensionTree.getTreeValue();
		const { dimension, keyProps = [], otherProps = [], members: memberList, idAttribute } = dimensionTable;
		const childIdAttributes = dimensionTree.getChildTrees().map(dimensionTree => dimensionTree.getTreeValue().idAttribute);
		const childDimensions = dimensionTree.getChildTrees().map(dimensionTree => dimensionTree.getTreeValue().dimension);

		let members;

		const existMemberCount = memberList.length;
		const args = [idAttribute, existMemberCount, factTable, cells, dimension, keyProps, otherProps, cells, isFirstLevel, cellTable];

		if (!childIdAttributes.length) {
			members = SnowflakeBuilder.makeMemberList.apply(null, args);
		} else {
			let entitiesParts = [];
			const memberListForFilter = dimensionTree.getDimensionTreeByDimension(childDimensions[0]).getTreeValue().members;
			entitiesParts = SnowflakeBuilder.mapFilter(childIdAttributes[0], cells, memberListForFilter);
			members = SnowflakeBuilder.makeMemberListDependency.apply(null, args.concat([childIdAttributes, entitiesParts]));
		}

		// только после того как список сформирован, удалаять данные из ячеек
		const totalProps = [].concat(keyProps, otherProps);
		cells.forEach(cell=>{
			cell.deleteProps(totalProps);
		});

		members.forEach(member => {
			memberList.addMember(member)
		});
	}
	/**
	 * Method filter cells by members of a dimension
	 * @param {string} idAttribute
	 * @param {Cell[]} cells
	 * @param {MemberList} memberList
	 * @private
	 * @return {CellTable[]}
	 * */
	static mapFilter(idAttribute, cells, memberList) {
		const cellTables = [];
		//todo оптимизировать поиск через хеш
		memberList.forEach(member => {
			const cellTableFiltered = cells.filter(cell => {
				return cell[idAttribute] == member[ENTITY_ID];
			});
			cellTables.push(cellTableFiltered);
		});
		return cellTables;
	}
	/**
	 * @private
	 * */
	static makeMemberListDependency(idAttribute, existMemberCount, factTable, whatIsIt, dimension, keyProps, otherProps, cells, isFirstLevel, cellTable, childIdAttributes, entitiesParts) {
		let totalMemberList = [];

		let countId = 0;
		entitiesParts.forEach(entitiesPart => {
			if (entitiesPart.length) {
				const members = SnowflakeBuilder.makeMemberList(idAttribute, existMemberCount, factTable, entitiesPart, dimension, keyProps, otherProps, cells, isFirstLevel, cellTable, countId);
				countId = countId + members.length;

				const etalon = entitiesPart[0];

				childIdAttributes.forEach(childIdAttribute => {

					members.forEach(member => {
						member[childIdAttribute] = etalon[childIdAttribute];
						member[ENTITY_ID] = existMemberCount + totalMemberList.length + 1;
						totalMemberList.push(member)
					});

					entitiesPart.forEach(entityPart => {
						delete entityPart[childIdAttribute];
					})

				});
			}
		});

		return totalMemberList;
	}

	/**
	 * The method of analyzing the data array and generating new dimension values
	 *
	 * @param {object[]} entitiesPart - Data array to the analysis of values for dimension
	 * @param {number} startFrom
	 * @param {string} dimension - The dimension for which members will be created
	 * @param {string[]} keyProps - Names of properties whose values will be used to generate a key that will determine the uniqueness of the new member for dimension
	 * @param {string[]} otherProps - Names of properties whose values will be appended to the dimension member along with the key properties
	 * @param {boolean} isFirstLevel
	 * @param {Cell} cells
	 * @param {CellTable} cellTable
	 * @return {[]}
	 * @private
	 * */
	static makeMemberList(
		idAttribute,
		existMemberCount,
		factTable,
		entitiesPart,
		dimension,
		keyProps = [],
		otherProps = [],
		cells,
		isFirstLevel,
		cellTable,
		startFrom = 0
	) {
		// соотношение созданных id к ключам
		const cache = {};
		const restoredCache = {};
		const members = [];
		// полный список свойств подлежащих стриранию из натуральной формы и записи в подсущности
		const totalProps = [].concat(keyProps, otherProps);

		// need restore cache
		const existedCells = cellTable.filter(cell => {
			return cells.indexOf(cell) === -1
		});
		existedCells.forEach(cell => {
			// собрать ключ на основе ключевых значений
			const fact = factTable.find(fact => fact[ENTITY_ID] === cell[ENTITY_ID]);
			const surrogateKey = SnowflakeBuilder.createKeyFromProps(keyProps, fact);
			// если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)
			if (!(surrogateKey in restoredCache)) {
				restoredCache[surrogateKey] = ++startFrom;
			}
		});

		// создания групп по уникальным ключам
		entitiesPart.forEach(entityPart => {

			// собрать ключ на основе ключевых значений
			const surrogateKey = SnowflakeBuilder.createKeyFromProps(keyProps, entityPart);

			// если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)
			if (!(surrogateKey in cache) && !(surrogateKey in restoredCache)) {
				cache[surrogateKey] = ++startFrom;
			}

			// оставить в нормальной форме ссылку на id под сущности
			const id = cache[surrogateKey];
			entityPart[idAttribute] = id;
		});

		Object.keys(cache).forEach(key => {
			const id = cache[key];
			const entityPart = entitiesPart.find(entityPart => entityPart[idAttribute] === id);
			const member = Member.create(id, totalProps, entityPart);
			members.push(member);
		});

		return members;
	}

	static createKeyFromProps(props, obj) {
		const DIVIDER = ',';

		return props.map(prop => {
			return obj[prop]
		}).join(DIVIDER);
	}

	static destroy(cellTable, removedCells, dimensionHierarchies, cube) {
		// first remove cells
		cellTable.removeCells(removedCells);
		// then remove members
		removedCells.forEach(fact => {
			dimensionHierarchies.forEach(dimensionTree => {
				SnowflakeBuilder.travers([fact], dimensionTree, [SnowflakeBuilder.removeMembers.bind(this, cube), SnowflakeBuilder.restoreCell]);
			});
		});
	}

	/**
	 * Method allows to generate fact tables from cells
	 * */
	static denormalize(cellTable, dimensionHierarchies) {
		const factTable = new FactTable();
		cellTable.forEach(cell => {
			factTable.push({...cell})
		});
		factTable.forEach(fact => {
			dimensionHierarchies.forEach(dimensionTree => {
				SnowflakeBuilder.travers([fact], dimensionTree, [SnowflakeBuilder.restoreCell]);
			});
		});

		return factTable;
	}
	static restoreCell(member, memberList, dimension, cell, idAttribute) {
		const memberCopy = {...member};
		delete memberCopy[ENTITY_ID];
		delete cell[idAttribute];
		Object.assign(cell, memberCopy)
	}
	static removeMembers(cube, member, memberList, dimension, cell, idAttribute) {
		const { cellTable } = cube.projection({ [dimension]: member });
		// last cell was removed at the beginning of the algorithm,
		// so if the member is no longer used, the projection will be empty
		if (!cellTable.length) {
			memberList.removeMember(member)
		}
	}

	static travers(cellTable, dimensionTree, handlers = () => {}) {
		const handleDimensionTree = (dimensionTree, cell) => {
			const { dimension, members: memberList, idAttribute } = dimensionTree.getTreeValue();
			const idValue = cell[idAttribute];
			const member = memberList.find(member => {
				return member[ENTITY_ID] === idValue;
			});
			handlers.forEach(handler => {
				handler(member, memberList, dimension, cell, idAttribute);
			})
		};
		cellTable.forEach(cell => {
			dimensionTree.tracePreOrder((value, dimensionTree)=>{
				handleDimensionTree(dimensionTree, cell)
			})
		});
	}

	/**
	 * Method allows to delete dimensionTree from cube,
	 * the cells will be restored, and the members of the measurement are also deleted
	 * */
	static destroyDimensionTree(cellTable, removedCells, dimensionTree, cube) {
		SnowflakeBuilder.travers(cellTable, dimensionTree, [SnowflakeBuilder.removeMembers.bind(this, cube), SnowflakeBuilder.restoreCell]);
	}

}
