/*!
 * Version: "0.12.0"
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
		value: function create(id, props, data, primaryKey) {
			if (!(this === Member || Member.isPrototypeOf(this))) {
				throw Error('this.constructor must be prototype of Member');
			}
			var memberData = {};
			memberData[primaryKey] = id;

			props.forEach(function (prop) {
				// исключить идентификатор самой сущности
				if (prop !== primaryKey) {
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
var DEFAULT_TEMPLATE_FOREIGN_KEY = exports.DEFAULT_TEMPLATE_FOREIGN_KEY = '%s_id';
var DEFAULT_FACT_ID_PROP = exports.DEFAULT_FACT_ID_PROP = 'id';
var DEFAULT_MEMBER_ID_PROP = exports.DEFAULT_MEMBER_ID_PROP = 'id';

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Fact2 = __webpack_require__(4);

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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _errors = __webpack_require__(0);

var _console = __webpack_require__(5);

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
	} catch (error) {
		(0, _errors.handleError)(error);
	}
};

exports.default = Fact;

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _const = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Settings = function Settings() {
	var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    _ref$templateForeignK = _ref.templateForeignKey,
	    templateForeignKey = _ref$templateForeignK === undefined ? _const.DEFAULT_TEMPLATE_FOREIGN_KEY : _ref$templateForeignK;

	_classCallCheck(this, Settings);

	this.templateForeignKey = templateForeignKey;
};

exports.default = Settings;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Fact = __webpack_require__(4);

var _Fact2 = _interopRequireDefault(_Fact);

var _const = __webpack_require__(2);

var _errors = __webpack_require__(0);

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
 *
 * */
var FactTable = function (_extendableBuiltin2) {
	_inherits(FactTable, _extendableBuiltin2);

	function FactTable() {
		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    _ref$facts = _ref.facts,
		    facts = _ref$facts === undefined ? [] : _ref$facts,
		    _ref$primaryKey = _ref.primaryKey,
		    primaryKey = _ref$primaryKey === undefined ? _const.DEFAULT_FACT_ID_PROP : _ref$primaryKey;

		_classCallCheck(this, FactTable);

		var _this = _possibleConstructorReturn(this, (FactTable.__proto__ || Object.getPrototypeOf(FactTable)).call(this));

		_this.primaryKey = primaryKey;
		_this.facts = facts.map(function (factData) {
			FactTable.validateFactData(factData, primaryKey);
			return new _Fact2.default(factData);
		});
		return _this;
	}

	_createClass(FactTable, [{
		key: 'getFacts',
		value: function getFacts() {
			return this.facts;
		}
	}], [{
		key: 'validateFactData',
		value: function validateFactData(factData, primaryKey) {
			if (!factData[primaryKey]) {
				throw _errors.NotFoundFactId;
			}
		}
	}, {
		key: 'deleteProps',
		value: function deleteProps(fact, props, primaryKey) {
			props.forEach(function (prop) {
				if (prop !== primaryKey) {
					delete fact[prop];
				}
			});
		}
	}]);

	return FactTable;
}(_extendableBuiltin(Array));

exports.default = FactTable;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EmptyCell = __webpack_require__(9);

var _EmptyCell2 = _interopRequireDefault(_EmptyCell);

var _Member = __webpack_require__(1);

var _Member2 = _interopRequireDefault(_Member);

var _DimensionTree = __webpack_require__(10);

var _DimensionTree2 = _interopRequireDefault(_DimensionTree);

var _FactTable = __webpack_require__(7);

var _FactTable2 = _interopRequireDefault(_FactTable);

var _errors = __webpack_require__(0);

var _SnowflakeBuilder = __webpack_require__(14);

var _SnowflakeBuilder2 = _interopRequireDefault(_SnowflakeBuilder);

var _console = __webpack_require__(5);

var _console2 = _interopRequireDefault(_console);

var _TupleTable = __webpack_require__(15);

var _TupleTable2 = _interopRequireDefault(_TupleTable);

var _Space = __webpack_require__(17);

var _Space2 = _interopRequireDefault(_Space);

var _Cell = __webpack_require__(3);

var _Cell2 = _interopRequireDefault(_Cell);

var _Settings = __webpack_require__(6);

var _Settings2 = _interopRequireDefault(_Settings);

var _const = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CellTable = function CellTable(_ref) {
	var cells = _ref.cells,
	    primaryKey = _ref.primaryKey;

	_classCallCheck(this, CellTable);

	this.cells = cells.map(function (item) {
		return _EmptyCell2.default.isEmptyCell(item) ? new _EmptyCell2.default(item) : new _Cell2.default(item);
	});
	this.primaryKey = primaryKey;
};

/**
 * It a means to retrieve data
 *
 * Base class for normalizing a denormalized data array
 * and analyzing query according to a given scheme
 *
 * @param {{snowflake, dimensionHierarchies}|Cube} factTable - facts which will be subject to analysis
 * */


var Cube = function () {
	function Cube(cube) {
		_classCallCheck(this, Cube);

		var _cube$dimensionHierar = cube.dimensionHierarchies,
		    dimensionHierarchies = _cube$dimensionHierar === undefined ? [] : _cube$dimensionHierar,
		    _cube$cellTable = cube.cellTable,
		    cellTable = _cube$cellTable === undefined ? {} : _cube$cellTable,
		    _cube$settings = cube.settings,
		    settings = _cube$settings === undefined ? {} : _cube$settings;

		if (Array.isArray(cellTable)) {
			cellTable = { cells: cellTable };
			_console2.default.warnOnce('first argument \"cells\" as array type is deprecated now, use object for describe fact table');
		}
		var _cellTable = cellTable,
		    _cellTable$cells = _cellTable.cells,
		    cells = _cellTable$cells === undefined ? [] : _cellTable$cells,
		    _cellTable$primaryKey = _cellTable.primaryKey,
		    primaryKey = _cellTable$primaryKey === undefined ? _const.DEFAULT_FACT_ID_PROP : _cellTable$primaryKey;

		this.settings = new _Settings2.default(settings);
		this.dimensionHierarchies = [];
		dimensionHierarchies.map(this._addDimensionHierarchy.bind(this));
		this.cellTable = new CellTable({ cells: cells, primaryKey: primaryKey });

		// const residuals = this.residuals();
		// const count = residuals.length;
		// if (count > 0) {
		// 	console.warn('Fact table has residuals', residuals)
		// }
	}
	/**
  * @public
  * Fabric method for creating cube from facts and dimensionHierarchiesData data
  * @param {object} factTable
  * @param {object} dimensionHierarchies
  * @param {object} options
  * @param {string} options.templateForeignKey
  * @return {Cube}
  * */


	_createClass(Cube, [{
		key: 'addFacts',

		/**
   * @public
   * @param {Object[]} facts
   * */
		value: function addFacts(facts) {
			var newFactTable = new _FactTable2.default({ facts: facts, primaryKey: this.cellTable.primaryKey });
			var cells = newFactTable.getFacts().map(function (fact) {
				return new _Cell2.default(fact);
			});
			[].push.apply(this.getCells(), cells);
			var factTable = this.getFacts();
			_SnowflakeBuilder2.default.anotherBuild(factTable, cells, this.dimensionHierarchies, this.getCells(), this.cellTable.primaryKey);
		}
		/**
   * @public
   * @param {Object[]} facts
   * */

	}, {
		key: 'removeFacts',
		value: function removeFacts(facts) {
			var cellTable = this.getCells();
			var primaryKey = this.cellTable.primaryKey;
			var removedCells = facts.map(function (fact) {
				return cellTable.find(function (cell) {
					return cell[primaryKey] === fact[primaryKey];
				});
			});
			this.removeCells(removedCells);
		}
		/**
   * @public
   * */

	}, {
		key: 'removeCells',
		value: function removeCells(cells) {
			_SnowflakeBuilder2.default.destroy(this.getCells(), cells, this.dimensionHierarchies, this);
		}
		/**
   * @public
   * @return {FactTable} returns members
   * @deprecated
   * */

	}, {
		key: 'getFacts',
		value: function getFacts() {
			return this.denormalize(this.getCells());
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
   * @deprecated
   * */

	}, {
		key: 'getFactsBySet',
		value: function getFactsBySet(fixSpaceOptions) {
			return this.denormalize(this.getCellsBySet(fixSpaceOptions));
		}
		/**
   * @public
   * */

	}, {
		key: 'getCells',
		value: function getCells() {
			return this.cellTable.cells;
		}
		/**
   * @public
   * */

	}, {
		key: 'getCellsBySet',
		value: function getCellsBySet(fixSpaceOptions) {
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
			var cellTable = this.getCells();
			if (Object.keys(fixSpaceOptions).length === 0) {
				return { cellTable: cellTable };
			}

			var fixSpace = {};
			Object.keys(fixSpaceOptions).forEach(function (dimension) {
				fixSpace[dimension] = Array.isArray(fixSpaceOptions[dimension]) ? fixSpaceOptions[dimension] : [fixSpaceOptions[dimension]];

				// todo замена на оригинальные члены измерений
				// fixSpaceOptions[dimension].forEach((memberData, index) => {
				// 	const members = this.getDimensionMembers(dimension);
				// 	let member = members.find(member => members.getMemberId(member) === memberData[DEFAULT_MEMBER_ID_PROP]);
				// 	fixSpaceOptions[dimension][index] = member;
				// 	if (!memberData) {
				// 		console.warn(`not founded member by id ${members.getMemberId(member)}`)
				// 	}
				// })
			});

			var dimensionHierarchiesLength = this.dimensionHierarchies.length;
			if (Object.keys(fixSpaceOptions).length > dimensionHierarchiesLength) {
				throw 'set must have length: ' + dimensionHierarchiesLength;
			}

			var dimensionHierarchies = [];

			// для каждого измерения
			var totalSpaces = Object.keys(fixSpace).map(function (dimension) {

				// ищется его расширенная версия для каждого члена
				var spacesForCells = fixSpace[dimension].map(function (member) {

					var searchedInTree = _this.findDimensionTreeByDimension(dimension);

					var dimensionTreeProjection = searchedInTree.createProjectionOntoMember(member);

					var _dimensionTreeProject = dimensionTreeProjection.getRoot().getTreeValue(),
					    dimensionProjection = _dimensionTreeProject.dimension,
					    membersProjection = _dimensionTreeProject.members;

					dimensionHierarchies.push(dimensionTreeProjection);
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

					var _findDimensionTreeByD = _this.findDimensionTreeByDimension(dimension).getTreeValue(),
					    foreignKey = _findDimensionTreeByD.foreignKey,
					    primaryKey = _findDimensionTreeByD.primaryKey;

					var finded = members.find(function (member) {
						return member[primaryKey] === cell[foreignKey];
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

			return { cellTable: filteredCellTable, dimensionHierarchies: dimensionHierarchies };
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
			var dimensionTable = searchedDimensionTree.getRoot().getTreeValue();

			var rootMembers = dimensionTable.members,
			    rootDimension = dimensionTable.dimension,
			    rootIdAttribute = dimensionTable.foreignKey;


			var members = [];

			// todo смахивает на mapFilter
			cells.forEach(function (cell) {
				rootMembers.forEach(function (rootMember) {
					if (cell[rootIdAttribute] === dimensionTable.getMemberId(rootMember)) {
						if (members.indexOf(rootMember) === -1) {
							members.push(rootMember);
						}
					}
				});
			});

			if (searchedDimensionTree.isRoot()) {
				return members;
			} else {
				var lastTracedMembers = members;
				var end = false;
				var lastTracedDimensionTree = searchedDimensionTree;
				searchedDimensionTree.getRoot().tracePreOrder(function (tracedDimensionTreeValue, tracedDimensionTree) {
					if (tracedDimensionTree.isRoot()) {
						return;
					}
					if (!end) {
						lastTracedMembers = lastTracedDimensionTree.rollUpDimensionMembers(lastTracedMembers);
						lastTracedDimensionTree = tracedDimensionTree;
					}
					if (tracedDimensionTreeValue.dimension === dimension) {
						end = true;
					}
				});
				return lastTracedMembers;
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
				var _ref3;

				return (_ref3 = []).concat.apply(_ref3, _toConsumableArray(a.map(function (d) {
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

			var tupleTable = new _TupleTable2.default();

			var res = void 0;
			if (set.length) {
				if (set.length > 1) {
					res = cartesian.apply(null, set);
				} else {
					res = set[0].map(function (i) {
						return [i];
					});
				}
				res.forEach(function (arr) {
					var item = {};
					dimensionsOrder.forEach(function (dimension, index) {
						item[dimension] = arr[index];
					});
					tupleTable.addTuple(item);
					return item;
				});
			}

			return tupleTable;
		}
		/**
   * @private
   * Get facts from cube
   * */

	}, {
		key: 'denormalize',
		value: function denormalize() {
			var _this2 = this;

			var cells = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getCells();
			var forSave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			var data = _SnowflakeBuilder2.default.denormalize(cells, this.dimensionHierarchies);
			if (forSave) {
				data.forEach(function (data, index) {
					if (cells[index] instanceof _EmptyCell2.default) {
						delete data[_this2.cellTable.primaryKey];
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
			var _this3 = this;

			var tuples = this.cartesian();
			var totalFacts = [];
			tuples.forEach(function (tuple) {
				var partFacts = _this3.getFactsBySet(tuple);
				if (partFacts.length > 1) {
					totalFacts.push(tuple);
				}
			});
			return totalFacts;
		}
		/**
   * @public
   * @param {string} dimension - dimension in which the member is created
   * @param {object?} memberData - properties for the created member
   * @param {object?} rollupCoordinatesData
   * @param {object?} drillDownCoordinatesOptions
   * @param {object?} cellData
   * */

	}, {
		key: 'addDimensionMember',
		value: function addDimensionMember(dimension) {
			var memberData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var rollupCoordinatesData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			var _this4 = this;

			var drillDownCoordinatesOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
			var cellData = arguments[4];

			if (typeof dimension !== 'string') {
				throw TypeError('parameter dimension expects as string: ' + dimension);
			}
			var rollupCoordinates = {};
			Object.keys(rollupCoordinatesData).forEach(function (dimension) {
				var memberData = rollupCoordinatesData[dimension];
				var memberList = _this4.getDimensionMembers(dimension);
				var dimensionTable = _this4.findDimensionTreeByDimension(dimension).getTreeValue();
				var primaryKey = dimensionTable.primaryKey;

				var id = memberData[primaryKey];
				var find = memberList.find(function (member) {
					return id === dimensionTable.getMemberId(member);
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
				var dimensionTable = childDimensionTree.getTreeValue();
				var dimension = dimensionTable.dimension,
				    foreignKey = dimensionTable.foreignKey,
				    primaryKey = dimensionTable.primaryKey;

				var member = rollupCoordinatesData[dimension];
				if (!member) {
					throw new _errors.CantAddMemberRollupException(dimension);
				} else {
					memberData[foreignKey] = member[primaryKey];
				}
			});
			var dimensionTable = dimensionTree.getTreeValue();
			var foreignKey = dimensionTable.foreignKey,
			    members = dimensionTable.members;

			var saveMember = dimensionTree.createMember(memberData);
			var saveIdAttribute = foreignKey;
			dimensionTree.traceUpOrder(function (tracedDimensionTree) {
				if (dimensionTree !== tracedDimensionTree) {
					var _tracedDimensionTree$ = tracedDimensionTree.getTreeValue(),
					    parentDimension = _tracedDimensionTree$.dimension,
					    parentIdAttribute = _tracedDimensionTree$.foreignKey;

					var drillDownCoordinatesData = _defineProperty({}, saveIdAttribute, dimensionTable.getMemberId(saveMember));
					_extends(drillDownCoordinatesData, drillDownCoordinatesOptions[parentDimension]);
					saveMember = tracedDimensionTree.createMember(drillDownCoordinatesData);
					saveIdAttribute = parentIdAttribute;
				}
			});
			this.fill(cellData);
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
			var endToBeRemoved = dimensionTree.removeProjectionOntoMember(member);
			var cellTable = this.getCells();
			var getRemoveMeasures = function getRemoveMeasures(dimension, members) {
				var removedCells = [];
				var dimensionTable = dimensionTree.getDimensionTreeByDimension(dimension).getTreeValue();
				var foreignKey = dimensionTable.foreignKey;

				// todo mapFilter похоже
				cellTable.forEach(function (cell) {
					members.forEach(function (member) {
						if (cell[foreignKey] == dimensionTable.getMemberId(member)) {
							removedCells.push(cell);
						}
					});
				});
				return removedCells;
			};
			Object.keys(endToBeRemoved).map(function (dimension) {
				var removedMeasures = getRemoveMeasures(dimension, endToBeRemoved[dimension]);
				removedMeasures.forEach(function (cell) {
					var index = cellTable.indexOf(cell);
					if (index !== -1) {
						cellTable.splice(index, 1);
					}
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
			if (!this.residuals().length) {
				var emptyCells = this.createEmptyCells(props);
				this.addEmptyCells(emptyCells);
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
   * @param {object} dimensionHierarchy
   * */

	}, {
		key: '_addDimensionHierarchy',
		value: function _addDimensionHierarchy(dimensionHierarchy) {
			var dimensionTree = _DimensionTree2.default.createDimensionTree(dimensionHierarchy, this.settings);
			this.dimensionHierarchies.push(dimensionTree);
			return dimensionTree;
		}
		/**
   * @public
   * @param {DimensionTree} dimensionHierarchy
   * */

	}, {
		key: 'addDimensionHierarchy',
		value: function addDimensionHierarchy(dimensionHierarchy) {
			var dimensionTree = this._addDimensionHierarchy(dimensionHierarchy);
			_SnowflakeBuilder2.default.anotherBuildOne(dimensionTree, this.getCells(), this.getCells(), this.getCells(), this.cellTable.primaryKey);
		}
		/**
   * @public
   * @param {DimensionTree} dimensionHierarchy
   * */

	}, {
		key: 'removeDimensionHierarchy',
		value: function removeDimensionHierarchy(dimensionHierarchy) {
			// first remove members
			_SnowflakeBuilder2.default.destroyDimensionTree(this.getCells(), this.getCells(), dimensionHierarchy, this);
			// then target dimension hierarchy
			this.dimensionHierarchies.splice(this.dimensionHierarchies.indexOf(dimensionHierarchy), 1);
		}
		/**
   * @public
   * @param {string} currentDimension
   * @param {object[]} members
   * @param {string?} targetDimension
   * */

	}, {
		key: 'rollUp',
		value: function rollUp(currentDimension, members, targetDimension) {
			var currentDimensionTree = this.findDimensionTreeByDimension(currentDimension);
			// first rollUp if no target
			var targetDimensionTree = targetDimension ? this.findDimensionTreeByDimension(targetDimension) : currentDimensionTree.getChildTrees()[0];
			// if cant rollUp
			if (!targetDimension && !targetDimensionTree) {
				return members;
			}
			if (!currentDimensionTree.hasChild(targetDimensionTree)) {
				return members;
			}
			var targetDimensionWasAchieved = false;
			var lastTracedDimensionTree = currentDimensionTree;
			var lastTracedMembers = members;
			currentDimensionTree.tracePreOrder(function (treeValue, tracedDimensionTree) {
				if (tracedDimensionTree === currentDimensionTree) {
					return;
				}
				if (!targetDimensionWasAchieved) {
					lastTracedMembers = lastTracedDimensionTree.rollUpDimensionMembers(lastTracedMembers);
					if (targetDimensionTree === tracedDimensionTree) {
						targetDimensionWasAchieved = true;
					} else {
						lastTracedDimensionTree = tracedDimensionTree;
					}
				}
			});
			return lastTracedMembers;
		}
		/**
   * @public
   * @param {string} currentDimension
   * @param {object[]} members
   * @param {string?} targetDimension
   * */

	}, {
		key: 'drillDown',
		value: function drillDown(currentDimension, members, targetDimension) {
			var currentDimensionTree = this.findDimensionTreeByDimension(currentDimension);
			// first drillDown if no target
			var targetDimensionTree = targetDimension ? this.findDimensionTreeByDimension(targetDimension) : currentDimensionTree.getParentTree();
			// if cant drillDown
			if (!targetDimension && !targetDimensionTree) {
				return members;
			}
			if (!currentDimensionTree.hasParent(targetDimensionTree)) {
				return members;
			}
			var targetDimensionWasAchieved = false;
			var lastTracedDimensionTree = currentDimensionTree;
			var lastTracedMembers = members;
			currentDimensionTree.traceUpOrder(function (tracedDimensionTree) {
				if (tracedDimensionTree === currentDimensionTree) {
					return;
				}
				if (!targetDimensionWasAchieved) {
					lastTracedMembers = lastTracedDimensionTree.drillDownDimensionMembers(lastTracedMembers);
					if (targetDimensionTree === tracedDimensionTree) {
						targetDimensionWasAchieved = true;
					} else {
						lastTracedDimensionTree = tracedDimensionTree;
					}
				}
			});
			return lastTracedMembers;
		}
		/**
   * @return {Cube}
   * */

	}, {
		key: 'slice',
		value: function slice(dimension, member) {
			return this._createProjectionOfCube(_defineProperty({}, dimension, member));
		}
		/**
   *
   * */

	}, {
		key: 'dice',
		value: function dice(fixSpaceOptions) {
			return this._createProjectionOfCube(fixSpaceOptions);
		}
		/**
   *
   * */

	}, {
		key: '_createProjectionOfCube',
		value: function _createProjectionOfCube(fixSpaceOptions) {
			var _this6 = this;

			// 1 make one projection on to member
			var projection = this.projection(fixSpaceOptions);
			var cellTable = projection.cellTable,
			    dimensionHierarchies = projection.dimensionHierarchies;
			// 2 create new list of dimensionHierarchies

			var newDimensionHierarchies = [].concat(this.dimensionHierarchies);
			// 3 replace original by projected dimensionHierarchy
			dimensionHierarchies.forEach(function (projectionDimensionHierarchy) {
				// find original dimensionHierarchy
				var originalDimensionHierarchy = _this6.dimensionHierarchies.find(function (dimensionTree) {
					return dimensionTree.getTreeValue().dimension === projectionDimensionHierarchy.getTreeValue().dimension;
				});
				// define index
				var index = newDimensionHierarchies.indexOf(originalDimensionHierarchy);
				// replace it
				newDimensionHierarchies.splice(index, 1, projectionDimensionHierarchy);
			});
			return new Cube({ cellTable: cellTable, dimensionHierarchies: newDimensionHierarchies });
		}
		/**
   * @public
   * @return {EmptyCell[]}
   * */

	}, {
		key: 'createEmptyCells',
		value: function createEmptyCells(props) {
			var _this7 = this;

			var emptyCells = [];
			var tuples = this.cartesian();
			tuples.forEach(function (combination) {
				var unique = _this7.getCellsBySet(combination);
				if (!unique.length) {
					var options = {};
					Object.keys(combination).forEach(function (dimension) {
						var dimensionTable = _this7.findDimensionTreeByDimension(dimension).getTreeValue();
						var foreignKey = dimensionTable.foreignKey;

						options[foreignKey] = dimensionTable.getMemberId(combination[dimension]);
					});
					options = _extends({}, options, props);
					var cell = _EmptyCell2.default.createEmptyCell(options);
					emptyCells.push(cell);
				}
			});
			return emptyCells;
		}
		/**
   * @public
   * @return {EmptyCell[]}
   * */

	}, {
		key: 'getEmptyCells',
		value: function getEmptyCells() {
			return this.getCells().filter(function (cell) {
				return _EmptyCell2.default.isEmptyCell(cell);
			});
		}
		/**
   * @public
   * @throw {TypeError}
   * */

	}, {
		key: 'addEmptyCells',
		value: function addEmptyCells(emptyCells) {
			Cube.validateInstance(emptyCells);
			[].push.apply(this.getCells(), emptyCells);
		}
		/**
   * @param {EmptyCell[]} emptyCells
   * @throw {TypeError}
   * */

	}], [{
		key: 'create',
		value: function create(factTable) {
			var dimensionHierarchies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
			var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			if (Array.isArray(factTable)) {
				factTable = { facts: factTable };
				_console2.default.warnOnce('first argument \"facts\" as array type is deprecated now, use object for describe fact table');
			}
			var _factTable = factTable,
			    _factTable$facts = _factTable.facts,
			    facts = _factTable$facts === undefined ? [] : _factTable$facts,
			    primaryKey = _factTable.primaryKey;

			if (!(Cube.isPrototypeOf(this) || Cube === this)) {
				throw new _errors.CreateInstanceException();
			}

			var cube = new this({
				cellTable: { primaryKey: primaryKey },
				dimensionHierarchies: dimensionHierarchies,
				settings: _extends({}, options)
			});

			// build 2: members
			cube.addFacts(facts);

			return cube;
		}
	}, {
		key: 'validateInstance',
		value: function validateInstance(emptyCells) {
			emptyCells.forEach(function (emptyCell) {
				if (!(emptyCell instanceof _EmptyCell2.default)) {
					throw new TypeError('some item in list of argument is not instances of EmptyCell');
				}
			});
		}
	}]);

	return Cube;
}();

exports.default = Cube;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var EmptyCell = function (_Cell) {
	_inherits(EmptyCell, _Cell);

	function EmptyCell(data, options) {
		_classCallCheck(this, EmptyCell);

		if (!data.id) {
			data.id = EmptyCell.generateId();
		}
		return _possibleConstructorReturn(this, (EmptyCell.__proto__ || Object.getPrototypeOf(EmptyCell)).call(this, data, options));
	}
	/**
  * @return {EmptyCell}
  * */


	_createClass(EmptyCell, null, [{
		key: 'createEmptyCell',
		value: function createEmptyCell(options) {
			return new EmptyCell(options);
		}
		/**
   * @param {Cell|{ id: string|number }} cell
   * @return {boolean}
   * */

	}, {
		key: 'isEmptyCell',
		value: function isEmptyCell(cell) {
			return typeof cell.id === 'string';
		}
		/**
   * @return {string}
   * */

	}, {
		key: 'generateId',
		value: function generateId() {
			return uuidv4();
		}
	}]);

	return EmptyCell;
}(_Cell3.default);

exports.default = EmptyCell;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DimensionTable = __webpack_require__(11);

var _DimensionTable2 = _interopRequireDefault(_DimensionTable);

var _Settings = __webpack_require__(6);

var _Settings2 = _interopRequireDefault(_Settings);

var _Tree2 = __webpack_require__(13);

var _Tree3 = _interopRequireDefault(_Tree2);

var _errors = __webpack_require__(0);

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
   * @param {Member} member
   * @return {DimensionTree|undefined}
   * */

	}, {
		key: 'createProjectionOntoMember',
		value: function createProjectionOntoMember(member) {
			var _this2 = this;

			// 1 create copy of hierarchy with empty members
			var newDimensionTreeByMember = new DimensionTree(this.getRoot());
			newDimensionTreeByMember.tracePostOrder(function (dimensionTreeValue, dimensionTree) {
				var dimensionTable = dimensionTree.getTreeValue();
				dimensionTable.clearMemberList();
			});
			var lastTracedMembers = void 0;
			var lastTracedDimensionTree = void 0;
			// 2 trace up
			this.traceUpOrder(function (tracedTree) {
				var _tracedTree$getTreeVa = tracedTree.getTreeValue(),
				    tracedDimension = _tracedTree$getTreeVa.dimension;

				// 3 get drill down of last members


				var drillDownedMembers = tracedTree == _this2 ? [member] : lastTracedDimensionTree.drillDownDimensionMembers(lastTracedMembers);

				// 4 set members
				newDimensionTreeByMember.getDimensionTreeByDimension(tracedDimension).getTreeValue().setMemberList(drillDownedMembers);

				// 5 save current dimension and drill downed members
				lastTracedMembers = drillDownedMembers;
				lastTracedDimensionTree = tracedTree;
			});
			return newDimensionTreeByMember;
		}
		/**
   * @public
   * @param {Member} member
   * */

	}, {
		key: 'removeProjectionOntoMember',
		value: function removeProjectionOntoMember(member) {
			// 1 get projection
			var projectionDimensionTree = this.createProjectionOntoMember(member);
			// 2 subtract projection
			this.subtractDimensionTree(projectionDimensionTree);
			// 3 return first level members of projection
			var endToBeRemovedMember = {};

			var _projectionDimensionT = projectionDimensionTree.getRoot().getTreeValue(),
			    dimensionProjection = _projectionDimensionT.dimension,
			    membersProjection = _projectionDimensionT.members;

			endToBeRemovedMember[dimensionProjection] = membersProjection;

			return endToBeRemovedMember;
		}
		/**
   * @private
   * @param {DimensionTree} dimensionTree
   * */

	}, {
		key: 'subtractDimensionTree',
		value: function subtractDimensionTree(dimensionTree) {
			var _this3 = this;

			// remove intersection
			var toBeRemovedSpace = {};

			dimensionTree.tracePostOrder(function (dimensionTreeValue) {
				var dimension = dimensionTreeValue.dimension,
				    members = dimensionTreeValue.members;

				toBeRemovedSpace[dimension] = members;
			});

			var memberList = this.getTreeValue().members;

			// travers down
			if (memberList.length === 1) {
				this.tracePreOrder(function (tracedDimensionTree) {
					var _tracedDimensionTree$ = tracedDimensionTree.getTreeValue(),
					    childMembers = _tracedDimensionTree$.members,
					    childDimension = _tracedDimensionTree$.dimension;

					toBeRemovedSpace[childDimension] = childMembers;
				});
			}

			// remove removal space
			Object.keys(toBeRemovedSpace).forEach(function (dimension) {
				var currentDimensionTree = _this3.getDimensionTreeByDimension(dimension);
				var dimensionTable = currentDimensionTree.getTreeValue();
				toBeRemovedSpace[dimension].forEach(function (member) {
					dimensionTable.removeMember(member);
				});
			});
		}
		/**
   * @public
   * @param {Member[]} members
   * @return {Member[]}
   * */

	}, {
		key: 'drillDownDimensionMembers',
		value: function drillDownDimensionMembers() {
			var members = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getTreeValue().members;

			if (this.isRoot()) {
				return members;
			}
			var parentTree = this.getParentTree();

			var _parentTree$getTreeVa = parentTree.getTreeValue(),
			    parentMembers = _parentTree$getTreeVa.members,
			    primaryKey = _parentTree$getTreeVa.primaryKey;

			var _getTreeValue = this.getTreeValue(),
			    foreignKey = _getTreeValue.foreignKey;

			var drillDownMembers = [];
			members.forEach(function (member) {
				parentMembers.forEach(function (parentMember) {
					if (parentMember[foreignKey] === member[primaryKey]) {
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
   * @this {DimensionTree}
   * @param {Member[]} members
   * @return {Member[]}
   * */

	}, {
		key: 'rollUpDimensionMembers',
		value: function rollUpDimensionMembers() {
			var members = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getTreeValue().members;

			if (this.isExternal()) {
				return members;
			}
			var childTree = this.getChildTrees()[0]; // for one child always
			var dimensionTable = childTree.getTreeValue();
			var childMembers = dimensionTable.members,
			    foreignKey = dimensionTable.foreignKey;

			var rollUpMembers = [];
			members.forEach(function (member) {
				childMembers.forEach(function (childMember) {
					if (member[foreignKey] === dimensionTable.getMemberId(childMember)) {
						if (rollUpMembers.indexOf(childMember) === -1) {
							rollUpMembers.push(childMember);
						}
					}
				});
			});
			return rollUpMembers;
		}
		/**
   * @public
   * @param {object?} memberData
   * */

	}, {
		key: 'createMember',
		value: function createMember() {
			var memberData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var dimensionTable = this.getTreeValue();
			var childIdAttributes = this.getChildTrees().map(function (dimensionTree) {
				return dimensionTree.getTreeValue().foreignKey;
			});
			var linkProps = [];
			childIdAttributes.forEach(function (foreignKey) {
				linkProps.push(foreignKey);
			});
			return dimensionTable.createMember(memberData, linkProps);
		}
	}], [{
		key: 'createDimensionTree',
		value: function createDimensionTree(dimensionTreeData) {
			var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Settings2.default(),
			    templateForeignKey = _ref.templateForeignKey;

			// build 1: foreignKeys
			var buildIdAttributeDimensionTable = function buildIdAttributeDimensionTable(dimensionTable) {
				if (!dimensionTable.foreignKey) {
					dimensionTable.foreignKey = DimensionTree.genericId(dimensionTable.dimension, templateForeignKey);
				}
			};
			var dimensionTree = new DimensionTree(dimensionTreeData);
			dimensionTree.tracePostOrder(buildIdAttributeDimensionTable);
			return dimensionTree;
		}
		/**
   * @public
   * A way to create a name for a property in which a unique identifier will be stored
   * */

	}, {
		key: 'genericId',
		value: function genericId(dimension, templateForeignKey) {
			return templateForeignKey.replace('%s', dimension);
		}
	}]);

	return DimensionTree;
}(_Tree3.default);

exports.default = DimensionTree;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Member = __webpack_require__(1);

var _Member2 = _interopRequireDefault(_Member);

var _const = __webpack_require__(2);

var _InputMember = __webpack_require__(12);

var _InputMember2 = _interopRequireDefault(_InputMember);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DimensionTable = function () {
	function DimensionTable(_ref) {
		var _this = this;

		var dimension = _ref.dimension,
		    foreignKey = _ref.foreignKey,
		    _ref$primaryKey = _ref.primaryKey,
		    primaryKey = _ref$primaryKey === undefined ? _const.DEFAULT_MEMBER_ID_PROP : _ref$primaryKey,
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
		/** id name */
		this.foreignKey = foreignKey;
		/** id name */
		this.primaryKey = primaryKey;
		/** List of key names properties of the table belonging to the current dimension */
		this.keyProps = [].concat(keyProps);
		/** List of additional names properties of the table belonging to the current dimension */
		this.otherProps = [].concat(otherProps);
		/** member list */
		this.members = members.map(function (member) {
			return new _Member2.default(member, _this.primaryKey);
		});
	}
	/**
  *
  * */


	_createClass(DimensionTable, [{
		key: 'setMemberList',
		value: function setMemberList(members) {
			[].splice.apply(this.members, [0, this.members.length].concat(members));
		}
		/**
   *
   * */

	}, {
		key: 'clearMemberList',
		value: function clearMemberList() {
			this.members = [];
		}
	}, {
		key: 'getMemberId',
		value: function getMemberId(member) {
			return member[this.primaryKey];
		}
		/**
   * @param {Member} member
   * */

	}, {
		key: 'addMember',
		value: function addMember(member) {
			if (this.members.indexOf(member) === -1) {
				this.members.push(member);
			} else {
				alert('boo');
			}
		}
		/**
   * @public
   * @param {object} memberData
   * @param {[]} linkProps
   * */

	}, {
		key: 'createMember',
		value: function createMember() {
			var memberData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var linkProps = arguments[1];
			var keyProps = this.keyProps,
			    otherProps = this.otherProps,
			    members = this.members,
			    primaryKey = this.primaryKey;

			var keys = keyProps.concat(linkProps).concat(otherProps);
			var id = DimensionTable.reduceId(members, primaryKey);
			var member = _InputMember2.default.create(id, keys, memberData, primaryKey);
			this.addMember(member);
			return member;
		}
		/**
   * @public
   * Method of generating a unique identifier within the selected space
   * */

	}, {
		key: 'setMemberId',
		value: function setMemberId(member, id) {
			member[this.primaryKey] = id;
		}
	}, {
		key: 'deleteMemberId',
		value: function deleteMemberId(member) {
			delete member[this.primaryKey];
		}
		/**
   *
   * */

	}, {
		key: 'removeMember',
		value: function removeMember(member) {
			var index = this.members.indexOf(member);
			if (index === -1) {
				throw new Error('represented member was not found', member);
			}
			this.members.splice(index, 1);
		}
	}], [{
		key: 'reduceId',
		value: function reduceId(members, primaryKey) {
			if (members.length) {
				return members.reduce(function (acc, curValue) {
					return acc[primaryKey] > curValue[primaryKey] ? acc : curValue;
				}, 0)[primaryKey] + 1;
			} else {
				return 1;
			}
		}
	}]);

	return DimensionTable;
}();

exports.default = DimensionTable;

/***/ }),
/* 12 */
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
		value: function create(id, memberData, data, primaryKey) {
			var defaultValue = null;
			var defaultData = {};

			memberData.forEach(function (propName) {
				defaultData[propName] = data.hasOwnProperty(propName) ? data[propName] : defaultValue;
			});

			return _get(InputMember.__proto__ || Object.getPrototypeOf(InputMember), 'create', this).call(this, id, memberData, defaultData, primaryKey);
		}
	}]);

	return InputMember;
}(_Member3.default);

exports.default = InputMember;

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
		/**
   * Check if some thee is present in childs of some level
   * @param {Tree}
   * @return {boolean}
   * */

	}, {
		key: 'hasChild',
		value: function hasChild(tree) {
			var has = false;
			this.tracePreOrder(function (tracedTreeValue, tracedTree) {
				if (tracedTree === tree) {
					has = true;
				}
			});
			return has;
		}
		/**
   * Check if some thee is present in parents of some level
   * @param {Tree}
   * @return {boolean}
   * */

	}, {
		key: 'hasParent',
		value: function hasParent(tree) {
			var has = false;
			this.traceUpOrder(function (tracedTree) {
				if (tracedTree === tree) {
					has = true;
				}
			});
			return has;
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

var _FactTable = __webpack_require__(7);

var _FactTable2 = _interopRequireDefault(_FactTable);

var _Member = __webpack_require__(1);

var _Member2 = _interopRequireDefault(_Member);

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
		value: function anotherBuild(factTable, cells, dimensionsTrees, cellTable, factPrimaryKey) {

			// for each dimension
			dimensionsTrees.forEach(function (dimensionTree) {
				SnowflakeBuilder.anotherBuildOne(dimensionTree, cells, cellTable, factTable, factPrimaryKey);
			});
		}
	}, {
		key: 'anotherBuildOne',
		value: function anotherBuildOne(dimensionTree, cells, cellTable, factTable, factPrimaryKey) {
			// for each hierarchy and level of dimension
			dimensionTree.tracePostOrder(function (dimensionTable, dimensionTree) {
				SnowflakeBuilder.processDimension(dimensionTree, cells, cellTable, factTable, factPrimaryKey);
			});
		}
	}, {
		key: 'processDimension',
		value: function processDimension(dimensionTree, cells, cellTable, factTable, factPrimaryKey) {
			var isFirstLevel = dimensionTree.isFirstLevel();
			var dimensionTable = dimensionTree.getTreeValue();
			var dimension = dimensionTable.dimension,
			    _dimensionTable$keyPr = dimensionTable.keyProps,
			    keyProps = _dimensionTable$keyPr === undefined ? [] : _dimensionTable$keyPr,
			    _dimensionTable$other = dimensionTable.otherProps,
			    otherProps = _dimensionTable$other === undefined ? [] : _dimensionTable$other,
			    memberList = dimensionTable.members,
			    foreignKey = dimensionTable.foreignKey,
			    primaryKey = dimensionTable.primaryKey;

			var childIdAttributes = dimensionTree.getChildTrees().map(function (dimensionTree) {
				return dimensionTree.getTreeValue().foreignKey;
			});
			var childDimensions = dimensionTree.getChildTrees().map(function (dimensionTree) {
				return dimensionTree.getTreeValue().dimension;
			});

			var members = void 0;

			var existMemberCount = memberList.length;
			var args = [factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, cells, dimension, keyProps, otherProps, cells, isFirstLevel, cellTable];

			if (!childIdAttributes.length) {
				members = SnowflakeBuilder.makeMemberList.apply(null, args);
			} else {
				var entitiesParts = [];
				var _dimensionTable = dimensionTree.getDimensionTreeByDimension(childDimensions[0]).getTreeValue();
				var memberListForFilter = _dimensionTable.members;
				entitiesParts = SnowflakeBuilder.mapFilter(childIdAttributes[0], cells, memberListForFilter, _dimensionTable);
				members = SnowflakeBuilder.makeMemberListDependency.apply(null, args.concat([childIdAttributes, entitiesParts]));
			}

			// только после того как список сформирован, удалаять данные из ячеек
			cells.forEach(function (cell) {
				_FactTable2.default.deleteProps(cell, keyProps, factPrimaryKey);
				_FactTable2.default.deleteProps(cell, otherProps, factPrimaryKey);
			});

			members.forEach(function (member) {
				dimensionTable.addMember(member);
			});
		}
		/**
   * Method filter cells by members of a dimension
   * @param {string} foreignKey
   * @param {Cell[]} cells
   * @param {Member[]} memberList
   * @param {DimensionTable} dimensionTable
   * @private
   * @return {Cell[]}
   * */

	}, {
		key: 'mapFilter',
		value: function mapFilter(foreignKey, cells, memberList, dimensionTable) {
			var cellTables = [];
			//todo оптимизировать поиск через хеш
			memberList.forEach(function (member) {
				var cellTableFiltered = cells.filter(function (cell) {
					return cell[foreignKey] == dimensionTable.getMemberId(member);
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
		value: function makeMemberListDependency(factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, whatIsIt, dimension, keyProps, otherProps, cells, isFirstLevel, cellTable, childIdAttributes, entitiesParts) {
			var totalMemberList = [];

			var countId = 0;
			entitiesParts.forEach(function (entitiesPart) {
				if (entitiesPart.length) {
					var members = SnowflakeBuilder.makeMemberList(factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, entitiesPart, dimension, keyProps, otherProps, cells, isFirstLevel, cellTable, countId);
					countId = countId + members.length;

					var etalon = entitiesPart[0];

					childIdAttributes.forEach(function (childIdAttribute) {

						members.forEach(function (member) {
							member[childIdAttribute] = etalon[childIdAttribute];
							member[primaryKey] = existMemberCount + totalMemberList.length + 1;
							totalMemberList.push(member);
						});

						entitiesPart.forEach(function (entityPart) {
							delete entityPart[childIdAttribute];
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
   * @param {Cell[]} cellTable
   * @return {[]}
   * @private
   * */

	}, {
		key: 'makeMemberList',
		value: function makeMemberList(factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, entitiesPart, dimension) {
			var keyProps = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [];
			var otherProps = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [];
			var cells = arguments[9];
			var isFirstLevel = arguments[10];
			var cellTable = arguments[11];
			var startFrom = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 0;

			// соотношение созданных id к ключам
			var cache = {};
			var restoredCache = {};
			var members = [];

			// need restore cache
			var existedCells = cellTable.filter(function (cell) {
				return cells.indexOf(cell) === -1;
			});
			existedCells.forEach(function (cell) {
				// собрать ключ на основе ключевых значений
				var fact = factTable.find(function (fact) {
					return fact[factPrimaryKey] === cell[factPrimaryKey];
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
					cache[surrogateKey] = ++startFrom;
				}

				// оставить в нормальной форме ссылку на id под сущности
				var id = cache[surrogateKey];
				entityPart[foreignKey] = id;
			});

			Object.keys(cache).forEach(function (key) {
				var id = cache[key];
				var entityPart = entitiesPart.find(function (entityPart) {
					return entityPart[foreignKey] === id;
				});
				var member = _Member2.default.create(id, [].concat(keyProps).concat(otherProps), entityPart, primaryKey);
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
			var _this = this;

			// first remove cells
			removedCells.forEach(function (removedCell) {
				var index = cellTable.indexOf(removedCell);
				if (index !== -1) {
					cellTable.splice(index, 1);
				}
			});
			// then remove members
			removedCells.forEach(function (fact) {
				dimensionHierarchies.forEach(function (dimensionTree) {
					SnowflakeBuilder.travers([fact], dimensionTree, [SnowflakeBuilder.removeMembers.bind(_this, cube, dimensionTree), SnowflakeBuilder.restoreCell]);
				});
			});
		}

		/**
   * Method allows to generate fact tables from cells
   * */

	}, {
		key: 'denormalize',
		value: function denormalize(cellTable, dimensionHierarchies) {
			var factTable = new _FactTable2.default();
			var facts = factTable.getFacts();
			cellTable.forEach(function (cell) {
				facts.push(_extends({}, cell));
			});
			facts.forEach(function (fact) {
				dimensionHierarchies.forEach(function (dimensionTree) {
					SnowflakeBuilder.travers([fact], dimensionTree, [SnowflakeBuilder.restoreCell]);
				});
			});

			return facts;
		}
	}, {
		key: 'restoreCell',
		value: function restoreCell(member, memberList, dimension, cell, foreignKey, dimensionTable) {
			var memberCopy = new _Member2.default(member);
			dimensionTable.deleteMemberId(memberCopy);
			delete cell[foreignKey];
			_extends(cell, memberCopy);
		}
	}, {
		key: 'removeMembers',
		value: function removeMembers(cube, dimensionTree, member, memberList, dimension, cell, foreignKey) {
			var _cube$projection = cube.projection(_defineProperty({}, dimension, member)),
			    cellTable = _cube$projection.cellTable;

			var dimensionTable = dimensionTree.getDimensionTreeByDimension(dimension).getTreeValue();
			// last cell was removed at the beginning of the algorithm,
			// so if the member is no longer used, the projection will be empty
			if (!cellTable.length) {
				dimensionTable.removeMember(member);
			}
		}
	}, {
		key: 'travers',
		value: function travers(cellTable, dimensionTree) {
			var handlers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

			var handleDimensionTree = function handleDimensionTree(dimensionTree, cell) {
				var dimensionTable = dimensionTree.getTreeValue();
				var dimension = dimensionTable.dimension,
				    memberList = dimensionTable.members,
				    foreignKey = dimensionTable.foreignKey;

				var idValue = cell[foreignKey];
				var member = memberList.find(function (member) {
					return dimensionTable.getMemberId(member) === idValue;
				});
				handlers.forEach(function (handler) {
					handler(member, memberList, dimension, cell, foreignKey, dimensionTable);
				});
			};
			cellTable.forEach(function (cell) {
				dimensionTree.tracePreOrder(function (value, tracedDimensionTree) {
					handleDimensionTree(tracedDimensionTree, cell);
				});
			});
		}

		/**
   * Method allows to delete dimensionTree from cube,
   * the cells will be restored, and the members of the measurement are also deleted
   * */

	}, {
		key: 'destroyDimensionTree',
		value: function destroyDimensionTree(cellTable, removedCells, dimensionTree, cube) {
			SnowflakeBuilder.travers(cellTable, dimensionTree, [SnowflakeBuilder.removeMembers.bind(this, cube, dimensionTree), SnowflakeBuilder.restoreCell]);
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

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Tuple = __webpack_require__(16);

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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Space = function () {
	function Space() {
		_classCallCheck(this, Space);
	}

	_createClass(Space, null, [{
		key: "union",

		/**
   *
   * */
		value: function union() {
			var newSpace = {};
			var arg = [].concat(Array.prototype.slice.call(arguments));
			arg.forEach(function (space) {
				Space.add(newSpace, space);
			});
			return newSpace;
		}
		/**
   *
   * */

	}, {
		key: "add",
		value: function add(targetSpace, otherSpace) {
			Object.keys(otherSpace).forEach(function (key) {
				if (!targetSpace[key]) {
					targetSpace[key] = [];
				}
				Array.prototype.push.apply(targetSpace[key], otherSpace[key]);
			});
		}
	}]);

	return Space;
}();

exports.default = Space;

/***/ })
/******/ ])["default"];
});