import Member from './Member.js'

/**
 * The main task is to parse the data array into tables
 *
 * is a special case of snowflake dimensionHierarchies
 * where every dimension is represented by one table even if the dimensions has multiple levels
 *
 * snowflaking - normalization process of measurement tables
 * */
export default class SnowflakeBuilder {
	static anotherBuild(factTable, cells, dimensionsTrees, cellTable, factPrimaryKey) {

		// for each dimension
		dimensionsTrees.forEach(dimensionTree => {
			SnowflakeBuilder.anotherBuildOne(dimensionTree, cells, cellTable, factTable, factPrimaryKey);
		});
	}

	static anotherBuildOne(dimensionTree, cells, cellTable, factTable, factPrimaryKey) {
		// for each hierarchy and level of dimension
		dimensionTree.tracePostOrder((dimensionTable, dimensionTree) => {
			SnowflakeBuilder.processDimension(dimensionTree, cells, cellTable, factTable, factPrimaryKey)
		});
	}

	static processDimension(dimensionTree, cells, cellTable, factTable, factPrimaryKey) {
		const dimensionTable = dimensionTree.getTreeValue();
		const { dimension, keyProps = [], otherProps = [], members: memberList, foreignKey, primaryKey } = dimensionTable;
		const childIdAttributes = dimensionTree.getChildTrees().map(dimensionTree => dimensionTree.getTreeValue().foreignKey);
		const childDimensions = dimensionTree.getChildTrees().map(dimensionTree => dimensionTree.getTreeValue().dimension);

		let members;

		const existMemberCount = memberList.length;
		const args = [factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, cells, dimension, keyProps, otherProps, cells, cellTable];

		if (!childIdAttributes.length) {
			members = SnowflakeBuilder.makeMemberList.apply(null, args);
		} else {
			let entitiesParts = [];
			const dimensionTable = dimensionTree.getDimensionTreeByDimension(childDimensions[0]).getTreeValue();
			const memberListForFilter = dimensionTable.members;
			entitiesParts = SnowflakeBuilder.mapFilter(childIdAttributes[0], cells, memberListForFilter, dimensionTable);
			members = SnowflakeBuilder.makeMemberListLevel.apply(null, args.concat([childIdAttributes, entitiesParts]));
		}

		function deleteProps(fact, props, factPrimaryKey) {
			props.forEach(prop => {
				if (prop !== factPrimaryKey) {
					delete fact[prop];
				}
			});
		}

		// только после того как список сформирован, удалаять данные из ячеек
		cells.forEach(cell => {
			deleteProps(cell, keyProps, factPrimaryKey);
			deleteProps(cell, otherProps, factPrimaryKey);
		});

		members.forEach(member => {
			dimensionTable.addMember(member)
		});
	}
	/**
	 * Method filter cells by members of a dimension
	 * @param {string} foreignKey
	 * @param {Cell[]} cells
	 * @param {Member[]} memberList
	 * @param {DimensionTable} dimensionTable
	 * @private
	 * @return {Cell[]}
	 * */
	static mapFilter(foreignKey, cells, memberList, dimensionTable) {
		const cellTables = [];
		//todo оптимизировать поиск через хеш
		memberList.forEach(member => {
			const cellTableFiltered = cells.filter(cell => {
				return cell[foreignKey] == dimensionTable.getMemberPrimaryKey(member);
			});
			cellTables.push(cellTableFiltered);
		});
		return cellTables;
	}
	/**
	 * @private
	 * */
	static makeMemberListLevel(factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, whatIsIt, dimension, keyProps, otherProps, cells, cellTable, childIdAttributes, entitiesParts) {
		let totalMemberList = [];

		let countId = 0;
		entitiesParts.forEach(entitiesPart => {
			if (entitiesPart.length) {
				const members = SnowflakeBuilder.makeMemberList(factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, entitiesPart, dimension, keyProps, otherProps, cells, cellTable, countId);
				countId = countId + members.length;

				const etalon = entitiesPart[0];

				childIdAttributes.forEach(childIdAttribute => {

					members.forEach(member => {
						member[childIdAttribute] = etalon[childIdAttribute];
						member[primaryKey] = (existMemberCount + totalMemberList.length + 1);
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
	 * @param {Cell} cells
	 * @param {Cell[]} cellTable
	 * @return {[]}
	 * @private
	 * */
	static makeMemberList(
		factPrimaryKey,
		primaryKey,
		foreignKey,
		existMemberCount,
		factTable,
		entitiesPart,
		dimension,
		keyProps = [],
		otherProps = [],
		cells,
		cellTable,
		// It is recommended that the key field be a simple integer because a key value is meaningless
		startFrom = 0
	) {
		// соотношение созданных id к ключам
		const cache = {};
		const restoredCache = {};
		const members = [];

		// need restore cache
		const existedCells = cellTable.filter(cell => {
			return cells.indexOf(cell) === -1
		});
		existedCells.forEach(cell => {
			// собрать ключ на основе ключевых значений
			const fact = factTable.find(fact => fact[factPrimaryKey] === cell[factPrimaryKey]);
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
			entityPart[foreignKey] = id;
		});

		Object.keys(cache).forEach(key => {
			const id = cache[key];
			const entityPart = entitiesPart.find(entityPart => entityPart[foreignKey] === id);
			const member = Member.create(id, [].concat(keyProps).concat(otherProps), entityPart, primaryKey);
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
		removedCells.forEach(removedCell => {
			const index = cellTable.indexOf(removedCell);
			if (index !== -1) {
				cellTable.splice(index, 1);
			}
		});
		// then remove members
		removedCells.forEach(fact => {
			dimensionHierarchies.forEach(dimensionTree => {
				SnowflakeBuilder.travers([fact], dimensionTree, [SnowflakeBuilder.removeMembers.bind(this, cube, dimensionTree), SnowflakeBuilder.restoreCell]);
			});
		});
	}

	/**
	 * Method allows to generate fact tables from cells
	 * */
	static denormalize(cellTable, dimensionTrees) {
		const facts = [];
		cellTable.forEach(cell => {
			facts.push({...cell})
		});
		facts.forEach(fact => {
			dimensionTrees.forEach(dimensionTree => {
				SnowflakeBuilder.travers([fact], dimensionTree, [SnowflakeBuilder.restoreCell]);
			});
		});

		return facts;
	}
	static restoreCell(member, memberList, dimension, cell, foreignKey, dimensionTable) {
		const memberCopy = new Member(member);
		dimensionTable.deleteMemberId(memberCopy);
		delete cell[foreignKey];
		Object.assign(cell, memberCopy)
	}
	static removeMembers(cube, dimensionTree, member, memberList, dimension, cell, foreignKey) {
		const dicedCube = cube.dice({ [dimension]: member });
		const dimensionTable = dimensionTree.getDimensionTreeByDimension(dimension).getTreeValue();
		// last cell was removed at the beginning of the algorithm,
		// so if the member is no longer used, the projection will be empty
		if (!dicedCube.getCells().length) {
			dimensionTable.removeMember(member)
		}
	}

	static travers(cellTable, dimensionTree, handlers = () => {}) {
		const handleDimensionTree = (dimensionTable, cell) => {
			const { dimension, members: memberList, foreignKey } = dimensionTable;
			const idValue = cell[foreignKey];
			const member = memberList.find(member => {
				return dimensionTable.getMemberPrimaryKey(member) === idValue;
			});
			handlers.forEach(handler => {
				handler(member, memberList, dimension, cell, foreignKey, dimensionTable);
			})
		};
		cellTable.forEach(cell => {
			dimensionTree.tracePreOrder((tracedDimensionTable, tracedDimensionTree) => {
				handleDimensionTree(tracedDimensionTable, cell)
			})
		});
	}

	/**
	 * Method allows to delete dimensionTree from cube,
	 * the cells will be restored, and the members of the measurement are also deleted
	 * */
	static destroyDimensionTree(cellTable, removedCells, dimensionTree, cube) {
		SnowflakeBuilder.travers(cellTable, dimensionTree, [SnowflakeBuilder.removeMembers.bind(this, cube, dimensionTree), SnowflakeBuilder.restoreCell]);
	}

}
