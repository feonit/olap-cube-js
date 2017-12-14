let Cube = (function(){

    const ENTITY_ID = 'id';
    const ENTITY_UUID = 'uuid';

    class NormalizedData {
        constructor(options){
            Object.assign(this, options)
        }
    }
    class NormalizedDataNotSaved extends NormalizedData{
        constructor(options){
            super(options)
            if (!options.id){
                this.id = this.uuidv4()
            }
        }
        uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
    class Member{
        constructor(id){
            if (typeof id === "string"){
                debugger;
            }
            this[ENTITY_ID] = id;
            this[ENTITY_UUID] = this.uuidv4()
        }
        uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }

    class CreatedMember extends Member{
        constructor(options){
            const {id} = options;
            super(id)
            Object.assign(this, options);
        }
    }

    class Measurements{}

    const _ = {};

    _.uniq = function (items, fn) {
        const hash = {};
        items.forEach((item)=>{
            let key = fn ? fn(item) : item;
            hash[key] = item;
        });
        const uniq = Object.keys(hash).map(key => hash[key]);
        return uniq;
    };

    class Cube{
        constructor(entities, measurementsSchema){
            this.ENTITY_ID = 'id';
            this.ENTITY_UUID = 'uuid';

            this.schema = measurementsSchema;
            this.measurements = new Measurements();
            this.normalizedData = entities.map( entity => new NormalizedData(entity) );

            measurementsSchema.forEach( (measurement) => {
                const {name, dependency, keyProps, otherProps = []} = measurement;
            if (!name || !keyProps){
                throw Error('need \"name\" and \"keyProps\" params')
            }
            let measure;
            if (dependency){
                // определим подмножества для каждой зависимости
                let entitiesParts = [];

                if (Array.isArray(dependency)){

                    const dismember = (dependencyName, data) => {
                        const dependencyMeasure = this.measurements[dependencyName];

                        // определим подмножества для каждой зависимости
                        let entitiesParts;
                        entitiesParts = dependencyMeasure.map( measure => {
                                // множество сущностей соответствующих измерению
                                const measureId = measure[this.ENTITY_ID];
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
                    const dependencyMeasure = this.measurements[dependency];

                    entitiesParts = dependencyMeasure.map( measure => {
                            // множество сущностей соответствующих измерению
                            const measureId = measure[this.ENTITY_ID];
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
                    return item[this.ENTITY_ID]
                });

                measure = totalUniq;
            } else {
                measure = this.makeMeasureFrom(entities, keyProps, 0, name, otherProps);
            }

            this.measurements[name] = measure;
        });
        }
        genericId(entityName) {
            return entityName + '_' + this.ENTITY_ID;
        }
        reduceId(array){
            if (array.length){
                return array.reduce( (acc, curValue) => {
                        return acc[this.ENTITY_ID] > curValue[this.ENTITY_ID] ? acc : curValue;
            }, 0).id + 1
            } else {
                return 1;
            }
        }
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
                    if (prop !== this.ENTITY_ID){
                    member[prop] = entity[prop];
                }
            });

                mesure.push(member);
            }

            // удалаять данные из нормальной формы
            const entityClone = this.normalizedData.find(entityClone => {
                return entityClone[this.ENTITY_ID] == entity[this.ENTITY_ID] ? entityClone : false;
            });

            totalProps.forEach( prop => {
                if ( prop !== this.ENTITY_ID ){
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
        unique(measurementName, deps){
            const members = this.measurements[measurementName];
            let data = this.normalizedData;

            if (deps){
                Object.keys(deps).forEach( key => {
                    const measurement = key;
                    const etalonEntity = deps[key];
                    data = data.filter((entity)=>{
                        return entity[this.genericId(measurement)] == etalonEntity[this.ENTITY_ID];
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
                if (uniq.indexOf(member[this.ENTITY_ID]) !== -1){
                    result.push(member)
                }
            });
            return result;
        }
        createNormalizeData(obj){
            const options = {};
            Object.keys(obj).forEach( key => {
                options[this.genericId(key)] = obj[key][this.ENTITY_ID]
            });
            const newNormaliseData = new NormalizedDataNotSaved(options);
            this.normalizedData.push(newNormaliseData);
        }
        getListAnalize(Constructor, forSave = false){
            const list = [];

            this.normalizedData.forEach( entity => {
                const newEntity = Object.assign(new Constructor(), entity);

                if (forSave && (entity instanceof NormalizedDataNotSaved)){
                    delete newEntity[this.ENTITY_ID];
                }

                this.schema.forEach( measurement => {
                    const subEntityIdName = this.genericId(measurement.name);
                    const subEntityId = entity[subEntityIdName];
                    const subEntity = this.measurements[measurement.name].find( item => {
                            return  item[this.ENTITY_ID] === subEntityId;
                    });
                    const subEntityCopy = Object.assign({}, subEntity);
                    delete subEntityCopy[this.ENTITY_UUID];
                    delete subEntityCopy[this.ENTITY_ID];
                    delete newEntity[subEntityIdName];
                    Object.assign(newEntity, subEntityCopy);
                });

                list.push(newEntity);
            });

            return list;
        }
        getList(options = Object){
            return this.getListAnalize(options, true)
        }
        removeSubModel(normalizeData, name){
            // подчистить суб-модельку
            const filtered = this.measurements[name].filter(rate => {
                return rate[this.ENTITY_ID] == normalizeData[this.genericId(name)]
            });

            // и подчистить суб-модельку
            filtered.forEach( data => {
                const index = this.measurements[name].indexOf(data);
                this.measurements[name].splice(index, 1);
            })
        }
        removeSubModelDepend(subModelName, subModel, dependencies){
            // подчистить суб-модельку
            const index = this.measurements[subModelName].indexOf(subModel);
            if (index === -1){
                debugger; // что то пошло не так
            }
            this.measurements[subModelName].splice(index, 1);

            // подчистить нормальную форму
            const filterData = this.normalizedData.filter(data => {
                return data[this.genericId(subModelName)] == subModel[this.ENTITY_ID];
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
        createMember(name, options = {}){
            const measurement = this.schema.find((schema)=>{
                return schema.name === name;
            });
            const memberOptions = {
                    ...options,
                id: this.reduceId(this.measurements[name]),
            };
            measurement.keyProps.forEach( propName => {
                memberOptions[propName] = null
            });

            const member = new CreatedMember(memberOptions);
            this.measurements[name].push(member);
            return member;
        }
        /**
         * Удалить подсущности, ссылки на которых ни у одной модели не осталось
         * */
        normalize(){
            const names = this.schema.map( item => item.name );
            const report = [];
            names.forEach( name => {
                if (this.measurements[name].length){
                    const copy = [].concat(this.measurements[name]);
                    // чтобы splice корректно отработал
                    copy.forEach( (member, index) => {
                        const idName = this.genericId(name);
                        const findLink = this.normalizedData.find( data => {
                            return data[idName] == member[this.ENTITY_ID]
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
    }

    return Cube
}());