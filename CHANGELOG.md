## Change Log

*0.5.0* 
- Add support for snowflake schema
- Changed the structure of the cube, to support the snowflake scheme and hierarchical relationships
- Update tree code and fix error at `Cube.prototype.remove` method
- Removed the functionality to create a cube in this way `new Cube(facts, schema)`

*0.4.1* 
- Deprecated `new Cube(facts, schema)`, use `Cube.create(facts, schema)` instead. 
- Updated example, now example support old browsers

*0.4.0* 
- Changed the way to import the module from Cube.default to Cube, deprecated Cube.default

*0.3.1* 
- Add version to banner

*0.3.0* 
- Remove `query` method, other improvements

*0.2.0* 
- New api methods `getFacts, getFactsBySet, getDimensionMembers, getDimensionMembersBySet`

*0.1.1* 
- Fix bugs, deprecated `query` method

*0.1.0* 
- First achievements