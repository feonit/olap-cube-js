import Cell from './Cell.js'
import InputCell from './InputCell.js'
import _ from './_.js';
import {ENTITY_ID} from './const.js';
import Member from './Member.js';
import InputMember from './InputMember.js';
import Schema from './Schema.js';
import Space from './Space.js';
import DimensionTable from './DimensionTable.js';
import FactTable from './FactTable.js';
import DetailMember from "./DetailMember.js";
import FixSpace from "./FixSpace.js";

/**
 * Base class for normalizing a denormalized data array
 * and analyzing query according to a given scheme
 *
 * @param {object[]} factTable - facts which will be subject to analysis
 * */
class Cube{
    constructor(factTable, dimensionsSchema){
        const schema = new Schema(dimensionsSchema);
        Object.defineProperty(this, 'schema', { value: schema });
        Object.defineProperty(this, 'factTable', { value: new FactTable(factTable) });
        this.normalizedDataArray = factTable.map( data => new Cell(data) );
        this.space = this._getMembersGroupsByDimensionsFromSchema(factTable, this.schema.createIterator())
    }
    /**
     * A method that allows you to find all members of a specified dimension
     * or part of the members using a filter if they are in a hierarchy
     *
     * @public
     * @param {(string|null|object)?} dimension - dimension from which the member will be found
     * @param {object?} fixSpaceOptions - the composed aggregate object, members grouped by dimension names
     * @return {Member[]} returns members
     * */
    query(dimension, fixSpaceOptions){
        const args = [].slice.call(arguments);
        if (args.length > 0 && args[0]){
            if (typeof args[0] === "object"){
                fixSpaceOptions = args[0];
                dimension = null;
            }
        }

        let cells = this.normalizedDataArray;

        if (fixSpaceOptions){
            fixSpaceOptions = this._normalizeQuery(fixSpaceOptions);
            const fixSpace = new FixSpace(fixSpaceOptions);
            cells = fixSpace.match(cells)
        }

        if (!dimension){
            return cells;
        } else {
            const idName = Cube.genericId(dimension);
            const ids = cells.map( cell => cell[idName]);
            const uniqueIds = _.uniq(ids);
            const result = [];
            const members = this.space.getDimensionTable(dimension);

            // filtering without loss of order in the array
            members.forEach( member => {
                if (uniqueIds.indexOf(member[ENTITY_ID]) !== -1){
                    result.push(member)
                }
            });
            return result;
        }
    }
    // todo fixSpaceOptions object with normalize
    _normalizeQuery(fixSpaceOptions){
        const copy = JSON.parse(JSON.stringify(fixSpaceOptions));
        Object.keys(copy).forEach((dimenstion)=>{
            const arg = copy[dimenstion];

            const find = (dimenstion, arg) => {
                const dimensionTable = this.space.getDimensionTable(dimenstion);
                const founded = dimensionTable.filter( member => {
                    return Object.keys(member).find((key)=>{
                        return key !== ENTITY_ID && member[key] === arg;
                    });
                });
                return founded;
            };

            if (typeof arg === "string"){
                copy[dimenstion] = find(dimenstion, arg) || [];
            } else {
                if (Array.isArray(arg) && arg.length && typeof arg[0] === "string"){
                    copy[dimenstion] = [];
                    arg.map((dimenstion)=>{
                        const found = find(arg);
                        if (found){
                            [].splice.apply(copy[dimenstion], copy[dimenstion].length, 0, found)
                        }
                    })
                }
            }
        });
        return copy;
    }
    /**
     * @param {object[]} factTable - Data array to the analysis of values for dimension
     * @param {object} iterator
     * @private
     * */
    _getMembersGroupsByDimensionsFromSchema(factTable, iterator){
        const space = new Space();

        const handleDimension = (dimensionSchema) => {
            const {dimension, dependency} = dimensionSchema;
            let dimensionTable;

            if (dependency){
                // определим подмножества для каждой зависимости
                let entitiesParts = [];

                let dependencyNames;
                let dependencyName;

                //todo ref
                const analize = this.schema.getDependencyNames(dependency);
                if (Array.isArray(analize)){
                    dependencyNames = analize;
                } else {
                    dependencyName = analize;
                }

                if (dependencyNames){

                    const dismember = (dependencyName, data) => {
                        const dependencyMeasure = space.getDimensionTable(dependencyName);

                        // определим подмножества для каждой зависимости
                        let entitiesParts;
                        entitiesParts = dependencyMeasure.map( measure => {
                            // множество сущностей соответствующих измерению
                            const measureId = measure[ENTITY_ID];
                            const entitiesPart = data.filter( data => {
                                let isPart = true;
                                let idName = Cube.genericId(dependencyName);
                                isPart = data[idName] == measureId;
                                return isPart;
                            });
                            return entitiesPart;
                        });
                        return entitiesParts;
                    };

                    let parts = [this.normalizedDataArray];
                    dependencyNames.forEach( dependencyName => {
                        let newParts = [];
                        parts.forEach( partData => {
                            const entitiesParts = dismember(dependencyName, partData)
                            entitiesParts.forEach( part => {
                                newParts.push(part);
                            })
                        });
                        parts = newParts;
                    });

                    entitiesParts = parts;
                } else {
                    const dependencyMeasure = space.getDimensionTable(dependencyName);

                    entitiesParts = dependencyMeasure.map( measure => {
                        // множество сущностей соответствующих измерению
                        const measureId = measure[ENTITY_ID];
                        const entitiesPart = this.normalizedDataArray.filter( data => {
                            let isPart = true;
                            let idName = Cube.genericId(dependencyName);
                            isPart = data[idName] == measureId;
                            return isPart;
                        });
                        return entitiesPart;
                    });
                }

                // для каждого подмножества определим свои меры
                let countId = 0;
                const measures = entitiesParts.map( entitiesPart => {
                    const measure = this._makeMeasureFrom(entitiesPart, countId, dimensionSchema);
                    countId = countId + measure.length;
                    return measure;
                });

                // затем меры объединяем, таким образум образуя срез
                let total = [];
                measures.forEach( measure => {
                    total = total.concat(measure);
                });
                const totalUniq = _.uniq(total, (item)=>{
                    return item[ENTITY_ID]
                });

                dimensionTable = new DimensionTable(totalUniq);
            } else {
                dimensionTable = this._makeMeasureFrom(factTable, 0, dimensionSchema);
            }
            space.setDimensionTable(dimension, dimensionTable);
        };

        let next;
        while ( !(next = iterator.next()) || !next.done){
            handleDimension(next.value)
        }

        return space;
    }
    /**
     * The method of analyzing the data array and generating new dimension values
     *
     * @param {object[]} factTable - Data array to the analysis of values for dimension
     * @param {number} startFrom
     * @param {SchemaDimension} dimensionSchema
     * @return {Member[]}
     * @private
     * */
    _makeMeasureFrom(factTable, startFrom = 0, dimensionSchema){
        const {
            dimension, //The dimension for which members will be created
            dependency
        } = dimensionSchema;

        const {
            keyProps, //Names of properties whose values will be used to generate a key that will determine the uniqueness of the new member for dimension
            otherProps, //Names of properties whose values will be appended to the dimension member along with the key properties
        } = this.schema.getDimensionProperties(dimension)

        // соотношение созданных id к ключам
        const cache = {};
        const DIVIDER = ',';
        const mesure = new DimensionTable();
        const idName = Cube.genericId(dimension);

        // создания групп по уникальным ключам
        factTable.forEach((data)=>{

            // собрать ключ на основе ключевых значений
            const key = keyProps.map( prop => {
                return data[prop]
            }).join(DIVIDER);

            // полный список свойств подлежащих стриранию из натуральной формы и записи в подсущности
            const totalProps = [].concat(keyProps, otherProps);

            // если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)
            if (! (key in cache) ){
                const memberId = ++startFrom;
                cache[key] = memberId;

                // создать подсущность
                const memberOptions = {
                    [ENTITY_ID]: memberId
                };

                // запись по ключевым параметрам
                totalProps.forEach( (prop) => {
                    // исключить идентификатор самой сущности
                    if (prop !== ENTITY_ID){
                        memberOptions[prop] = data[prop]
                    }
                });

                const member = dependency
                    ? new DetailMember(memberOptions)
                    : new Member(memberOptions);

                mesure.push(member);
            }

            // удалаять данные из нормальной формы
            const entityClone = this.normalizedDataArray.find(entityClone => {
                return entityClone[ENTITY_ID] == data[ENTITY_ID] ? entityClone : false;
            });

            totalProps.forEach( prop => {
                if ( prop !== ENTITY_ID ){
                    delete entityClone[prop];
                }
            });

            // оставить в нормальной форме ссылку на id под сущности
            entityClone[idName] = cache[key];
            return key;
        });

        return mesure;
    }
    /**
     * A way to create a name for a property in which a unique identifier will be stored
     * */
    static genericId(entityName) {
        return entityName + '_' + ENTITY_ID;
    }
    /**
     * Method of generating a unique identifier within the selected space
     * */
    static reduceId(array){
        if (array.length){
            return array.reduce( (acc, curValue) => {
                    return acc[ENTITY_ID] > curValue[ENTITY_ID] ? acc : curValue;
                }, 0).id + 1
        } else {
            return 1;
        }
    }
}

/**
 * A helper class that provides methods for adding and removing values,
 * as well as generating missing values for possible display of data
 * */
class DynamicCube extends Cube{
    constructor(factTable, dimensionsSchema){
        super(factTable, dimensionsSchema)
    }
    /**
     * @param {string} dimension - dimension in which the member is created
     * @param {object} memberOptions - properties for the created member
     * @param {object} cellOptions -
     * @public
     * */
    addMember(dimension, memberOptions, cellOptions = {}){
        const columns = this.schema.getColumns();

        const space = new Space();

        // остальные измерения этого уровня
        columns.forEach((dimensionSchema)=>{
            if (dimensionSchema.dimension !== dimension){
                if (!cellOptions[dimensionSchema.dimension]){
                    space.setDimensionTable(dimensionSchema.dimension, this.space.getDimensionTable(dimensionSchema.dimension))
                }
            }
        });

        const memberDepOptions = this._createMemberDependency(dimension, memberOptions);

        cellOptions = Object.assign({}, cellOptions, memberDepOptions);

        const recursivelyForEach = (cellOptions, space, index, isDependency) => {
            const dimensionNames = space.getDimensionList();
            const dimensionNamesLength = dimensionNames.length;

            if (index !== dimensionNamesLength){
                const members = space.getDimensionTable(dimensionNames[index]);

                members.forEach( member => {
                    cellOptions[dimensionNames[index]] = member;
                    let dependency = this.schema.getByDependency(dimensionNames[index]);
                    if (dependency){
                        const queryOptions = { [dimensionNames[index]]: member };
                        const query = this.query(dependency.dimension, queryOptions);
                        const space = new Space();
                        space.setDimensionTable(dependency.dimension, query);

                        recursivelyForEach(cellOptions, space, 0, true);
                    }
                    recursivelyForEach(cellOptions, space, index + 1, isDependency);

                    if (isDependency){
                        return;
                    }

                    if ( (index + 1) === dimensionNamesLength ){
                        // create cell
                        const measureName = this.schema.getMeasure().dimension;
                        const member = this._createMember(measureName);
                        const options = Object.assign({}, cellOptions, { [measureName]: member });
                        this._createNormalizeData(options);
                    }
                })

            }
        };

        recursivelyForEach(cellOptions, space, 0);
    }
    /**
     *
     * @param {string} dimension - dimension from which the member will be removed
     * @param {Member} member - the member will be removed
     * @public
     * */
    removeMember(dimension, member){
        const dependenciesDimensionNames = this.schema.getDependenciesNames(dimension);
        const index = this.space.getDimensionTable(dimension).indexOf(member);
        if (index === -1){
            throw new Error('represented member was not found in the ' + dimension + ' dimension')
        }
        this.space.getDimensionTable(dimension).splice(index, 1);

        const filterData = this.normalizedDataArray.filter(data => {
            return data[Cube.genericId(dimension)] == member[ENTITY_ID];
        });

        filterData.forEach( data => {
            const index = this.normalizedDataArray.indexOf(data);
            this.normalizedDataArray.splice(index, 1);

            dependenciesDimensionNames.forEach( dimension => {
                this._removeSubModel(data, dimension);
            });
        });
        this._normalize();
    }
    /**
     * Remove subentity, links to which none of the model does not remain
     * @private
     * */
    /**
     *
     * @private
     * */
    _removeSubModel(normalizeData, dimension){
        // подчистить суб-модельку
        const filtered = this.space.getDimensionTable(dimension).filter(record => {
            return record[ENTITY_ID] == normalizeData[Cube.genericId(dimension)]
        });

        // и подчистить суб-модельку
        filtered.forEach( data => {
            const index = this.space.getDimensionTable(dimension).indexOf(data);
            this.space.getDimensionTable(dimension).splice(index, 1);
        })
    }
    /**
     *
     * @private
     * */
    _normalize(){
        const names = this.schema.getNames();
        const report = [];
        names.forEach( dimension => {
            if (this.space.getDimensionTable(dimension).length){
                const copy = [].concat(this.space.getDimensionTable(dimension));
                // чтобы splice корректно отработал
                copy.forEach( (member, index) => {
                    const idName = Cube.genericId(dimension);
                    const findLink = this.normalizedDataArray.find( data => {
                        return data[idName] == member[ENTITY_ID]
                    });
                    if (!findLink){
                        this.space.getDimensionTable(dimension).splice(index - (copy.length - this.space.getDimensionTable(dimension).length), 1);
                        report.push(member)
                    }
                })
            }
        });
        if (report.length){
            console.log('битые ссылки:', report)
        }
    }
    /**
     *
     * @public
     * */
    getDataArray(options = Object){
        return this.getRawDataArray(options, true)
    }
    /**
     *
     * @public
     * */
    getRawDataArray(Constructor, forSave = false){
        const list = [];

        this.normalizedDataArray.forEach( cell => {
            const data = Object.assign(new Constructor(), cell);

            if (forSave && (cell instanceof InputCell)){
                delete data[ENTITY_ID];
            }

            const handleDimension = dimensionSchema => {
                const idName = Cube.genericId(dimensionSchema.dimension);
                const idValue = cell[idName];
                const member = this.space.getDimensionTable(dimensionSchema.dimension).find( member => {
                    return member[ENTITY_ID] === idValue;
                });
                const memberCopy = Object.assign({}, member);
                delete memberCopy[ENTITY_ID];
                delete data[idName];
                Object.assign(data, memberCopy);
            };

            const iterator = this.schema.createIterator();
            let next;
            while ( !(next = iterator.next()) || !next.done){
                handleDimension(next.value)
            }

            list.push(data);
        });

        return list;
    }
    /**
     * Filling method for full size of cube
     * @param {object?} props - properties for empty cells
     * @public
     * */
    fill(props){
        const measureName = this.schema.getMeasure().dimension;
        const combinations = this._getCombinations();
        const emptyMemberOptions = [];
        combinations.forEach( combination => {
            const unique = this.query(measureName, combination );
            if ( !unique.length ){
                emptyMemberOptions.push( combination );
            }
        });

        emptyMemberOptions.forEach( cellOptions => {
            const member = this._createMemberDependency( measureName, props );
            const options = Object.assign({}, cellOptions, member );
            this._createNormalizeData(options);
        });
    }
    /**
     *
     * @private
     * */
    _createNormalizeData(obj){
        const options = {};
        Object.keys(obj).forEach( key => {
            options[Cube.genericId(key)] = obj[key][ENTITY_ID]
        });
        const newNormaliseData = new InputCell(options);
        this.normalizedDataArray.push(newNormaliseData);
    }
    /**
     *
     * @private
     * */
    _getCombinations(){
        const combination = [];
        const callback = (item) => {
            combination.push(item)
        };
        const finalDimensions = this.schema.getFinal();
        const dimensionsMembers = {};
        const reqursively = (dimensionsMembers, index) => {
            let finalDimension = finalDimensions[index];
            let members = this.space.getDimensionTable(finalDimension.dimension);
            members.forEach( member => {
                let newDimensionsMembers = Object.assign({}, dimensionsMembers, {[finalDimension.dimension]: member} );
                if ( Object.keys(newDimensionsMembers).length === finalDimensions.length ){
                    callback(newDimensionsMembers)
                } else {
                    dimensionsMembers[finalDimension.dimension] = member;
                    reqursively(dimensionsMembers, index + 1);
                }
            });
        };

        reqursively(dimensionsMembers, 0);

        return combination;
    }
    /**
     * @param {string} dimension
     * @param {object?} props
     * @private
     * */
    _createMember(dimension, props = {}){
        if (!dimension){
            throw 'attribute \"dimension\" nor found';
        }
        const memberPropDefaultValue = null;
        const memberProps = Object.assign({}, props, {
            id: Cube.reduceId(this.space.getDimensionTable(dimension)),
        });
        const {keyProps} = this.schema.getDimensionProperties(dimension);
        keyProps.forEach( propName => {
            memberProps[propName] = props.hasOwnProperty(propName) ? props[propName] : memberPropDefaultValue
        });

        const member = new InputMember(memberProps);
        this.space.getDimensionTable(dimension).push(member);
        return member;
    }
    /**
     *
     * @private
     * */
    _createMemberDependency(dimension, memberOptions = {}){
        const result = {};
        const reqursive = (dimension, memberOptions = {}) => {
            // create
            const member = this._createMember(dimension, memberOptions);
            result[dimension] = member;
        };
        reqursive(dimension, memberOptions);
        return result;
    }
}

export default DynamicCube;