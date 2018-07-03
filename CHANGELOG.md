## Change Log
*0.12.0
- Added new settings for members of dimensions tables `foreignKey` and `primaryKey`
- Deprecated `Cube.create(facts)`, use `Cube.create({ facts: [] })` instead as first argument
- Added new settings for facts of fact table `primaryKey`

*0.11.0
- Deprecated method `fill`, use `fillEmptyCells` instead in future versions
- Deprecated prop name `dependency`, use `level` in feature
- Added new API methods `removeCells`, `createEmptyCells`, `getEmptyCells`, `addEmptyCells`, `getCells`, `getCellsBySet`

*0.10.1
- Fixed cartesian method

*0.10.0
- Added a new API methods for `slice`, `dice`

*0.9.0
- Added a new API methods for `rollUp`, `drillDown`

*0.8.0
- Added new methods `addDimensionHierarchy`, `removeDimensionHierarchy`

*0.7.0*
- Added new API setting: `templateForeignKey`

*0.6.0*
- Added new API methods: `addFacts`, `removeFacts`

*0.5.1*
- Added ESLint
 
*0.5.0* 
- Added support for snowflake schema
- Changed the structure of the cube, to support the snowflake scheme and hierarchical relationships
- Updated tree code and fix error at `Cube.prototype.remove` method
- Removed the functionality to create a cube in this way `new Cube(facts, schema)`

*0.4.1* 
- Deprecated `new Cube(facts, schema)`, use `Cube.create(facts, schema)` instead. 
- Updated example, now example support old browsers

*0.4.0* 
- Changed the way to import the module from Cube.default to Cube, deprecated `Cube.default`

*0.3.1* 
- Added version to banner

*0.3.0* 
- Removed `query` method, other improvements

*0.2.0* 
- Added new API methods `getFacts, getFactsBySet, getDimensionMembers, getDimensionMembersBySet`

*0.1.1* 
- Fixed bugs, deprecated `query` method

*0.1.0* 
- Added first achievements