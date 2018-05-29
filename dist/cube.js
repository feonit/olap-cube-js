/*!
 * Version: "0.6.0"
 * Copyright © 2018 Orlov Leonid. All rights reserved. Contacts: <feonitu@yandex.ru>
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Cube"] = factory();
	else
		root["Cube"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Element of dimension. Serving to determine the position and description of the data element
 * */
var Member = function () {
	function Member(data) {
		_classCallCheck(this, Member);

		_extends(this, data);
	}

	_createClass(Member, null, [{
		key: 'create',
		value: function create(id, props, data) {
			if (!(this === Member || Member.isPrototypeOf(this))) {
				throw Error('this.constructor must be prototype of Member');
			}
			var memberData = {};
			memberData[_const.ENTITY_ID] = id;

			props.forEach(function (prop) {
				// исключить идентификатор самой сущности
				if (prop !== _const.ENTITY_ID) {
					memberData[prop] = data[prop];
				}
			});
			return new this(memberData);
		}
	}]);

	return Member;
}();

exports.default = Member;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InputCell = __webpack_require__(9);

var _InputCell2 = _interopRequireDefault(_InputCell);

var _const = __webpack_require__(0);

var _Member = __webpack_require__(1);

var _Member2 = _interopRequireDefault(_Member);

var _InputMember = __webpack_require__(10);

var _InputMember2 = _interopRequireDefault(_InputMember);

var _DimensionTree = __webpack_require__(11);

var _DimensionTree2 = _interopRequireDefault(_DimensionTree);

var _FactTable = __webpack_require__(8);

var _FactTable2 = _interopRequireDefault(_FactTable);

var _errors = __webpack_require__(4);

var _SnowflakeBuilder = __webpack_require__(14);

var _SnowflakeBuilder2 = _interopRequireDefault(_SnowflakeBuilder);

var _console = __webpack_require__(7);

var _console2 = _interopRequireDefault(_console);

var _CellTable = __webpack_require__(15);

var _CellTable2 = _interopRequireDefault(_CellTable);

var _TupleTable = __webpack_require__(16);

var _TupleTable2 = _interopRequireDefault(_TupleTable);

var _Space = __webpack_require__(18);

var _Space2 = _interopRequireDefault(_Space);

var _Cell = __webpack_require__(3);

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * It a means to retrieve data
 *
 * Base class for normalizing a denormalized data array
 * and analyzing query according to a given scheme
 *
 * @param {{snowflake, dimensionHierarchies}|Cube} factTable - facts which will be subject to analysis
 * */
var Cube = function () {
	function Cube(options) {
		_classCallCheck(this, Cube);

		var dimensionHierarchies = options.dimensionHierarchies,
		    _options$cellTable = options.cellTable,
		    cellTable = _options$cellTable === undefined ? [] : _options$cellTable;

		this.dimensionHierarchies = dimensionHierarchies.map(_DimensionTree2.default.createDimensionTree);
		this.cellTable = new _CellTable2.default(cellTable);

		// const residuals = this.residuals();
		// const count = residuals.length;
		// if (count > 0){
		// 	console.warn('Fact table has residuals', residuals)
		// }
	}
	/**
  * @public
  * Fabric method for creating cube from facts and dimensionHierarchiesData data
  * @param {object} dimensionHierarchiesData
  * @param {object[]} facts
  * @return {Cube}
  * */


	_createClass(Cube, [{
		key: 'addFacts',

		/**
   * @public
   * @param {Object[]} facts
   * */
		value: function addFacts(facts) {
			var newFactTable = new _FactTable2.default(facts);
			var cells = newFactTable.map(function (fact) {
				return new _Cell2.default(fact);
			});
			this.cellTable.addCells(cells);
			var factTable = this.denormalize(this.getMeasure());
			_SnowflakeBuilder2.default.anotherBuild(factTable, cells, this.dimensionHierarchies, this.cellTable);
		}
		/**
   * @public
   * @param {Object[]} facts
   * */

	}, {
		key: 'removeFacts',
		value: function removeFacts(facts) {
			var cellTable = this.cellTable;
			var removedCells = facts.map(function (fact) {
				return cellTable.find(function (cell) {
					return cell[_const.ENTITY_ID] === fact[_const.ENTITY_ID];
				});
			});
			_SnowflakeBuilder2.default.destroy(cellTable, removedCells, this.dimensionHierarchies, this);
		}
		/**
   * @public
   * @return {FactTable} returns members
   * */

	}, {
		key: 'getFacts',
		value: function getFacts() {
			return this.denormalize(this.getMeasure());
		}
		/**
   * @public
   * @param {string} dimension - dimension from which the member will be found
   * @return {Member[]} returns members
   * */

	}, {
		key: 'getDimensionMembers',
		value: function getDimensionMembers(dimension) {
			return this.findDimensionTreeByDimension(dimension).getTreeValue().members;
		}
		/**
   * @public
   * @param {object} fixSpaceOptions - the composed aggregate object, members grouped by dimension names
   * @return {FactTable} returns members
   * */

	}, {
		key: 'getFactsBySet',
		value: function getFactsBySet(fixSpaceOptions) {
			return this.denormalize(this.getMeasureBySet(fixSpaceOptions));
		}
		/**
   * @public
   * */

	}, {
		key: 'getMeasure',
		value: function getMeasure() {
			return this.cellTable;
		}
		/**
   * @public
   * */

	}, {
		key: 'getMeasureBySet',
		value: function getMeasureBySet(fixSpaceOptions) {
			var _projection = this.projection(fixSpaceOptions),
			    cellTable = _projection.cellTable;

			return cellTable;
		}
		/**
   * @public
   * @param {string} dimension - dimension from which the member will be found
   * @param {object} fixSpaceOptions - the composed aggregate object, members grouped by dimension names
   * @return {Member[]} returns members
   * */

	}, {
		key: 'getDimensionMembersBySet',
		value: function getDimensionMembersBySet(dimension, fixSpaceOptions) {
			var _projection2 = this.projection(fixSpaceOptions),
			    cellTable = _projection2.cellTable;

			return this.getDimensionMembersFromCells(dimension, cellTable);
		}
		/**
   * @private
   * */

	}, {
		key: 'projection',
		value: function projection(fixSpaceOptions) {
			var _this = this;

			if (!fixSpaceOptions) {
				return;
			}
			var cellTable = this.getMeasure();
			if (Object.keys(fixSpaceOptions).length === 0) {
				return { cellTable: cellTable };
			}

			var fixSpace = {};
			Object.keys(fixSpaceOptions).forEach(function (dimension) {
				fixSpace[dimension] = Array.isArray(fixSpaceOptions[dimension]) ? fixSpaceOptions[dimension] : [fixSpaceOptions[dimension]];
			});

			// для каждого измерения
			var totalSpaces = Object.keys(fixSpace).map(function (dimension) {

				// ищется его расширенная версия для каждого члена
				var spacesForCells = fixSpace[dimension].map(function (member) {

					var searchedInTree = _this.findDimensionTreeByDimension(dimension);

					var dimensionTreeProjection = searchedInTree.createProjectionOntoMember(dimension, member);

					var _dimensionTreeProject = dimensionTreeProjection.getRoot().getTreeValue(),
					    dimensionProjection = _dimensionTreeProject.dimension,
					    membersProjection = _dimensionTreeProject.members;

					return _defineProperty({}, dimensionProjection, membersProjection);
				});

				// после чего эти расширенные версии объекдиняются
				var totalSpace = _Space2.default.union.apply(_Space2.default, _toConsumableArray(spacesForCells));

				return totalSpace;
			});

			// фильтрация продолжается
			var filteredCellTable = cellTable;

			var cellBelongsToSpace = function cellBelongsToSpace(cell, space) {
				var somePropOfCellNotBelongToSpace = Object.keys(space).some(function (dimension) {
					var members = space[dimension];
					var idAttribute = Cube.genericId(dimension);
					var finded = members.find(function (member) {
						return member[_const.ENTITY_ID] === cell[idAttribute];
					});
					return !finded;
				});
				return !somePropOfCellNotBelongToSpace;
			};

			totalSpaces.forEach(function (space) {
				// и ищутся те ячейки, которые принадлежат получившейся области
				filteredCellTable = filteredCellTable.filter(function (cell) {
					return cellBelongsToSpace(cell, space);
				});
			});

			return { cellTable: filteredCellTable };
		}
		/**
   * @private
   * Поиск по всем иерархиям
   * */

	}, {
		key: 'findDimensionTreeByDimension',
		value: function findDimensionTreeByDimension(dimension) {
			var findDimensionTree = void 0;
			this.dimensionHierarchies.forEach(function (dimensionTree) {
				var searchedDimensionTree = dimensionTree.getDimensionTreeByDimension(dimension);
				if (searchedDimensionTree) {
					findDimensionTree = dimensionTree.getDimensionTreeByDimension(dimension);
				}
			});
			return findDimensionTree;
		}
		/**
   * @private
   * */

	}, {
		key: 'getDimensionMembersFromCells',
		value: function getDimensionMembersFromCells(dimension, cells) {
			var searchedDimensionTree = this.findDimensionTreeByDimension(dimension);
			var rootMembers = void 0;
			var rootDimension = void 0;

			if (searchedDimensionTree.isRoot()) {
				rootMembers = searchedDimensionTree.getTreeValue().members;
				rootDimension = searchedDimensionTree.getTreeValue().dimension;
			} else {
				rootMembers = searchedDimensionTree.getRoot().getTreeValue().members;
				rootDimension = searchedDimensionTree.getRoot().getTreeValue().dimension;
			}

			var idAttribute = Cube.genericId(rootDimension);
			var members = [];

			cells.forEach(function (cell) {
				rootMembers.forEach(function (rootMember) {
					if (cell[idAttribute] === rootMember[_const.ENTITY_ID]) {
						if (members.indexOf(rootMember) === -1) {
							members.push(rootMember);
						}
					}
				});
			});

			if (searchedDimensionTree.isRoot()) {
				return members;
			} else {
				var lastMembers = members;
				var end = false;
				var lastDimension = rootDimension;
				searchedDimensionTree.getRoot().tracePreOrder(function (dimensionTreeValue, dimensionTree) {
					if (dimensionTree.isRoot()) {
						return;
					}
					if (!end) {
						lastMembers = searchedDimensionTree.rollUpDimensionMembers(lastDimension, lastMembers);
						lastDimension = dimensionTreeValue.dimension;
					}
					if (dimensionTreeValue.dimension === dimension) {
						end = true;
					}
				});
				return lastMembers;
			}
		}
		/**
   * @public
   * Cartesian product - list of all possible tuples
   * */

	}, {
		key: 'cartesian',
		value: function cartesian() {
			var f = function f(a, b) {
				var _ref2;

				return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(a.map(function (d) {
					return b.map(function (e) {
						return [].concat(d, e);
					});
				})));
			};

			var cartesian = function cartesian(a, b) {
				for (var _len = arguments.length, c = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
					c[_key - 2] = arguments[_key];
				}

				return b ? cartesian.apply(undefined, [f(a, b)].concat(c)) : a;
			};

			var dimensionsOrder = [];

			var set = this.dimensionHierarchies.map(function (dimensionTree) {
				return dimensionTree.getTreeValue();
			}).map(function (dimensionTable) {
				dimensionsOrder.push(dimensionTable.dimension);
				return dimensionTable.members;
			});

			var res = cartesian.apply(null, set);

			var tupleTable = new _TupleTable2.default();

			res.forEach(function (arr) {
				var item = {};
				dimensionsOrder.forEach(function (dimension, index) {
					item[dimension] = arr[index];
				});

				tupleTable.addTuple(item);

				return item;
			});

			return tupleTable;
		}
		/**
   * @private
   * Get facts from cube
   * */

	}, {
		key: 'denormalize',
		value: function denormalize() {
			var cells = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getMeasure();
			var forSave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			var data = _SnowflakeBuilder2.default.denormalize(cells, this.dimensionHierarchies);
			if (forSave) {
				data.forEach(function (data, index) {
					if (cells[index] instanceof _InputCell2.default) {
						delete data[_const.ENTITY_ID];
					}
				});
			}
			return data;
		}
		/**
   * @public
   * Residuals - list of tuples, according to which there is more than one member
   * */

	}, {
		key: 'residuals',
		value: function residuals() {
			var _this2 = this;

			var tuples = this.cartesian();
			var totalFacts = [];
			tuples.forEach(function (tuple) {
				var partFacts = _this2.getFactsBySet(tuple);
				if (partFacts.length > 1) {
					totalFacts.push(tuple);
				}
			});
			return totalFacts;
		}
		/**
   * @public
   * A way to create a name for a property in which a unique identifier will be stored
   * */

	}, {
		key: 'addDimensionMember',

		/**
   * @public
   * @param {string} dimension - dimension in which the member is created
   * @param {object?} memberOptions - properties for the created member
   * @param {object?} rollupCoordinatesData
   * @param {object?} drillDownCoordinatesOptions
   * @param {object?} measureData
   * */
		value: function addDimensionMember(dimension) {
			var memberOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var rollupCoordinatesData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			var _this3 = this;

			var drillDownCoordinatesOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
			var measureData = arguments[4];

			if (typeof dimension !== 'string') {
				throw TypeError('parameter dimension expects as string: ' + dimension);
			}
			var rollupCoordinates = {};
			Object.keys(rollupCoordinatesData).forEach(function (dimension) {
				var memberData = rollupCoordinatesData[dimension];
				var memberList = _this3.getDimensionMembers(dimension);
				var id = memberData[_const.ENTITY_ID];
				var find = memberList.find(function (member) {
					return id === member[_const.ENTITY_ID];
				});
				if (!find) {
					throw new _errors.CantAddMemberRollupException(dimension, id);
				} else {
					rollupCoordinates[dimension] = find;
				}
			});
			var dimensionTree = this.findDimensionTreeByDimension(dimension);
			var childDimensionTrees = dimensionTree.getChildTrees();
			childDimensionTrees.forEach(function (childDimensionTree) {
				var _childDimensionTree$g = childDimensionTree.getTreeValue(),
				    dimension = _childDimensionTree$g.dimension;

				var member = rollupCoordinatesData[dimension];
				if (!member) {
					throw new _errors.CantAddMemberRollupException(dimension);
				} else {
					memberOptions[Cube.genericId(dimension)] = member[_const.ENTITY_ID];
				}
			});
			var saveMember = this._createMember(dimensionTree, memberOptions);
			var saveDimension = dimension;
			dimensionTree.traceUpOrder(function (tracedDimensionTree) {
				if (dimensionTree !== tracedDimensionTree) {
					var _tracedDimensionTree$ = tracedDimensionTree.getTreeValue(),
					    parentDimension = _tracedDimensionTree$.dimension;

					var drillDownCoordinatesData = _defineProperty({}, Cube.genericId(saveDimension), saveMember[_const.ENTITY_ID]);
					_extends(drillDownCoordinatesData, drillDownCoordinatesOptions[parentDimension]);
					saveMember = _this3._createMember(tracedDimensionTree, drillDownCoordinatesData);
					saveDimension = parentDimension;
				}
			});
			this.fill(measureData);
		}
		/**
   * @public
   * @param {string} dimension - dimension from which the member will be removed
   * @param {Member} member - the member will be removed
   * */

	}, {
		key: 'removeDimensionMember',
		value: function removeDimensionMember(dimension, member) {
			var dimensionTree = this.findDimensionTreeByDimension(dimension);
			var endToBeRemoved = dimensionTree.removeDimensionMember(dimension, member);
			var measures = this.getMeasure();
			var getRemoveMeasures = function getRemoveMeasures(dimension, members) {
				var removedMeasures = [];
				var idAttribute = Cube.genericId(dimension);
				measures.forEach(function (measure) {
					members.forEach(function (member) {
						if (measure[idAttribute] == member[_const.ENTITY_ID]) {
							removedMeasures.push(measure);
						}
					});
				});
				return removedMeasures;
			};
			Object.keys(endToBeRemoved).map(function (dimension) {
				var removedMeasures = getRemoveMeasures(dimension, endToBeRemoved[dimension]);
				removedMeasures.forEach(function (measure) {
					measures.removeCell(measure);
				});
			});
		}
		/**
   * @public
   * Filling method for full size of cube
   * @param {object?} props - properties for empty cells
   * */

	}, {
		key: 'fill',
		value: function fill(props) {
			var _this4 = this;

			if (!this.residuals().length) {
				var tuples = this.cartesian();
				tuples.forEach(function (combination) {
					var unique = _this4.getMeasureBySet(combination);
					if (!unique.length) {
						_this4._createNormalizeData(combination, props);
					}
				});
			}
		}
		/**
   * @public
   * Unfilled - list of tuples, in accordance with which there is not a single member
   * */

	}, {
		key: 'unfilled',
		value: function unfilled() {
			var _this5 = this;

			var tuples = this.cartesian();
			var unfilled = [];
			tuples.forEach(function (tuple) {
				var members = _this5.getFactsBySet(tuple);
				if (members.length === 0) {
					unfilled.push(tuple);
				}
			});
			return unfilled;
		}
		/**
   * @private
   * */

	}, {
		key: '_createNormalizeData',
		value: function _createNormalizeData(obj, props) {
			var options = {};
			Object.keys(obj).forEach(function (key) {
				options[Cube.genericId(key)] = obj[key][_const.ENTITY_ID];
			});
			options = _extends({}, options, props);
			var newNormaliseData = new _InputCell2.default(options);
			this.getMeasure().addCell(newNormaliseData);
		}
		/**
   * @private
   * @param {DimensionTree} dimensionTree
   * @param {object?} props
   * */

	}, {
		key: '_createMember',
		value: function _createMember(dimensionTree) {
			var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var _dimensionTree$getTre = dimensionTree.getTreeValue(),
			    keyProps = _dimensionTree$getTre.keyProps,
			    dimension = _dimensionTree$getTre.dimension;

			var childDimensionTrees = dimensionTree.getChildTrees().map(function (dimensionTree) {
				return dimensionTree.getTreeValue().dimension;
			});
			var linkProps = [];
			childDimensionTrees.forEach(function (dimension) {
				linkProps.push(Cube.genericId(dimension));
			});
			var memberList = dimensionTree.getTreeValue().members;
			var id = Cube.reduceId(memberList);
			var member = _InputMember2.default.create(id, keyProps.concat(linkProps), props);
			memberList.addMember(member);
			return member;
		}
		/**
   * @private
   * Method of generating a unique identifier within the selected space
   * */

	}], [{
		key: 'create',
		value: function create(facts, dimensionHierarchiesData) {
			if (!(Cube.isPrototypeOf(this) || Cube === this)) {
				throw new _errors.CreateInstanceException();
			}
			var cube = new this({ dimensionHierarchies: dimensionHierarchiesData });
			cube.addFacts(facts);
			return cube;
		}
	}, {
		key: 'genericId',
		value: function genericId(entityName) {
			return entityName + '_' + _const.ENTITY_ID;
		}
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(0);

var _Fact2 = __webpack_require__(6);

var _Fact3 = _interopRequireDefault(_Fact2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Cell. A piece of data obtained by defining one element
 * in each dimension of a multidimensional array.
 * The cells of the hypercube can be empty or full.
 * */
var Cell = function (_Fact) {
	_inherits(Cell, _Fact);

	function Cell() {
		_classCallCheck(this, Cell);

		return _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).apply(this, arguments));
	}

	_createClass(Cell, [{
		key: 'deleteProps',
		value: function deleteProps(props) {
			var _this2 = this;

			props.forEach(function (prop) {
				if (prop !== _const.ENTITY_ID) {
					delete _this2[prop];
				}
			});
		}
	}]);

	return Cell;
}(_Fact3.default);

exports.default = Cell;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _extendableBuiltin9(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

function _extendableBuiltin7(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

function _extendableBuiltin5(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

function _extendableBuiltin3(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

var NotCompletelySpaceException = exports.NotCompletelySpaceException = function (_extendableBuiltin2) {
	_inherits(NotCompletelySpaceException, _extendableBuiltin2);

	function NotCompletelySpaceException(dimension) {
		_classCallCheck(this, NotCompletelySpaceException);

		var _this = _possibleConstructorReturn(this, (NotCompletelySpaceException.__proto__ || Object.getPrototypeOf(NotCompletelySpaceException)).call(this));

		_this.message = 'Not completely defined space for added member, not found member for dimension: "' + dimension + '"';
		return _this;
	}

	return NotCompletelySpaceException;
}(_extendableBuiltin(Error));

var CantAddMemberRollupException = exports.CantAddMemberRollupException = function (_extendableBuiltin4) {
	_inherits(CantAddMemberRollupException, _extendableBuiltin4);

	function CantAddMemberRollupException(dimension, id) {
		_classCallCheck(this, CantAddMemberRollupException);

		var _this2 = _possibleConstructorReturn(this, (CantAddMemberRollupException.__proto__ || Object.getPrototypeOf(CantAddMemberRollupException)).call(this));

		_this2.message = 'Can\'t add member, rollup dimension: ' + dimension + ' with id: ' + id + ' not found';
		return _this2;
	}

	return CantAddMemberRollupException;
}(_extendableBuiltin3(Error));

var NotFoundFactId = exports.NotFoundFactId = function (_extendableBuiltin6) {
	_inherits(NotFoundFactId, _extendableBuiltin6);

	function NotFoundFactId() {
		_classCallCheck(this, NotFoundFactId);

		var _this3 = _possibleConstructorReturn(this, (NotFoundFactId.__proto__ || Object.getPrototypeOf(NotFoundFactId)).call(this));

		_this3.message = 'Not found fact id';
		return _this3;
	}

	return NotFoundFactId;
}(_extendableBuiltin5(Error));

var CreateInstanceException = exports.CreateInstanceException = function (_extendableBuiltin8) {
	_inherits(CreateInstanceException, _extendableBuiltin8);

	function CreateInstanceException() {
		_classCallCheck(this, CreateInstanceException);

		var _this4 = _possibleConstructorReturn(this, (CreateInstanceException.__proto__ || Object.getPrototypeOf(CreateInstanceException)).call(this));

		_this4.message = 'this must have prototype of Cube';
		return _this4;
	}

	return CreateInstanceException;
}(_extendableBuiltin7(Error));

var DimensionException = exports.DimensionException = function (_extendableBuiltin10) {
	_inherits(DimensionException, _extendableBuiltin10);

	function DimensionException(dimension) {
		_classCallCheck(this, DimensionException);

		var _this5 = _possibleConstructorReturn(this, (DimensionException.__proto__ || Object.getPrototypeOf(DimensionException)).call(this));

		_this5.message = 'For the name "' + dimension + '" the dimension is already set';
		return _this5;
	}

	return DimensionException;
}(_extendableBuiltin9(Error));

var handleError = exports.handleError = function handleError(error) {
	if (error instanceof Error) {
		error.message = '[Cube] ' + error.message;
	}
	throw error;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(0);

var _Member = __webpack_require__(1);

var _Member2 = _interopRequireDefault(_Member);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

/**
 * */
var MemberList = function (_extendableBuiltin2) {
	_inherits(MemberList, _extendableBuiltin2);

	function MemberList(array) {
		_classCallCheck(this, MemberList);

		var _this = _possibleConstructorReturn(this, (MemberList.__proto__ || Object.getPrototypeOf(MemberList)).call(this));

		if (Array.isArray(array)) {
			array = array.map(function (member) {
				return new _Member2.default(member);
			});
			_extends(_this, array);
		}
		return _this;
	}

	_createClass(MemberList, [{
		key: 'filter',
		value: function filter() {
			return [].filter.apply(this, arguments);
		}
	}, {
		key: 'addMember',
		value: function addMember(member) {
			if (this.indexOf(member[_const.ENTITY_ID] === -1)) {
				this.push(member);
			} else {
				debugger;
			}
		}
	}, {
		key: 'removeMember',
		value: function removeMember(member) {
			var index = this.indexOf(member);
			if (index === -1) {
				throw new Error('represented member was not found', member);
			}
			this.splice(index, 1);
		}
	}, {
		key: 'setMembers',
		value: function setMembers(members) {
			this.splice(0, this.length);
			_extends(this, members);
		}
	}]);

	return MemberList;
}(_extendableBuiltin(Array));

exports.default = MemberList;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _const = __webpack_require__(0);

var _errors = __webpack_require__(4);

var _console = __webpack_require__(7);

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isSimple = function isSimple(value) {
	var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	return type !== 'object' && type !== 'function' && type !== 'undefined' || value === null;
};

var Fact =
/**
 * @throw {NotFoundFactId}
 * */
function Fact(data) {
	_classCallCheck(this, Fact);

	try {
		for (var key in data) {
			if (!data.hasOwnProperty(key)) {
				return;
			}

			if (isSimple(data[key])) {
				this[key] = data[key];
			} else {
				_console2.default.warn('[Fact] value of prop "' + key + '" has an unspecified value: ' + data[key]);
			}
		}
		if (!(_const.ENTITY_ID in this)) {
			throw new _errors.NotFoundFactId();
		}
	} catch (error) {
		(0, _errors.handleError)(error);
	}
};

exports.default = Fact;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var originalConsole = console;
var customConsole = {
	log: function log(string) {
		originalConsole.log("[Cube] " + string);
	},
	warn: function warn(string) {
		originalConsole.warn("[Cube] " + string);
	},
	warnOnce: function () {
		var memory = {};
		return function (string) {
			if (!memory[string]) {
				memory[string] = true;
				originalConsole.warn("[Cube] " + string);
			}
		};
	}()
};
exports.default = customConsole;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Fact = __webpack_require__(6);

var _Fact2 = _interopRequireDefault(_Fact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

var FactTable = function (_extendableBuiltin2) {
	_inherits(FactTable, _extendableBuiltin2);

	function FactTable(array) {
		_classCallCheck(this, FactTable);

		var _this = _possibleConstructorReturn(this, (FactTable.__proto__ || Object.getPrototypeOf(FactTable)).call(this));

		if (Array.isArray(array)) {
			_extends(_this, array.map(function (item) {
				return new _Fact2.default(item);
			}));
		}
		return _this;
	}

	return FactTable;
}(_extendableBuiltin(Array));

exports.default = FactTable;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Cell2 = __webpack_require__(3);

var _Cell3 = _interopRequireDefault(_Cell2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0;
		var v = c == 'x' ? r : r & 0x3 | 0x8;
		return v.toString(16);
	});
}

var InputCell = function (_Cell) {
	_inherits(InputCell, _Cell);

	function InputCell(data, options) {
		_classCallCheck(this, InputCell);

		if (!data.id) {
			data.id = uuidv4();
		}
		return _possibleConstructorReturn(this, (InputCell.__proto__ || Object.getPrototypeOf(InputCell)).call(this, data, options));
	}

	return InputCell;
}(_Cell3.default);

exports.default = InputCell;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Member2 = __webpack_require__(1);

var _Member3 = _interopRequireDefault(_Member2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Introductory elements. Input elements have values that are manually loaded
 * that is, they are not the result of calculating data
 * */
var InputMember = function (_Member) {
	_inherits(InputMember, _Member);

	function InputMember() {
		_classCallCheck(this, InputMember);

		return _possibleConstructorReturn(this, (InputMember.__proto__ || Object.getPrototypeOf(InputMember)).apply(this, arguments));
	}

	_createClass(InputMember, null, [{
		key: 'create',
		value: function create(id, props, data) {
			var defaultValue = null;
			var defaultData = {};

			props.forEach(function (propName) {
				defaultData[propName] = data.hasOwnProperty(propName) ? data[propName] : defaultValue;
			});

			return _get(InputMember.__proto__ || Object.getPrototypeOf(InputMember), 'create', this).call(this, id, props, defaultData);
		}
	}]);

	return InputMember;
}(_Member3.default);

exports.default = InputMember;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DimensionTable = __webpack_require__(12);

var _DimensionTable2 = _interopRequireDefault(_DimensionTable);

var _Tree2 = __webpack_require__(13);

var _Tree3 = _interopRequireDefault(_Tree2);

var _errors = __webpack_require__(4);

var _Cube = __webpack_require__(2);

var _Cube2 = _interopRequireDefault(_Cube);

var _const = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * It defines the relationship of generalization and specialization (roll-up/drill-down)
 * @throws {DimensionException}
 * */
var DimensionTree = function (_Tree) {
	_inherits(DimensionTree, _Tree);

	function DimensionTree(dimensionTree) {
		_classCallCheck(this, DimensionTree);

		var _this = _possibleConstructorReturn(this, (DimensionTree.__proto__ || Object.getPrototypeOf(DimensionTree)).call(this));

		var dimensionTable = dimensionTree.dimensionTable,
		    _dimensionTree$depend = dimensionTree.dependency,
		    dependency = _dimensionTree$depend === undefined ? [] : _dimensionTree$depend,
		    _dimensionTree$parent = dimensionTree.parentNode,
		    parentNode = _dimensionTree$parent === undefined ? null : _dimensionTree$parent;


		Object.defineProperties(_this, {
			dimensionTable: {
				/**
     * @property
     * @name DimensionTree#dimensionTable
     * */
				value: new _DimensionTable2.default(dimensionTable),
				editable: false,
				enumerable: true
			},
			parentNode: {
				/**
     * @property {DimensionTree|null}
     * @name DimensionTree#parentNode
     * */
				value: parentNode,
				enumerable: false,
				editable: false
			},
			dependency: {
				/**
     * @property {DimensionTree[]}
     * @name DimensionTree#dependency
     * */
				value: dependency.map(function (dimensionTreeData) {
					return new DimensionTree(_extends({}, dimensionTreeData, { parentNode: _this }));
				}),
				enumerable: true,
				editable: false
			}
		});
		return _this;
	}

	_createClass(DimensionTree, [{
		key: 'getTreeValue',

		/**
   * @public
   * @return {DimensionTable}
   * */
		value: function getTreeValue() {
			return this.dimensionTable;
		}
		/**
   * @public
   * @return {DimensionTree|null}
   * */

	}, {
		key: 'getParentTree',
		value: function getParentTree() {
			return this.parentNode;
		}
		/**
   * @public
   * @return {DimensionTree[]}
   * */

	}, {
		key: 'getChildTrees',
		value: function getChildTrees() {
			return this.dependency;
		}
		/**
   * @public
   * @param {string} dimension
   * @return {DimensionTree|undefined}
   * */

	}, {
		key: 'getDimensionTreeByDimension',
		value: function getDimensionTreeByDimension(dimension) {
			return this.getRoot().searchTreeByTreeValue(function (dimensionTree) {
				var dimensionTreeValue = dimensionTree.getTreeValue();
				return dimensionTreeValue.dimension === dimension;
			});
		}
		/**
   * @public
   * @param {string} dimension
   * @param {Member} member
   * @return {DimensionTree|undefined}
   * */

	}, {
		key: 'createProjectionOntoMember',
		value: function createProjectionOntoMember(dimension, member) {
			var _this2 = this;

			// 1 create copy of hierarchy with empty members
			var newDimensionTreeByMember = new DimensionTree(this.getRoot());
			newDimensionTreeByMember.tracePostOrder(function (dimensionTreeValue, dimensionTree) {
				var dimensionTable = dimensionTree.getTreeValue();
				dimensionTable.clearMemberList();
			});
			// 2 get dimensionTree by dimension
			var searchedInTree = this.getDimensionTreeByDimension(dimension);
			var lastMembers = void 0;
			var lastDimension = void 0;
			// 3 trace up
			searchedInTree.traceUpOrder(function (tracedTree) {
				var _tracedTree$getTreeVa = tracedTree.getTreeValue(),
				    tracedDimension = _tracedTree$getTreeVa.dimension;

				// 4 get drill down of last members


				var drillDownedMembers = tracedTree == searchedInTree ? [member] : _this2.drillDownDimensionMembers(lastDimension, lastMembers);

				// 5 set members
				newDimensionTreeByMember.getDimensionTreeByDimension(tracedDimension).getTreeValue().setMemberList(drillDownedMembers);

				// 6 save current dimension and drill downed members
				lastDimension = tracedDimension;
				lastMembers = drillDownedMembers;
			});
			return newDimensionTreeByMember;
		}
		/**
   * @public
   * @param {string} dimension
   * @param {Member} member
   * */

	}, {
		key: 'removeDimensionMember',
		value: function removeDimensionMember(dimension, member) {
			var _this3 = this;

			// travers up
			var removalInTree = this.getDimensionTreeByDimension(dimension);

			var projectionDimensionTree = removalInTree.createProjectionOntoMember(dimension, member);

			// remove intersection
			var toBeRemovedSpace = {};
			var endToBeRemovedMember = {};

			projectionDimensionTree.tracePostOrder(function (dimensionTreeValue) {
				var dimension = dimensionTreeValue.dimension,
				    members = dimensionTreeValue.members;

				toBeRemovedSpace[dimension] = members;
			});

			var memberList = removalInTree.getTreeValue().members;

			// travers down
			if (memberList.length === 1) {
				removalInTree.tracePreOrder(function (downTree) {
					var _downTree$getTreeValu = downTree.getTreeValue(),
					    childMembers = _downTree$getTreeValu.members,
					    childDimension = _downTree$getTreeValu.dimension;

					toBeRemovedSpace[childDimension] = childMembers;
				});
			}

			// remove removal space
			Object.keys(toBeRemovedSpace).forEach(function (dimension) {
				var currentDimensionTree = _this3.getDimensionTreeByDimension(dimension);
				var currentMemberList = currentDimensionTree.getTreeValue().members;
				toBeRemovedSpace[dimension].forEach(function (member) {
					currentMemberList.removeMember(member);
				});
			});

			var _projectionDimensionT = projectionDimensionTree.getRoot().getTreeValue(),
			    dimensionProjection = _projectionDimensionT.dimension,
			    membersProjection = _projectionDimensionT.members;

			endToBeRemovedMember[dimensionProjection] = membersProjection;

			return endToBeRemovedMember;
		}
		/**
   * @public
   * @param {string} dimension
   * @param {Member[]} members
   * @return {Member[]}
   * */

	}, {
		key: 'drillDownDimensionMembers',
		value: function drillDownDimensionMembers(dimension, members) {
			var dimensionTree = this.getRoot().getDimensionTreeByDimension(dimension);
			if (dimensionTree.isRoot()) {
				return members;
			}
			var parentTree = dimensionTree.getParentTree();

			var _parentTree$getTreeVa = parentTree.getTreeValue(),
			    parentMembers = _parentTree$getTreeVa.members;

			var idAttribute = _Cube2.default.genericId(dimension);
			var drillDownMembers = [];
			members.forEach(function (member) {
				parentMembers.forEach(function (parentMember) {
					if (parentMember[idAttribute] === member[_const.ENTITY_ID]) {
						if (drillDownMembers.indexOf(parentMember) === -1) {
							drillDownMembers.push(parentMember);
						}
					}
				});
			});
			return drillDownMembers;
		}
		/**
   * @public
   * @param {string} dimension
   * @param {Member[]} members
   * @return {Member[]}
   * */

	}, {
		key: 'rollUpDimensionMembers',
		value: function rollUpDimensionMembers(dimension, members) {
			var dimensionTree = this.getRoot().getDimensionTreeByDimension(dimension);
			if (dimensionTree.isExternal()) {
				return members;
			}
			var childTree = dimensionTree.getChildTrees()[0]; // for one child always

			var _childTree$getTreeVal = childTree.getTreeValue(),
			    childMembers = _childTree$getTreeVal.members,
			    childDimension = _childTree$getTreeVal.dimension;

			var idAttribute = _Cube2.default.genericId(childDimension);
			var rollUpMembers = [];
			members.forEach(function (member) {
				childMembers.forEach(function (childMember) {
					if (member[idAttribute] === childMember[_const.ENTITY_ID]) {
						if (rollUpMembers.indexOf(childMember) === -1) {
							rollUpMembers.push(childMember);
						}
					}
				});
			});
			return rollUpMembers;
		}
	}], [{
		key: 'createDimensionTree',
		value: function createDimensionTree(dimensionTreeData) {
			var dimensionTree = new DimensionTree(dimensionTreeData);
			dimensionTree.tracePostOrder(function (dimensionTreeValue, dimensionTree) {
				dimensionTreeValue.dependencyNames = dimensionTree.getChildTrees().map(function (dimensionTree) {
					return dimensionTree.getTreeValue().dimension;
				});
			});

			return dimensionTree;
		}
	}]);

	return DimensionTree;
}(_Tree3.default);

exports.default = DimensionTree;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MemberList = __webpack_require__(5);

var _MemberList2 = _interopRequireDefault(_MemberList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DimensionTable = function () {
	function DimensionTable(_ref) {
		var dimension = _ref.dimension,
		    keyProps = _ref.keyProps,
		    _ref$otherProps = _ref.otherProps,
		    otherProps = _ref$otherProps === undefined ? [] : _ref$otherProps,
		    _ref$dependencyNames = _ref.dependencyNames,
		    dependencyNames = _ref$dependencyNames === undefined ? [] : _ref$dependencyNames,
		    _ref$members = _ref.members,
		    members = _ref$members === undefined ? [] : _ref$members;

		_classCallCheck(this, DimensionTable);

		if (!dimension || !keyProps) {
			throw Error("Bad definition DimensionTable, params 'dimension' and 'keyProps' is required");
		}
		/** Name of the dimension */
		this.dimension = dimension;
		/** List of key names properties of the entity belonging to the current dimension */
		this.keyProps = keyProps.map(function (keyProp) {
			return keyProp;
		});
		/** List of additional names properties of the entity belonging to the current dimension */
		this.otherProps = otherProps.map(function (otherProp) {
			return otherProp;
		});
		/** The list of dimensions with which the current dimension is directly related */
		this.dependencyNames = dependencyNames;

		this.members = new _MemberList2.default(members);
	}

	_createClass(DimensionTable, [{
		key: "setMemberList",
		value: function setMemberList(members) {
			this.members.setMembers(members);
		}
	}, {
		key: "clearMemberList",
		value: function clearMemberList() {
			this.members = new _MemberList2.default([]);
		}
	}]);

	return DimensionTable;
}();

exports.default = DimensionTable;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Tree
 * @abstract class cannot be instantiated with new
 * */
var Tree = function () {
	function Tree() {
		_classCallCheck(this, Tree);
	}

	_createClass(Tree, [{
		key: 'getTreeValue',

		/**
   * @public
   * @abstract
   * @return {Object}
   * */
		value: function getTreeValue() {
			throw 'abstract method';
		}
		/**
   * @public
   * @abstract
   * @return {Tree|null}
   * */

	}, {
		key: 'getParentTree',
		value: function getParentTree() {
			throw 'abstract method';
		}
		/**
   * @public
   * @abstract
   * @return {Tree[]}
   * */

	}, {
		key: 'getChildTrees',
		value: function getChildTrees() {
			throw 'abstract method';
		}
		/**
   * @public
   * @return {boolean}
   * */

	}, {
		key: 'isExternal',
		value: function isExternal() {
			return !this.getChildTrees().length;
		}
		/**
   * @public
   * @return {boolean}
   * */

	}, {
		key: 'isFirstLevel',
		value: function isFirstLevel() {
			return !this.isRoot() && this.getParentTree().getParentTree() === null;
		}
		/**
   * @public
   * @return {boolean}
   * */

	}, {
		key: 'isRoot',
		value: function isRoot() {
			return this.getParentTree() === null;
		}
		/**
   * @public
   * Get root for that tree
   * @return {Tree}
   * */

	}, {
		key: 'getRoot',
		value: function getRoot() {
			var root = this;
			this.traceUpOrder(function (tracedTree) {
				if (tracedTree.isRoot()) {
					root = tracedTree;
				}
			});
			return root;
		}
		/**
   * @public
   * Search method
   * @return {Tree|undefined}
   * */

	}, {
		key: 'searchTreeByTreeValue',
		value: function searchTreeByTreeValue(callback) {
			var search = void 0;
			this.tracePostOrder(function (treeValue, tree) {
				if (callback(tree)) {
					search = tree;
				}
			});
			return search;
		}
		/**
   * @public
   * A walk to root from current Tree, the current Tree and root entered to the chain
   * @param {function} callback
   * */

	}, {
		key: 'traceUpOrder',
		value: function traceUpOrder(callback) {
			(function reqursively(tree) {
				var parentNode = tree.getParentTree();
				callback(tree);
				if (parentNode !== null) {
					reqursively(parentNode);
				}
			})(this);
		}
		/**
   * @public
   * A walk in which the children are traversed before their respective parents are traversed
   * @param {function} callback
   * */

	}, {
		key: 'tracePostOrder',
		value: function tracePostOrder(callback) {
			(function reqursively(tree) {
				var childTrees = tree.getChildTrees();
				var treeValue = tree.getTreeValue();
				if (childTrees.length) {
					childTrees.forEach(function (childTree) {
						reqursively(childTree);
					});
				}
				callback(treeValue, tree);
			})(this);
		}
		/**
   * @public
   *  A walk in which each parent tree is traversed before its children is called a pre-order walk
   * */

	}, {
		key: 'tracePreOrder',
		value: function tracePreOrder(callback) {
			(function reqursively(tree) {
				var childTrees = tree.getChildTrees();
				var treeValue = tree.getTreeValue();
				callback(treeValue, tree);
				if (childTrees.length) {
					childTrees.forEach(function (childTree) {
						reqursively(childTree);
					});
				}
			})(this);
		}
	}]);

	return Tree;
}();

exports.default = Tree;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MemberList = __webpack_require__(5);

var _MemberList2 = _interopRequireDefault(_MemberList);

var _Member = __webpack_require__(1);

var _Member2 = _interopRequireDefault(_Member);

var _const = __webpack_require__(0);

var _Cube = __webpack_require__(2);

var _Cube2 = _interopRequireDefault(_Cube);

var _FactTable = __webpack_require__(8);

var _FactTable2 = _interopRequireDefault(_FactTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The main task is to parse the data array into tables
 *
 * is a special case of snowflake dimensionHierarchies
 * where every dimension is represented by one table even if the dimensions has multiple levels
 * */
var SnowflakeBuilder = function () {
	function SnowflakeBuilder() {
		_classCallCheck(this, SnowflakeBuilder);
	}

	_createClass(SnowflakeBuilder, null, [{
		key: 'anotherBuild',
		value: function anotherBuild(factTable, cells, dimensionsTrees, cellTable) {

			// for each dimension
			dimensionsTrees.forEach(function (dimensionTree) {
				// for each hierarchy and level of dimension
				dimensionTree.tracePostOrder(function (dimensionTable, dimensionTree) {
					SnowflakeBuilder.processDimension(dimensionTree, cells, cellTable, factTable);
				});
			});
		}
	}, {
		key: 'processDimension',
		value: function processDimension(dimensionTree, cells, cellTable, factTable) {
			var isFirstLevel = dimensionTree.isFirstLevel();
			var dimensionTable = dimensionTree.getTreeValue();
			var dimension = dimensionTable.dimension,
			    _dimensionTable$keyPr = dimensionTable.keyProps,
			    keyProps = _dimensionTable$keyPr === undefined ? [] : _dimensionTable$keyPr,
			    _dimensionTable$other = dimensionTable.otherProps,
			    otherProps = _dimensionTable$other === undefined ? [] : _dimensionTable$other;

			var childDimensions = dimensionTree.getChildTrees().map(function (dimensionTree) {
				return dimensionTree.getTreeValue().dimension;
			});

			var memberList = void 0;
			var members = void 0;

			memberList = dimensionTree.getTreeValue().members;
			var existMemberCount = memberList.length;
			var args = [existMemberCount, factTable, cells, dimension, keyProps, otherProps, cells, isFirstLevel, cellTable];

			if (!childDimensions.length) {
				members = SnowflakeBuilder.makeMemberList.apply(null, args);
			} else {
				var entitiesParts = [];
				var memberListForFilter = dimensionTree.getDimensionTreeByDimension(childDimensions[0]).getTreeValue().members;
				entitiesParts = SnowflakeBuilder.mapFilter(childDimensions, cells, memberListForFilter);
				members = SnowflakeBuilder.makeMemberListDependency.apply(null, args.concat([childDimensions, entitiesParts]));
			}

			// только после того как список сформирован, удалаять данные из ячеек
			var totalProps = [].concat(keyProps, otherProps);
			cells.forEach(function (cell) {
				cell.deleteProps(totalProps);
			});

			members.forEach(function (member) {
				memberList.addMember(member);
			});
		}
		/**
   * Method filter cells by members of a dimension
   * @param {string} dimension
   * @param {Cell[]} cells
   * @param {MemberList} memberList
   * @private
   * @return {CellTable[]}
   * */

	}, {
		key: 'mapFilter',
		value: function mapFilter(dimension, cells, memberList) {
			var idAttribute = _Cube2.default.genericId(dimension);
			var cellTables = [];
			//todo оптимизировать поиск через хеш
			memberList.forEach(function (member) {
				var cellTableFiltered = cells.filter(function (cell) {
					return cell[idAttribute] == member[_const.ENTITY_ID];
				});
				cellTables.push(cellTableFiltered);
			});
			return cellTables;
		}
		/**
   * @private
   * */

	}, {
		key: 'makeMemberListDependency',
		value: function makeMemberListDependency(existMemberCount, factTable, whatIsIt, dimension, keyProps, otherProps, cells, isFirstLevel, cellTable, childDimensions, entitiesParts) {
			var totalMemberList = [];

			var countId = 0;
			entitiesParts.forEach(function (entitiesPart) {
				if (entitiesPart.length) {
					var members = SnowflakeBuilder.makeMemberList(existMemberCount, factTable, entitiesPart, dimension, keyProps, otherProps, cells, isFirstLevel, cellTable, countId);
					countId = countId + members.length;

					var etalon = entitiesPart[0];

					childDimensions.forEach(function (dependencyName) {
						var idAttribute = _Cube2.default.genericId(dependencyName);

						members.forEach(function (member) {
							member[idAttribute] = etalon[idAttribute];
							member[_const.ENTITY_ID] = existMemberCount + totalMemberList.length + 1;
							totalMemberList.push(member);
						});

						entitiesPart.forEach(function (entityPart) {
							delete entityPart[idAttribute];
						});
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

	}, {
		key: 'makeMemberList',
		value: function makeMemberList(existMemberCount, factTable, entitiesPart, dimension) {
			var keyProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
			var otherProps = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
			var cells = arguments[6];
			var isFirstLevel = arguments[7];
			var cellTable = arguments[8];
			var startFrom = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;

			// соотношение созданных id к ключам
			var cache = {};
			var restoredCache = {};
			var members = [];
			// полный список свойств подлежащих стриранию из натуральной формы и записи в подсущности
			var totalProps = [].concat(keyProps, otherProps);

			// need restore cache
			var existedCells = cellTable.filter(function (cell) {
				return cells.indexOf(cell) === -1;
			});
			existedCells.forEach(function (cell) {
				// собрать ключ на основе ключевых значений
				var fact = factTable.find(function (fact) {
					return fact[_const.ENTITY_ID] === cell[_const.ENTITY_ID];
				});
				var surrogateKey = SnowflakeBuilder.createKeyFromProps(keyProps, fact);
				// если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)
				if (!(surrogateKey in restoredCache)) {
					restoredCache[surrogateKey] = ++startFrom;
				}
			});

			// создания групп по уникальным ключам
			entitiesPart.forEach(function (entityPart) {

				// собрать ключ на основе ключевых значений
				var surrogateKey = SnowflakeBuilder.createKeyFromProps(keyProps, entityPart);

				// если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)
				if (!(surrogateKey in cache) && !(surrogateKey in restoredCache)) {
					var _id = cache[surrogateKey] = ++startFrom;
					// const member = Member.create(id, totalProps, entityPart);
					// members.push(member);
				}

				// оставить в нормальной форме ссылку на id под сущности
				var id = cache[surrogateKey];
				var idAttribute = _Cube2.default.genericId(dimension);
				entityPart[idAttribute] = id;
			});

			Object.keys(cache).forEach(function (key) {
				var id = cache[key];
				var idAttribute = _Cube2.default.genericId(dimension);
				var entityPart = entitiesPart.find(function (entityPart) {
					return entityPart[idAttribute] === id;
				});
				var member = _Member2.default.create(id, totalProps, entityPart);
				members.push(member);
			});

			return members;
		}
	}, {
		key: 'createKeyFromProps',
		value: function createKeyFromProps(props, obj) {
			var DIVIDER = ',';

			return props.map(function (prop) {
				return obj[prop];
			}).join(DIVIDER);
		}
	}, {
		key: 'destroy',
		value: function destroy(cellTable, removedCells, dimensionHierarchies, cube) {
			// first remove cells
			removedCells.forEach(function (cell) {
				cellTable.removeCell(cell);
			});
			// then remove members
			var handleMember = function handleMember(member, memberList, dimension) {
				var _cube$projection = cube.projection(_defineProperty({}, dimension, member)),
				    cellTable = _cube$projection.cellTable;
				// last cell was removed at the beginning of the algorithm,
				// so if the member is no longer used, the projection will be empty


				if (!cellTable.length) {
					memberList.removeMember(member);
				}
			};
			this.denormalize(removedCells, dimensionHierarchies, handleMember);
		}
	}, {
		key: 'denormalize',
		value: function denormalize(cellTable, dimensionHierarchies) {
			var handleMember = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

			var factTable = new _FactTable2.default();
			cellTable.forEach(function (cell) {
				factTable.push(_extends({}, cell));
			});

			var handleDimensionTree = function handleDimensionTree(dimensionTree, fact) {
				var _dimensionTree$getTre = dimensionTree.getTreeValue(),
				    dimension = _dimensionTree$getTre.dimension,
				    memberList = _dimensionTree$getTre.members;

				var idAttribute = _Cube2.default.genericId(dimension);
				var idValue = fact[idAttribute];
				var member = memberList.find(function (member) {
					return member[_const.ENTITY_ID] === idValue;
				});
				handleMember(member, memberList, dimension);
				var memberCopy = _extends({}, member);
				delete memberCopy[_const.ENTITY_ID];
				delete fact[idAttribute];
				_extends(fact, memberCopy);
			};
			factTable.forEach(function (fact) {
				dimensionHierarchies.forEach(function (dimensionTree) {
					dimensionTree.tracePreOrder(function (value, dimensionTree) {
						handleDimensionTree(dimensionTree, fact);
					});
				});
			});

			return factTable;
		}
	}]);

	return SnowflakeBuilder;
}();

exports.default = SnowflakeBuilder;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Cell = __webpack_require__(3);

var _Cell2 = _interopRequireDefault(_Cell);

var _const = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

var CellTable = function (_extendableBuiltin2) {
	_inherits(CellTable, _extendableBuiltin2);

	function CellTable(array) {
		_classCallCheck(this, CellTable);

		var _this = _possibleConstructorReturn(this, (CellTable.__proto__ || Object.getPrototypeOf(CellTable)).call(this));

		if (Array.isArray(array)) {
			_extends(_this, array.map(function (item) {
				return new _Cell2.default(item);
			}));
		}
		return _this;
	}

	_createClass(CellTable, [{
		key: 'findById',
		value: function findById(id) {
			return this.find(function (cell) {
				return cell[_const.ENTITY_ID] === id;
			});
		}
	}, {
		key: 'addCell',
		value: function addCell(cell) {
			this.push(cell);
		}
	}, {
		key: 'addCells',
		value: function addCells(cells) {
			var _this2 = this;

			cells.forEach(function (cell) {
				_this2.addCell(cell);
			});
		}
	}, {
		key: 'removeCell',
		value: function removeCell(cell) {
			var index = this.indexOf(cell);
			this.splice(index, 1);
		}
	}]);

	return CellTable;
}(_extendableBuiltin(Array));

exports.default = CellTable;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Tuple = __webpack_require__(17);

var _Tuple2 = _interopRequireDefault(_Tuple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
	function ExtendableBuiltin() {
		var instance = Reflect.construct(cls, Array.from(arguments));
		Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
		return instance;
	}

	ExtendableBuiltin.prototype = Object.create(cls.prototype, {
		constructor: {
			value: cls,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(ExtendableBuiltin, cls);
	} else {
		ExtendableBuiltin.__proto__ = cls;
	}

	return ExtendableBuiltin;
}

var TupleTable = function (_extendableBuiltin2) {
	_inherits(TupleTable, _extendableBuiltin2);

	function TupleTable(array) {
		_classCallCheck(this, TupleTable);

		var _this = _possibleConstructorReturn(this, (TupleTable.__proto__ || Object.getPrototypeOf(TupleTable)).call(this));

		if (Array.isArray(array)) {
			_extends(_this, array.map(function (item) {
				return new _Tuple2.default(item);
			}));
		}
		return _this;
	}

	_createClass(TupleTable, [{
		key: 'addTuple',
		value: function addTuple(data) {
			this.push(new _Tuple2.default(data));
		}
	}, {
		key: 'forEach',
		value: function forEach() {
			return _get(TupleTable.prototype.__proto__ || Object.getPrototypeOf(TupleTable.prototype), 'forEach', this).apply(this, arguments);
		}
	}]);

	return TupleTable;
}(_extendableBuiltin(Array));

exports.default = TupleTable;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tuple = function Tuple(options) {
	_classCallCheck(this, Tuple);

	_extends(this, options);
};

exports.default = Tuple;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MemberList = __webpack_require__(5);

var _MemberList2 = _interopRequireDefault(_MemberList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The composed aggregate object, members grouped by dimension names
 * */
var Space = function () {
	function Space(options) {
		var _this = this;

		_classCallCheck(this, Space);

		if (options) {
			this.getDimensionList.call(options).forEach(function (dimension) {
				var memberList = options[dimension];
				_this.setMemberList(dimension, memberList);
			});
		}
	}
	/**
  * @param {string} dimension
  * @param {MemberList|object[]} memberList
  * */


	_createClass(Space, [{
		key: 'setMemberList',
		value: function setMemberList(dimension, memberList) {
			this[dimension] = new _MemberList2.default(memberList);
		}
		/**
   * @return {string[]}
   * */

	}, {
		key: 'getDimensionList',
		value: function getDimensionList() {
			return Object.getOwnPropertyNames(this);
		}
	}], [{
		key: 'union',
		value: function union() {
			var newSpace = {};
			var arg = [].concat(Array.prototype.slice.call(arguments));
			arg.forEach(function (space) {
				Space.add(newSpace, space);
			});
			return newSpace;
		}
	}, {
		key: 'add',
		value: function add(targetSpace, otherSpace) {
			Object.keys(otherSpace).forEach(function (dimension) {
				if (!targetSpace[dimension]) {
					targetSpace[dimension] = [];
				}
				Array.prototype.push.apply(targetSpace[dimension], otherSpace[dimension]);
			});
		}
	}]);

	return Space;
}();

exports.default = Space;

/***/ })
/******/ ])["default"];
});