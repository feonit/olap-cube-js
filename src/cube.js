import NormalizedData from './NormalizedData.js'
import NormalizedDataNotSaved from './NormalizedDataNotSaved.js'
import _ from './_.js';
import {ENTITY_ID} from './const.js';
import Member from './Member.js';
import CreatedMember from './CreatedMember.js';
import Schema from './Schema.js';
import Measurements from './Measurements.js';

class Cube{
    constructor(dataArray, measurementsSchema){
        const schema = new Schema(measurementsSchema);
        Object.defineProperty(this, 'schema', { value: schema });
        Object.defineProperty(this, 'dataArray', { value: dataArray });
        this.normalizedDataArray = dataArray.map( data => new NormalizedData(data) );
        this.measurements = this._getMembersGroupsByMeasurementsFromSchema(dataArray, this.schema.createIterator())
    }
    /**
     * Filling method for full size of table
     * */
    fill(props){
        const measureName = this.schema.getMeasure().name;
        const combinations = this._getCombinations();
        const emptyMemberOptions = [];
        combinations.forEach( combination => {
            const unique = this.unique(measureName, combination );
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

    _getCombinations(){
        const combination = [];
        const callback = (item) => {
            combination.push(item)
        };
        const columnMeasurements = this.schema.getInnerColumns();
        const measurementsMembers = {};
        const reqursively = (measurementsMembers, index) => {
            let columnMeasurement = columnMeasurements[index];
            let members = this.measurements[columnMeasurement.name];
            members.forEach( member => {
                let newMeasurementsMembers = Object.assign({}, measurementsMembers, {[columnMeasurement.name]: member} );
                if ( Object.keys(newMeasurementsMembers).length === columnMeasurements.length ){
                    callback(newMeasurementsMembers)
                } else {
                    measurementsMembers[columnMeasurement.name] = member;
                    reqursively(measurementsMembers, index + 1);
                }
            });
        };

        reqursively(measurementsMembers, 0);

        return combination;
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

        this.normalizedDataArray.forEach( data => {
            const newEntity = Object.assign(new Constructor(), data);

            if (forSave && (data instanceof NormalizedDataNotSaved)){
                delete newEntity[ENTITY_ID];
            }

            const handleMeasurement = measurement => {
                const subEntityIdName = Cube.genericId(measurement.name);
                const subEntityId = data[subEntityIdName];
                const subEntity = this.measurements[measurement.name].find( item => {
                    return  item[ENTITY_ID] === subEntityId;
                });
                const subEntityCopy = Object.assign({}, subEntity);
                delete subEntityCopy[ENTITY_ID];
                delete newEntity[subEntityIdName];
                Object.assign(newEntity, subEntityCopy);
            }

            const iterator = this.schema.createIterator();
            let next;
            while ( !(next = iterator.next()) || !next.done){
                handleMeasurement(next.value)
            }

            list.push(newEntity);
        });

        return list;
    }
    /**
     *
     * @public
     * */
    addColumn(measurementName, memberOptions, cellOptions = {}){
        const measurements = this.schema.getColumns();

        const columns = {};

        // остальные измерения этого уровня
        measurements.forEach((measurement)=>{
            if (measurement.name !== measurementName){
                if (!cellOptions[measurement.name]){
                    columns[measurement.name] = this.measurements[measurement.name]
                }
            }
        });

        const memberDepOptions = this._createMemberDependency(measurementName, memberOptions);

        cellOptions = Object.assign({}, cellOptions, memberDepOptions);

        const recursivelyForEach = (cellOptions, columns, index, isDependency) => {
            const measurementNames = Object.keys(columns);
            const measurementNamesLength = measurementNames.length;

            if (index !== measurementNamesLength){
                const members = columns[measurementNames[index]];

                members.forEach( member => {
                    cellOptions[measurementNames[index]] = member;
                    let dependency = this.schema.getByDependency(measurementNames[index]);
                    if (dependency){
                        const uniqueOptions = { [measurementNames[index]]: member };
                        const unique = this.unique(dependency.name, uniqueOptions);
                        const columns = { [ dependency.name ]: unique };

                        recursivelyForEach(cellOptions, columns, 0, true);
                    }
                    recursivelyForEach(cellOptions, columns, index + 1, isDependency);

                    if (isDependency){
                        return;
                    }

                    if ( (index + 1) === measurementNamesLength ){
                        // create cell
                        const measureName = this.schema.getMeasure().name;
                        const member = this._createMember(measureName);
                        const options = Object.assign({}, cellOptions, { [measureName]: member });
                        this._createNormalizeData(options);
                    }
                })

            }
        };

        recursivelyForEach(cellOptions, columns, 0);
    }
    /**
     *
     * @public
     * */
    unique(measurementName, dependency){
        const members = this.measurements[measurementName];
        let data = this.normalizedDataArray;

        if (dependency){
            Object.keys(dependency).forEach( key => {
                const measurement = key;
                const etalonEntity = dependency[key];
                data = data.filter((data)=>{
                    return data[Cube.genericId(measurement)] == etalonEntity[ENTITY_ID];
                })
            })
        }

        const measurementIdName = Cube.genericId(measurementName);
        const map = data.map( data => {
            return data[measurementIdName];
        });
        const uniq = _.uniq(map);
        const result = [];

        // фильтрация без потери порядка в массиве
        members.forEach( member => {
            if (uniq.indexOf(member[ENTITY_ID]) !== -1){
                result.push(member)
            }
        });
        return result;
    }
    /**
     *
     * @public
     * */
    removeSubModelDepend(subModelName, subModel, dependencies){
        dependencies = dependencies || this.schema.getDependencies(subModelName);
        // подчистить суб-модельку
        const index = this.measurements[subModelName].indexOf(subModel);
        if (index === -1){
            debugger; // что то пошло не так
        }
        this.measurements[subModelName].splice(index, 1);

        // подчистить нормальную форму
        const filterData = this.normalizedDataArray.filter(data => {
            return data[Cube.genericId(subModelName)] == subModel[ENTITY_ID];
        });

        filterData.forEach( data => {
            const index = this.normalizedDataArray.indexOf(data);
            this.normalizedDataArray.splice(index, 1);

            dependencies.forEach( depName => {
                this._removeSubModel(data, depName);
            });
        });
        this._normalize();
    }
    /**
     *
     * @private
     * */
    _getMembersGroupsByMeasurementsFromSchema(dataArray, iterator){
        const measurements = new Measurements();

        const handleMeasurement = (measurement) => {
            const {name, dependency, keyProps, otherProps = []} = measurement;
            let measure;
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
                        const dependencyMeasure = measurements[dependencyName];

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
                    const dependencyMeasure = measurements[dependencyName];

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
                    const measure = this._makeMeasureFrom(entitiesPart, keyProps, countId, name, otherProps);
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

                measure = totalUniq;
            } else {
                measure = this._makeMeasureFrom(dataArray, keyProps, 0, name, otherProps);
            }
            measurements[name] = measure;
        };

        let next;
        while ( !(next = iterator.next()) || !next.done){
            handleMeasurement(next.value)
        }

        return measurements;
    }
    /**
     *
     * @private
     * */
    _makeMeasureFrom(dataArray, keyProps, startFrom = 0, measurement, otherProps){
        // соотношение созданных id к ключам
        const cache = {};
        const DIVIDER = ',';
        const mesure = [];

        // создания групп по уникальным ключам
        dataArray.forEach((data)=>{

            // собрать ключ на основе ключевых значений
            const key = keyProps.map( prop => {
                return data[prop]
            }).join(DIVIDER);

            // полный список свойств подлежащих стриранию из натуральной формы и записи в подсущности
            const totalProps = [].concat(keyProps, otherProps);

            // если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)
            if (! (key in cache) ){
                const id = ++startFrom;
                cache[key] = id;

                // создать подсущность
                const member = new Member(id);

                // запись по ключевым параметрам
                totalProps.forEach( (prop) => {
                    // исключить идентификатор самой сущности
                    if (prop !== ENTITY_ID){
                        member[prop] = data[prop];
                    }
                });

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
            const idName = Cube.genericId(measurement);
            entityClone[idName] = cache[key];
            return key;
        });

        return mesure;
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
        const newNormaliseData = new NormalizedDataNotSaved(options);
        this.normalizedDataArray.push(newNormaliseData);
    }
    /**
     *
     * @private
     * */
    _removeSubModel(normalizeData, name){
        // подчистить суб-модельку
        const filtered = this.measurements[name].filter(rate => {
            return rate[ENTITY_ID] == normalizeData[Cube.genericId(name)]
        });

        // и подчистить суб-модельку
        filtered.forEach( data => {
            const index = this.measurements[name].indexOf(data);
            this.measurements[name].splice(index, 1);
        })
    }
    /**
     * @param {string} name
     * @param {object?} props
     * @private
     * */
    _createMember(name, props = {}){
        if (!name){
            throw 'attribute \"name\" nor found';
        }
        const memberPropDefaultValue = null;
        const measurement = this.schema.getByName(name);
        const memberProps = Object.assign({}, props, {
            id: Cube.reduceId(this.measurements[name]),
        });
        measurement.keyProps.forEach( propName => {
            memberProps[propName] = props.hasOwnProperty(propName) ? props[propName] : memberPropDefaultValue
        });

        const member = new CreatedMember(memberProps);
        this.measurements[name].push(member);
        return member;
    }
    /**
     * Remove subentity, links to which none of the model does not remain
     * @private
     * */
    _normalize(){
        const names = this.schema.getNames();
        const report = [];
        names.forEach( name => {
            if (this.measurements[name].length){
                const copy = [].concat(this.measurements[name]);
                // чтобы splice корректно отработал
                copy.forEach( (member, index) => {
                    const idName = Cube.genericId(name);
                    const findLink = this.normalizedDataArray.find( data => {
                        return data[idName] == member[ENTITY_ID]
                    });
                    if (!findLink){
                        this.measurements[name].splice(index - (copy.length - this.measurements[name].length), 1);
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
     * Full size of cube
     * */
    _getSize(){
        return this.schema.getColumns().reduce((accumulate, current)=>{
            let unique = this.unique(current.name);
            return accumulate * unique.length
        }, 1)
    }
    /**
     *
     * @private
     * */
    _createMemberDependency(measurementName, memberOptions = {}){
        const result = {};
        const reqursive = (measurementName, memberOptions = {}) => {
            // create
            const member = this._createMember(measurementName, memberOptions);
            result[measurementName] = member;

            // check dep
            // let dependency = this.schema.getByDependency(measurementName);
            // if (dependency){
            //     reqursive(dependency.name)
            // }
        };
        reqursive(measurementName, memberOptions);
        return result;
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

export default Cube;