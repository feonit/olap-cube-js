/*!
 * Version: "0.16.1"
 * Copyright © <2018> <Orlov Leonid> Contacts: <feonitu@yandex.ru>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Cube = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var InsufficientRollupData = function InsufficientRollupData(dimension, id) {
    _classCallCheck(this, InsufficientRollupData);

    this.message = "Can't add member, member for rollup dimension: ".concat(dimension, " with id: ").concat(id, " not found");
  };
  var NotFoundFactId = function NotFoundFactId(name) {
    _classCallCheck(this, NotFoundFactId);

    this.message = "In fact data, no property was found with the name: ".concat(name);
  };
  var DimensionException = function DimensionException(dimension) {
    _classCallCheck(this, DimensionException);

    this.message = "For the name \"".concat(dimension, "\" the dimension is already set");
  };
  var handleError = function handleError(error) {
    error.message = "[Cube] ".concat(error.message);
    throw error;
  };

  var originalConsole = console;
  var customConsole = {
    log: function log(string) {
      originalConsole.log("[Cube] ".concat(string));
    },
    warn: function warn(string) {
      originalConsole.warn("[Cube] ".concat(string));
    },
    warnOnce: function () {
      var memory = {};
      return function (string) {
        if (!memory[string]) {
          memory[string] = true;
          originalConsole.warn("[Cube] ".concat(string));
        }
      };
    }()
  };

  var isSimple = function isSimple(value) {
    var type = _typeof(value);

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
          customConsole.warn("[Fact] value of prop \"".concat(key, "\" has an unspecified value: ").concat(data[key]));
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

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

  var Cell =
  /*#__PURE__*/
  function (_Fact) {
    _inherits(Cell, _Fact);

    function Cell() {
      _classCallCheck(this, Cell);

      return _possibleConstructorReturn(this, _getPrototypeOf(Cell).apply(this, arguments));
    }

    return Cell;
  }(Fact);

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


  var EmptyCell =
  /*#__PURE__*/
  function (_Cell) {
    _inherits(EmptyCell, _Cell);

    function EmptyCell(data, options) {
      _classCallCheck(this, EmptyCell);

      if (!data.id) {
        data.id = EmptyCell.generateId();
      }

      return _possibleConstructorReturn(this, _getPrototypeOf(EmptyCell).call(this, data, options));
    }
    /**
     * @return {EmptyCell}
     * */


    _createClass(EmptyCell, null, [{
      key: "createEmptyCell",
      value: function createEmptyCell(options) {
        return new EmptyCell(options);
      }
      /**
       * @param {Cell|{ id: string|number }} cell
       * @return {boolean}
       * */

    }, {
      key: "isEmptyCell",
      value: function isEmptyCell(cell) {
        return typeof cell.id === 'string';
      }
      /**
       * @return {string}
       * */

    }, {
      key: "generateId",
      value: function generateId() {
        return uuidv4();
      }
    }]);

    return EmptyCell;
  }(Cell);

  /**
   * Element of dimension. Serving to determine the position and description of the data element
   * */
  var Member = function Member(data) {
    _classCallCheck(this, Member);

    Object.assign(this, data);
  };

  var DEFAULT_TEMPLATE_FOREIGN_KEY = '%s_id';
  var DEFAULT_FACT_ID_PROP = 'id';
  var DEFAULT_MEMBER_ID_PROP = 'id';

  /**
   * Introductory elements. Input elements have values that are manually loaded
   * that is, they are not the result of calculating data
   * */

  var InputMember =
  /*#__PURE__*/
  function (_Member) {
    _inherits(InputMember, _Member);

    function InputMember() {
      _classCallCheck(this, InputMember);

      return _possibleConstructorReturn(this, _getPrototypeOf(InputMember).apply(this, arguments));
    }

    return InputMember;
  }(Member);

  /**
   * The main task is to parse the data array into tables
   *
   * is a special case of snowflake dimensionHierarchies
   * where every dimension is represented by one table even if the dimensions has multiple levels
   *
   * snowflaking - normalization process of measurement tables
   * */

  var SnowflakeBuilder =
  /*#__PURE__*/
  function () {
    function SnowflakeBuilder() {
      _classCallCheck(this, SnowflakeBuilder);
    }

    _createClass(SnowflakeBuilder, null, [{
      key: "anotherBuild",
      value: function anotherBuild(factTable, cells, dimensionsTrees, cellTable, factPrimaryKey) {
        // for each dimension
        dimensionsTrees.forEach(function (dimensionTree) {
          SnowflakeBuilder.anotherBuildOne(dimensionTree, cells, cellTable, factTable, factPrimaryKey);
        });
      }
    }, {
      key: "anotherBuildOne",
      value: function anotherBuildOne(dimensionTree, cells, cellTable, factTable, factPrimaryKey) {
        // for each hierarchy and level of dimension
        dimensionTree.tracePostOrder(function (dimensionTable, dimensionTree) {
          SnowflakeBuilder.processDimension(dimensionTree, cells, cellTable, factTable, factPrimaryKey);
        });
      }
    }, {
      key: "processDimension",
      value: function processDimension(dimensionTree, cells, cellTable, factTable, factPrimaryKey) {
        var dimensionTable = dimensionTree.getTreeValue();
        var dimension = dimensionTable.dimension,
            _dimensionTable$keyPr = dimensionTable.keyProps,
            keyProps = _dimensionTable$keyPr === void 0 ? [] : _dimensionTable$keyPr,
            _dimensionTable$other = dimensionTable.otherProps,
            otherProps = _dimensionTable$other === void 0 ? [] : _dimensionTable$other,
            memberList = dimensionTable.members,
            foreignKey = dimensionTable.foreignKey,
            primaryKey = dimensionTable.primaryKey;
        var childIdAttributes = dimensionTree.getChildTrees().map(function (dimensionTree) {
          return dimensionTree.getTreeValue().foreignKey;
        });
        var childDimensions = dimensionTree.getChildTrees().map(function (dimensionTree) {
          return dimensionTree.getTreeValue().dimension;
        });
        var totalMemberList = [];
        var existMemberCount = memberList.length;
        var args = [factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, cells, dimension, keyProps, otherProps, cells, cellTable];

        if (!childIdAttributes.length) {
          var keyIdMap = SnowflakeBuilder.createKeyIdMap.apply(null, args);
          totalMemberList = SnowflakeBuilder.createMembersDataByKeyIdMap(keyIdMap, cells, keyProps, otherProps, primaryKey, foreignKey);
        } else {
          var entitiesParts = [];
          childIdAttributes.forEach(function (childIdAttribute, index) {
            var firstChildDimension = childDimensions[index];
            var dimensionTable = dimensionTree.getDimensionTreeByDimension(firstChildDimension).getTreeValue(); //here

            var memberListForFilter = dimensionTable.members;
            entitiesParts = SnowflakeBuilder.mapFilter(childIdAttribute, cells, memberListForFilter, dimensionTable); //here

            var countId = 0;
            entitiesParts.forEach(function (entitiesPart) {
              if (entitiesPart.length) {
                var membersData; // order only for first child of level

                if (index === 0) {
                  var entitiesArgs = args.concat();
                  entitiesArgs[5] = entitiesPart;
                  entitiesArgs.push(countId);

                  var _keyIdMap = SnowflakeBuilder.createKeyIdMap.apply(null, entitiesArgs);

                  membersData = SnowflakeBuilder.createMembersDataByKeyIdMap(_keyIdMap, entitiesPart, keyProps, otherProps, primaryKey, foreignKey);
                } else {
                  // then just search target member
                  membersData = entitiesPart.map(function (part) {
                    return totalMemberList.find(function (data) {
                      return part[foreignKey] === data[primaryKey];
                    });
                  });
                }

                countId = countId + membersData.length;
                var etalon = entitiesPart[0]; // write data

                membersData.forEach(function (member) {
                  member[childIdAttribute] = etalon[childIdAttribute];
                }); // clear source

                entitiesPart.forEach(function (entityPart) {
                  delete entityPart[childIdAttribute];
                });

                if (!totalMemberList.length) {
                  var totalMemberListCount = totalMemberList.length;
                  var startFrom = existMemberCount + totalMemberListCount;
                  membersData.forEach(function (member, index) {
                    member[primaryKey] = startFrom + index + 1;
                  });
                  totalMemberList = membersData;
                } else {
                  membersData.forEach(function (data) {
                    var find = totalMemberList.find(function (memberData) {
                      return memberData[primaryKey] === data[primaryKey];
                    });

                    if (find) ; else {
                      totalMemberList.push(data);
                    }
                  });
                }
              }
            });
          });
        }

        function deleteProps(fact, props, factPrimaryKey) {
          props.forEach(function (prop) {
            if (prop !== factPrimaryKey) {
              delete fact[prop];
            }
          });
        } // только после того как список сформирован, удалаять данные из ячеек


        cells.forEach(function (cell) {
          deleteProps(cell, keyProps, factPrimaryKey);
          deleteProps(cell, otherProps, factPrimaryKey);
        });
        totalMemberList.map(function (data) {
          return new Member(data);
        }).forEach(function (member) {
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
      key: "mapFilter",
      value: function mapFilter(foreignKey, cells, memberList, dimensionTable) {
        var cellTables = []; //todo оптимизировать поиск через хеш

        memberList.forEach(function (member) {
          var cellTableFiltered = cells.filter(function (cell) {
            return cell[foreignKey] == dimensionTable.getMemberPrimaryKey(member);
          });
          cellTables.push(cellTableFiltered);
        });
        return cellTables;
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
      key: "createKeyIdMap",
      value: function createKeyIdMap(factPrimaryKey, primaryKey, foreignKey, existMemberCount, factTable, entitiesPart, dimension) {
        var keyProps = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [];
        var cells = arguments.length > 9 ? arguments[9] : undefined;
        var cellTable = arguments.length > 10 ? arguments[10] : undefined;
        var startFrom = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;
        // соотношение созданных id к ключам
        var keyIdMap = {};
        var restoredCache = {}; // need restore cache

        var existedCells = cellTable.filter(function (cell) {
          return cells.indexOf(cell) === -1;
        });
        existedCells.forEach(function (cell) {
          // собрать ключ на основе ключевых значений
          var fact = factTable.find(function (fact) {
            return fact[factPrimaryKey] === cell[factPrimaryKey];
          });
          var surrogateKey = SnowflakeBuilder.createKeyFromProps(keyProps, fact); // если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)

          if (!(surrogateKey in restoredCache)) {
            restoredCache[surrogateKey] = ++startFrom;
          }
        }); // создания групп по уникальным ключам

        entitiesPart.forEach(function (entityPart) {
          // собрать ключ на основе ключевых значений
          var surrogateKey = SnowflakeBuilder.createKeyFromProps(keyProps, entityPart); // если ключ уникальный создается подсущность и назначается ей присваивается уникальный id (уникальность достигается простым счетчиком)

          if (!(surrogateKey in keyIdMap) && !(surrogateKey in restoredCache)) {
            keyIdMap[surrogateKey] = ++startFrom;
          } // оставить в нормальной форме ссылку на id под сущности


          var id = keyIdMap[surrogateKey];
          entityPart[foreignKey] = id;
        });
        return keyIdMap;
      }
    }, {
      key: "createMembersDataByKeyIdMap",
      value: function createMembersDataByKeyIdMap(keyIdMap, entitiesPart, keyProps, otherProps, primaryKey, foreignKey) {
        var members = [];
        Object.keys(keyIdMap).forEach(function (key) {
          var id = keyIdMap[key];
          var entityPart = entitiesPart.find(function (entityPart) {
            return entityPart[foreignKey] === id;
          });
          var memberData = SnowflakeBuilder.createMemberData(id, [].concat(keyProps).concat(otherProps), entityPart, primaryKey);
          members.push(memberData);
        });
        return members;
      }
    }, {
      key: "createMemberData",
      value: function createMemberData(id, props, data, primaryKey) {
        var memberData = {};
        memberData[primaryKey] = id;
        props.forEach(function (prop) {
          // исключить идентификатор самой сущности
          if (prop !== primaryKey) {
            memberData[prop] = data[prop];
          }
        });
        return memberData;
      }
    }, {
      key: "createInputMember",
      value: function createInputMember(id, memberData, data, primaryKey) {
        var defaultValue = null;
        var defaultData = {};
        memberData.forEach(function (propName) {
          defaultData[propName] = data.hasOwnProperty(propName) ? data[propName] : defaultValue;
        });
        var createdMemberData = SnowflakeBuilder.createMemberData(id, memberData, defaultData, primaryKey, InputMember);
        return new InputMember(createdMemberData);
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
      value: function destroy(cellTable, removedCells, dimensionHierarchies, cube) {
        var _this = this;

        // first remove cells
        removedCells.forEach(function (removedCell) {
          var index = cellTable.indexOf(removedCell);

          if (index !== -1) {
            cellTable.splice(index, 1);
          }
        }); // then remove members

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
      key: "denormalize",
      value: function denormalize(cellTable, dimensionTrees) {
        var facts = [];
        cellTable.forEach(function (cell) {
          facts.push(_objectSpread({}, cell));
        });
        facts.forEach(function (fact) {
          dimensionTrees.forEach(function (dimensionTree) {
            SnowflakeBuilder.travers([fact], dimensionTree, [SnowflakeBuilder.restoreCell]);
          });
        });
        return facts;
      }
    }, {
      key: "restoreCell",
      value: function restoreCell(member, memberList, dimension, cell, foreignKey, dimensionTable) {
        var memberCopy = new Member(member);
        dimensionTable.deleteMemberId(memberCopy);
        delete cell[foreignKey];
        Object.assign(cell, memberCopy);
      }
    }, {
      key: "removeMembers",
      value: function removeMembers(cube, dimensionTree, member, memberList, dimension, cell, foreignKey) {
        var dicedCube = cube.dice(_defineProperty({}, dimension, member));
        var dimensionTable = dimensionTree.getDimensionTreeByDimension(dimension).getTreeValue(); // last cell was removed at the beginning of the algorithm,
        // so if the member is no longer used, the projection will be empty

        if (!dicedCube.getCells().length) {
          dimensionTable.removeMember(member);
        }
      }
    }, {
      key: "travers",
      value: function travers(cellTable, dimensionTree) {
        var handlers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

        var handleDimensionTree = function handleDimensionTree(dimensionTable, cell) {
          var dimension = dimensionTable.dimension,
              memberList = dimensionTable.members,
              foreignKey = dimensionTable.foreignKey;
          var idValue = cell[foreignKey];
          var member = memberList.find(function (member) {
            return dimensionTable.getMemberPrimaryKey(member) === idValue;
          });
          handlers.forEach(function (handler) {
            handler(member, memberList, dimension, cell, foreignKey, dimensionTable);
          });
        };

        cellTable.forEach(function (cell) {
          dimensionTree.tracePreOrder(function (tracedDimensionTable, tracedDimensionTree) {
            handleDimensionTree(tracedDimensionTable, cell);
          });
        });
      }
      /**
       * Method allows to delete dimensionTree from cube,
       * the cells will be restored, and the members of the measurement are also deleted
       * */

    }, {
      key: "destroyDimensionTree",
      value: function destroyDimensionTree(cellTable, removedCells, dimensionTree, cube) {
        SnowflakeBuilder.travers(cellTable, dimensionTree, [SnowflakeBuilder.removeMembers.bind(this, cube, dimensionTree), SnowflakeBuilder.restoreCell]);
      }
    }]);

    return SnowflakeBuilder;
  }();

  /**
   * Dimension is a dimension of a cube. A dimension is a primary organizer of measure and attribute information in a cube
   * A dimension will contain some members organized in some hierarchy or hierarchies containing levels.
   * */

  var DimensionTable =
  /*#__PURE__*/
  function () {
    function DimensionTable(_ref) {
      var _this = this;

      var dimension = _ref.dimension,
          _ref$foreignKey = _ref.foreignKey,
          foreignKey = _ref$foreignKey === void 0 ? DimensionTable.genericId(dimension) : _ref$foreignKey,
          _ref$primaryKey = _ref.primaryKey,
          primaryKey = _ref$primaryKey === void 0 ? DEFAULT_MEMBER_ID_PROP : _ref$primaryKey,
          keyProps = _ref.keyProps,
          _ref$otherProps = _ref.otherProps,
          otherProps = _ref$otherProps === void 0 ? [] : _ref$otherProps,
          _ref$members = _ref.members,
          members = _ref$members === void 0 ? [] : _ref$members,
          _ref$defaultMemberOpt = _ref.defaultMemberOptions,
          defaultMemberOptions = _ref$defaultMemberOpt === void 0 ? {} : _ref$defaultMemberOpt;

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
        return new Member(memberData, _this.primaryKey);
      });
      /** member default property options */

      this.defaultMemberOptions = _objectSpread({}, defaultMemberOptions);
    }
    /**
     *
     * */


    _createClass(DimensionTable, [{
      key: "setMemberList",
      value: function setMemberList(members) {
        [].splice.apply(this.members, [0, this.members.length].concat(members));
      }
      /**
       *
       * */

    }, {
      key: "clearMemberList",
      value: function clearMemberList() {
        this.members = [];
      }
    }, {
      key: "getMemberPrimaryKey",
      value: function getMemberPrimaryKey(member) {
        return member[this.primaryKey];
      }
    }, {
      key: "getMemberForeignKey",
      value: function getMemberForeignKey(member) {
        return member[this.foreignKey];
      }
      /**
       * @param {Member} member
       * */

    }, {
      key: "addMember",
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
      key: "createMember",
      value: function createMember() {
        var memberOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var linkProps = arguments.length > 1 ? arguments[1] : undefined;

        // todo тут нужна проверка на то, что все данные для члена измерения присутствуют
        var memberData = _objectSpread({}, this.defaultMemberOptions, memberOptions);

        var keyProps = this.keyProps,
            otherProps = this.otherProps,
            members = this.members,
            primaryKey = this.primaryKey;
        var keys = keyProps.concat(linkProps).concat(otherProps);
        var id = DimensionTable.reduceId(members, primaryKey);
        var member = SnowflakeBuilder.createInputMember(id, keys, memberData, primaryKey); // todo убрать отсюда

        this.addMember(member);
        return member;
      }
      /**
       * @public
       * Method of generating a unique identifier within the selected space
       * */

    }, {
      key: "setMemberId",
      value: function setMemberId(member, id) {
        member[this.primaryKey] = id;
      }
    }, {
      key: "deleteMemberId",
      value: function deleteMemberId(member) {
        delete member[this.primaryKey];
      }
      /**
       *
       * */

    }, {
      key: "removeMember",
      value: function removeMember(member) {
        var index = this.members.indexOf(member);

        if (index === -1) {
          throw new Error('represented member was not found', member);
        }

        this.members.splice(index, 1);
      }
    }], [{
      key: "reduceId",
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
      key: "genericId",
      value: function genericId(dimension) {
        return DEFAULT_TEMPLATE_FOREIGN_KEY.replace('%s', dimension);
      }
    }, {
      key: "createDimensionTable",
      value: function createDimensionTable(dimensionTable) {
        return new DimensionTable(dimensionTable);
      }
    }]);

    return DimensionTable;
  }();

  /**
   * Tree traversing https://en.wikipedia.org/wiki/Tree_traversal
   * @class Tree
   * @abstract class cannot be instantiated with new
   * */
  var Tree =
  /*#__PURE__*/
  function () {
    function Tree() {
      _classCallCheck(this, Tree);
    }

    _createClass(Tree, [{
      key: "getTreeValue",

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
      key: "getParentTree",
      value: function getParentTree() {
        throw 'abstract method';
      }
      /**
       * @public
       * @abstract
       * @return {Tree[]}
       * */

    }, {
      key: "getChildTrees",
      value: function getChildTrees() {
        throw 'abstract method';
      }
      /**
       * @public
       * @return {boolean}
       * */

    }, {
      key: "isExternal",
      value: function isExternal() {
        return !this.getChildTrees().length;
      }
      /**
       * @public
       * @return {boolean}
       * */

    }, {
      key: "isRoot",
      value: function isRoot() {
        return this.getParentTree() === null;
      }
      /**
       * @public
       * Get root for that tree
       * @return {Tree}
       * */

    }, {
      key: "getRoot",
      value: function getRoot() {
        var root = this;
        this.traceUpOrder(function (tracedTreeValue, tracedTree) {
          if (tracedTree.isRoot()) {
            root = tracedTree;
          }
        });
        return root;
      }
      /**
       * @public
       * A walk to root from current Tree, the current Tree and root entered to the chain
       * @param {function} callback
       * */

    }, {
      key: "traceUpOrder",
      value: function traceUpOrder(callback) {
        var tree = this;
        var parentTree = tree.getParentTree();
        var treeValue = tree.getTreeValue();
        callback(treeValue, tree);

        if (parentTree !== null) {
          parentTree.traceUpOrder(callback);
        }
      }
      /**
       * @public
       * A walk in which the children are traversed before their respective parents are traversed
       * @param {function} callback
       * */

    }, {
      key: "tracePostOrder",
      value: function tracePostOrder(callback) {
        var tree = this;
        var childTrees = tree.getChildTrees();
        var treeValue = tree.getTreeValue();

        if (childTrees.length) {
          childTrees.forEach(function (childTree) {
            childTree.tracePostOrder(callback);
          });
        }

        callback(treeValue, tree);
      }
      /**
       * @public
       *  A walk in which each parent tree is traversed before its children is called a pre-order walk
       * */

    }, {
      key: "tracePreOrder",
      value: function tracePreOrder(callback) {
        var tree = this;
        var childTrees = tree.getChildTrees();
        var treeValue = tree.getTreeValue();
        callback(treeValue, tree);

        if (childTrees.length) {
          childTrees.forEach(function (childTree) {
            childTree.tracePreOrder(callback);
          });
        }
      }
    }]);

    return Tree;
  }();

  /**
   * It defines the relationship of generalization and specialization (roll-up/drill-down)
   * @throws {DimensionException}
   * */

  var DimensionTree =
  /*#__PURE__*/
  function (_Tree) {
    _inherits(DimensionTree, _Tree);

    function DimensionTree(dimensionTree) {
      var _this;

      _classCallCheck(this, DimensionTree);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(DimensionTree).call(this));
      var dimensionTable = dimensionTree.dimensionTable,
          _dimensionTree$level = dimensionTree.level,
          level = _dimensionTree$level === void 0 ? [] : _dimensionTree$level,
          _dimensionTree$parent = dimensionTree.parentNode,
          parentNode = _dimensionTree$parent === void 0 ? null : _dimensionTree$parent;
      Object.defineProperties(_assertThisInitialized(_assertThisInitialized(_this)), {
        dimensionTable: {
          /**
           * @property
           * @name DimensionTree#dimensionTable
           * */
          value: DimensionTable.createDimensionTable(dimensionTable),
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
            return new DimensionTree(_objectSpread({}, dimensionTreeData, {
              parentNode: _assertThisInitialized(_assertThisInitialized(_this))
            }));
          }),
          enumerable: true,
          editable: false
        }
      });

      _this.validateDimensions();

      return _this;
    }

    _createClass(DimensionTree, [{
      key: "validateDimensions",
      value: function validateDimensions() {
        var dimensions = [];
        this.tracePostOrder(function (tracedDimensionTreeValue) {
          var dimension = tracedDimensionTreeValue.dimension;

          if (dimensions.indexOf(dimension) === -1) {
            dimensions.push(dimension);
          } else {
            throw new DimensionException();
          }
        });
      }
    }, {
      key: "getTreeValue",

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
      key: "getParentTree",
      value: function getParentTree() {
        return this.parentNode;
      }
      /**
       * @public
       * @return {DimensionTree[]}
       * */

    }, {
      key: "getChildTrees",
      value: function getChildTrees() {
        return this.level;
      }
      /**
       * @public
       * @param {string} dimension
       * @return {DimensionTree|undefined}
       * */

    }, {
      key: "getDimensionTreeByDimension",
      value: function getDimensionTreeByDimension(dimension) {
        var root = this.getRoot();
        var search = void 0;
        root.tracePostOrder(function (dimensionTreeValue, dimensionTree) {
          if (dimensionTreeValue.dimension === dimension) {
            search = dimensionTree;
          }
        });
        return search;
      }
      /**
       * @public
       * @param {Member} member
       * @return {DimensionTree|undefined}
       * */

    }, {
      key: "createProjectionOntoMember",
      value: function createProjectionOntoMember(member) {
        // 1 create copy of hierarchy with empty members
        var newDimensionTreeByMember = this.cloneDimensionTreeWithoutMembers();
        this.projectDrillDown(newDimensionTreeByMember, member);
        this.projectDrillUp(newDimensionTreeByMember, member);
        return newDimensionTreeByMember;
      }
    }, {
      key: "projectDrillDown",
      value: function projectDrillDown(dimensionTree, member) {
        this.projectDrill(dimensionTree, member, "traceUpOrder", "drillDownDimensionMembers");
      }
    }, {
      key: "projectDrillUp",
      value: function projectDrillUp(dimensionTree, member) {
        this.projectDrill(dimensionTree, member, "tracePreOrder", "drillUpDimensionMembers");
      }
    }, {
      key: "projectDrill",
      value: function projectDrill(dimensionTree, member, traceMethodName, method) {
        var _this2 = this;

        var lastTracedMembers;
        var lastTracedDimensionTree;
        this[traceMethodName](function (tracedDimensionTreeValue, tracedDimensionTree) {
          var tracedDimension = tracedDimensionTreeValue.dimension;
          var drillMembers = tracedDimensionTree == _this2 ? [member] : lastTracedDimensionTree[method](lastTracedMembers);
          dimensionTree.getDimensionTreeByDimension(tracedDimension).getTreeValue().setMemberList(drillMembers);
          lastTracedMembers = drillMembers;
          lastTracedDimensionTree = tracedDimensionTree;
        });
      }
    }, {
      key: "cloneDimensionTreeWithoutMembers",
      value: function cloneDimensionTreeWithoutMembers() {
        // todo new members must be not created here
        var clone = new DimensionTree(this.getRoot());
        clone.tracePostOrder(function (dimensionTreeValue) {
          dimensionTreeValue.clearMemberList();
        });
        return clone;
      }
      /**
       * @public
       * @param {Member} member
       * */

    }, {
      key: "removeProjectionOntoMember",
      value: function removeProjectionOntoMember(member) {
        // 1 get projection
        var projectionDimensionTree = this.cloneDimensionTreeWithoutMembers();
        this.projectDrillDown(projectionDimensionTree, member); // 2 subtract projection

        this.subtractDimensionTree(projectionDimensionTree); // 3 return first level members of projection

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
      key: "subtractDimensionTree",
      value: function subtractDimensionTree(dimensionTree) {
        var _this3 = this;

        // remove intersection
        var toBeRemovedSpace = {};
        dimensionTree.tracePostOrder(function (dimensionTreeValue) {
          var dimension = dimensionTreeValue.dimension,
              members = dimensionTreeValue.members;
          toBeRemovedSpace[dimension] = members;
        });
        var memberList = this.getTreeValue().members; // travers down

        if (memberList.length === 1) {
          this.tracePreOrder(function (tracedDimensionTable, tracedDimensionTree) {
            var childMembers = tracedDimensionTable.members,
                childDimension = tracedDimensionTable.dimension;
            toBeRemovedSpace[childDimension] = childMembers;
          });
        } // remove removal space


        Object.keys(toBeRemovedSpace).forEach(function (dimension) {
          var currentDimensionTree = _this3.getDimensionTreeByDimension(dimension);

          var dimensionTable = currentDimensionTree.getTreeValue();
          toBeRemovedSpace[dimension].forEach(function (member) {
            dimensionTable.removeMember(member);
          });
        });
      }
    }, {
      key: "unionDimensionTree",
      value: function unionDimensionTree(dimensionTree) {
        var _this4 = this;

        var toBeAddedSpace = {};
        dimensionTree.tracePostOrder(function (dimensionTreeValue) {
          var dimension = dimensionTreeValue.dimension,
              members = dimensionTreeValue.members;
          toBeAddedSpace[dimension] = members;
        });
        Object.keys(toBeAddedSpace).forEach(function (dimension) {
          var currentDimensionTree = _this4.getDimensionTreeByDimension(dimension);

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
      key: "drillDownDimensionMembers",
      value: function drillDownDimensionMembers() {
        var members = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getTreeValue().members;

        if (this.isRoot()) {
          return members;
        }

        var parentTree = this.getParentTree();
        var parentDimensionTable = parentTree.getTreeValue();
        var dimensionTable = this.getTreeValue();
        var parentMembers = parentDimensionTable.members;
        var drillMembers = [];
        members.forEach(function (member) {
          parentMembers.forEach(function (parentMember) {
            if (dimensionTable.getMemberForeignKey(parentMember) === parentDimensionTable.getMemberPrimaryKey(member)) {
              if (drillMembers.indexOf(parentMember) === -1) {
                drillMembers.push(parentMember);
              }
            }
          });
        });
        return drillMembers;
      }
      /**
       * @public
       * @this {DimensionTree}
       * @param {Member[]} members
       * @return {Member[]}
       * */

    }, {
      key: "drillUpDimensionMembers",
      value: function drillUpDimensionMembers() {
        var members = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getTreeValue().members;

        if (this.isExternal()) {
          return members;
        }

        var childTrees = this.getChildTrees();
        var childTree = childTrees[0]; // todo not for one child always

        var childDimensionTable = childTree.getTreeValue();
        var childMembers = childDimensionTable.members;
        var drillMembers = [];
        members.forEach(function (member) {
          childMembers.forEach(function (childMember) {
            if (childDimensionTable.getMemberForeignKey(member) === childDimensionTable.getMemberPrimaryKey(childMember)) {
              if (drillMembers.indexOf(childMember) === -1) {
                drillMembers.push(childMember);
              }
            }
          });
        });
        return drillMembers;
      }
      /**
       * @public
       * @param {object?} memberOptions
       * */

    }, {
      key: "createMember",
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
      key: "createDimensionTree",
      value: function createDimensionTree(dimensionTreeData) {
        // todo add validation
        return new DimensionTree(dimensionTreeData);
      }
    }, {
      key: "createProxyDimensionTree",
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
  }(Tree);

  /**
   * The elements of a dimension can be organized as a hierarchy
   * Hierarchy is a dimension hierarchy of a cube
   * */

  var DimensionHierarchy =
  /*#__PURE__*/
  function () {
    function DimensionHierarchy(_ref) {
      var dimensionTree = _ref.dimensionTree,
          activeDimension = _ref.activeDimension,
          hierarchy = _ref.hierarchy;

      _classCallCheck(this, DimensionHierarchy);

      if (!hierarchy) {
        throw Error('attribute "hierarchy" must be defined');
      }

      this.dimensionTree = dimensionTree instanceof DimensionTree ? dimensionTree : DimensionTree.createDimensionTree(dimensionTree);
      this.activeDimension = activeDimension || this.dimensionTree.getTreeValue().dimension;
      this.hierarchy = hierarchy;
    }

    _createClass(DimensionHierarchy, [{
      key: "getDimensionTree",
      value: function getDimensionTree() {
        return this.dimensionTree;
      }
    }, {
      key: "hasDimension",
      value: function hasDimension(dimension) {
        return !!this.dimensionTree.getDimensionTreeByDimension(dimension);
      }
    }, {
      key: "getActiveDimension",
      value: function getActiveDimension() {
        return this.activeDimension;
      }
    }, {
      key: "setActiveDimension",
      value: function setActiveDimension(activeDimension) {
        this.activeDimension = activeDimension;
      }
    }, {
      key: "getHierarchy",
      value: function getHierarchy() {
        return this.hierarchy;
      }
    }], [{
      key: "createDimensionHierarchy",
      value: function createDimensionHierarchy(dimensionHierarchy) {
        return new DimensionHierarchy(dimensionHierarchy);
      }
    }]);

    return DimensionHierarchy;
  }();

  /**
   * The cell is identified by a tuple
   * tuples can uniquely identify every cell in the cube
   * Tuple is an ordered collection of one or more members from different dimensions
   * */
  var Tuple = function Tuple(options) {
    _classCallCheck(this, Tuple);

    Object.assign(this, options);
  };

  var Space =
  /*#__PURE__*/
  function () {
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
        var arg = Array.prototype.slice.call(arguments);
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

  var toString = Object.prototype.toString;
  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  function getTag(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }

    return toString.call(value);
  }
  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * isObjectLike({})
   * // => true
   *
   * isObjectLike([1, 2, 3])
   * // => true
   *
   * isObjectLike(Function)
   * // => false
   *
   * isObjectLike(null)
   * // => false
   */


  function isObjectLike(value) {
    return _typeof(value) == 'object' && value !== null;
  }
  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1
   * }
   *
   * isPlainObject(new Foo)
   * // => false
   *
   * isPlainObject([1, 2, 3])
   * // => false
   *
   * isPlainObject({ 'x': 0, 'y': 0 })
   * // => true
   *
   * isPlainObject(Object.create(null))
   * // => true
   */


  function isPlainObject(value) {
    if (!isObjectLike(value) || getTag(value) != '[object Object]') {
      return false;
    }

    if (Object.getPrototypeOf(value) === null) {
      return true;
    }

    var proto = value;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
  }

  /**
   * It a means to retrieve data
   *
   * Base class for normalizing a denormalized data array
   * and analyzing query according to a given scheme
   *
   * */

  var Cube =
  /*#__PURE__*/
  function () {
    /**
     * @param {object | Cube} cube
     * @throw {TypeError}
     * */
    function Cube() {
      var cube = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Cube);

      if (!(isPlainObject(cube) || cube instanceof Cube)) {
        throw TypeError('The argument must be plain object or instance of Cube');
      }

      var _cube$dimensionHierar = cube.dimensionHierarchies,
          dimensionHierarchies = _cube$dimensionHierar === void 0 ? [] : _cube$dimensionHierar,
          _cube$cellTable = cube.cellTable,
          cellTable = _cube$cellTable === void 0 ? [] : _cube$cellTable,
          _cube$defaultFactOpti = cube.defaultFactOptions,
          defaultFactOptions = _cube$defaultFactOpti === void 0 ? {} : _cube$defaultFactOpti,
          _cube$factPrimaryKey = cube.factPrimaryKey,
          factPrimaryKey = _cube$factPrimaryKey === void 0 ? DEFAULT_FACT_ID_PROP : _cube$factPrimaryKey;
      this.defaultFactOptions = defaultFactOptions;
      this.factPrimaryKey = factPrimaryKey;
      this.dimensionHierarchies = dimensionHierarchies.map(function (dimensionHierarchy) {
        // duck
        if (dimensionHierarchy.hierarchy) {
          if (dimensionHierarchy instanceof DimensionHierarchy) {
            return dimensionHierarchy;
          } else {
            return DimensionHierarchy.createDimensionHierarchy(dimensionHierarchy);
          }
        } else if (dimensionHierarchy.dimensionTable) {
          if (dimensionHierarchy instanceof DimensionTree) {
            return dimensionHierarchy;
          } else {
            return DimensionTree.createDimensionTree(dimensionHierarchy);
          }
        } else {
          if (dimensionHierarchy instanceof DimensionTable) {
            return dimensionHierarchy;
          } else {
            return DimensionTable.createDimensionTable(dimensionHierarchy);
          }
        }
      });
      this.cellTable = cellTable.map(function (cellData) {
        if (cellData instanceof Cell) {
          return cellData;
        } else {
          return EmptyCell.isEmptyCell(cellData) ? new EmptyCell(cellData) : new Cell(cellData);
        }
      }); // const residuals = residuals(this);
      // const count = residuals.length;
      // if (count > 0) {
      // 	console.warn('Fact table has residuals', residuals)
      // }
    }
    /**
     * is the act of picking a rectangular subset of a cube by choosing a single value
     * for one of its dimensions, creating a new cube with one fewer dimension.
     * @public
     * @param {string} dimension
     * @param {Member} member
     * @return {Cube}
     * */


    _createClass(Cube, [{
      key: "slice",
      value: function slice(dimension, member) {
        return this.dice(_defineProperty({}, dimension, member));
      }
      /**
       * @public
       * @param {object} set
       * @return {Cube}
       * @throw {TypeError}
       * @throw {RangeError}
       * */

    }, {
      key: "dice",
      value: function dice(set) {
        var _this = this;

        if (!(isPlainObject(set) || set instanceof Tuple)) {
          throw TypeError("The argument must be a plain object");
        } // always work with arrays as value


        var toMultiset = function toMultiset(value) {
          return Array.isArray(value) ? value : [value];
        }; // change member data to original member objects


        var toOriginal = function toOriginal(membersData, dimension) {
          var dimensionTree = getDimensionTreeByDimension.call(_this, dimension);
          var dimensionTable = dimensionTree.getTreeValue();
          var members = dimensionTable.members; //replace memberData with original members

          membersData.forEach(function (memberData, index) {
            var member = members.find(function (member) {
              return dimensionTable.getMemberPrimaryKey(member) === dimensionTable.getMemberPrimaryKey(memberData);
            });

            if (!member) {
              throw RangeError("Not found member by id ".concat(dimensionTable.getMemberPrimaryKey(member)));
            }

            if (membersData instanceof Member) {
              return;
            }

            membersData[index] = member;
          });
          return membersData;
        };

        var originalMultiset = {};
        Object.keys(set).forEach(function (dimension) {
          var value = set[dimension];
          value = toMultiset(value);
          value = toOriginal(value, dimension);
          originalMultiset[dimension] = value;
        });
        var dimensions = Object.keys(originalMultiset); // 1 make one projection on to member

        var dimensionHierarchiesLength = this.dimensionHierarchies.length;

        if (dimensions.length > dimensionHierarchiesLength) {
          throw Error("Set must have a size not more than ".concat(dimensionHierarchiesLength, " dimensions"));
        }

        var projectionDimensionHierarchies = []; // for every dimension in set

        var totalSpaces = dimensions.map(function (dimension) {
          var dimensionTreeProjection;
          var members = originalMultiset[dimension]; // ищется его расширенная версия для каждого члена

          var spacesForCells = members.map(function (member) {
            var searchedInTree = getDimensionTreeByDimension.call(_this, dimension);
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
          } // после чего эти расширенные версии объекдиняются


          var totalSpace = Space.union.apply(Space, _toConsumableArray(spacesForCells));
          return totalSpace;
        }); // фильтрация продолжается

        var filteredCellTable = this.getCells();

        var cellBelongsToSpace = function cellBelongsToSpace(cell, space) {
          var somePropOfCellNotBelongToSpace = Object.keys(space).some(function (dimension) {
            var members = space[dimension];

            var _getDimensionTreeByDi = getDimensionTreeByDimension.call(_this, dimension).getTreeValue(),
                foreignKey = _getDimensionTreeByDi.foreignKey,
                primaryKey = _getDimensionTreeByDi.primaryKey;

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
        }); // 2 create new list of dimensionHierarchies

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

            var projectionDimensionHierarchy = DimensionTree.createProxyDimensionTree(originalDimensionHierarchy);
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
      key: "drillUp",
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
      key: "drillDown",
      value: function drillDown(hierarchy, targetDimension) {
        var currentHierarchy = getHierarchy.call(this, hierarchy);

        if (currentHierarchy && currentHierarchy.hasDimension(targetDimension)) {
          currentHierarchy.setActiveDimension(targetDimension);
        }

        return this;
      }
      /**
       * @public
       * @return {Fact[]} returns facts
       * */

    }, {
      key: "getFacts",
      value: function getFacts() {
        return denormalize.call(this, this.getCells());
      }
      /**
       * @public
       * @param {Object[]} facts
       * @throw {TypeError}
       * @return {Cube}
       * */

    }, {
      key: "addFacts",
      value: function addFacts(facts) {
        if (!Array.isArray(facts)) {
          throw TypeError('The argument must be instance of Array');
        }

        facts.forEach(validateFactData.bind(null, this.factPrimaryKey));
        var cells = facts.map(function (fact) {
          return new Cell(fact);
        });
        [].push.apply(this.getCells(), cells);
        var factTable = this.getFacts();
        SnowflakeBuilder.anotherBuild(factTable, cells, getDimensionTrees.call(this), this.getCells(), this.factPrimaryKey);
        return this;
      }
      /**
       * @public
       * @param {Object[]} facts
       * @throw {TypeError}
       * */

    }, {
      key: "removeFacts",
      value: function removeFacts(facts) {
        if (!Array.isArray(facts)) {
          throw TypeError('The argument must be instance of Array');
        }

        var cellTable = this.getCells();
        var factPrimaryKey = this.factPrimaryKey;
        var removedCells = facts.map(function (fact) {
          return cellTable.find(function (cell) {
            return cell[factPrimaryKey] === fact[factPrimaryKey];
          });
        });
        this.removeCells(removedCells);
      }
      /**
       * @public
       * @return {Cell[]}
       * */

    }, {
      key: "getCells",
      value: function getCells() {
        return this.cellTable;
      }
      /**
       * @public
       * @param {Cell[]} cells
       * @throw {TypeError}
       * */

    }, {
      key: "removeCells",
      value: function removeCells(cells) {
        if (!Array.isArray(cells)) {
          throw TypeError('The argument must be instance of Array');
        }

        cells.forEach(function (cell) {
          if (!(cell instanceof Cell)) {
            throw TypeError('The list of cells must contain only instances of Cell and EmptyCell');
          }
        });
        SnowflakeBuilder.destroy(this.getCells(), cells, this.dimensionHierarchies, this);
      }
      /**
       * @public
       * @param {string} dimension - dimension from which the member will be found
       * @return {Member[]} returns members
       * @throw {TypeError}
       * */

    }, {
      key: "getDimensionMembers",
      value: function getDimensionMembers(dimension) {
        if (!(typeof dimension === 'string')) {
          throw TypeError('The first argument must be string');
        }

        var dimensionTree = getDimensionTreeByDimension.call(this, dimension);
        return dimensionTree.getTreeValue().members;
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
      key: "addDimensionMember",
      value: function addDimensionMember(dimension) {
        var _this2 = this;

        var customMemberOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var rollupCoordinatesData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var drillDownCoordinatesOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var cellData = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

        if (!(typeof dimension === 'string')) {
          throw TypeError('The first argument must be instance of string');
        }

        if (!(isPlainObject(customMemberOptions) && isPlainObject(rollupCoordinatesData) && isPlainObject(drillDownCoordinatesOptions) && isPlainObject(cellData))) {
          throw TypeError('The arguments after the first must be plain objects');
        } // todo №1, а если члены с такими ключами уже существуют, нужнен варнинг, потому что, после десериализации член исчезнет, если не будут изменены значения ключевых полей
        Object.keys(rollupCoordinatesData).forEach(function (dimension) {
          var memberData = rollupCoordinatesData[dimension];

          var memberList = _this2.getDimensionMembers(dimension);

          var dimensionTable = getDimensionTreeByDimension.call(_this2, dimension).getTreeValue();
          var primaryKey = dimensionTable.primaryKey;
          var id = memberData[primaryKey];
          var find = memberList.find(function (member) {
            return id === dimensionTable.getMemberPrimaryKey(member);
          });

          if (!find) {
            throw new InsufficientRollupData(dimension, id);
          }
        });
        var dimensionTree = getDimensionTreeByDimension.call(this, dimension);
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
            throw new InsufficientRollupData(dimension);
          } else {
            foreignKeysMemberData[foreignKey] = member[primaryKey];
          }
        }); // todo проверить, что customMemberOptions не содержит внешних ключей

        var memberOptions = Object.assign({}, customMemberOptions, foreignKeysMemberData);
        var saveMember = dimensionTree.createMember(memberOptions);
        var saveIdAttribute = foreignKey;
        dimensionTree.traceUpOrder(function (tracedDimensionTable, tracedDimensionTree) {
          if (dimensionTree !== tracedDimensionTree) {
            var parentDimension = tracedDimensionTable.dimension,
                parentIdAttribute = tracedDimensionTable.foreignKey;

            var drillDownCoordinatesData = _defineProperty({}, saveIdAttribute, dimensionTable.getMemberPrimaryKey(saveMember));

            Object.assign(drillDownCoordinatesData, drillDownCoordinatesOptions[parentDimension]);
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
       * throw {TypeError}
       * */

    }, {
      key: "removeDimensionMember",
      value: function removeDimensionMember(dimension, member) {
        if (!(typeof dimension === 'string')) {
          throw TypeError('The first argument must be instance of string');
        }

        if (!(member instanceof Member)) {
          throw TypeError('The second argument must be instance of Member');
        }

        var dimensionTree = getDimensionTreeByDimension.call(this, dimension);
        var endToBeRemoved = dimensionTree.removeProjectionOntoMember(member);
        var cellTable = this.getCells();

        var getRemoveMeasures = function getRemoveMeasures(dimension, members) {
          var removedCells = [];
          var dimensionTable = dimensionTree.getDimensionTreeByDimension(dimension).getTreeValue();
          var foreignKey = dimensionTable.foreignKey; // todo mapFilter похоже

          cellTable.forEach(function (cell) {
            members.forEach(function (member) {
              if (cell[foreignKey] == dimensionTable.getMemberPrimaryKey(member)) {
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
       * @throw {TypeError}
       * */

    }, {
      key: "addDimensionHierarchy",
      value: function addDimensionHierarchy(dimensionHierarchy) {
        var dimensionTree = DimensionTree.createDimensionTree(dimensionHierarchy);
        this.dimensionHierarchies.push(dimensionTree);
        SnowflakeBuilder.anotherBuildOne(dimensionTree, this.getCells(), this.getCells(), this.getCells(), this.factPrimaryKey);
      }
      /**
       * @public
       * @param {DimensionTree} dimensionHierarchy
       * */

    }, {
      key: "removeDimensionHierarchy",
      value: function removeDimensionHierarchy(dimensionHierarchy) {
        if (!(dimensionHierarchy instanceof DimensionTree)) {
          throw TypeError('The argument must be instance of DimensionTree');
        } // first remove members


        SnowflakeBuilder.destroyDimensionTree(this.getCells(), this.getCells(), dimensionHierarchy, this); // then target dimension hierarchy

        this.dimensionHierarchies.splice(this.dimensionHierarchies.indexOf(dimensionHierarchy), 1);
      }
      /**
       * @public
       * @return {EmptyCell[]}
       * @throw {TypeError}
       * */

    }, {
      key: "createEmptyCells",
      value: function createEmptyCells() {
        var _this3 = this;

        var cellOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (!isPlainObject(cellOptions)) {
          throw TypeError('Cell option argument must be a pure object');
        }

        var emptyCells = [];
        var tuples = Cube.cartesian(this);
        tuples.forEach(function (tuple) {
          var unique = _this3.dice(tuple).getCells();

          if (!unique.length) {
            var foreignKeysCellData = {};
            Object.keys(tuple).forEach(function (dimension) {
              var dimensionTree = getDimensionTreeByDimension.call(_this3, dimension);
              var dimensionTable = dimensionTree.getTreeValue();
              var foreignKey = dimensionTable.foreignKey;
              foreignKeysCellData[foreignKey] = dimensionTable.getMemberPrimaryKey(tuple[dimension]);
            });

            var cellData = _objectSpread({}, _this3.defaultFactOptions, cellOptions, foreignKeysCellData); // todo нужна правеврка на то, что все свойства присутствуют, для этого нужна инф-ия о именах таких полей в схеме


            var cell = EmptyCell.createEmptyCell(cellData);
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
      key: "getEmptyCells",
      value: function getEmptyCells() {
        return this.getCells().filter(function (cell) {
          return EmptyCell.isEmptyCell(cell);
        });
      }
      /**
       * @public
       * @param {Cell} cell
       * @return {boolean}
       * */

    }, {
      key: "isEmptyCell",
      value: function isEmptyCell(cell) {
        return EmptyCell.isEmptyCell(cell);
      }
      /**
       * @public
       * @param {EmptyCell[]} emptyCells
       * @throw {TypeError}
       * */

    }, {
      key: "addEmptyCells",
      value: function addEmptyCells(emptyCells) {
        var _this4 = this;

        if (!Array.isArray(emptyCells)) {
          throw TypeError('The argument must be instance of Array');
        }

        emptyCells.forEach(function (emptyCell, index) {
          if (!_this4.isEmptyCell(emptyCell)) {
            throw TypeError("Some item in list of argument is not instances of EmptyCell, index: ".concat(index));
          }
        });
        [].push.apply(this.getCells(), emptyCells);
      }
      /**
       * @public
       * Filling method for full size of cube
       * @param {object?} cellOptions - properties for empty cells
       * */

    }, {
      key: "fillEmptyCells",
      value: function fillEmptyCells(cellOptions) {
        // todo why here residuals? add test for that
        if (!residuals(this).length) {
          var emptyCells = this.createEmptyCells(cellOptions);
          this.addEmptyCells(emptyCells);
        }
      }
      /**
       * Check that the argument is an instance of SubCube
       * @return {boolean}
       * */

    }, {
      key: "isSubCube",
      value: function isSubCube() {
        return this instanceof SubCube;
      }
      /**
       * Cartesian product - list of all possible tuples
       * @param {Cube} cube
       * @return {Tuple[]}
       * */

    }], [{
      key: "cartesian",
      value: function cartesian(cube) {
        if (!(cube instanceof Cube)) {
          throw TypeError('The argument must be instance of Cube');
        }

        var f = function f(a, b) {
          var _ref2;

          return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(a.map(function (d) {
            return b.map(function (e) {
              return [].concat(d, e);
            });
          })));
        };

        var cartesian = function cartesian(a, b) {
          for (var _len = arguments.length, c = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            c[_key - 2] = arguments[_key];
          }

          return b ? cartesian.apply(void 0, [f(a, b)].concat(c)) : a;
        };

        var dimensionsOrder = [];
        var set = cube.dimensionHierarchies.map(function (dimensionTree) {
          return dimensionTree.getTreeValue();
        }).map(function (dimensionTable) {
          dimensionsOrder.push(dimensionTable.dimension);
          return dimensionTable.members;
        });
        var tupleList = [];
        var res;

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
            tupleList.push(new Tuple(item));
            return item;
          });
        }

        return tupleList;
      }
    }]);

    return Cube;
  }();
  /**
   * SubCube is the target cube whose members are members of the source cube.
   * */


  var SubCube =
  /*#__PURE__*/
  function (_Cube) {
    _inherits(SubCube, _Cube);

    function SubCube(_ref3) {
      var _this5;

      var originalCube = _ref3.originalCube,
          previousCube = _ref3.previousCube,
          rest = _objectWithoutProperties(_ref3, ["originalCube", "previousCube"]);

      _classCallCheck(this, SubCube);

      _this5 = _possibleConstructorReturn(this, _getPrototypeOf(SubCube).call(this, rest));
      /** link for chaining between operations */

      _this5.originalCube = originalCube;
      /** link for chaining between operations */

      _this5.previousCube = previousCube;
      return _this5;
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


  function getDimensionTreeByDimension(dimension) {
    var findDimensionTree;
    this.dimensionHierarchies.forEach(function (dimensionTree) {
      var searchedDimensionTree = dimensionTree.getDimensionTreeByDimension(dimension);

      if (searchedDimensionTree) {
        findDimensionTree = dimensionTree.getDimensionTreeByDimension(dimension);
      }
    });

    if (!findDimensionTree) {
      throw RangeError("Not existed dimension: ".concat(dimension));
    }

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
   * @private
   * Get facts from cube
   * */


  function denormalize() {
    var _this6 = this;

    var cells = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getCells();
    var forSave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var data = SnowflakeBuilder.denormalize(cells, getDimensionTrees.call(this));

    if (forSave) {
      data.forEach(function (data, index) {
        if (cells[index] instanceof EmptyCell) {
          delete data[_this6.factPrimaryKey];
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
    var tuples = Cube.cartesian(cube);
    var totalTuples = [];
    tuples.forEach(function (tuple) {
      var partFacts = cube.dice(tuple).getFacts();

      if (partFacts.length > 1) {
        totalTuples.push(tuple);
      }
    });
    return totalTuples;
  }

  function validateFactData(factPrimaryKey, factData) {
    if (!factData.hasOwnProperty(factPrimaryKey)) {
      throw new NotFoundFactId(factPrimaryKey);
    }
  }

  return Cube;

})));
//# sourceMappingURL=cube.js.map
