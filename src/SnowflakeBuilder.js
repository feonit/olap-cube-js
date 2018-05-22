import MemberList from "./MemberList.js";
import Member from "./Member.js";
import {ENTITY_ID} from "./const.js";
import Cube from "./Cube.js";
import FactTable from "./FactTable.js";

/**
 * The main task is to parse the data array into tables
 *
 * is a special case of snowflake dimensionHierarchies
 * where every dimension is represented by one table even if the dimensions has multiple levels
 * */
export default class SnowflakeBuilder {
	static anotherBuild(factTable, cellTable, dimensionsTrees){

		// for each dimension
		dimensionsTrees.forEach(dimensionTree => {
			// for each hierarchy and level of dimension
			dimensionTree.tracePostOrder( (dimensionTable, node) =>{
				SnowflakeBuilder.processDimension(node, cellTable, factTable)
			});
		});
	}

	static processDimension(node, cellTable){
		const isFirstLevel = node.isFirstLevel();
		const dimensionTable = node.getTreeValue();
		const getMembers = (dimension)=>{
			const searchedNode = node.searchValueDimension(dimension);

			return searchedNode.getTreeValue().members
		};

		const { dimension, keyProps = [], otherProps = [] } = dimensionTable;
		const dependencyNames = node.getChildTrees().map( tree => tree.getTreeValue().dimension );

		let memberList;
		const args = [cellTable, dimension, keyProps, otherProps, cellTable, isFirstLevel];

		if (!dependencyNames.length){
			memberList = SnowflakeBuilder.makeMemberList.apply(null, args);
		} else {

			let entitiesParts = [];
			const memberListForFilter = getMembers(dependencyNames[0]);
			entitiesParts = SnowflakeBuilder.mapFilter(dependencyNames, cellTable, memberListForFilter);
			memberList = SnowflakeBuilder.makeMemberListDependency.apply(null, args.concat([dependencyNames, entitiesParts]));
		}

		// const id = fact[ENTITY_ID];

		// только после того как список сформирован, удалаять данные из ячеек
		const totalProps = [].concat(keyProps, otherProps);
		cellTable.forEach(cell=>{
			cell.deleteProps(totalProps);
		});

		dimensionTable.setMemberList(memberList);

		return memberList;
	}
	/**
	 * Method filter cells by members of a dimension
	 * @param {string} dimension
	 * @param {CellTable} cellTable
	 * @param {MemberList} memberList
	 * @private
	 * @return {CellTable[]}
	 * */
	static mapFilter(dimension, cellTable, memberList){
		const idAttribute = Cube.genericId(dimension);
		const cellTables = [];
		//todo оптимизировать поиск через хеш
		memberList.forEach( member => {
			const cellTableFiltered = cellTable.filter( cell => {
				return cell[idAttribute] == member[ENTITY_ID];
			});
			cellTables.push(cellTableFiltered);
		});
		return cellTables;
	}
	/**
	 * @private
	 * */
	static makeMemberListDependency(factTable, dimension, keyProps, otherProps, cellTable, isFirstLevel, dependencyNames, entitiesParts){

		let totalMemberList = new MemberList();

		let countId = 0;
		entitiesParts.forEach( entitiesPart => {
			if (entitiesPart.length){
				const memberList = SnowflakeBuilder.makeMemberList(entitiesPart, dimension, keyProps, otherProps, cellTable, isFirstLevel, countId);
				countId = countId + memberList.length;

				const etalon = entitiesPart[0];

				dependencyNames.forEach( dependencyName => {
					const idAttribute = Cube.genericId(dependencyName);

					memberList.forEach( member => {
						member[idAttribute] = etalon[idAttribute];
						member[ENTITY_ID] = totalMemberList.length + 1;
						totalMemberList.addMember(member)
					});

					entitiesPart.forEach( entityPart => {
						delete entityPart[idAttribute];
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
	 * @param {CellTable} cellTable
	 * @return {MemberList}
	 * @private
	 * */
	static makeMemberList(
		entitiesPart,
		dimension,
		keyProps = [],
		otherProps = [],
		cellTable,
		isFirstLevel,
		startFrom = 0
	){
		// соотношение созданных id к ключам
		const cache = {};
		const memberList = new MemberList();
		// полный список свойств подлежащих стриранию из натуральной формы и записи в подсущности
		const totalProps = [].concat(keyProps, otherProps);

		// создания групп по уникальным ключам
		entitiesPart.forEach( entityPart => {

			// собрать ключ на основе ключевых значений
			const surrogateKey = SnowflakeBuilder.createKeyFromProps(keyProps, entityPart);

			// если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)
			if (! (surrogateKey in cache) ){
				const id = cache[surrogateKey] = ++startFrom;
				const member = Member.create(id, totalProps, entityPart);
				memberList.push(member);
			}

			// оставить в нормальной форме ссылку на id под сущности
			const value = cache[surrogateKey];
			const idAttribute = Cube.genericId(dimension);

			entityPart[idAttribute] = value;
		});

		return memberList;
	}

	static createKeyFromProps(props, obj){
		const DIVIDER = ',';

		return props.map( prop => {
			return obj[prop]
		}).join(DIVIDER);
	}

	static destroy(cellTable, dimensionHierarchies){
		const factTable = new FactTable();
		cellTable.forEach( cell => {
			factTable.push({...cell})
		});

		const handleDimensionTree = (tree, fact)=>{
			const { dimension, members } = tree.getTreeValue()
			const idAttribute = Cube.genericId(dimension);
			const idValue = fact[idAttribute];
			const member = members.find( member => {
				return member[ENTITY_ID] === idValue;
			});
			const memberCopy = {...member};
			delete memberCopy[ENTITY_ID];
			delete fact[idAttribute];
			Object.assign(fact, memberCopy)
		};
		factTable.forEach( fact => {
			dimensionHierarchies.forEach(dimensionTree => {
				handleDimensionTree(dimensionTree, fact);
				dimensionTree.tracePreOrder((value, dimensionTree)=>{
					handleDimensionTree(dimensionTree, fact)
				})
			});
		});

		return factTable;
	}
}