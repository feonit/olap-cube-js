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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ENTITY_ID = exports.ENTITY_ID = 'id';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _const = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NormalizedData = function NormalizedData(data, options) {
    _classCallCheck(this, NormalizedData);

    Object.assign(this, data);
    if (!this[_const.ENTITY_ID]) {
        throw "data must have id parameter";
    }
};

exports.default = NormalizedData;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _const = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Member = function Member(id) {
    _classCallCheck(this, Member);

    if (typeof id === "string") {
        debugger;
    }
    this[_const.ENTITY_ID] = id;
};

exports.default = Member;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NormalizedData = __webpack_require__(1);

var _NormalizedData2 = _interopRequireDefault(_NormalizedData);

var _NormalizedDataNotSaved = __webpack_require__(4);

var _NormalizedDataNotSaved2 = _interopRequireDefault(_NormalizedDataNotSaved);

var _2 = __webpack_require__(5);

var _3 = _interopRequireDefault(_2);

var _const = __webpack_require__(0);

var _Member = __webpack_require__(2);

var _Member2 = _interopRequireDefault(_Member);

var _CreatedMember = __webpack_require__(6);

var _CreatedMember2 = _interopRequireDefault(_CreatedMember);

var _Schema = __webpack_require__(7);

var _Schema2 = _interopRequireDefault(_Schema);

var _Measurements = __webpack_require__(9);

var _Measurements2 = _interopRequireDefault(_Measurements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cube = function () {
    function Cube(dataArray, measurementsSchema) {
        _classCallCheck(this, Cube);

        var schema = new _Schema2.default(measurementsSchema);
        Object.defineProperty(this, 'schema', { value: schema });
        Object.defineProperty(this, 'dataArray', { value: dataArray });
        this.normalizedDataArray = dataArray.map(function (data) {
            return new _NormalizedData2.default(data);
        });
        this.measurements = this._getMembersGroupsByMeasurementsFromSchema(dataArray, this.schema.createIterator());
    }
    /**
     * Filling method for full size of table
     * */


    _createClass(Cube, [{
        key: 'fill',
        value: function fill(props) {
            var _this = this;

            var measureName = this.schema.getMeasure().name;
            var combinations = this._getCombinations();
            var emptyMemberOptions = [];
            combinations.forEach(function (combination) {
                var unique = _this.unique(measureName, combination);
                if (!unique.length) {
                    emptyMemberOptions.push(combination);
                }
            });

            emptyMemberOptions.forEach(function (cellOptions) {
                var member = _this._createMemberDependency(measureName, props);
                var options = Object.assign({}, cellOptions, member);
                _this._createNormalizeData(options);
            });
        }
    }, {
        key: '_getCombinations',
        value: function _getCombinations() {
            var _this2 = this;

            var combination = [];
            var callback = function callback(item) {
                combination.push(item);
            };
            var columnMeasurements = this.schema.getInnerColumns();
            var measurementsMembers = {};
            var reqursively = function reqursively(measurementsMembers, index) {
                var columnMeasurement = columnMeasurements[index];
                var members = _this2.measurements[columnMeasurement.name];
                members.forEach(function (member) {
                    var newMeasurementsMembers = Object.assign({}, measurementsMembers, _defineProperty({}, columnMeasurement.name, member));
                    if (Object.keys(newMeasurementsMembers).length === columnMeasurements.length) {
                        callback(newMeasurementsMembers);
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

    }, {
        key: 'getDataArray',
        value: function getDataArray() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object;

            return this.getRawDataArray(options, true);
        }
        /**
         *
         * @public
         * */

    }, {
        key: 'getRawDataArray',
        value: function getRawDataArray(Constructor) {
            var _this3 = this;

            var forSave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var list = [];

            this.normalizedDataArray.forEach(function (data) {
                var newEntity = Object.assign(new Constructor(), data);

                if (forSave && data instanceof _NormalizedDataNotSaved2.default) {
                    delete newEntity[_const.ENTITY_ID];
                }

                var handleMeasurement = function handleMeasurement(measurement) {
                    var subEntityIdName = Cube.genericId(measurement.name);
                    var subEntityId = data[subEntityIdName];
                    var subEntity = _this3.measurements[measurement.name].find(function (item) {
                        return item[_const.ENTITY_ID] === subEntityId;
                    });
                    var subEntityCopy = Object.assign({}, subEntity);
                    delete subEntityCopy[_const.ENTITY_ID];
                    delete newEntity[subEntityIdName];
                    Object.assign(newEntity, subEntityCopy);
                };

                var iterator = _this3.schema.createIterator();
                var next = void 0;
                while (!(next = iterator.next()) || !next.done) {
                    handleMeasurement(next.value);
                }

                list.push(newEntity);
            });

            return list;
        }
        /**
         *
         * @public
         * */

    }, {
        key: 'addColumn',
        value: function addColumn(measurementName, memberOptions) {
            var _this4 = this;

            var cellOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var measurements = this.schema.getColumns();

            var columns = {};

            // остальные измерения этого уровня
            measurements.forEach(function (measurement) {
                if (measurement.name !== measurementName) {
                    if (!cellOptions[measurement.name]) {
                        columns[measurement.name] = _this4.measurements[measurement.name];
                    }
                }
            });

            var memberDepOptions = this._createMemberDependency(measurementName, memberOptions);

            cellOptions = Object.assign({}, cellOptions, memberDepOptions);

            var recursivelyForEach = function recursivelyForEach(cellOptions, columns, index, isDependency) {
                var measurementNames = Object.keys(columns);
                var measurementNamesLength = measurementNames.length;

                if (index !== measurementNamesLength) {
                    var members = columns[measurementNames[index]];

                    members.forEach(function (member) {
                        cellOptions[measurementNames[index]] = member;
                        var dependency = _this4.schema.getByDependency(measurementNames[index]);
                        if (dependency) {
                            var uniqueOptions = _defineProperty({}, measurementNames[index], member);
                            var unique = _this4.unique(dependency.name, uniqueOptions);
                            var _columns = _defineProperty({}, dependency.name, unique);

                            recursivelyForEach(cellOptions, _columns, 0, true);
                        }
                        recursivelyForEach(cellOptions, columns, index + 1, isDependency);

                        if (isDependency) {
                            return;
                        }

                        if (index + 1 === measurementNamesLength) {
                            // create cell
                            var measureName = _this4.schema.getMeasure().name;
                            var _member = _this4._createMember(measureName);
                            var options = Object.assign({}, cellOptions, _defineProperty({}, measureName, _member));
                            _this4._createNormalizeData(options);
                        }
                    });
                }
            };

            recursivelyForEach(cellOptions, columns, 0);
        }
        /**
         *
         * @public
         * */

    }, {
        key: 'unique',
        value: function unique(measurementName, dependency) {
            var members = this.measurements[measurementName];
            var data = this.normalizedDataArray;

            if (dependency) {
                Object.keys(dependency).forEach(function (key) {
                    var measurement = key;
                    var etalonEntity = dependency[key];
                    data = data.filter(function (data) {
                        return data[Cube.genericId(measurement)] == etalonEntity[_const.ENTITY_ID];
                    });
                });
            }

            var measurementIdName = Cube.genericId(measurementName);
            var map = data.map(function (data) {
                return data[measurementIdName];
            });
            var uniq = _3.default.uniq(map);
            var result = [];

            // фильтрация без потери порядка в массиве
            members.forEach(function (member) {
                if (uniq.indexOf(member[_const.ENTITY_ID]) !== -1) {
                    result.push(member);
                }
            });
            return result;
        }
        /**
         *
         * @param {string} measurementName - name of measurement from which the member will be removed
         * @param {Member} member - the member will be removed
         * @public
         * */

    }, {
        key: 'removeSubModelDepend',
        value: function removeSubModelDepend(measurementName, member) {
            var _this5 = this;

            var dependenciesMeasurementNames = this.schema.getDependencies(measurementName);
            var index = this.measurements[measurementName].indexOf(member);
            if (index === -1) {
                throw new Error('represented member was not found in the ' + measurementName + ' measurement');
            }
            this.measurements[measurementName].splice(index, 1);

            var filterData = this.normalizedDataArray.filter(function (data) {
                return data[Cube.genericId(measurementName)] == member[_const.ENTITY_ID];
            });

            filterData.forEach(function (data) {
                var index = _this5.normalizedDataArray.indexOf(data);
                _this5.normalizedDataArray.splice(index, 1);

                dependenciesMeasurementNames.forEach(function (measurementName) {
                    _this5._removeSubModel(data, measurementName);
                });
            });
            this._normalize();
        }
        /**
         *
         * @private
         * */

    }, {
        key: '_getMembersGroupsByMeasurementsFromSchema',
        value: function _getMembersGroupsByMeasurementsFromSchema(dataArray, iterator) {
            var _this6 = this;

            var measurements = new _Measurements2.default();

            var handleMeasurement = function handleMeasurement(measurement) {
                var name = measurement.name,
                    dependency = measurement.dependency,
                    keyProps = measurement.keyProps,
                    _measurement$otherPro = measurement.otherProps,
                    otherProps = _measurement$otherPro === undefined ? [] : _measurement$otherPro;

                var measure = void 0;
                if (dependency) {
                    // определим подмножества для каждой зависимости
                    var entitiesParts = [];

                    var dependencyNames = void 0;
                    var dependencyName = void 0;

                    //todo ref
                    var analize = _this6.schema.getDependencyNames(dependency);
                    if (Array.isArray(analize)) {
                        dependencyNames = analize;
                    } else {
                        dependencyName = analize;
                    }

                    if (dependencyNames) {

                        var dismember = function dismember(dependencyName, data) {
                            var dependencyMeasure = measurements[dependencyName];

                            // определим подмножества для каждой зависимости
                            var entitiesParts = void 0;
                            entitiesParts = dependencyMeasure.map(function (measure) {
                                // множество сущностей соответствующих измерению
                                var measureId = measure[_const.ENTITY_ID];
                                var entitiesPart = data.filter(function (data) {
                                    var isPart = true;
                                    var idName = Cube.genericId(dependencyName);
                                    isPart = data[idName] == measureId;
                                    return isPart;
                                });
                                return entitiesPart;
                            });
                            return entitiesParts;
                        };

                        var parts = [_this6.normalizedDataArray];
                        dependencyNames.forEach(function (dependencyName) {
                            var newParts = [];
                            parts.forEach(function (partData) {
                                var entitiesParts = dismember(dependencyName, partData);
                                entitiesParts.forEach(function (part) {
                                    newParts.push(part);
                                });
                            });
                            parts = newParts;
                        });

                        entitiesParts = parts;
                    } else {
                        var dependencyMeasure = measurements[dependencyName];

                        entitiesParts = dependencyMeasure.map(function (measure) {
                            // множество сущностей соответствующих измерению
                            var measureId = measure[_const.ENTITY_ID];
                            var entitiesPart = _this6.normalizedDataArray.filter(function (data) {
                                var isPart = true;
                                var idName = Cube.genericId(dependencyName);
                                isPart = data[idName] == measureId;
                                return isPart;
                            });
                            return entitiesPart;
                        });
                    }

                    // для каждого подмножества определим свои меры
                    var countId = 0;
                    var measures = entitiesParts.map(function (entitiesPart) {
                        var measure = _this6._makeMeasureFrom(entitiesPart, keyProps, countId, name, otherProps);
                        countId = countId + measure.length;
                        return measure;
                    });

                    // затем меры объединяем, таким образум образуя срез
                    var total = [];
                    measures.forEach(function (measure) {
                        total = total.concat(measure);
                    });
                    var totalUniq = _3.default.uniq(total, function (item) {
                        return item[_const.ENTITY_ID];
                    });

                    measure = totalUniq;
                } else {
                    measure = _this6._makeMeasureFrom(dataArray, keyProps, 0, name, otherProps);
                }
                measurements[name] = measure;
            };

            var next = void 0;
            while (!(next = iterator.next()) || !next.done) {
                handleMeasurement(next.value);
            }

            return measurements;
        }
        /**
         *
         * @private
         * */

    }, {
        key: '_makeMeasureFrom',
        value: function _makeMeasureFrom(dataArray, keyProps) {
            var startFrom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var _this7 = this;

            var measurement = arguments[3];
            var otherProps = arguments[4];

            // соотношение созданных id к ключам
            var cache = {};
            var DIVIDER = ',';
            var mesure = [];

            // создания групп по уникальным ключам
            dataArray.forEach(function (data) {

                // собрать ключ на основе ключевых значений
                var key = keyProps.map(function (prop) {
                    return data[prop];
                }).join(DIVIDER);

                // полный список свойств подлежащих стриранию из натуральной формы и записи в подсущности
                var totalProps = [].concat(keyProps, otherProps);

                // если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)
                if (!(key in cache)) {
                    var id = ++startFrom;
                    cache[key] = id;

                    // создать подсущность
                    var member = new _Member2.default(id);

                    // запись по ключевым параметрам
                    totalProps.forEach(function (prop) {
                        // исключить идентификатор самой сущности
                        if (prop !== _const.ENTITY_ID) {
                            member[prop] = data[prop];
                        }
                    });

                    mesure.push(member);
                }

                // удалаять данные из нормальной формы
                var entityClone = _this7.normalizedDataArray.find(function (entityClone) {
                    return entityClone[_const.ENTITY_ID] == data[_const.ENTITY_ID] ? entityClone : false;
                });

                totalProps.forEach(function (prop) {
                    if (prop !== _const.ENTITY_ID) {
                        delete entityClone[prop];
                    }
                });

                // оставить в нормальной форме ссылку на id под сущности
                var idName = Cube.genericId(measurement);
                entityClone[idName] = cache[key];
                return key;
            });

            return mesure;
        }
        /**
         *
         * @private
         * */

    }, {
        key: '_createNormalizeData',
        value: function _createNormalizeData(obj) {
            var options = {};
            Object.keys(obj).forEach(function (key) {
                options[Cube.genericId(key)] = obj[key][_const.ENTITY_ID];
            });
            var newNormaliseData = new _NormalizedDataNotSaved2.default(options);
            this.normalizedDataArray.push(newNormaliseData);
        }
        /**
         *
         * @private
         * */

    }, {
        key: '_removeSubModel',
        value: function _removeSubModel(normalizeData, name) {
            var _this8 = this;

            // подчистить суб-модельку
            var filtered = this.measurements[name].filter(function (rate) {
                return rate[_const.ENTITY_ID] == normalizeData[Cube.genericId(name)];
            });

            // и подчистить суб-модельку
            filtered.forEach(function (data) {
                var index = _this8.measurements[name].indexOf(data);
                _this8.measurements[name].splice(index, 1);
            });
        }
        /**
         * @param {string} name
         * @param {object?} props
         * @private
         * */

    }, {
        key: '_createMember',
        value: function _createMember(name) {
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (!name) {
                throw 'attribute \"name\" nor found';
            }
            var memberPropDefaultValue = null;
            var measurement = this.schema.getByName(name);
            var memberProps = Object.assign({}, props, {
                id: Cube.reduceId(this.measurements[name])
            });
            measurement.keyProps.forEach(function (propName) {
                memberProps[propName] = props.hasOwnProperty(propName) ? props[propName] : memberPropDefaultValue;
            });

            var member = new _CreatedMember2.default(memberProps);
            this.measurements[name].push(member);
            return member;
        }
        /**
         * Remove subentity, links to which none of the model does not remain
         * @private
         * */

    }, {
        key: '_normalize',
        value: function _normalize() {
            var _this9 = this;

            var names = this.schema.getNames();
            var report = [];
            names.forEach(function (name) {
                if (_this9.measurements[name].length) {
                    var copy = [].concat(_this9.measurements[name]);
                    // чтобы splice корректно отработал
                    copy.forEach(function (member, index) {
                        var idName = Cube.genericId(name);
                        var findLink = _this9.normalizedDataArray.find(function (data) {
                            return data[idName] == member[_const.ENTITY_ID];
                        });
                        if (!findLink) {
                            _this9.measurements[name].splice(index - (copy.length - _this9.measurements[name].length), 1);
                            report.push(member);
                        }
                    });
                }
            });
            if (report.length) {
                console.log('битые ссылки:', report);
            }
        }
        /**
         * Full size of cube
         * */

    }, {
        key: '_getSize',
        value: function _getSize() {
            var _this10 = this;

            var columns = this.schema.getColumns();
            var size = columns.reduce(function (accumulate, current) {
                var unique = _this10.unique(current.name);
                return accumulate * unique.length;
            }, 1);
            return size;
        }
        /**
         *
         * @private
         * */

    }, {
        key: '_createMemberDependency',
        value: function _createMemberDependency(measurementName) {
            var _this11 = this;

            var memberOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var result = {};
            var reqursive = function reqursive(measurementName) {
                var memberOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                // create
                var member = _this11._createMember(measurementName, memberOptions);
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

    }], [{
        key: 'genericId',
        value: function genericId(entityName) {
            return entityName + '_' + _const.ENTITY_ID;
        }
        /**
         * Method of generating a unique identifier within the selected space
         * */

    }, {
        key: 'reduceId',
        value: function reduceId(array) {
            if (array.length) {
                return array.reduce(function (acc, curValue) {
                    return acc[_const.ENTITY_ID] > curValue[_const.ENTITY_ID] ? acc : curValue;
                }, 0).id + 1;
            } else {
                return 1;
            }
        }
    }]);

    return Cube;
}();

exports.default = Cube;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _NormalizedData2 = __webpack_require__(1);

var _NormalizedData3 = _interopRequireDefault(_NormalizedData2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}

var NormalizedDataNotSaved = function (_NormalizedData) {
    _inherits(NormalizedDataNotSaved, _NormalizedData);

    function NormalizedDataNotSaved(data, options) {
        _classCallCheck(this, NormalizedDataNotSaved);

        if (!data.id) {
            data.id = uuidv4();
        }
        return _possibleConstructorReturn(this, (NormalizedDataNotSaved.__proto__ || Object.getPrototypeOf(NormalizedDataNotSaved)).call(this, data, options));
    }

    return NormalizedDataNotSaved;
}(_NormalizedData3.default);

exports.default = NormalizedDataNotSaved;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ = {};

_.uniq = function (items, fn) {
    var hash = {};
    var forEachFn = fn ? function (item) {
        hash[fn(item)] = item;
    } : function (item) {
        hash[item] = item;
    };
    items.forEach(forEachFn);
    return Object.keys(hash).map(function (key) {
        return hash[key];
    });
};

exports.default = _;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Member2 = __webpack_require__(2);

var _Member3 = _interopRequireDefault(_Member2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreatedMember = function (_Member) {
    _inherits(CreatedMember, _Member);

    function CreatedMember(options) {
        _classCallCheck(this, CreatedMember);

        var id = options.id;

        var _this = _possibleConstructorReturn(this, (CreatedMember.__proto__ || Object.getPrototypeOf(CreatedMember)).call(this, id));

        Object.assign(_this, options);
        return _this;
    }

    return CreatedMember;
}(_Member3.default);

exports.default = CreatedMember;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SchemaMeasurement2 = __webpack_require__(8);

var _SchemaMeasurement3 = _interopRequireDefault(_SchemaMeasurement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractSchema = function () {
    function AbstractSchema() {
        _classCallCheck(this, AbstractSchema);
    }

    _createClass(AbstractSchema, [{
        key: 'createIterator',
        value: function createIterator() {}
    }, {
        key: 'getByName',
        value: function getByName() {}
    }, {
        key: 'getByDependency',
        value: function getByDependency() {}
    }, {
        key: 'getNames',
        value: function getNames() {}
    }, {
        key: 'getMeasure',
        value: function getMeasure() {}
    }, {
        key: 'getColumns',
        value: function getColumns() {}
    }]);

    return AbstractSchema;
}();

var SchemaMeasurement2 = function (_SchemaMeasurement) {
    _inherits(SchemaMeasurement2, _SchemaMeasurement);

    function SchemaMeasurement2(options, indexSchema) {
        _classCallCheck(this, SchemaMeasurement2);

        var _this = _possibleConstructorReturn(this, (SchemaMeasurement2.__proto__ || Object.getPrototypeOf(SchemaMeasurement2)).call(this, options));

        if (_this.dependency) {
            _this.dependency = _this.dependency.map(function (dependency) {
                return new SchemaMeasurement2(dependency, indexSchema);
            });
        }
        if (indexSchema) {
            indexSchema.push(_this);
        }
        return _this;
    }

    return SchemaMeasurement2;
}(_SchemaMeasurement3.default);

var Schema2 = function (_AbstractSchema) {
    _inherits(Schema2, _AbstractSchema);

    function Schema2(schema) {
        _classCallCheck(this, Schema2);

        var _this2 = _possibleConstructorReturn(this, (Schema2.__proto__ || Object.getPrototypeOf(Schema2)).call(this));

        _this2.indexSchema = [];
        _this2.schema = new SchemaMeasurement2(schema, _this2.indexSchema);

        // первый сделать последним (меру в конец)
        // this.indexSchema.push(this.indexSchema.splice(0, 1)[0]);

        if (schema.dependency && schema.dependency.length === 1) {
            throw Error('такая схема не поддерживается пока что'); //todo переписать getDependencyNames
        }
        return _this2;
    }

    _createClass(Schema2, [{
        key: 'createIterator',
        value: function createIterator() {
            var i = 0;
            var schemaOrder = this.getOrder();

            return {
                next: function next() {
                    var done = i >= schemaOrder.length;
                    var value = !done ? schemaOrder[i++] : void 0;
                    return {
                        done: done,
                        value: value
                    };
                }
            };
        }
    }, {
        key: 'getOrder',
        value: function getOrder() {
            var order = [];

            var reqursively = function reqursively(dependency) {
                dependency.forEach(function (schema) {
                    if (schema.dependency) {
                        reqursively(schema.dependency);
                    }
                    order.push(schema);
                });
            };

            reqursively(this.schema.dependency);

            order.push(this.schema);
            return order;
        }
    }, {
        key: 'getNames',
        value: function getNames() {
            return this.indexSchema.map(function (schema) {
                return schema.name;
            });
        }
    }, {
        key: 'getByName',
        value: function getByName(name) {
            var find = this.indexSchema.find(function (schema) {
                return schema.name === name;
            });
            if (!find) {
                throw 'schema for name: \"${name}\" not found';
            }
            return find;
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies(name) {
            var dependencies = [this.getMeasure().name];
            var schema = this.getByDependency(name);

            if (schema.dependency) {
                dependencies = dependencies.concat(schema.dependency.map(function (schema) {
                    return schema.name;
                }));
            }

            return dependencies;
        }
    }, {
        key: 'getByDependency',
        value: function getByDependency(name) {
            var find = this.indexSchema.find(function (schema) {
                if (schema.dependency) {
                    var _find = schema.dependency.find(function (schema) {
                        return schema.name === name;
                    });
                    if (_find) {
                        return schema;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
            return find;
        }
    }, {
        key: 'getMeasure',
        value: function getMeasure() {
            return this.schema;
        }
    }, {
        key: 'getColumns',
        value: function getColumns() {
            var columns = this.schema.dependency.map(function (schema) {
                while (schema.dependency) {
                    if (schema.dependency.length > 1) {
                        throw "new case with mix of deps";
                    }
                    schema = schema.dependency[0];
                }
                return schema;
            });
            return columns;
        }
    }, {
        key: 'getInnerColumns',
        value: function getInnerColumns() {
            return this.schema.dependency;
        }
    }, {
        key: 'getDependencyNames',
        value: function getDependencyNames(dependency) {
            //todo ref
            var map = dependency.map(function (dependency) {
                return dependency.name;
            });
            return map.length === 1 ? map[0] : map;
        }
    }]);

    return Schema2;
}(AbstractSchema);

var Schema = function (_AbstractSchema2) {
    _inherits(Schema, _AbstractSchema2);

    function Schema(schema) {
        _classCallCheck(this, Schema);

        var _this3 = _possibleConstructorReturn(this, (Schema.__proto__ || Object.getPrototypeOf(Schema)).call(this));

        _this3.schema = schema.map(function (i) {
            return new _SchemaMeasurement3.default(i);
        });
        return _this3;
    }

    _createClass(Schema, [{
        key: 'createIterator',
        value: function createIterator() {
            var i = 0;
            var schema = this.schema;

            return {
                next: function next() {
                    var done = i >= schema.length;
                    var value = !done ? schema[i++] : void 0;
                    return {
                        done: done,
                        value: value
                    };
                }
            };
        }
    }, {
        key: 'getByName',
        value: function getByName(name) {
            return this.schema.find(function (schemaMeasurement) {
                return schemaMeasurement.name === name;
            });
        }
    }, {
        key: 'getByDependency',
        value: function getByDependency(name) {
            return this.schema.find(function (schemaMeasurement) {
                return schemaMeasurement.dependency === name;
            });
        }
    }, {
        key: 'getNames',
        value: function getNames() {
            return this.schema.map(function (schemaMeasurement) {
                return schemaMeasurement.name;
            });
        }
    }, {
        key: 'getMeasure',
        value: function getMeasure() {
            return this.schema.find(function (schemaMeasurement) {
                return Array.isArray(schemaMeasurement.dependency);
            });
        }
    }, {
        key: 'getColumns',
        value: function getColumns() {
            return this.schema.filter(function (schemaMeasurement) {
                return !schemaMeasurement.dependency;
            });
        }
    }, {
        key: 'getDependencyNames',
        value: function getDependencyNames(dependency) {
            return dependency;
        }
    }]);

    return Schema;
}(AbstractSchema);

exports.default = Schema2;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SchemaMeasurement = function SchemaMeasurement(_ref) {
    var name = _ref.name,
        keyProps = _ref.keyProps,
        _ref$dependency = _ref.dependency,
        dependency = _ref$dependency === undefined ? null : _ref$dependency,
        _ref$otherProps = _ref.otherProps,
        otherProps = _ref$otherProps === undefined ? [] : _ref$otherProps;

    _classCallCheck(this, SchemaMeasurement);

    if (!name || !keyProps || !keyProps.length) {
        throw Error("Bad measurement description at schema, params 'name' and 'keyProps' is required");
    }
    this.name = name;
    this.dependency = dependency;
    this.keyProps = keyProps;
    this.otherProps = otherProps;
};

exports.default = SchemaMeasurement;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Measurements = function Measurements() {
  _classCallCheck(this, Measurements);
};

exports.default = Measurements;

/***/ })
/******/ ]);