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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NormalizedData = function NormalizedData(data, options) {
    _classCallCheck(this, NormalizedData);

    Object.assign(this, data);
};

exports.default = NormalizedData;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ENTITY_ID = exports.ENTITY_ID = 'id';

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _const = __webpack_require__(1);

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

var _NormalizedData = __webpack_require__(0);

var _NormalizedData2 = _interopRequireDefault(_NormalizedData);

var _NormalizedDataNotSaved = __webpack_require__(4);

var _NormalizedDataNotSaved2 = _interopRequireDefault(_NormalizedDataNotSaved);

var _2 = __webpack_require__(5);

var _3 = _interopRequireDefault(_2);

var _const = __webpack_require__(1);

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
     *
     * @public
     * */


    _createClass(Cube, [{
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
            var _this = this;

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
                    var subEntity = _this.measurements[measurement.name].find(function (item) {
                        return item[_const.ENTITY_ID] === subEntityId;
                    });
                    var subEntityCopy = Object.assign({}, subEntity);
                    delete subEntityCopy[_const.ENTITY_ID];
                    delete newEntity[subEntityIdName];
                    Object.assign(newEntity, subEntityCopy);
                };

                var iterator = _this.schema.createIterator();
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
        value: function addColumn(name, options) {
            var _this2 = this;

            var cellOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var measurements = this.schema.getColumns();

            var columns = {};

            // остальные измерения этого уровня
            measurements.forEach(function (value) {
                if (value.name !== name) {
                    if (!cellOptions[value.name]) {
                        columns[value.name] = _this2.measurements[value.name];
                    }
                }
            });

            cellOptions = Object.assign({}, cellOptions, this._createMemberDependency(name, options));

            var reqursiveForEach = function reqursiveForEach(cellOptions, columns, index, isDependency) {
                var keys = Object.keys(columns);
                var measurementsLength = keys.length;

                if (index !== measurementsLength) {
                    var mesurement = columns[keys[index]];

                    mesurement.forEach(function (member) {
                        cellOptions[keys[index]] = member;
                        var dependency = _this2.schema.getByDependency(keys[index]);
                        if (dependency) {
                            var uniqueOptions = _defineProperty({}, keys[index], member);
                            var unique = _this2.unique(dependency.name, uniqueOptions);
                            var _columns = _defineProperty({}, dependency.name, unique);

                            reqursiveForEach(cellOptions, _columns, 0, true);
                        }
                        reqursiveForEach(cellOptions, columns, index + 1, isDependency);

                        if (isDependency) {
                            return;
                        }

                        if (index + 1 === measurementsLength) {
                            // create cell
                            var measureName = _this2.schema.getMeasure().name;
                            var measure = _this2._createMember();
                            var _options = Object.assign({}, cellOptions, _defineProperty({}, measureName, measure));
                            _this2._createNormalizeData(_options);
                        }
                    });
                }
            };

            reqursiveForEach(cellOptions, columns, 0);
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
         * @public
         * */

    }, {
        key: 'removeSubModelDepend',
        value: function removeSubModelDepend(subModelName, subModel, dependencies) {
            var _this3 = this;

            // подчистить суб-модельку
            var index = this.measurements[subModelName].indexOf(subModel);
            if (index === -1) {
                debugger; // что то пошло не так
            }
            this.measurements[subModelName].splice(index, 1);

            // подчистить нормальную форму
            var filterData = this.normalizedDataArray.filter(function (data) {
                return data[Cube.genericId(subModelName)] == subModel[_const.ENTITY_ID];
            });

            filterData.forEach(function (data) {
                var index = _this3.normalizedDataArray.indexOf(data);
                _this3.normalizedDataArray.splice(index, 1);

                dependencies.forEach(function (depName) {
                    _this3._removeSubModel(data, depName);
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
            var _this4 = this;

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

                    if (Array.isArray(dependency)) {

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

                        var parts = [_this4.normalizedDataArray];
                        dependency.forEach(function (dependencyName) {
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
                        var dependencyMeasure = measurements[dependency];

                        entitiesParts = dependencyMeasure.map(function (measure) {
                            // множество сущностей соответствующих измерению
                            var measureId = measure[_const.ENTITY_ID];
                            var entitiesPart = _this4.normalizedDataArray.filter(function (data) {
                                var isPart = true;
                                var idName = Cube.genericId(dependency);
                                isPart = data[idName] == measureId;
                                return isPart;
                            });
                            return entitiesPart;
                        });
                    }

                    // для каждого подмножества определим свои меры
                    var countId = 0;
                    var measures = entitiesParts.map(function (entitiesPart) {
                        var measure = _this4._makeMeasureFrom(entitiesPart, keyProps, countId, name, otherProps);
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
                    measure = _this4._makeMeasureFrom(dataArray, keyProps, 0, name, otherProps);
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

            var _this5 = this;

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
                var entityClone = _this5.normalizedDataArray.find(function (entityClone) {
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
            var _this6 = this;

            // подчистить суб-модельку
            var filtered = this.measurements[name].filter(function (rate) {
                return rate[_const.ENTITY_ID] == normalizeData[Cube.genericId(name)];
            });

            // и подчистить суб-модельку
            filtered.forEach(function (data) {
                var index = _this6.measurements[name].indexOf(data);
                _this6.measurements[name].splice(index, 1);
            });
        }
        /**
         *
         * @private
         * */

    }, {
        key: '_createMember',
        value: function _createMember(name) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var measurement = this.schema.getByName(name);
            var memberOptions = Object.assign({}, options, {
                id: Cube.reduceId(this.measurements[name])
            });
            measurement.keyProps.forEach(function (propName) {
                memberOptions[propName] = options[propName] || null;
            });

            var member = new _CreatedMember2.default(memberOptions);
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
            var _this7 = this;

            var names = this.schema.getNames();
            var report = [];
            names.forEach(function (name) {
                if (_this7.measurements[name].length) {
                    var copy = [].concat(_this7.measurements[name]);
                    // чтобы splice корректно отработал
                    copy.forEach(function (member, index) {
                        var idName = Cube.genericId(name);
                        var findLink = _this7.normalizedDataArray.find(function (data) {
                            return data[idName] == member[_const.ENTITY_ID];
                        });
                        if (!findLink) {
                            _this7.measurements[name].splice(index - (copy.length - _this7.measurements[name].length), 1);
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
         *
         * @private
         * */

    }, {
        key: '_createMemberDependency',
        value: function _createMemberDependency(name) {
            var _this8 = this;

            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var result = {};
            var reqursive = function reqursive(name) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                // create
                var member = _this8._createMember(name, options);
                result[name] = member;

                // check dep
                var dependency = _this8.schema.getByDependency(name);
                if (dependency) {
                    reqursive(dependency.name);
                }
            };
            reqursive(name, options);
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

var _NormalizedData2 = __webpack_require__(0);

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

        var _this = _possibleConstructorReturn(this, (NormalizedDataNotSaved.__proto__ || Object.getPrototypeOf(NormalizedDataNotSaved)).call(this, data, options));

        if (!data.id) {
            _this.id = uuidv4();
        }
        return _this;
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

var _SchemaMeasurement = __webpack_require__(8);

var _SchemaMeasurement2 = _interopRequireDefault(_SchemaMeasurement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = function () {
    function Schema(schema) {
        _classCallCheck(this, Schema);

        this.schema = schema.map(function (i) {
            return new _SchemaMeasurement2.default(i);
        });
    }

    _createClass(Schema, [{
        key: "createIterator",
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
        key: "getByName",
        value: function getByName(name) {
            return this.schema.find(function (schemaMeasurement) {
                return schemaMeasurement.name === name;
            });
        }
    }, {
        key: "getByDependency",
        value: function getByDependency(name) {
            return this.schema.find(function (schemaMeasurement) {
                return schemaMeasurement.dependency === name;
            });
        }
    }, {
        key: "getNames",
        value: function getNames() {
            return this.schema.map(function (schemaMeasurement) {
                return schemaMeasurement.name;
            });
        }
    }, {
        key: "getMeasure",
        value: function getMeasure() {
            return this.schema.find(function (schemaMeasurement) {
                return Array.isArray(schemaMeasurement.dependency);
            });
        }
    }, {
        key: "getColumns",
        value: function getColumns() {
            return this.schema.filter(function (schemaMeasurement) {
                return !schemaMeasurement.dependency;
            });
        }
    }]);

    return Schema;
}();

exports.default = Schema;

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