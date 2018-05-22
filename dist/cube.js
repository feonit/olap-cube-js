/*!
 * Version: "0.4.2"
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

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InputCell = __webpack_require__(10);

var _InputCell2 = _interopRequireDefault(_InputCell);

var _const = __webpack_require__(0);

var _Member = __webpack_require__(1);

var _Member2 = _interopRequireDefault(_Member);

var _InputMember = __webpack_require__(11);

var _InputMember2 = _interopRequireDefault(_InputMember);

var _DimensionTree = __webpack_require__(12);

var _DimensionTree2 = _interopRequireDefault(_DimensionTree);

var _FactTable = __webpack_require__(8);

var _FactTable2 = _interopRequireDefault(_FactTable);

var _QueryAdapter = __webpack_require__(15);

var _QueryAdapter2 = _interopRequireDefault(_QueryAdapter);

var _errors = __webpack_require__(3);

var _SnowflakeBuilder = __webpack_require__(16);

var _SnowflakeBuilder2 = _interopRequireDefault(_SnowflakeBuilder);

var _console = __webpack_require__(7);

var _console2 = _interopRequireDefault(_console);

var _CellTable = __webpack_require__(17);

var _CellTable2 = _interopRequireDefault(_CellTable);

var _TupleTable = __webpack_require__(9);

var _TupleTable2 = _interopRequireDefault(_TupleTable);

var _Space = __webpack_require__(19);

var _Space2 = _interopRequireDefault(_Space);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
		    cellTable = options.cellTable;

		this.dimensionHierarchies = dimensionHierarchies.map(function (dimensionTree) {
			return _DimensionTree2.default.createDimensionTree(dimensionTree);
		});
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
   * */
		value: function addFacts(facts) {
			facts.forEach(this.addFact);
		}
		/**
   * @public
   * */

	}, {
		key: 'addFact',
		value: function addFact() {}
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
			return this.getSpace()[dimension];
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
		key: 'getSpace',
		value: function getSpace() {
			var space = {};
			this.dimensionHierarchies.forEach(function (dimensionHierarchy) {
				var dimensionSpace = dimensionHierarchy.getSpace();
				_extends(space, dimensionSpace);
			});
			return space;
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

			var queryAdapter = new _QueryAdapter2.default();
			queryAdapter.applyAdapter(fixSpaceOptions, this.getSpace());

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

					var searchedInTree = _this.searchDimensionTreeByDimension(dimension);

					var treeProjection = searchedInTree.recoveryTreeProjectionOfMember(dimension, member);

					var _treeProjection$getRo = treeProjection.getRoot().getTreeValue(),
					    dimensionProjection = _treeProjection$getRo.dimension,
					    membersProjection = _treeProjection$getRo.members;

					return _defineProperty({}, dimensionProjection, membersProjection);
				});

				// после чего эти расширенные версии объекдиняются
				var totalSpace = _Space2.default.union.apply(_Space2.default, _toConsumableArray(spacesForCells));

				return totalSpace;
			});

			// фильтрация продолжается
			var filteredCellTable = cellTable;

			totalSpaces.forEach(function (space) {
				// и ищутся те ячейки, которые принадлежат получившейся области
				filteredCellTable = filteredCellTable.filter(function (cell) {
					return _this.cellBelongsToSpace(cell, space);
				});
			});

			return { cellTable: filteredCellTable };
		}
		/**
   * @private
   * */

	}, {
		key: 'cellBelongsToSpace',
		value: function cellBelongsToSpace(cell, space) {
			var somePropOfCellNotBelongToSpace = Object.keys(space).some(function (dimension) {
				var members = space[dimension];
				var idAttribute = Cube.genericId(dimension);
				var finded = members.find(function (member) {
					return member[_const.ENTITY_ID] === cell[idAttribute];
				});
				return !finded;
			});
			return !somePropOfCellNotBelongToSpace;
		}
		/**
   * @private
   * Поиск по всем иерархиям
   * */

	}, {
		key: 'searchDimensionTreeByDimension',
		value: function searchDimensionTreeByDimension(dimension) {
			var findDimensionTree = void 0;
			this.dimensionHierarchies.forEach(function (dimensionTree) {
				var searchedDimensionTree = dimensionTree.searchValueDimension(dimension);
				if (searchedDimensionTree) {
					findDimensionTree = dimensionTree.searchValueDimension(dimension);
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

			var searchedDimensionTree = this.searchDimensionTreeByDimension(dimension);

			var rootMembers = void 0;
			var rootDimension = void 0;

			if (searchedDimensionTree.isRoot()) {
				rootMembers = searchedDimensionTree.getTreeValue().members;
				rootDimension = searchedDimensionTree.getTreeValue().dimension;
			} else {
				rootMembers = searchedDimensionTree.getRoot().getTreeValue().members;
				rootDimension = searchedDimensionTree.getRoot().getTreeValue().dimension;
			}

			var idAttrubute = Cube.genericId(rootDimension);

			var members = [];
			cells.forEach(function (cell) {
				rootMembers.forEach(function (rootMember) {
					if (cell[idAttrubute] === rootMember[_const.ENTITY_ID]) {
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
				searchedDimensionTree.getRoot().tracePreOrder(function (nodeValue, tree) {
					if (tree.isRoot()) {
						return;
					}
					if (!end) {
						lastMembers = searchedDimensionTree.rollUpDimensionMembers(lastDimension, lastMembers);
						lastDimension = nodeValue.dimension;
					}
					if (nodeValue.dimension === dimension) {
						end = true;
					}
				});
				return lastMembers;
			}

			// const ids = cells.map( cell => {
			// 	let result;
			// 	//todo нужно заменить на рут(точнее на level 1 в текущей версии схемы)
			// 	const searchedDimensionTree = this.searchDimensionTreeByDimension(dimension);
			//
			// 	searchedDimensionTree.traceUp(dimension, ({dimension})=>{
			// 		const idAttribute = Cube.genericId(dimension);
			// 		if ( cell.hasOwnProperty(idAttribute) ){
			// 			result = cell[idAttribute]
			// 		}
			// 	});
			// 	if (result === void 0){
			// 		throw 'dimension not found'
			// 	}
			// 	return result;
			// });
			//
			// const uniq = (items) => {
			// 	const hash = {};
			// 	items.forEach((item) => {
			// 		hash[item] = item
			// 	});
			// 	return Object.keys(hash).map(key => hash[key]);
			// };
			//
			// const uniqueIds = uniq(ids);
			// const members = [];
			// const allMembers = this.getSpace()[dimension];
			//
			// // filtering without loss of order in the array
			// allMembers.forEach( member => {
			// 	if (uniqueIds.indexOf(member[ENTITY_ID]) !== -1){
			// 		members.push(member)
			// 	}
			// });
			// return members;
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

			var sett = this.dimensionHierarchies.map(function (tree) {
				return tree.getTreeValue();
			}).map(function (dimensionTable) {
				dimensionsOrder.push(dimensionTable.dimension);
				return dimensionTable.members;
			});

			var res = cartesian.apply(null, sett);

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

			return _SnowflakeBuilder2.default.destroy(cells, this.dimensionHierarchies);
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
   * @private
   * A way to create a name for a property in which a unique identifier will be stored
   * */

	}], [{
		key: 'create',
		value: function create(facts, dimensionHierarchiesData) {
			if (!(DynamicCube.isPrototypeOf(this) || DynamicCube === this)) {
				throw new _errors.CreateInstanceException();
			}

			var dimensionHierarchies = dimensionHierarchiesData.map(function (dimensionTree) {
				return _DimensionTree2.default.createDimensionTree(dimensionTree);
			});
			var factTable = new _FactTable2.default(facts);

			var cellTable = new _CellTable2.default(factTable);

			_SnowflakeBuilder2.default.anotherBuild(factTable, cellTable, dimensionHierarchies);

			var cube = new this({ dimensionHierarchies: dimensionHierarchies, cellTable: cellTable });
			return cube;
		}
	}, {
		key: 'genericId',
		value: function genericId(entityName) {
			return entityName + '_' + _const.ENTITY_ID;
		}
	}]);

	return Cube;
}();

/**
 * Interface providing special methods for the possibility of changing the data in Cube
 * */


var DynamicCube = function (_Cube) {
	_inherits(DynamicCube, _Cube);

	function DynamicCube() {
		_classCallCheck(this, DynamicCube);

		return _possibleConstructorReturn(this, (DynamicCube.__proto__ || Object.getPrototypeOf(DynamicCube)).apply(this, arguments));
	}

	_createClass(DynamicCube, [{
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

			var _this4 = this;

			var drillDownCoordinatesOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
			var measureData = arguments[4];

			if (typeof dimension !== "string") {
				throw TypeError('parameter dimension expects as string: ' + dimension);
			}

			var rollupCoordinates = {};
			Object.keys(rollupCoordinatesData).forEach(function (dimension) {
				var memberData = rollupCoordinatesData[dimension];
				var memberList = _this4.getDimensionMembers(dimension);
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

			// todo валидацию
			// this._validateCompletenessRollupCoordinatesData(dimension, memberOptions, rollupCoordinatesData);

			var tree = this.searchDimensionTreeByDimension(dimension);

			var childs = tree.getChildTrees();
			childs.forEach(function (tree) {
				var _tree$getTreeValue = tree.getTreeValue(),
				    dimension = _tree$getTreeValue.dimension;

				var member = rollupCoordinatesData[dimension];
				if (!member) {
					throw new _errors.CantAddMemberRollupException(dimension);
				} else {
					memberOptions[Cube.genericId(dimension)] = member[_const.ENTITY_ID];
				}
			});

			var saveMember = this._createMember(tree, memberOptions);
			var saveDimension = dimension;

			tree.traceUpOrder(function (tracedTree) {
				if (tree !== tracedTree) {
					var _tracedTree$getTreeVa = tracedTree.getTreeValue(),
					    parentDimension = _tracedTree$getTreeVa.dimension;

					var drillDownCoordinatesData = _defineProperty({}, Cube.genericId(saveDimension), saveMember[_const.ENTITY_ID]);
					_extends(drillDownCoordinatesData, drillDownCoordinatesOptions[parentDimension]);
					saveMember = _this4._createMember(tracedTree, drillDownCoordinatesData);
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
			var dimensionTree = this.searchDimensionTreeByDimension(dimension);
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
   * @private
   * */

	}, {
		key: '_validateCompletenessRollupCoordinatesData',
		value: function _validateCompletenessRollupCoordinatesData(dimension, memberOptions, rollupCoordinatesData) {}
		// const addSpaceOptions = {
		// 	[dimension]: memberOptions,
		// 	...rollupCoordinatesData
		// };
		//
		// const dimensionHierarchy = this.schema.getDimensionHierarchy(dimension);
		//
		// if (dimensionHierarchy.length){
		// 	dimensionHierarchy.forEach( dimension => {
		// 		if ( !addSpaceOptions[dimension]){
		// 			throw new NotCompletelySpaceException(dimension)
		// 		}
		// 	});
		// }

		/**
   * @private
   * Get data without random identifiers
   * */

	}, {
		key: 'denormalize',
		value: function denormalize() {
			var cells = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getMeasure();
			var forSave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			var data = _get(DynamicCube.prototype.__proto__ || Object.getPrototypeOf(DynamicCube.prototype), 'denormalize', this).call(this, cells);
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
   * Filling method for full size of cube
   * @param {object?} props - properties for empty cells
   * */

	}, {
		key: 'fill',
		value: function fill(props) {
			var _this5 = this;

			if (!this.residuals().length) {
				var tuples = this.cartesian();
				tuples.forEach(function (combination) {
					var unique = _this5.getMeasureBySet(combination);
					if (!unique.length) {
						_this5._createNormalizeData(combination, props);
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
			var _this6 = this;

			var tuples = this.cartesian();
			var unfilled = [];

			tuples.forEach(function (tuple) {
				var members = _this6.getFactsBySet(tuple);
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
   * @param {Tree} tree
   * @param {object?} props
   * */

	}, {
		key: '_createMember',
		value: function _createMember(tree) {
			var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var space = this.getSpace();

			var _tree$getTreeValue2 = tree.getTreeValue(),
			    keyProps = _tree$getTreeValue2.keyProps,
			    dimension = _tree$getTreeValue2.dimension;

			var childDimensions = tree.getChildTrees().map(function (tree) {
				return tree.getTreeValue().dimension;
			});
			var linkProps = [];
			childDimensions.forEach(function (dimension) {
				linkProps.push(Cube.genericId(dimension));
			});
			var id = DynamicCube.reduceId(space[dimension]);
			var member = _InputMember2.default.create(id, keyProps.concat(linkProps), props);
			space[dimension].addMember(member);
			return member;
		}
		/**
   * @private
   * Method of generating a unique identifier within the selected space
   * */

	}], [{
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

	return DynamicCube;
}(Cube);

exports.default = DynamicCube;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
		key: "filter",
		value: function filter() {
			return [].filter.apply(this, arguments);
		}
		/**
   * search members for all properties by some value
   * */

	}, {
		key: "searchValue",
		value: function searchValue(value) {
			return this.filter(function (member) {
				return Object.keys(member).find(function (key) {
					return key !== _const.ENTITY_ID && member[key] === value;
				});
			});
		}
	}, {
		key: "searchData",
		value: function searchData(data) {
			if (data && (typeof data === "undefined" ? "undefined" : _typeof(data)) === "object") {
				var keys = Object.keys(data);
				return this.filter(function (member) {
					return keys.some(function (key) {
						return member.hasOwnProperty(key) && member[key] !== data[key];
					});
				});
			}
		}
	}, {
		key: "addMember",
		value: function addMember(member) {
			if (this.indexOf(member[_const.ENTITY_ID] === -1)) {
				this.push(member);
			} else {
				debugger;
			}
		}
	}, {
		key: "removeMember",
		value: function removeMember(member) {
			var index = this.indexOf(member);
			if (index === -1) {
				throw new Error('represented member was not found', member);
			}
			this.splice(index, 1);
		}
	}, {
		key: "setMembers",
		value: function setMembers(members) {
			this.splice(0, this.length);
			_extends(this, members);
		}
	}]);

	return MemberList;
}(_extendableBuiltin(Array));

exports.default = MemberList;

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _const = __webpack_require__(0);

var _errors = __webpack_require__(3);

var _console = __webpack_require__(7);

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isSimple = function isSimple(value) {
	var type = typeof value === "undefined" ? "undefined" : _typeof(value);
	return type !== "object" && type !== "function" && type !== "undefined" || value === null;
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
				_console2.default.warn("[Fact] value of prop \"" + key + "\" has an unspecified value: " + data[key]);
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Tuple = __webpack_require__(18);

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
		key: "addTuple",
		value: function addTuple(data) {
			this.push(new _Tuple2.default(data));
		}
	}, {
		key: "forEach",
		value: function forEach() {
			return _get(TupleTable.prototype.__proto__ || Object.getPrototypeOf(TupleTable.prototype), "forEach", this).apply(this, arguments);
		}
	}]);

	return TupleTable;
}(_extendableBuiltin(Array));

exports.default = TupleTable;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Cell2 = __webpack_require__(5);

var _Cell3 = _interopRequireDefault(_Cell2);

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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DimensionTable = __webpack_require__(13);

var _DimensionTable2 = _interopRequireDefault(_DimensionTable);

var _Tree2 = __webpack_require__(14);

var _Tree3 = _interopRequireDefault(_Tree2);

var _errors = __webpack_require__(3);

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

	function DimensionTree(tree) {
		_classCallCheck(this, DimensionTree);

		var _this = _possibleConstructorReturn(this, (DimensionTree.__proto__ || Object.getPrototypeOf(DimensionTree)).call(this));

		var dimensionTable = tree.dimensionTable,
		    _tree$dependency = tree.dependency,
		    dependency = _tree$dependency === undefined ? [] : _tree$dependency,
		    _tree$parentNode = tree.parentNode,
		    parentNode = _tree$parentNode === undefined ? null : _tree$parentNode;


		Object.defineProperties(_this, {
			/**
    * @property
    * @name Tree#nodeValue
    * */
			'dimensionTable': {
				value: new _DimensionTable2.default(dimensionTable),
				enumerable: true,
				editable: false
			},
			/**
    * @property {Tree|null}
    * @name Tree#parentNode
    * */
			'parentNode': {
				value: parentNode,
				enumerable: false,
				editable: false
			},
			/**
    * @property {Tree[]}
    * @name Tree#childNodes
    * */
			'dependency': {
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
		key: "getTreeValue",
		value: function getTreeValue() {
			return this.dimensionTable;
		}
	}, {
		key: "getParentTree",
		value: function getParentTree() {
			return this.parentNode;
		}
	}, {
		key: "getChildTrees",
		value: function getChildTrees() {
			return this.dependency;
		}
	}, {
		key: "getSpace",
		value: function getSpace() {
			var space = {};
			this.getRoot().tracePostOrder(function (_ref) {
				var dimension = _ref.dimension,
				    members = _ref.members;

				space[dimension] = members;
			});
			return space;
		}
	}, {
		key: "traceUp",
		value: function traceUp(dimension, callback) {
			var node = this.searchValueDimension(dimension);
			node.traceUpOrder(function (tracedNode) {
				callback(tracedNode.getTreeValue());
			});
		}
	}, {
		key: "searchValueDimension",
		value: function searchValueDimension(dimension) {
			return this.searchValue(function (tree) {
				var treeValue = tree.getTreeValue();
				return treeValue.dimension === dimension;
			});
		}
	}, {
		key: "recoveryTreeProjectionOfMember",
		value: function recoveryTreeProjectionOfMember(dimension, member) {
			var searchedInTree = this.searchValueDimension(dimension);

			var lastMembers = void 0;
			var lastDimension = void 0;

			var newDimensionTreeByMember = new DimensionTree(this.getRoot());
			newDimensionTreeByMember.clearDimensionTablesMembers();

			searchedInTree.traceUpOrder(function (tracedTree) {
				var _tracedTree$getTreeVa = tracedTree.getTreeValue(),
				    tracedMembers = _tracedTree$getTreeVa.members,
				    tracedDimension = _tracedTree$getTreeVa.dimension;

				if (tracedTree == searchedInTree) {
					var searchedMember = tracedMembers.find(function (childMember) {
						return childMember[_const.ENTITY_ID] === member[_const.ENTITY_ID];
					});
					if (!searchedMember) {
						throw 'member not found';
					}
					lastMembers = [searchedMember];
					lastDimension = tracedDimension;
				} else {
					var idAttribute = _Cube2.default.genericId(lastDimension);
					var relations = [];
					tracedMembers.forEach(function (tracedMember) {
						lastMembers.forEach(function (lastMember) {
							if (tracedMember[idAttribute] === lastMember[_const.ENTITY_ID]) {
								relations.push(tracedMember);
							}
						});
					});
					lastMembers = relations;
					lastDimension = tracedDimension;
				}

				var dimensionTree = newDimensionTreeByMember.searchValueDimension(lastDimension);
				dimensionTree.getTreeValue().setMemberList(lastMembers);
			});

			return newDimensionTreeByMember;
		}
	}, {
		key: "removeDimensionMember",
		value: function removeDimensionMember(dimension, member) {
			// travers up
			var removalInTree = this.searchValueDimension(dimension);

			var treeProjection = removalInTree.recoveryTreeProjectionOfMember(dimension, member);

			var toBeRemovedSpace = {};
			var endToBeRemovedMember = {};

			treeProjection.tracePostOrder(function (treeValue) {
				var dimension = treeValue.dimension,
				    members = treeValue.members;

				toBeRemovedSpace[dimension] = members;
			});

			var space = this.getSpace();

			// travers down
			if (space[dimension].members === 1) {
				removalInTree.tracePreOrder(function (downTree) {
					var _downTree$getTreeValu = downTree.getTreeValue(),
					    childMembers = _downTree$getTreeValu.members,
					    childDimension = _downTree$getTreeValu.dimension;

					toBeRemovedSpace[childDimension] = childMembers;
				});
			}

			// remove removal space
			Object.keys(toBeRemovedSpace).forEach(function (dimension) {
				toBeRemovedSpace[dimension].forEach(function (member) {
					space[dimension].removeMember(member);
				});
			});

			var _treeProjection$getRo = treeProjection.getRoot().getTreeValue(),
			    dimensionProjection = _treeProjection$getRo.dimension,
			    membersProjection = _treeProjection$getRo.members;

			endToBeRemovedMember[dimensionProjection] = membersProjection;

			return endToBeRemovedMember;
		}
	}, {
		key: "clearDimensionTablesMembers",
		value: function clearDimensionTablesMembers() {
			this.tracePostOrder(function (treeValue, tree) {
				var dimensionTable = tree.getTreeValue();
				dimensionTable.clearMemberList();
			});
		}

		/**
   *
   * */

	}, {
		key: "drillDownDimensionMembers",
		value: function drillDownDimensionMembers(dimension, members) {
			var tree = this.getRoot().searchValueDimension(dimension);
			if (tree.isRoot()) {
				return members;
			}
			var parentTree = tree.getParentTree();

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
   *
   * */

	}, {
		key: "rollUpDimensionMembers",
		value: function rollUpDimensionMembers(dimension, members) {
			var tree = this.getRoot().searchValueDimension(dimension);
			if (tree.isExternal()) {
				return members;
			}
			var childTree = tree.getChildTrees()[0]; // for one child always

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
		key: "createDimensionTree",
		value: function createDimensionTree(dimensionTreeData) {
			return new DimensionTree(dimensionTreeData);
		}
	}]);

	return DimensionTree;
}(_Tree3.default);

exports.default = DimensionTree;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MemberList = __webpack_require__(4);

var _MemberList2 = _interopRequireDefault(_MemberList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DimensionTable = function () {
	function DimensionTable(_ref) {
		var dimension = _ref.dimension,
		    keyProps = _ref.keyProps,
		    _ref$otherProps = _ref.otherProps,
		    otherProps = _ref$otherProps === undefined ? [] : _ref$otherProps,
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
		/** List of members */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Data definition for Tree
 * @typedef {object} INode
 * @property {any} nodeValue
 * @property {INode[]} childNodes
 * @property {INode} parentNode
 * */

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
   * method
   * */
		value: function getTreeValue() {
			throw 'abstract method';
		}
		/**
   * method
   * */

	}, {
		key: 'getParentTree',
		value: function getParentTree() {
			throw 'abstract method';
		}
		/**
   * method
   * */

	}, {
		key: 'getChildTrees',
		value: function getChildTrees() {
			throw 'abstract method';
		}
		/**
   * @return {boolean}
   * */

	}, {
		key: 'isExternal',
		value: function isExternal() {
			return !this.getChildTrees().length;
		}
		/**
   * @return {boolean}
   * */

	}, {
		key: 'isRoot',
		value: function isRoot() {
			return this.getParentTree() === null;
		}
	}, {
		key: 'isFirstLevel',
		value: function isFirstLevel() {
			return !this.isRoot() && this.getParentTree().getParentTree() === null;
		}
		/**
   * @return {Tree}
   * */

	}, {
		key: 'getRootTree',
		value: function getRootTree() {
			var root = void 0;
			this.traceUpOrder(function (Tree) {
				if (Tree.isRoot()) {
					root = Tree;
				}
			});
			return root;
		}
		/**
   * Search method
   * */

	}, {
		key: 'searchValue',
		value: function searchValue(callback) {
			var search = void 0;
			this.tracePostOrder(function (nodeValue, tree) {
				if (callback(tree)) {
					search = tree;
				}
			});
			return search;
		}
		/**
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
   * A walk in which the children are traversed before their respective parents are traversed
   * @param {function} callback
   * */

	}, {
		key: 'tracePostOrder',
		value: function tracePostOrder(callback) {
			(function reqursively(tree) {
				var childNodes = tree.getChildTrees();
				var nodeValue = tree.getTreeValue();
				if (childNodes.length) {
					childNodes.forEach(function (childNode) {
						reqursively(childNode);
					});
				}
				callback(nodeValue, tree);
			})(this);
		}
		/**
   *  A walk in which each parent node is traversed before its children is called a pre-order walk
   * */

	}, {
		key: 'tracePreOrder',
		value: function tracePreOrder(callback) {
			(function reqursively(tree) {
				var childNodes = tree.getChildTrees();
				var nodeValue = tree.getTreeValue();
				callback(nodeValue, tree);
				if (childNodes.length) {
					childNodes.forEach(function (childNode) {
						reqursively(childNode);
					});
				}
			})(this);
		}
		/**
   * A child nodes with no children.
   * @return {Tree[]}
   * */

	}, {
		key: 'getExternals',
		value: function getExternals() {
			var externals = [];
			this.tracePostOrder(function (nodeValue, tree) {
				if (tree.isExternal(tree)) {
					externals.push(tree);
				}
			});
			return externals;
		}
		/**
   * Get root for that tree
   * */

	}, {
		key: 'getRoot',
		value: function getRoot() {
			var root = void 0;
			this.traceUpOrder(function (tracedTree) {
				if (tracedTree.isRoot()) {
					root = tracedTree;
				}
			});
			return root;
		}
	}]);

	return Tree;
}();

exports.default = Tree;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QueryAdapter = function () {
	function QueryAdapter() {
		_classCallCheck(this, QueryAdapter);
	}

	_createClass(QueryAdapter, [{
		key: "applyAdapter",

		/**
   * It allows to find the dimension members in space for some defining values
   * and replace these values on found members
   * @param {object} fixSpaceOptions
   * @param {Space} space
   * */
		value: function applyAdapter(fixSpaceOptions, space) {
			this.removeEmptyFilds(fixSpaceOptions);

			Object.keys(fixSpaceOptions).forEach(function (dimension) {
				var value = fixSpaceOptions[dimension];

				var filterValue = function filterValue(dimension, value) {
					var memberList = space[dimension];
					return memberList ? memberList.searchValue(value) : void 0;
				};

				var filterData = function filterData(dimension, data) {
					var memberList = space[dimension];
					return memberList ? memberList.searchData(data) : void 0;
				};

				if (typeof value === "string") {
					fixSpaceOptions[dimension] = filterValue(dimension, value) || [];
				}

				// if ( typeof value === "object") {
				// 	fixSpaceOptions[dimension] = filterData(dimension, value) || [];
				// }

				if (Array.isArray(value) && value.length) {

					if (typeof value[0] === "string") {
						fixSpaceOptions[dimension] = [];
						value.reduce(function (accumulated, value) {
							var found = filterValue(dimension, value);
							if (found) {
								[].splice.apply(accumulated, [accumulated.length, 0].concat(found));
							}
							return accumulated;
						}, fixSpaceOptions[dimension]);
					}

					// if (typeof value[0] === "object"){
					// 	fixSpaceOptions[dimension] = [];
					// 	value.reduce( (accumulated, value) => {
					// 		const found = filterData(dimension, value);
					// 		if (found){
					// 			[].splice.apply(accumulated, [accumulated.length, 0].concat(found))
					// 		}
					// 		return accumulated;
					// 	}, fixSpaceOptions[dimension])
					// }
				}
			});
			return fixSpaceOptions;
		}
		/**
   * { field: undefined } => {}
   * */

	}, {
		key: "removeEmptyFilds",
		value: function removeEmptyFilds(fixSpaceOptions) {
			Object.keys(fixSpaceOptions).reduce(function (fixSpaceOptions, prop) {
				if (!fixSpaceOptions[prop]) {
					delete fixSpaceOptions[prop];
				}
				return fixSpaceOptions;
			}, fixSpaceOptions);
			return fixSpaceOptions;
		}
	}]);

	return QueryAdapter;
}();

exports.default = QueryAdapter;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MemberList = __webpack_require__(4);

var _MemberList2 = _interopRequireDefault(_MemberList);

var _Member = __webpack_require__(1);

var _Member2 = _interopRequireDefault(_Member);

var _const = __webpack_require__(0);

var _Cube = __webpack_require__(2);

var _Cube2 = _interopRequireDefault(_Cube);

var _FactTable = __webpack_require__(8);

var _FactTable2 = _interopRequireDefault(_FactTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		key: "anotherBuild",
		value: function anotherBuild(factTable, cellTable, dimensionsTrees) {

			// for each dimension
			dimensionsTrees.forEach(function (dimensionTree) {
				// for each hierarchy and level of dimension
				dimensionTree.tracePostOrder(function (dimensionTable, node) {
					SnowflakeBuilder.processDimension(node, cellTable, factTable);
				});
			});
		}
	}, {
		key: "processDimension",
		value: function processDimension(node, cellTable) {
			var isFirstLevel = node.isFirstLevel();
			var dimensionTable = node.getTreeValue();
			var getMembers = function getMembers(dimension) {
				var searchedNode = node.searchValueDimension(dimension);

				return searchedNode.getTreeValue().members;
			};

			var dimension = dimensionTable.dimension,
			    _dimensionTable$keyPr = dimensionTable.keyProps,
			    keyProps = _dimensionTable$keyPr === undefined ? [] : _dimensionTable$keyPr,
			    _dimensionTable$other = dimensionTable.otherProps,
			    otherProps = _dimensionTable$other === undefined ? [] : _dimensionTable$other;

			var dependencyNames = node.getChildTrees().map(function (tree) {
				return tree.getTreeValue().dimension;
			});

			var memberList = void 0;
			var args = [cellTable, dimension, keyProps, otherProps, cellTable, isFirstLevel];

			if (!dependencyNames.length) {
				memberList = SnowflakeBuilder.makeMemberList.apply(null, args);
			} else {

				var entitiesParts = [];
				var memberListForFilter = getMembers(dependencyNames[0]);
				entitiesParts = SnowflakeBuilder.mapFilter(dependencyNames, cellTable, memberListForFilter);
				memberList = SnowflakeBuilder.makeMemberListDependency.apply(null, args.concat([dependencyNames, entitiesParts]));
			}

			// const id = fact[ENTITY_ID];

			// только после того как список сформирован, удалаять данные из ячеек
			var totalProps = [].concat(keyProps, otherProps);
			cellTable.forEach(function (cell) {
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

	}, {
		key: "mapFilter",
		value: function mapFilter(dimension, cellTable, memberList) {
			var idAttribute = _Cube2.default.genericId(dimension);
			var cellTables = [];
			//todo оптимизировать поиск через хеш
			memberList.forEach(function (member) {
				var cellTableFiltered = cellTable.filter(function (cell) {
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
		key: "makeMemberListDependency",
		value: function makeMemberListDependency(factTable, dimension, keyProps, otherProps, cellTable, isFirstLevel, dependencyNames, entitiesParts) {

			var totalMemberList = new _MemberList2.default();

			var countId = 0;
			entitiesParts.forEach(function (entitiesPart) {
				if (entitiesPart.length) {
					var memberList = SnowflakeBuilder.makeMemberList(entitiesPart, dimension, keyProps, otherProps, cellTable, isFirstLevel, countId);
					countId = countId + memberList.length;

					var etalon = entitiesPart[0];

					dependencyNames.forEach(function (dependencyName) {
						var idAttribute = _Cube2.default.genericId(dependencyName);

						memberList.forEach(function (member) {
							member[idAttribute] = etalon[idAttribute];
							member[_const.ENTITY_ID] = totalMemberList.length + 1;
							totalMemberList.addMember(member);
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
   * @param {CellTable} cellTable
   * @return {MemberList}
   * @private
   * */

	}, {
		key: "makeMemberList",
		value: function makeMemberList(entitiesPart, dimension) {
			var keyProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
			var otherProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
			var cellTable = arguments[4];
			var isFirstLevel = arguments[5];
			var startFrom = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

			// соотношение созданных id к ключам
			var cache = {};
			var memberList = new _MemberList2.default();
			// полный список свойств подлежащих стриранию из натуральной формы и записи в подсущности
			var totalProps = [].concat(keyProps, otherProps);

			// создания групп по уникальным ключам
			entitiesPart.forEach(function (entityPart) {

				// собрать ключ на основе ключевых значений
				var surrogateKey = SnowflakeBuilder.createKeyFromProps(keyProps, entityPart);

				// если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)
				if (!(surrogateKey in cache)) {
					var id = cache[surrogateKey] = ++startFrom;
					var member = _Member2.default.create(id, totalProps, entityPart);
					memberList.push(member);
				}

				// оставить в нормальной форме ссылку на id под сущности
				var value = cache[surrogateKey];
				var idAttribute = _Cube2.default.genericId(dimension);

				entityPart[idAttribute] = value;
			});

			return memberList;
		}
	}, {
		key: "createKeyFromProps",
		value: function createKeyFromProps(props, obj) {
			var DIVIDER = ',';

			return props.map(function (prop) {
				return obj[prop];
			}).join(DIVIDER);
		}
	}, {
		key: "destroy",
		value: function destroy(cellTable, dimensionHierarchies) {
			var factTable = new _FactTable2.default();
			cellTable.forEach(function (cell) {
				factTable.push(_extends({}, cell));
			});

			var handleDimensionTree = function handleDimensionTree(tree, fact) {
				var _tree$getTreeValue = tree.getTreeValue(),
				    dimension = _tree$getTreeValue.dimension,
				    members = _tree$getTreeValue.members;

				var idAttribute = _Cube2.default.genericId(dimension);
				var idValue = fact[idAttribute];
				var member = members.find(function (member) {
					return member[_const.ENTITY_ID] === idValue;
				});
				var memberCopy = _extends({}, member);
				delete memberCopy[_const.ENTITY_ID];
				delete fact[idAttribute];
				_extends(fact, memberCopy);
			};
			factTable.forEach(function (fact) {
				dimensionHierarchies.forEach(function (dimensionTree) {
					handleDimensionTree(dimensionTree, fact);
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Cell = __webpack_require__(5);

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
		key: "findById",
		value: function findById(id) {
			return this.find(function (cell) {
				return cell[_const.ENTITY_ID] === id;
			});
		}
	}, {
		key: "addCell",
		value: function addCell(cell) {
			this.push(cell);
		}
	}, {
		key: "removeCell",
		value: function removeCell(cell) {
			var index = this.indexOf(cell);
			this.splice(index, 1);
		}
	}]);

	return CellTable;
}(_extendableBuiltin(Array));

exports.default = CellTable;

/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MemberList = __webpack_require__(4);

var _MemberList2 = _interopRequireDefault(_MemberList);

var _TupleTable = __webpack_require__(9);

var _TupleTable2 = _interopRequireDefault(_TupleTable);

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
  * */


	_createClass(Space, [{
		key: "getMemberList",
		value: function getMemberList(dimension) {
			var memberList = this[dimension];
			if (!memberList) {
				throw Error("dimension \"" + dimension + "\" not found");
			}
			return memberList;
		}
		/**
   * @param {string} dimension
   * @param {MemberList|object[]} memberList
   * */

	}, {
		key: "setMemberList",
		value: function setMemberList(dimension, memberList) {
			this[dimension] = new _MemberList2.default(memberList);
		}
		/**
   * @return {string[]}
   * */

	}, {
		key: "getDimensionList",
		value: function getDimensionList() {
			return Object.getOwnPropertyNames(this);
		}
	}], [{
		key: "union",
		value: function union() {
			var newSpace = {};
			var arg = [].concat(Array.prototype.slice.call(arguments));
			arg.forEach(function (space) {
				Space.add(newSpace, space);
			});
			return newSpace;
		}
	}, {
		key: "add",
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