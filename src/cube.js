import NormalizedData from './NormalizedData.js'
import NormalizedDataNotSaved from './NormalizedDataNotSaved.js'
import _ from './_.js';
import {ENTITY_ID} from './const.js';
import Member from './Member.js';
import CreatedMember from './CreatedMember.js';
import Schema from './Schema.js';

class Measurements{}

class Cube{
    constructor(entities, measurementsSchema){
        const schema = new Schema(measurementsSchema);
        Object.defineProperty(this, 'schema', { value: schema });
        Object.defineProperty(this, 'entities', { value: entities });
        this.normalizedData = entities.map( entity => new NormalizedData(entity) );
        this.measurements = this.getMembersGroupsByMeasurementsFromSchema(entities, this.schema.createIterator())
    }
    getMembersGroupsByMeasurementsFromSchema(entities, iterator){
        const measurements = new Measurements();

        const handleMeasurement = (measurement) => {
            const {name, dependency, keyProps, otherProps = []} = measurement;
            let measure;
            if (dependency){
                // определим подмножества для каждой зависимости
                let entitiesParts = [];

                if (Array.isArray(dependency)){

                    const dismember = (dependencyName, data) => {
                        const dependencyMeasure = measurements[dependencyName];

                        // определим подмножества для каждой зависимости
                        let entitiesParts;
                        entitiesParts = dependencyMeasure.map( measure => {
                            // множество сущностей соответствующих измерению
                            const measureId = measure[ENTITY_ID];
                            const entitiesPart = data.filter( entity => {
                                let isPart = true;
                                let idName = this.genericId(dependencyName);
                                isPart = entity[idName] == measureId;
                                return isPart;
                            });
                            return entitiesPart;
                        });
                        return entitiesParts;
                    };

                    let parts = [this.normalizedData];
                    dependency.forEach( dependencyName => {
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
                    const dependencyMeasure = measurements[dependency];

                    entitiesParts = dependencyMeasure.map( measure => {
                        // множество сущностей соответствующих измерению
                        const measureId = measure[ENTITY_ID];
                        const entitiesPart = this.normalizedData.filter( entity => {
                            let isPart = true;
                            let idName = this.genericId(dependency);
                            isPart = entity[idName] == measureId;
                            return isPart;
                        });
                        return entitiesPart;
                    });
                }

                // для каждого подмножества определим свои меры
                let countId = 0;
                const measures = entitiesParts.map( entitiesPart => {
                    const measure = this.makeMeasureFrom(entitiesPart, keyProps, countId, name, otherProps);
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
                measure = this.makeMeasureFrom(entities, keyProps, 0, name, otherProps);
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
     * @public
     * */
    getList(options = Object){
        return this.getListAnalize(options, true)
    }
    /**
     *
     * @public
     * */
    unique(measurementName, deps){
        const members = this.measurements[measurementName];
        let data = this.normalizedData;

        if (deps){
            Object.keys(deps).forEach( key => {
                const measurement = key;
                const etalonEntity = deps[key];
                data = data.filter((entity)=>{
                    return entity[this.genericId(measurement)] == etalonEntity[ENTITY_ID];
                })
            })
        }

        const measurementIdName = this.genericId(measurementName);
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
     * A way to create a name for a property in which a unique identifier will be stored
     * @private
     * */
    genericId(entityName) {
        return entityName + '_' + ENTITY_ID;
    }
    /**
     * Method of generating a unique identifier within the selected space
     * @private
     * */
    reduceId(array){
        if (array.length){
            return array.reduce( (acc, curValue) => {
                    return acc[ENTITY_ID] > curValue[ENTITY_ID] ? acc : curValue;
                }, 0).id + 1
        } else {
            return 1;
        }
    }
    /**
     *
     * @private
     * */
    makeMeasureFrom(entities, keyProps, startFrom = 0, measurement, otherProps){
        // соотношение созданных id к ключам
        const cache = {};
        const DIVIDER = ',';
        const mesure = [];

        // создания групп по уникальным ключам
        entities.forEach((entity)=>{

            // собрать ключ на основе ключевых значений
            const key = keyProps.map( prop => {
                return entity[prop]
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
                        member[prop] = entity[prop];
                    }
                });

                mesure.push(member);
            }

            // удалаять данные из нормальной формы
            const entityClone = this.normalizedData.find(entityClone => {
                return entityClone[ENTITY_ID] == entity[ENTITY_ID] ? entityClone : false;
            });

            totalProps.forEach( prop => {
                if ( prop !== ENTITY_ID ){
                    delete entityClone[prop];
                }
            });

            // оставить в нормальной форме ссылку на id под сущности
            const idName = this.genericId(measurement);
            entityClone[idName] = cache[key];
            return key;
        });

        return mesure;
    }
    /**
     *
     * @private
     * */
    createNormalizeData(obj){
        const options = {};
        Object.keys(obj).forEach( key => {
            options[this.genericId(key)] = obj[key][ENTITY_ID]
        });
        const newNormaliseData = new NormalizedDataNotSaved(options);
        this.normalizedData.push(newNormaliseData);
    }
    /**
     *
     * @private
     * */
    getListAnalize(Constructor, forSave = false){
        const list = [];

        this.normalizedData.forEach( entity => {
            const newEntity = Object.assign(new Constructor(), entity);

            if (forSave && (entity instanceof NormalizedDataNotSaved)){
                delete newEntity[ENTITY_ID];
            }

            const handleMeasurement = measurement => {
                const subEntityIdName = this.genericId(measurement.name);
                const subEntityId = entity[subEntityIdName];
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
     * @private
     * */
    removeSubModel(normalizeData, name){
        // подчистить суб-модельку
        const filtered = this.measurements[name].filter(rate => {
            return rate[ENTITY_ID] == normalizeData[this.genericId(name)]
        });

        // и подчистить суб-модельку
        filtered.forEach( data => {
            const index = this.measurements[name].indexOf(data);
            this.measurements[name].splice(index, 1);
        })
    }
    /**
     *
     * @private
     * */
    removeSubModelDepend(subModelName, subModel, dependencies){
        // подчистить суб-модельку
        const index = this.measurements[subModelName].indexOf(subModel);
        if (index === -1){
            debugger; // что то пошло не так
        }
        this.measurements[subModelName].splice(index, 1);

        // подчистить нормальную форму
        const filterData = this.normalizedData.filter(data => {
            return data[this.genericId(subModelName)] == subModel[ENTITY_ID];
        });

        filterData.forEach( data => {
            const index = this.normalizedData.indexOf(data);
            this.normalizedData.splice(index, 1);

            dependencies.forEach( depName => {
                this.removeSubModel(data, depName);
            });
        });
        this.normalize();
    }
    /**
     *
     * @private
     * */
    createMember(name, options = {}){
        const measurement = this.schema.getMeasurement(name);
        const memberOptions = Object.assign({}, options, {
            id: this.reduceId(this.measurements[name]),
        });
        measurement.keyProps.forEach( propName => {
            memberOptions[propName] = options[propName] || null
        });

        const member = new CreatedMember(memberOptions);
        this.measurements[name].push(member);
        return member;
    }
    /**
     * Remove subentity, links to which none of the model does not remain
     * @private
     * */
    normalize(){
        const names = this.schema.getMeasurementsNames();
        const report = [];
        names.forEach( name => {
            if (this.measurements[name].length){
                const copy = [].concat(this.measurements[name]);
                // чтобы splice корректно отработал
                copy.forEach( (member, index) => {
                    const idName = this.genericId(name);
                    const findLink = this.normalizedData.find( data => {
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

    createMemberDependency(name, options = {}){
        const result = {};
        const reqursive = (name, options = {}) => {
            // create
            const member = this.createMember(name, options);
            result[name] = member;

            // check dep
            let dependency = this.schema.getDependencyOf(name);
            if (dependency){
                reqursive(dependency.name)
            }
        };
        reqursive(name, options);
        return result;
    }

    addColumn(name, options, cellOptions = {}){
        const measurements = this.getColumnMeasurements();

        const columns = {};

        // остальные измерения этого уровня
        measurements.forEach((value)=>{
            if (value.name !== name){
                if (!cellOptions[value.name]){
                    columns[value.name] = this.measurements[value.name]
                }
            }
        });

        cellOptions = Object.assign({}, cellOptions, this.createMemberDependency(name, options));

        const reqursiveForEach = (cellOptions, columns, index, isDependency) => {
            const keys = Object.keys(columns);
            const measurementsLength = keys.length;

            if (index !== measurementsLength){
                const mesurement = columns[keys[index]];

                mesurement.forEach( member => {
                    cellOptions[keys[index]] = member;
                    let dependency = this.getDependencyOf(keys[index]);
                    if (dependency){
                        const uniqueOptions = { [keys[index]]: member };
                        const unique = this.unique(dependency.name, uniqueOptions);
                        const columns = { [ dependency.name ]: unique };

                        reqursiveForEach(cellOptions, columns, 0, true);
                    }
                    reqursiveForEach(cellOptions, columns, index + 1, isDependency);

                    if (isDependency){
                        return;
                    }

                    if ( (index + 1) === measurementsLength){
                        // create cell
                        const rate = this.createMember(this.getCellName());
                        const options = Object.assign({}, cellOptions, { rates: rate })
                        this.createNormalizeData(options);
                    }
                })

            }
        };

        reqursiveForEach(cellOptions, columns, 0);
    }

    getCellName(){
        return this.schema.getMesureName();
    }

    getColumnMeasurements(){
        return this.schema.filter( definition => {
            return !definition.dependency;
        })
    }
}

export default Cube;