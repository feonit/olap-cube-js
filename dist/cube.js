var Cube =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class NormalizedData {
    constructor(data, options) {
        Object.assign(this, data);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NormalizedData;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const ENTITY_ID = 'id';
/* harmony export (immutable) */ __webpack_exports__["a"] = ENTITY_ID;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__const_js__ = __webpack_require__(1);


class Member {
    constructor(id) {
        if (typeof id === "string") {
            debugger;
        }
        this[__WEBPACK_IMPORTED_MODULE_0__const_js__["a" /* ENTITY_ID */]] = id;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Member;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NormalizedData_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NormalizedDataNotSaved_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__const_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Member_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CreatedMember_js__ = __webpack_require__(6);







class Cube {
    constructor(entities, measurementsSchema) {
        Object.defineProperty(this, 'schema', { value: measurementsSchema });

        class Measurements {}

        this.measurements = new Measurements();
        this.normalizedData = entities.map(entity => new __WEBPACK_IMPORTED_MODULE_0__NormalizedData_js__["a" /* default */](entity));

        measurementsSchema.forEach(measurement => {
            const { name, dependency, keyProps, otherProps = [] } = measurement;
            if (!name || !keyProps) {
                throw Error('need \"name\" and \"keyProps\" params');
            }
            let measure;
            if (dependency) {
                // определим подмножества для каждой зависимости
                let entitiesParts = [];

                if (Array.isArray(dependency)) {

                    const dismember = (dependencyName, data) => {
                        const dependencyMeasure = this.measurements[dependencyName];

                        // определим подмножества для каждой зависимости
                        let entitiesParts;
                        entitiesParts = dependencyMeasure.map(measure => {
                            // множество сущностей соответствующих измерению
                            const measureId = measure[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
                            const entitiesPart = data.filter(entity => {
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
                    dependency.forEach(dependencyName => {
                        let newParts = [];
                        parts.forEach(partData => {
                            const entitiesParts = dismember(dependencyName, partData);
                            entitiesParts.forEach(part => {
                                newParts.push(part);
                            });
                        });
                        parts = newParts;
                    });

                    entitiesParts = parts;
                } else {
                    const dependencyMeasure = this.measurements[dependency];

                    entitiesParts = dependencyMeasure.map(measure => {
                        // множество сущностей соответствующих измерению
                        const measureId = measure[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
                        const entitiesPart = this.normalizedData.filter(entity => {
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
                const measures = entitiesParts.map(entitiesPart => {
                    const measure = this.makeMeasureFrom(entitiesPart, keyProps, countId, name, otherProps);
                    countId = countId + measure.length;
                    return measure;
                });

                // затем меры объединяем, таким образум образуя срез
                let total = [];
                measures.forEach(measure => {
                    total = total.concat(measure);
                });
                const totalUniq = __WEBPACK_IMPORTED_MODULE_2__js__["a" /* default */].uniq(total, item => {
                    return item[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
                });

                measure = totalUniq;
            } else {
                measure = this.makeMeasureFrom(entities, keyProps, 0, name, otherProps);
            }

            this.measurements[name] = measure;
        });
    }
    /**
     *
     * @public
     * */
    getList(options = Object) {
        return this.getListAnalize(options, true);
    }
    /**
     *
     * @public
     * */
    unique(measurementName, deps) {
        const members = this.measurements[measurementName];
        let data = this.normalizedData;

        if (deps) {
            Object.keys(deps).forEach(key => {
                const measurement = key;
                const etalonEntity = deps[key];
                data = data.filter(entity => {
                    return entity[this.genericId(measurement)] == etalonEntity[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
                });
            });
        }

        const measurementIdName = this.genericId(measurementName);
        const map = data.map(data => {
            return data[measurementIdName];
        });
        const uniq = __WEBPACK_IMPORTED_MODULE_2__js__["a" /* default */].uniq(map);
        const result = [];

        // фильтрация без потери порядка в массиве
        members.forEach(member => {
            if (uniq.indexOf(member[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]]) !== -1) {
                result.push(member);
            }
        });
        return result;
    }
    /**
     * A way to create a name for a property in which a unique identifier will be stored
     * @private
     * */
    genericId(entityName) {
        return entityName + '_' + __WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */];
    }
    /**
     * Method of generating a unique identifier within the selected space
     * @private
     * */
    reduceId(array) {
        if (array.length) {
            return array.reduce((acc, curValue) => {
                return acc[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]] > curValue[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]] ? acc : curValue;
            }, 0).id + 1;
        } else {
            return 1;
        }
    }
    /**
     *
     * @private
     * */
    makeMeasureFrom(entities, keyProps, startFrom = 0, measurement, otherProps) {
        // соотношение созданных id к ключам
        const cache = {};
        const DIVIDER = ',';
        const mesure = [];

        // создания групп по уникальным ключам
        entities.forEach(entity => {

            // собрать ключ на основе ключевых значений
            const key = keyProps.map(prop => {
                return entity[prop];
            }).join(DIVIDER);

            // полный список свойств подлежащих стриранию из натуральной формы и записи в подсущности
            const totalProps = [].concat(keyProps, otherProps);

            // если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)
            if (!(key in cache)) {
                const id = ++startFrom;
                cache[key] = id;

                // создать подсущность
                const member = new __WEBPACK_IMPORTED_MODULE_4__Member_js__["a" /* default */](id);

                // запись по ключевым параметрам
                totalProps.forEach(prop => {
                    // исключить идентификатор самой сущности
                    if (prop !== __WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]) {
                        member[prop] = entity[prop];
                    }
                });

                mesure.push(member);
            }

            // удалаять данные из нормальной формы
            const entityClone = this.normalizedData.find(entityClone => {
                return entityClone[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]] == entity[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]] ? entityClone : false;
            });

            totalProps.forEach(prop => {
                if (prop !== __WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]) {
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
    createNormalizeData(obj) {
        const options = {};
        Object.keys(obj).forEach(key => {
            options[this.genericId(key)] = obj[key][__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
        });
        const newNormaliseData = new __WEBPACK_IMPORTED_MODULE_1__NormalizedDataNotSaved_js__["a" /* default */](options);
        this.normalizedData.push(newNormaliseData);
    }
    /**
     *
     * @private
     * */
    getListAnalize(Constructor, forSave = false) {
        const list = [];

        this.normalizedData.forEach(entity => {
            const newEntity = Object.assign(new Constructor(), entity);

            if (forSave && entity instanceof __WEBPACK_IMPORTED_MODULE_1__NormalizedDataNotSaved_js__["a" /* default */]) {
                delete newEntity[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
            }

            this.schema.forEach(measurement => {
                const subEntityIdName = this.genericId(measurement.name);
                const subEntityId = entity[subEntityIdName];
                const subEntity = this.measurements[measurement.name].find(item => {
                    return item[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]] === subEntityId;
                });
                const subEntityCopy = Object.assign({}, subEntity);
                delete subEntityCopy[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
                delete newEntity[subEntityIdName];
                Object.assign(newEntity, subEntityCopy);
            });

            list.push(newEntity);
        });

        return list;
    }
    /**
     *
     * @private
     * */
    removeSubModel(normalizeData, name) {
        // подчистить суб-модельку
        const filtered = this.measurements[name].filter(rate => {
            return rate[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]] == normalizeData[this.genericId(name)];
        });

        // и подчистить суб-модельку
        filtered.forEach(data => {
            const index = this.measurements[name].indexOf(data);
            this.measurements[name].splice(index, 1);
        });
    }
    /**
     *
     * @private
     * */
    removeSubModelDepend(subModelName, subModel, dependencies) {
        // подчистить суб-модельку
        const index = this.measurements[subModelName].indexOf(subModel);
        if (index === -1) {
            debugger; // что то пошло не так
        }
        this.measurements[subModelName].splice(index, 1);

        // подчистить нормальную форму
        const filterData = this.normalizedData.filter(data => {
            return data[this.genericId(subModelName)] == subModel[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
        });

        filterData.forEach(data => {
            const index = this.normalizedData.indexOf(data);
            this.normalizedData.splice(index, 1);

            dependencies.forEach(depName => {
                this.removeSubModel(data, depName);
            });
        });
        this.normalize();
    }
    /**
     *
     * @private
     * */
    createMember(name, options = {}) {
        const measurement = this.schema.find(schema => {
            return schema.name === name;
        });
        const memberOptions = Object.assign({}, options, {
            id: this.reduceId(this.measurements[name])
        });
        measurement.keyProps.forEach(propName => {
            memberOptions[propName] = options[propName] || null;
        });

        const member = new __WEBPACK_IMPORTED_MODULE_5__CreatedMember_js__["a" /* default */](memberOptions);
        this.measurements[name].push(member);
        return member;
    }
    /**
     * Remove subentity, links to which none of the model does not remain
     * @private
     * */
    normalize() {
        const names = this.schema.map(item => item.name);
        const report = [];
        names.forEach(name => {
            if (this.measurements[name].length) {
                const copy = [].concat(this.measurements[name]);
                // чтобы splice корректно отработал
                copy.forEach((member, index) => {
                    const idName = this.genericId(name);
                    const findLink = this.normalizedData.find(data => {
                        return data[idName] == member[__WEBPACK_IMPORTED_MODULE_3__const_js__["a" /* ENTITY_ID */]];
                    });
                    if (!findLink) {
                        this.measurements[name].splice(index - (copy.length - this.measurements[name].length), 1);
                        report.push(member);
                    }
                });
            }
        });
        if (report.length) {
            console.log('битые ссылки:', report);
        }
    }

    createMemberDependency(name, options = {}) {
        const result = {};
        const reqursive = (name, options = {}) => {
            // create
            const member = this.createMember(name, options);
            result[name] = member;

            // check dep
            let dependency = this.getDependencyOf(name);
            if (dependency) {
                reqursive(dependency.name);
            }
        };
        reqursive(name, options);
        return result;
    }

    addColumn(name, options, cellOptions = {}) {
        const measurements = this.getColumnMeasurements();

        const columns = {};

        // остальные измерения этого уровня
        measurements.forEach(value => {
            if (value.name !== name) {
                if (!cellOptions[value.name]) {
                    columns[value.name] = this.measurements[value.name];
                }
            }
        });

        cellOptions = Object.assign({}, cellOptions, this.createMemberDependency(name, options));

        const reqursiveForEach = (cellOptions, columns, index, isDependency) => {
            const keys = Object.keys(columns);
            const measurementsLength = keys.length;

            if (index !== measurementsLength) {
                const mesurement = columns[keys[index]];

                mesurement.forEach(member => {
                    cellOptions[keys[index]] = member;
                    let dependency = this.getDependencyOf(keys[index]);
                    if (dependency) {
                        const uniqueOptions = { [keys[index]]: member };
                        const unique = this.unique(dependency.name, uniqueOptions);
                        const columns = { [dependency.name]: unique };

                        reqursiveForEach(cellOptions, columns, 0, true);
                    }
                    reqursiveForEach(cellOptions, columns, index + 1, isDependency);

                    if (isDependency) {
                        return;
                    }

                    if (index + 1 === measurementsLength) {
                        // create cell
                        const rate = this.createMember(this.getCellName());
                        const options = Object.assign({}, cellOptions, { rates: rate });
                        this.createNormalizeData(options);
                    }
                });
            }
        };

        reqursiveForEach(cellOptions, columns, 0);
    }

    getCellName() {
        return this.schema.find(schema => Array.isArray(schema.dependency)).name;
    }

    getDependencyOf(name) {
        return this.schema.find(schemaItem => {
            return schemaItem.dependency === name;
        });
    }

    getColumnMeasurements() {
        return this.schema.filter(definition => {
            return !definition.dependency;
        });
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Cube);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NormalizedData_js__ = __webpack_require__(0);


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}

class NormalizedDataNotSaved extends __WEBPACK_IMPORTED_MODULE_0__NormalizedData_js__["a" /* default */] {
    constructor(data, options) {
        super(data, options);
        if (!data.id) {
            this.id = uuidv4();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NormalizedDataNotSaved;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const _ = {};

_.uniq = function (items, fn) {
    const hash = {};
    const forEachFn = fn ? item => {
        hash[fn(item)] = item;
    } : item => {
        hash[item] = item;
    };
    items.forEach(forEachFn);
    return Object.keys(hash).map(key => hash[key]);
};

/* harmony default export */ __webpack_exports__["a"] = (_);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Member_js__ = __webpack_require__(2);


class CreatedMember extends __WEBPACK_IMPORTED_MODULE_0__Member_js__["a" /* default */] {
    constructor(options) {
        const { id } = options;
        super(id);
        Object.assign(this, options);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CreatedMember;


/***/ })
/******/ ]);