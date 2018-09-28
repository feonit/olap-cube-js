/*!
 * Version: "0.15.1"
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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

var InsufficientRollupData = exports.InsufficientRollupData = function InsufficientRollupData(dimension, id) {
	_classCallCheck(this, InsufficientRollupData);

	this.message = 'Can\'t add member, member for rollup dimension: ' + dimension + ' with id: ' + id + ' not found';
};

var NotFoundFactId = exports.NotFoundFactId = function NotFoundFactId(name) {
	_classCallCheck(this, NotFoundFactId);

	this.message = 'In fact data, no property was found with the name: ' + name;
};

var NotCompletelySpaceException = exports.NotCompletelySpaceException = function NotCompletelySpaceException(dimension) {
	_classCallCheck(this, NotCompletelySpaceException);

	this.message = 'Not completely defined space for added member, not found member for dimension: "' + dimension + '"';
};

var CantAddMemberRollupException = exports.CantAddMemberRollupException = function CantAddMemberRollupException(dimension, id) {
	_classCallCheck(this, CantAddMemberRollupException);

	this.message = 'Can\'t add member, rollup dimension: ' + dimension + ' with id: ' + id + ' not found';
};

var CreateInstanceException = exports.CreateInstanceException = function CreateInstanceException() {
	_classCallCheck(this, CreateInstanceException);

	this.message = 'this must have prototype of Cube';
};

var DimensionException = exports.DimensionException = function DimensionException(dimension) {
	_classCallCheck(this, DimensionException);

	this.message = 'For the name "' + dimension + '" the dimension is already set';
};

var handleError = exports.handleError = function handleError(error) {
	error.message = '[Cube] ' + error.message;
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
 *
 * These are aggregated data
 *
 * summary - to describe the values of data in cells
 *
 * each cell is an intersection of all the dimensions of the cube
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DimensionTable = __webpack_require__(7);

var _DimensionTable2 = _interopRequireDefault(_DimensionTable);

var _Tree2 = __webpack_require__(12);

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
		    _dimensionTree$level = dimensionTree.level,
		    level = _dimensionTree$level === undefined ? [] : _dimensionTree$level,
		    _dimensionTree$parent = dimensionTree.parentNode,
		    parentNode = _dimensionTree$parent === undefined ? null : _dimensionTree$parent;


		Object.defineProperties(_this, {
			dimensionTable: {
				/**
     * @property
     * @name DimensionTree#dimensionTable
     * */
				value: _DimensionTable2.default.createDimensionTable(dimensionTable),
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
			level: {
				/**
     * @property {DimensionTree[]}
     * @name DimensionTree#level
     * */
				value: level.map(function (dimensionTreeData) {
					return new DimensionTree(_extends({}, dimensionTreeData, { parentNode: _this }));
				}),
				enumerable: true,
				editable: false
			}
		});
		_this.validate();
		return _this;
	}

	_createClass(DimensionTree, [{
		key: 'validate',
		value: function validate() {
			var dimensions = [];
			this.tracePostOrder(function (tracedDimensionTreeValue) {
				var dimension = tracedDimensionTreeValue.dimension;

				if (dimensions.indexOf(dimension) === -1) {
					dimensions.push(dimension);
				} else {
					throw new _errors.DimensionException();
				}
			});
		}
	}, {
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
			return this.level;
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
			// 1 create copy of hierarchy with empty members
			var newDimensionTreeByMember = this.cloneDimensionTreeWithoutMembers();

			this.projectDrillDown(newDimensionTreeByMember, member);
			this.projectDrillUp(newDimensionTreeByMember, member);

			return newDimensionTreeByMember;
		}
		// насытить связными данными снизу

	}, {
		key: 'projectDrillDown',
		value: function projectDrillDown(dimensionTree, member) {
			var _this2 = this;

			var lastTracedMembers = void 0;
			var lastTracedDimensionTree = void 0;
			// 2 trace up
			this.traceUpOrder(function (tracedTree) {
				var _tracedTree$getTreeVa = tracedTree.getTreeValue(),
				    tracedDimension = _tracedTree$getTreeVa.dimension;

				// 3 get drill down of last members


				var drillDownedMembers = tracedTree == _this2 ? [member] : lastTracedDimensionTree.drillDownDimensionMembers(lastTracedMembers);

				// 4 set members
				dimensionTree.getDimensionTreeByDimension(tracedDimension).getTreeValue().setMemberList(drillDownedMembers);

				// 5 save current dimension and drill downed members
				lastTracedMembers = drillDownedMembers;
				lastTracedDimensionTree = tracedTree;
			});
		}
		// насытить связными данными сверху

	}, {
		key: 'projectDrillUp',
		value: function projectDrillUp(dimensionTree, member) {
			var _this3 = this;

			var lastTracedMembers2 = void 0;
			var lastTracedDimensionTree2 = void 0;
			this.tracePreOrder(function (b, tracedTree) {
				var _tracedTree$getTreeVa2 = tracedTree.getTreeValue(),
				    tracedDimension = _tracedTree$getTreeVa2.dimension;

				var drillUppedMembers = tracedTree == _this3 ? [member] : lastTracedDimensionTree2.drillUpDimensionMembers(lastTracedMembers2);

				dimensionTree.getDimensionTreeByDimension(tracedDimension).getTreeValue().setMemberList(drillUppedMembers);

				lastTracedMembers2 = drillUppedMembers;
				lastTracedDimensionTree2 = tracedTree;
			});
		}
	}, {
		key: 'cloneDimensionTreeWithoutMembers',
		value: function cloneDimensionTreeWithoutMembers() {
			// todo new members must be not created here
			var clone = new DimensionTree(this.getRoot());
			clone.tracePostOrder(function (dimensionTreeValue, dimensionTree) {
				var dimensionTable = dimensionTree.getTreeValue();
				dimensionTable.clearMemberList();
			});
			return clone;
		}
		/**
   * @public
   * @param {Member} member
   * */

	}, {
		key: 'removeProjectionOntoMember',
		value: function removeProjectionOntoMember(member) {
			// 1 get projection
			var projectionDimensionTree = this.cloneDimensionTreeWithoutMembers();
			this.projectDrillDown(projectionDimensionTree, member);

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
			var _this4 = this;

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
				this.tracePreOrder(function (dimensionTable, tracedDimensionTree) {
					var childMembers = dimensionTable.members,
					    childDimension = dimensionTable.dimension;

					toBeRemovedSpace[childDimension] = childMembers;
				});
			}

			// remove removal space
			Object.keys(toBeRemovedSpace).forEach(function (dimension) {
				var currentDimensionTree = _this4.getDimensionTreeByDimension(dimension);
				var dimensionTable = currentDimensionTree.getTreeValue();
				toBeRemovedSpace[dimension].forEach(function (member) {
					dimensionTable.removeMember(member);
				});
			});
		}
	}, {
		key: 'unionDimensionTree',
		value: function unionDimensionTree(dimensionTree) {
			var _this5 = this;

			var toBeAddedSpace = {};
			dimensionTree.tracePostOrder(function (dimensionTreeValue) {
				var dimension = dimensionTreeValue.dimension,
				    members = dimensionTreeValue.members;

				toBeAddedSpace[dimension] = members;
			});
			var memberList = this.getTreeValue().members;

			// if (memberList.length === 1){
			// 	this.tracePreOrder((dimensionTable, tracedDimensionTree) => {
			// 		const {members: childMembers, dimension: childDimension} = dimensionTable;
			// 		toBeAddedSpace[childDimension] = childMembers;
			// 	})
			// }
			Object.keys(toBeAddedSpace).forEach(function (dimension) {
				var currentDimensionTree = _this5.getDimensionTreeByDimension(dimension);
				var dimensionTable = currentDimensionTree.getTreeValue();
				toBeAddedSpace[dimension].forEach(function (member) {
					dimensionTable.addMember(member);
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

			var dimensionTable = this.getTreeValue();
			var foreignKey = dimensionTable.foreignKey;

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
		key: 'drillUpDimensionMembers',
		value: function drillUpDimensionMembers() {
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
   * @param {object?} memberOptions
   * */

	}, {
		key: 'createMember',
		value: function createMember() {
			var memberOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var dimensionTable = this.getTreeValue();
			var childIdAttributes = this.getChildTrees().map(function (dimensionTree) {
				return dimensionTree.getTreeValue().foreignKey;
			});
			var linkProps = [];
			childIdAttributes.forEach(function (foreignKey) {
				linkProps.push(foreignKey);
			});
			return dimensionTable.createMember(memberOptions, linkProps);
		}
	}], [{
		key: 'createDimensionTree',
		value: function createDimensionTree(dimensionTreeData) {
			return new DimensionTree(dimensionTreeData);
		}
	}, {
		key: 'createProxyDimensionTree',
		value: function createProxyDimensionTree(dimensionTree) {
			var newDimensionTree = dimensionTree.cloneDimensionTreeWithoutMembers();
			dimensionTree.tracePostOrder(function (tracedTreeValue) {
				var tracedDimension = tracedTreeValue.dimension,
				    members = tracedTreeValue.members;


				newDimensionTree.getDimensionTreeByDimension(tracedDimension).getTreeValue().setMemberList(members);
			});
			return newDimensionTree;
		}
	}]);

	return DimensionTree;
}(_Tree3.default);

exports.default = DimensionTree;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Member = __webpack_require__(1);

var _Member2 = _interopRequireDefault(_Member);

var _const = __webpack_require__(2);

var _InputMember = __webpack_require__(11);

var _InputMember2 = _interopRequireDefault(_InputMember);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Dimension is a dimension of a cube. A dimension is a primary organizer of measure and attribute information in a cube
 * A dimension will contain some members organized in some hierarchy or hierarchies containing levels.
 * */
var DimensionTable = function () {
	function DimensionTable(_ref) {
		var _this = this;

		var dimension = _ref.dimension,
		    _ref$foreignKey = _ref.foreignKey,
		    foreignKey = _ref$foreignKey === undefined ? DimensionTable.genericId(dimension) : _ref$foreignKey,
		    _ref$primaryKey = _ref.primaryKey,
		    primaryKey = _ref$primaryKey === undefined ? _const.DEFAULT_MEMBER_ID_PROP : _ref$primaryKey,
		    keyProps = _ref.keyProps,
		    _ref$otherProps = _ref.otherProps,
		    otherProps = _ref$otherProps === undefined ? [] : _ref$otherProps,
		    _ref$members = _ref.members,
		    members = _ref$members === undefined ? [] : _ref$members,
		    _ref$defaultMemberOpt = _ref.defaultMemberOptions,
		    defaultMemberOptions = _ref$defaultMemberOpt === undefined ? {} : _ref$defaultMemberOpt;

		_classCallCheck(this, DimensionTable);

		if (!dimension || !keyProps) {
			throw Error('Bad definition DimensionTable, params \"dimension\" and \"keyProps\" is required');
		}
		if (Object.keys(defaultMemberOptions).indexOf(primaryKey) !== -1) {
			throw Error('Bad definition DimensionTable, \"defaultMemberOptions\" must not contain a \"primaryKey\" property');
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
		this.members = members.map(function (memberData) {
			return new _Member2.default(memberData, _this.primaryKey);
		});
		/** member default property options */
		this.defaultMemberOptions = _extends({}, defaultMemberOptions);
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
				console.log('boo');
			}
		}
		/**
   * @public
   * @param {object} memberOptions
   * @param {[]} linkProps
   * */

	}, {
		key: 'createMember',
		value: function createMember() {
			var memberOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var linkProps = arguments[1];

			// todo тут нужна проверка на то, что все данные для члена измерения присутствуют
			var memberData = _extends({}, this.defaultMemberOptions, memberOptions);
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
		/**
   * @public
   * A way to create a name for a property in which a unique identifier will be stored
   * */

	}, {
		key: 'genericId',
		value: function genericId(dimension) {
			return _const.DEFAULT_TEMPLATE_FOREIGN_KEY.replace('%s', dimension);
		}
	}, {
		key: 'createDimensionTable',
		value: function createDimensionTable(dimensionTable) {
			return new DimensionTable(dimensionTable);
		}
	}]);

	return DimensionTable;
}();

exports.default = DimensionTable;

/***/ }),
/* 8 */
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

/**
 * @throw {NotFoundFactId}
 * */
var FactTable = function () {
	function FactTable() {
		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    _ref$facts = _ref.facts,
		    facts = _ref$facts === undefined ? [] : _ref$facts,
		    _ref$primaryKey = _ref.primaryKey,
		    primaryKey = _ref$primaryKey === undefined ? _const.DEFAULT_FACT_ID_PROP : _ref$primaryKey;

		var defaultFactOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, FactTable);

		this.primaryKey = primaryKey;
		this.facts = facts.map(function (factData) {
			return new _Fact2.default(factData);
		});
		this.defaultFactOptions = defaultFactOptions;
		this.facts.forEach(this.validateFactData.bind(this));
	}

	_createClass(FactTable, [{
		key: 'getFacts',
		value: function getFacts() {
			return this.facts;
		}
	}, {
		key: 'validateFactData',
		value: function validateFactData(factData) {
			if (!factData.hasOwnProperty(this.primaryKey)) {
				throw new _errors.NotFoundFactId(this.primaryKey);
			}
		}
	}], [{
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
}();

exports.default = FactTable;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SubCube = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.cartesian = cartesian;

var _EmptyCell = __webpack_require__(10);

var _EmptyCell2 = _interopRequireDefault(_EmptyCell);

var _Member = __webpack_require__(1);

var _Member2 = _interopRequireDefault(_Member);

var _DimensionTree = __webpack_require__(6);

var _DimensionTree2 = _interopRequireDefault(_DimensionTree);

var _DimensionHierarchy = __webpack_require__(13);

var _DimensionHierarchy2 = _interopRequireDefault(_DimensionHierarchy);

var _DimensionTable = __webpack_require__(7);

var _DimensionTable2 = _interopRequireDefault(_DimensionTable);

var _FactTable = __webpack_require__(8);

var _FactTable2 = _interopRequireDefault(_FactTable);

var _errors = __webpack_require__(0);

var _SnowflakeBuilder = __webpack_require__(14);

var _SnowflakeBuilder2 = _interopRequireDefault(_SnowflakeBuilder);

var _console = __webpack_require__(5);

var _console2 = _interopRequireDefault(_console);

var _Tuple = __webpack_require__(15);

var _Tuple2 = _interopRequireDefault(_Tuple);

var _Space = __webpack_require__(16);

var _Space2 = _interopRequireDefault(_Space);

var _Cell = __webpack_require__(3);

var _Cell2 = _interopRequireDefault(_Cell);

var _const = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CellTable = function CellTable(_ref) {
	var cells = _ref.cells,
	    primaryKey = _ref.primaryKey,
	    _ref$defaultFactOptio = _ref.defaultFactOptions,
	    defaultFactOptions = _ref$defaultFactOptio === undefined ? {} : _ref$defaultFactOptio;

	_classCallCheck(this, CellTable);

	this.cells = cells.map(function (cellData) {
		if (cellData instanceof _Cell2.default) {
			return cellData;
		} else {
			return _EmptyCell2.default.isEmptyCell(cellData) ? new _EmptyCell2.default(cellData) : new _Cell2.default(cellData);
		}
	});
	this.primaryKey = primaryKey;
	this.defaultFactOptions = defaultFactOptions;
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
		    cellTable = _cube$cellTable === undefined ? {} : _cube$cellTable;

		if (Array.isArray(cellTable)) {
			cellTable = { cells: cellTable };
			_console2.default.warnOnce('first argument \"cells\" as array type is deprecated now, use object for describe fact table');
		}
		var _cellTable = cellTable,
		    _cellTable$cells = _cellTable.cells,
		    cells = _cellTable$cells === undefined ? [] : _cellTable$cells,
		    _cellTable$primaryKey = _cellTable.primaryKey,
		    primaryKey = _cellTable$primaryKey === undefined ? _const.DEFAULT_FACT_ID_PROP : _cellTable$primaryKey,
		    _cellTable$defaultFac = _cellTable.defaultFactOptions,
		    defaultFactOptions = _cellTable$defaultFac === undefined ? {} : _cellTable$defaultFac;


		this.dimensionHierarchies = dimensionHierarchies.map(function (dimensionHierarchy) {
			// duck
			if (dimensionHierarchy.hierarchy) {
				if (dimensionHierarchy instanceof _DimensionHierarchy2.default) {
					return dimensionHierarchy;
				} else {
					return _DimensionHierarchy2.default.createDimensionHierarchy(dimensionHierarchy);
				}
			} else if (dimensionHierarchy.dimensionTable) {
				if (dimensionHierarchy instanceof _DimensionTree2.default) {
					return dimensionHierarchy;
				} else {
					return _DimensionTree2.default.createDimensionTree(dimensionHierarchy);
				}
			} else {
				if (dimensionHierarchy instanceof _DimensionTable2.default) {
					return dimensionHierarchy;
				} else {
					return _DimensionTable2.default.createDimensionTable(dimensionHierarchy);
				}
			}
		});
		this.cellTable = new CellTable({ cells: cells, primaryKey: primaryKey, defaultFactOptions: _extends({}, defaultFactOptions) });
		// const residuals = residuals(this);
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
  * @return {Cube}
  * */


	_createClass(Cube, [{
		key: 'slice',

		/**
   * is the act of picking a rectangular subset of a cube by choosing a single value
   * for one of its dimensions, creating a new cube with one fewer dimension.
   * @public
   * @param {string} dimension
   * @param {Member} member
   * @return {Cube}
   * */
		value: function slice(dimension, member) {
			return this.dice(_defineProperty({}, dimension, member));
		}
		/**
   * @public
   * @param {object} set
   * @return {Cube}
   * */

	}, {
		key: 'dice',
		value: function dice(set) {
			var _this = this;

			// 1 make one projection on to member
			var fixSpace = {};
			Object.keys(set).forEach(function (dimension) {
				// work with arrays
				fixSpace[dimension] = Array.isArray(set[dimension]) ? set[dimension] : [set[dimension]];

				var dimensionTree = findDimensionTreeByDimension.call(_this, dimension);

				// discard non-existent dimensions
				if (!dimensionTree) {
					_console2.default.warn('Not existed dimension: ' + dimension);
					return;
				}
				var dimensionTable = dimensionTree.getTreeValue();
				fixSpace[dimension].forEach(function (memberData, index) {
					var members = _this.getDimensionMembers(dimension);
					var member = members.find(function (member) {
						return dimensionTable.getMemberId(member) === dimensionTable.getMemberId(memberData);
					});
					fixSpace[dimension][index] = member;
					if (!memberData) {
						_console2.default.warn('Not found member by id ' + dimensionTable.getMemberId(member));
					}
				});
			});

			var dimensionHierarchiesLength = this.dimensionHierarchies.length;
			if (Object.keys(fixSpace).length > dimensionHierarchiesLength) {
				throw Error('Set must have a size not more than ' + dimensionHierarchiesLength + ' dimensions');
			}

			var projectionDimensionHierarchies = [];

			// for every dimension in set
			var totalSpaces = Object.keys(fixSpace).map(function (dimension) {

				var dimensionTreeProjection = void 0;
				// ищется его расширенная версия для каждого члена
				var spacesForCells = fixSpace[dimension].map(function (member) {

					var searchedInTree = findDimensionTreeByDimension.call(_this, dimension);

					var current = searchedInTree.cloneDimensionTreeWithoutMembers();

					searchedInTree.projectDrillDown(current, member);
					searchedInTree.projectDrillUp(current, member);

					if (dimensionTreeProjection) {
						dimensionTreeProjection.unionDimensionTree(current);
					} else {
						dimensionTreeProjection = current;
					}

					var _dimensionTreeProject = dimensionTreeProjection.getRoot().getTreeValue(),
					    dimensionProjection = _dimensionTreeProject.dimension,
					    membersProjection = _dimensionTreeProject.members;

					return _defineProperty({}, dimensionProjection, membersProjection);
				});

				if (dimensionTreeProjection) {
					projectionDimensionHierarchies.push(dimensionTreeProjection);
				}

				// после чего эти расширенные версии объекдиняются
				var totalSpace = _Space2.default.union.apply(_Space2.default, _toConsumableArray(spacesForCells));

				return totalSpace;
			});

			// фильтрация продолжается
			var filteredCellTable = this.getCells();

			var cellBelongsToSpace = function cellBelongsToSpace(cell, space) {
				var somePropOfCellNotBelongToSpace = Object.keys(space).some(function (dimension) {
					var members = space[dimension];

					var _findDimensionTreeByD = findDimensionTreeByDimension.call(_this, dimension).getTreeValue(),
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

			// 2 create new list of dimensionHierarchies
			var newDimensionHierarchies = [];
			this.dimensionHierarchies.forEach(function (originalDimensionHierarchy) {
				var finded = false;
				projectionDimensionHierarchies.forEach(function (projectionDimensionHierarchy) {
					if (originalDimensionHierarchy.getTreeValue().dimension === projectionDimensionHierarchy.getTreeValue().dimension) {
						newDimensionHierarchies.push(projectionDimensionHierarchy);
						finded = true;
					}
				});
				if (!finded) {
					var _originalDimensionHie = originalDimensionHierarchy.getTreeValue(),
					    members = _originalDimensionHie.members,
					    dimension = _originalDimensionHie.dimension;

					var projectionDimensionHierarchy = _DimensionTree2.default.createProxyDimensionTree(originalDimensionHierarchy);
					members.forEach(function (member) {
						var memberBelongToCells = false;
						filteredCellTable.forEach(function (filteredCell) {
							if (cellBelongsToSpace(filteredCell, _defineProperty({}, dimension, [member]))) {
								memberBelongToCells = true;
							}
						});
						if (!memberBelongToCells) {
							var has = projectionDimensionHierarchy.getTreeValue().members.indexOf(member) !== -1;
							if (has) {
								projectionDimensionHierarchy.removeProjectionOntoMember(member);
							}
						}
					});

					newDimensionHierarchies.push(projectionDimensionHierarchy);
				}
			});

			return new SubCube({
				cellTable: filteredCellTable,
				dimensionHierarchies: newDimensionHierarchies,
				originalCube: this.originalCube || this,
				previousCube: this
			});
		}
		/**
   * The cube introduces generalization relations
   * it's operations on dimension hierarchies
   * @public
   * @param {string} hierarchy
   * @param {string} targetDimension
   * @return {Cube}
   * */

	}, {
		key: 'drillUp',
		value: function drillUp(hierarchy, targetDimension) {
			var currentHierarchy = getHierarchy.call(this, hierarchy);
			if (currentHierarchy && currentHierarchy.hasDimension(targetDimension)) {
				currentHierarchy.setActiveDimension(targetDimension);
			}
			return this;
		}
		/**
   * The cube introduced specialization relations
   * it's operations on dimension hierarchies
   * @public
   * @param {string} hierarchy
   * @param {string} targetDimension
   * @return {Cube}
   * */

	}, {
		key: 'drillDown',
		value: function drillDown(hierarchy, targetDimension) {
			var currentHierarchy = getHierarchy.call(this, hierarchy);
			if (currentHierarchy && currentHierarchy.hasDimension(targetDimension)) {
				currentHierarchy.setActiveDimension(targetDimension);
			}
			return this;
		}
		/**
   * @public
   * @return {FactTable} returns facts
   * */

	}, {
		key: 'getFacts',
		value: function getFacts() {
			return denormalize.call(this, this.getCells());
		}
		/**
   * @public
   * @param {Object[]} facts
   * @return {Cube}
   * */

	}, {
		key: 'addFacts',
		value: function addFacts(facts) {
			var newFactTable = new _FactTable2.default({ facts: facts, primaryKey: this.cellTable.primaryKey });
			var cells = newFactTable.getFacts().map(function (fact) {
				return new _Cell2.default(fact);
			});
			[].push.apply(this.getCells(), cells);
			var factTable = this.getFacts();
			_SnowflakeBuilder2.default.anotherBuild(factTable, cells, getDimensionTrees.call(this), this.getCells(), this.cellTable.primaryKey);
			return this;
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
   * @return {Cell[]}
   * */

	}, {
		key: 'getCells',
		value: function getCells() {
			return this.cellTable.cells;
		}
		/**
   * @public
   * @param {Cell[]} cells
   * */

	}, {
		key: 'removeCells',
		value: function removeCells(cells) {
			_SnowflakeBuilder2.default.destroy(this.getCells(), cells, this.dimensionHierarchies, this);
		}
		/**
   * @public
   * @param {string} dimension - dimension from which the member will be found
   * @return {Member[]} returns members
   * */

	}, {
		key: 'getDimensionMembers',
		value: function getDimensionMembers(dimension) {
			return findDimensionTreeByDimension.call(this, dimension).getTreeValue().members;
		}
		/**
   * @public
   * @param {string} dimension - dimension in which the member is created
   * @param {object?} customMemberOptions - properties for the created member
   * @param {object?} rollupCoordinatesData
   * @param {object?} drillDownCoordinatesOptions
   * @param {object?} cellData
   * @throw {InsufficientRollupData}
   * */

	}, {
		key: 'addDimensionMember',
		value: function addDimensionMember(dimension) {
			var customMemberOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var rollupCoordinatesData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			var _this2 = this;

			var drillDownCoordinatesOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
			var cellData = arguments[4];

			// todo №1, а если члены с такими ключами уже существуют, нужнен варнинг, потому что, после десериализации член исчезнет, если не будут изменены значения ключевых полей
			if (typeof dimension !== 'string') {
				throw TypeError('parameter dimension expects as string: ' + dimension);
			}
			var rollupCoordinates = {};
			Object.keys(rollupCoordinatesData).forEach(function (dimension) {
				var memberData = rollupCoordinatesData[dimension];
				var memberList = _this2.getDimensionMembers(dimension);
				var dimensionTable = findDimensionTreeByDimension.call(_this2, dimension).getTreeValue();
				var primaryKey = dimensionTable.primaryKey;

				var id = memberData[primaryKey];
				var find = memberList.find(function (member) {
					return id === dimensionTable.getMemberId(member);
				});
				if (!find) {
					throw new _errors.InsufficientRollupData(dimension, id);
				} else {
					rollupCoordinates[dimension] = find;
				}
			});
			var dimensionTree = findDimensionTreeByDimension.call(this, dimension);
			var childDimensionTrees = dimensionTree.getChildTrees();
			var dimensionTable = dimensionTree.getTreeValue();
			var foreignKey = dimensionTable.foreignKey;

			var foreignKeysMemberData = {};
			childDimensionTrees.forEach(function (childDimensionTree) {
				var dimensionTable = childDimensionTree.getTreeValue();
				var dimension = dimensionTable.dimension,
				    foreignKey = dimensionTable.foreignKey,
				    primaryKey = dimensionTable.primaryKey;

				var member = rollupCoordinatesData[dimension];
				if (!member) {
					throw new _errors.InsufficientRollupData(dimension);
				} else {
					foreignKeysMemberData[foreignKey] = member[primaryKey];
				}
			});
			// todo проверить, что customMemberOptions не содержит внешних ключей
			var memberOptions = _extends({}, customMemberOptions, foreignKeysMemberData);

			var saveMember = dimensionTree.createMember(memberOptions);
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
			this.fillEmptyCells(cellData);
		}
		/**
   * @public
   * @param {string} dimension - dimension from which the member will be removed
   * @param {Member} member - the member will be removed
   * */

	}, {
		key: 'removeDimensionMember',
		value: function removeDimensionMember(dimension, member) {
			var dimensionTree = findDimensionTreeByDimension.call(this, dimension);
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
   * @param {object|DimensionTree} dimensionHierarchy
   * */

	}, {
		key: 'addDimensionHierarchy',
		value: function addDimensionHierarchy(dimensionHierarchy) {
			var dimensionTree = _DimensionTree2.default.createDimensionTree(dimensionHierarchy);
			this.dimensionHierarchies.push(dimensionTree);
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
   * @return {EmptyCell[]}
   * */

	}, {
		key: 'createEmptyCells',
		value: function createEmptyCells(cellOptions) {
			var _this3 = this;

			var emptyCells = [];
			var tuples = cartesian(this);
			tuples.forEach(function (combination) {
				var unique = _this3.dice(combination).getCells();
				if (!unique.length) {
					var foreignKeysCellData = {};
					Object.keys(combination).forEach(function (dimension) {
						var dimensionTable = findDimensionTreeByDimension.call(_this3, dimension).getTreeValue();
						var foreignKey = dimensionTable.foreignKey;

						foreignKeysCellData[foreignKey] = dimensionTable.getMemberId(combination[dimension]);
					});
					var cellData = _extends({}, foreignKeysCellData, cellOptions);
					// todo нужна правеврка на то, что все свойства присутствуют
					var cell = _EmptyCell2.default.createEmptyCell(cellData);
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
   * @return {boolean}
   * */

	}, {
		key: 'isEmptyCell',
		value: function isEmptyCell(cell) {
			return _EmptyCell2.default.isEmptyCell(cell);
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
   * @public
   * Filling method for full size of cube
   * @param {object?} customCellOptions - properties for empty cells
   * */

	}, {
		key: 'fillEmptyCells',
		value: function fillEmptyCells() {
			var customCellOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var cellOptions = _extends({}, this.cellTable.defaultFactOptions, customCellOptions);
			if (!residuals(this).length) {
				var emptyCells = this.createEmptyCells(cellOptions);
				this.addEmptyCells(emptyCells);
			}
		}
		/**
   * @param {EmptyCell[]} emptyCells
   * @throw {TypeError}
   * */

	}], [{
		key: 'create',
		value: function create(factTable) {
			var dimensionHierarchies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

			if (Array.isArray(factTable)) {
				factTable = { facts: factTable };
				_console2.default.warnOnce('first argument \"facts\" as array type is deprecated now, use object for describe fact table');
			}
			var _factTable = factTable,
			    _factTable$facts = _factTable.facts,
			    facts = _factTable$facts === undefined ? [] : _factTable$facts,
			    primaryKey = _factTable.primaryKey,
			    _factTable$defaultFac = _factTable.defaultFactOptions,
			    defaultFactOptions = _factTable$defaultFac === undefined ? {} : _factTable$defaultFac;

			if (!(Cube.isPrototypeOf(this) || Cube === this)) {
				throw new _errors.CreateInstanceException();
			}

			var cube = new this({
				cellTable: { primaryKey: primaryKey, defaultFactOptions: defaultFactOptions },
				dimensionHierarchies: dimensionHierarchies
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

/**
 * SubCube is the target cube whose members are members of the source cube.
 * */


var SubCube = exports.SubCube = function (_Cube) {
	_inherits(SubCube, _Cube);

	function SubCube(_ref3) {
		var originalCube = _ref3.originalCube,
		    previousCube = _ref3.previousCube,
		    rest = _objectWithoutProperties(_ref3, ['originalCube', 'previousCube']);

		_classCallCheck(this, SubCube);

		/** link for chaining between operations */
		var _this4 = _possibleConstructorReturn(this, (SubCube.__proto__ || Object.getPrototypeOf(SubCube)).call(this, rest));

		_this4.originalCube = originalCube;
		/** link for chaining between operations */
		_this4.previousCube = previousCube;
		return _this4;
	}

	return SubCube;
}(Cube);

/**
 * @this {Cube}
 * @return {DimensionHierarchy}
 * */


function getHierarchy(hierarchy) {
	return this.dimensionHierarchies.find(function (dimensionHierarchy) {
		return dimensionHierarchy.getHierarchy() === hierarchy;
	});
}
/**
 * @this {Cube}
 * @return {DimensionTree}
 * */
function findDimensionTreeByDimension(dimension) {
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
 * @this {Cube}
 * @return {DimensionTree[]}
 * */
function getDimensionTrees() {
	return this.dimensionHierarchies.map(function (dimensionHierarchy) {
		return dimensionHierarchy.getDimensionTree ? dimensionHierarchy.getDimensionTree() : dimensionHierarchy;
	});
}
/**
 * Cartesian product - list of all possible tuples
 * @param {Cube} cube
 * @return {Tuple[]}
 * */
function cartesian(cube) {
	var f = function f(a, b) {
		var _ref4;

		return (_ref4 = []).concat.apply(_ref4, _toConsumableArray(a.map(function (d) {
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

	var set = cube.dimensionHierarchies.map(function (dimensionTree) {
		return dimensionTree.getTreeValue();
	}).map(function (dimensionTable) {
		dimensionsOrder.push(dimensionTable.dimension);
		return dimensionTable.members;
	});

	var tupleList = [];

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
			tupleList.push(new _Tuple2.default(item));
			return item;
		});
	}

	return tupleList;
}
/**
 * @private
 * Get facts from cube
 * */
function denormalize() {
	var _this5 = this;

	var cells = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getCells();
	var forSave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	var data = _SnowflakeBuilder2.default.denormalize(cells, getDimensionTrees.call(this));
	if (forSave) {
		data.forEach(function (data, index) {
			if (cells[index] instanceof _EmptyCell2.default) {
				delete data[_this5.cellTable.primaryKey];
			}
		});
	}
	return data;
}
/**
 * @public
 * Residuals - list of tuples, according to which there is more than one member
 * @return {Tuple[]}
 * */
function residuals(cube) {
	var tuples = cartesian(cube);
	var totalTuples = [];
	tuples.forEach(function (tuple) {
		var partFacts = cube.dice(tuple).getFacts();
		if (partFacts.length > 1) {
			totalTuples.push(tuple);
		}
	});
	return totalTuples;
}
/**
 * Unfilled - list of tuples, in accordance with which there is not a single member
 * @this {Cube}
 * */
function unfilled() {
	var _this6 = this;

	var tuples = this.cartesian();
	var unfilled = [];
	tuples.forEach(function (tuple) {
		var members = _this6.dice(tuple).getFacts(tuple);
		if (members.length === 0) {
			unfilled.push(tuple);
		}
	});
	return unfilled;
}

exports.default = Cube;

/***/ }),
/* 10 */
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

/**
 * Empty cells - in the fact table there is no data for them
 * The cell is identified by a tuple
 * */

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Tree traversing https://en.wikipedia.org/wiki/Tree_traversal
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DimensionTree = __webpack_require__(6);

var _DimensionTree2 = _interopRequireDefault(_DimensionTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The elements of a dimension can be organized as a hierarchy
 * Hierarchy is a dimension hierarchy of a cube
 * */
var DimensionHierarchy = function () {
	function DimensionHierarchy(_ref) {
		var dimensionTree = _ref.dimensionTree,
		    activeDimension = _ref.activeDimension,
		    hierarchy = _ref.hierarchy;

		_classCallCheck(this, DimensionHierarchy);

		if (!hierarchy) {
			throw Error('attribute "hierarchy" must be defined');
		}
		this.dimensionTree = dimensionTree instanceof _DimensionTree2.default ? dimensionTree : _DimensionTree2.default.createDimensionTree(dimensionTree);
		this.activeDimension = activeDimension || this.dimensionTree.getTreeValue().dimension;
		this.hierarchy = hierarchy;
	}

	_createClass(DimensionHierarchy, [{
		key: 'getDimensionTree',
		value: function getDimensionTree() {
			return this.dimensionTree;
		}
	}, {
		key: 'hasDimension',
		value: function hasDimension(dimension) {
			return !!this.dimensionTree.getDimensionTreeByDimension(dimension);
		}
	}, {
		key: 'getActiveDimension',
		value: function getActiveDimension() {
			return this.activeDimension;
		}
	}, {
		key: 'setActiveDimension',
		value: function setActiveDimension(activeDimension) {
			this.activeDimension = activeDimension;
		}
	}, {
		key: 'getHierarchy',
		value: function getHierarchy() {
			return this.hierarchy;
		}
	}], [{
		key: 'createDimensionHierarchy',
		value: function createDimensionHierarchy(dimensionHierarchy) {
			return new DimensionHierarchy(dimensionHierarchy);
		}
	}]);

	return DimensionHierarchy;
}();

exports.default = DimensionHierarchy;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FactTable = __webpack_require__(8);

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
 *
 * snowflaking - normalization process of measurement tables
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
			var args = [factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, cells, dimension, keyProps, otherProps, cells, cellTable];

			if (!childIdAttributes.length) {
				members = SnowflakeBuilder.makeMemberList.apply(null, args);
			} else {
				var entitiesParts = [];
				var _dimensionTable = dimensionTree.getDimensionTreeByDimension(childDimensions[0]).getTreeValue();
				var memberListForFilter = _dimensionTable.members;
				entitiesParts = SnowflakeBuilder.mapFilter(childIdAttributes[0], cells, memberListForFilter, _dimensionTable);
				members = SnowflakeBuilder.makeMemberListLevel.apply(null, args.concat([childIdAttributes, entitiesParts]));
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
		key: 'makeMemberListLevel',
		value: function makeMemberListLevel(factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, whatIsIt, dimension, keyProps, otherProps, cells, cellTable, childIdAttributes, entitiesParts) {
			var totalMemberList = [];

			var countId = 0;
			entitiesParts.forEach(function (entitiesPart) {
				if (entitiesPart.length) {
					var members = SnowflakeBuilder.makeMemberList(factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, entitiesPart, dimension, keyProps, otherProps, cells, cellTable, countId);
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
			var cellTable = arguments[10];
			var startFrom = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;

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
		value: function denormalize(cellTable, dimensionTrees) {
			var factTable = new _FactTable2.default();
			var facts = factTable.getFacts();
			cellTable.forEach(function (cell) {
				facts.push(_extends({}, cell));
			});
			facts.forEach(function (fact) {
				dimensionTrees.forEach(function (dimensionTree) {
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
			var dicedCube = cube.dice(_defineProperty({}, dimension, member));
			var dimensionTable = dimensionTree.getDimensionTreeByDimension(dimension).getTreeValue();
			// last cell was removed at the beginning of the algorithm,
			// so if the member is no longer used, the projection will be empty
			if (!dicedCube.getCells().length) {
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The cell is identified by a tuple
 * tuples can uniquely identify every cell in the cube
 * Tuple is an ordered collection of one or more members from different dimensions
 * */
var Tuple = function Tuple(options) {
  _classCallCheck(this, Tuple);

  _extends(this, options);
};

exports.default = Tuple;

/***/ }),
/* 16 */
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