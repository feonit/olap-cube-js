<div align="center">
  <a href="https://github.com/feonit/olap-cube">
    <img width="200" height="200" src="https://raw.githubusercontent.com/feonit/olap-cube-js/master/cube.jpg">
  </a>
</div>

[![Build Status](https://travis-ci.org/feonit/olap-cube-js.svg?branch=master)](https://travis-ci.org/feonit/olap-cube-js)
[![codecov](https://codecov.io/gh/feonit/olap-cube-js/branch/master/graph/badge.svg)](https://codecov.io/gh/feonit/olap-cube-js)
[![Version](https://img.shields.io/npm/v/olap-cube-js.svg)](https://www.npmjs.com/package/olap-cube-js)



[1]: https://en.wikipedia.org/wiki/Snowflake_schema
[2]: https://en.wikipedia.org/wiki/Fact_table
[3]: https://en.wikipedia.org/wiki/Dimension_(data_warehouse)
[4]: https://www.ibm.com/support/knowledgecenter/en/SSEPGG_9.7.0/com.ibm.db2.abx.cub.doc/abx-c-cube-balancedandunbalancedhierarchies.html
[5]: https://feonit.github.io/olap-cube-js/spec/
[6]: https://feonit.github.io/olap-cube-js/examples/product-table/index.html
[7]: https://nodejs.org/en/
[8]: https://en.wikipedia.org/wiki/Surrogate_key
[9]: https://docs.oracle.com/en/cloud/paas/analytics-cloud/adess/scenario-4-typical-multidimensional-problem.html
[10]: https://github.com/feonit/olap-cube-js/blob/master/CHANGELOG.md

# OLAP cube.js
The simplest data analysis tools written in javascript.
This solution is a means for extracting and replenishing data, which together with your data storage means and a means of providing aggregate data, is intended for decision making.

## Table of Contents
- [Features](#features)
- [Getting Started](#start)
- [How Cube is work?](#work)
  - [Structure](#structure)
  - [Sets](#sets)
- [API](#api)
  - [Access to facts of the fact table](#access-to-facts-of-the-fact-table)
  - [Access to members of the dimensions tables](#access-to-members-of-the-dimensions-tables)
  - [Editing dimension members](#editing-dimension-members)
  - [Adding dimension members](#adding-dimension-members)
  - [Removing dimension members](#removing-dimension-members)
  - [Adding facts](#adding-facts)
  - [Removing facts](#removing-facts)
  - [Added dimension hierarchy](#added-dimension-hierarchy)
  - [Removing dimension hierarchy](#removing-dimension-hierarchy)
  - [Filling empty cells](#filling-empty-cells)
  - [Settings](#settings)
  - [Roll-up members](#roll-up-members)
  - [Drill-down members](#drill-down-members)
  - [Slice](#slice)
  - [Dice](#dice)
  - [Additional member props](#additional-member-props)
- [Versioning](#versioning)
- [Todo](#todo)
- [Demo][6]
- [Specification][5]
- [Changelog][10]

## Features:
- Multidimensional conceptual data representation
- Tree structure for representing hierarchical data
- [Balanced][4] hierarchies
- Multi-level hierarchies
- Each cube [dimension][3] contains one hierarchies
- Dynamic [fact table][2]
- OLAP data is typically stored in a [snowflake schema][1]
- [Surrogate key][8] is internally generated as unique identifier for dimension member (used composite dimension keys)
- The ability to edit data
- Filling - solution for [Typical Multidimensional Problem: missing values][9]

## Getting Started


### Prerequisites
For install the software you need a package manager - [npm][7] which is installed with Node.js

### Installing
Then in the console run the following command
```bash
npm install olap-cube-js
```

## How Cube is work?

### Structure
```js

// This is an array of data from server
let facts = [
    { id: 1, region: 'North', year: 2017, month: 'January', product: 'Product 1', category: 'Category 1', value: 737 },
    { id: 2, region: 'South', year: 2017, month: 'April', product: 'Product 2', category: 'Category 1', value: 155 },
    { id: 3, region: 'West',  year: 2018, month: 'April', product: 'Product 3', category: 'Category 2', value: 112 },
    { id: 4, region: 'West',  year: 2018, month: 'April', product: 'Product 1', category: 'Category 2', value: 319 },
]

// This is the data schema we need to obtain
let dimensionHierarchies = [
    {
        dimensionTable: {
            dimension: 'regions',
            keyProps: ['region'],
        }
    },
    {
        dimensionTable: {
            dimension: 'date',
            keyProps: ['year', 'month']
        }
    },  
    {
        dimensionTable: {
            dimension: 'products',
            keyProps: ['product'],
        },
        dependency: [
            {
                dimensionTable: {
                    dimension: 'categories',
                    keyProps: ['category']
                }
            }
        ]
    }
];

// We send it all to the constructor
let cube = Cube.create(facts, dimensionHierarchies);

```
Now the cube will represent the structure below:

```js
let structure = {
    dimensionHierarchies: [
        {
            dimensionTable: {
                dimension: 'regions',
                keyProps: ['region'],
                members: [
                    { id: 1, region: 'North' },
                    { id: 2, region: 'South' },
                    { id: 3, region: 'West' }
                ],
                otherProps: []
            },
            dependency: []
        },
        {
            dimensionTable: {
                dimension: 'date',
                keyProps: ['year', 'month'],
                members: [
                    { id: 1, year: 2017, month: 'January' },
                    { id: 2, year: 2017, month: 'April' },
                    { id: 3, year: 2018, month: 'April' }
                ],
                otherProps: []
            },
            dependency: []
        },
        {
            dimensionTable: {
                dimension: 'products',
                keyProps: ['product'],
                members: [
                    { id: 1, product: 'Product 1', categories_id: 1 },
                    { id: 2, product: 'Product 2', categories_id: 1 },
                    { id: 3, product: 'Product 3', categories_id: 2 },
                    { id: 4, product: 'Product 1', categories_id: 2 },
                ],
                otherProps: []
            },
            dependency: [
                {
                    dimensionTable: {
                        dimension: 'categories',
                        keyProps: ['category'],
                        members: [
                            { id: 1, category: 'Category 1' },
                            { id: 2, category: 'Category 2' },
                        ],
                        otherProps: []
                    },
                    dependency: []
                }
            ]
        }
    ],
    cellTable: [
        { id: 1, regions_id: 1, date_id: 1, products_id: 1, value: 737 },
        { id: 2, regions_id: 2, date_id: 2, products_id: 2, value: 155 },
        { id: 3, regions_id: 3, date_id: 3, products_id: 3, value: 112 },
        { id: 4, regions_id: 3, date_id: 3, products_id: 4, value: 319 },
    ]
};
```

[8]: https://en.wikipedia.org/wiki/Set_(mathematics)
[9]: https://en.wikipedia.org/wiki/Subset
[10]: https://en.wikipedia.org/wiki/Empty_set
[11]: https://en.wikipedia.org/wiki/Multiset
[12]: https://en.wikipedia.org/wiki/Set_(mathematics)#Unions

### Sets

A set is a collection of distinct objects.
Set provides a specialized syntax for getting and manipulating the multidimensional data stored in OLAP cubes.
Access to the elements of the OLAP-cube can be carried out several types of sets

##### Types of sets: [Set][8], [Subset][9], [EmptySet][10], [Multiset][11]
***Set***, that type determines one element:
<br/>
***w : ( x , y , z ) → w<sub>xyz</sub>*** ,

***Subset***, that type determines several elements:
<br/>
***W : ( x , y ) → W = { w<sub>z1</sub> , w<sub>z2</sub> , … , w<sub>zn</sub> }*** ,

***EmptySet***, that type determines all elements:
<br/>
***W : () → W = { w<sub>x1 y1 z1</sub> , w<sub>x1 y1 z2</sub> , … , w<sub>xn yn zn</sub> }*** ,

***EmptySet***, that type determines union of elements:
<br/>
***W : ({ z<sub>1</sub> , z<sub>2</sub> }) → W = { W<sub>x1 y1</sub> , W<sub>xn yn</sub> } = { w<sub>x1 y1</sub> , w<sub>xn yn</sub> }<sub>z1</sub> ∪ { w<sub>x1 y1</sub> , w<sub>xn yn</sub> }<sub>z2</sub>*** .
<br/>
Now using different types of sets, you can access the elements of the cube

## API

### Access to facts of the fact table

##### Set <br/>
Define the set with maximum cardinality. For this fixate all dimensions of the first level of the hierarchy:
```js
let set = { regions: { id: 1 }, date: { id: 1 }, products: { id: 1 } }
cube.getFactsBySet(set)
```
return:
```js
[
    { id: 1, region: 'North', year: 2017, month: 'January', product: 'Product 1', category: 'Category 1', value: 737 }
]
```

##### Subset <br/>
Fixate some of the dimensions:
```js
let subSet = { regions: { id: 3 } }
cube.getFactsBySet(subSet)
```
return:
```js
[
    { id: 3, region: 'West',  year: 2018, month: 'April', product: 'Product 3', category: 'Category 2', value: 112 },
    { id: 4, region: 'West',  year: 2018, month: 'April', product: 'Product 1', category: 'Category 2', value: 319 },
]
```
##### EmptySet <br/>
This way you can take all the facts from the cube back:
```js
let emptySet = {}
cube.getFactsBySet(emptySet)
// or little shorter
cube.getFacts()
```
return:
```js
[
    { id: 1, region: 'North', year: 2017, month: 'January', product: 'Product 1', category: 'Category 1', value: 737 },
    { id: 2, region: 'South', year: 2017, month: 'April', product: 'Product 2', category: 'Category 1', value: 155 },
    { id: 3, region: 'West',  year: 2018, month: 'April', product: 'Product 3', category: 'Category 2', value: 112 },
    { id: 4, region: 'West',  year: 2018, month: 'April', product: 'Product 1', category: 'Category 2', value: 319 },
]
```
##### Multiset <br/>
Fixate a plurality of dimension values:
```js
let multiSet = { regions: [ { id: 1 }, { id: 2 } ] }
cube.getFactsBySet(multiSet)
```
return:
```js
[
    { id: 1, region: 'North', year: 2017, month: 'January', product: 'Product 1', category: 'Category 1', value: 737 },
    { id: 2, region: 'South', year: 2017, month: 'April',   product: 'Product 2', category: 'Category 1', value: 155 },
]
```
### Access to members of the dimensions tables
##### EmptySet <br/>
Simple call return all members of the dimension:
```js
cube.getDimensionMembersBySet('products', {})
// or little shorter
cube.getDimensionMembers('products')
```
return:
```js
[
    { id: 1, product: 'Product 1', categories_id: 1 },
    { id: 2, product: 'Product 2', categories_id: 1 },
    { id: 3, product: 'Product 3', categories_id: 2 },
    { id: 4, product: 'Product 1', categories_id: 2 },
]
```
##### SubSet <br/>
Queries with the second argument return some members of the dimension in accordance with the passed set

```js
cube.getDimensionMembersBySet('products', { categories: { id: 1 } })
```
return:
```js
[
    { id: 1, product: 'Product 1', categories_id: 1 },
    { id: 2, product: 'Product 2', categories_id: 1 },
]
```
Other example:
```js
cube.getDimensionMembersBySet('regions', { categories: { id: 1 } })
```
return:
```js
[
    { id: 1, region: 'North' },
    { id: 2, region: 'South' },
]
```

##### Multiset <br/>
```js
cube.getDimensionMembersBySet('products', { regions: [{ id: 2 }, { id: 3 }] } )
```
return:
```js
[
    { id: 2, product: 'Product 2', categories_id: 1 },
    { id: 3, product: 'Product 3', categories_id: 2 },
    { id: 4, product: 'Product 1', categories_id: 2 },
]
```

### Editing dimension members
```js
let regions = cube.getDimensionMembers('regions')
let member = regions[0]
member['region'] = 'East'; 
```

### Adding dimension members
```js
let member = { product: 'Product 3' }
cube.addDimensionMember('products', member)
```

### Removing dimension members
```js
let member = { id: 2 }
cube.removeDimensionMember('products', member)
```

### Adding facts
```js
let facts = [
    { id: 3, region: 'South', product: 'Product 3', value: 30 }
]
cube.addFacts(facts)
```

### Removing facts
```js
let facts = [
    { id: 3, region: 'South', product: 'Product 3', value: 30 }
]
cube.removeFacts(facts)
```

### Added dimension hierarchy
```js
let facts = [
    { id: 1, product: 'TV', mark: 'Sony', country: 'China', count: 2 },
    { id: 1, product: 'TV', mark: 'Samsung', country: 'Niderland', count: 3 }
];
let cube = Cube.create(facts, [])
cube.addDimensionHierarchy({
    dimensionTable: {
        dimension: 'product',
        keyProps: ['product']
    },
    dependency: [
        {
            dimensionTable: {
                dimension: 'mark',
                keyProps: ['mark']
            },
        }
    ]
})
console.log(cube.cellTable)
```
return:
```js
[
    { id: 1, product_id: 1, country: 'China', count: 2 },
    { id: 1, product_id: 2, country: 'Niderland', count: 3 }
]
```

### Removing dimension hierarchy
Returns the result back to the addition of the hierarchy
```js
cube.removeDimensionHierarchy(cube.dimensionHierarchies[0])
```

### Filling empty cells
Fills the fact table with all possible missing combinations. For example, for a table, such data will represent empty cells

```js
let dimensionHierarchies = [
     {
         dimension: 'regions',
         keyProps: ['region']
     },{
         dimension: 'products',
         keyProps: ['product']
     }
 ];

let facts = [
    { id: 1, region: 'North', product: 'Product 1', value: 10 },
    { id: 2, region: 'South', product: 'Product 2', value: 20 }
];
let cube = Cube.create(facts, dimensionHierarchies)
```

Execute filling:
```js
let defaultMeasures = { value: 0 }; // properties for empty cells
cube.fill(defaultMeasures);
```

Now get the facts back:
```js
let factsFilled = cube.getFacts()
```

factsFilled will be:
```js
[
    { id: 1, region: 'North', product: 'Product 1', value: 10 },
    { id: 2, region: 'South', product: 'Product 2', value: 20 },
    { region: 'North', product: 'Product 2', value: 0 },
    { region: 'South', product: 'Product 1', value: 0 }
]
```

### Settings
You can pass some settings to cube via third argument, example
`Cube.create(facts, dimensionHierarchies, settings)`

Possible options:
- `templateForeignKey` default value: `%s_id`, where %s will be replaced by dimension

### Roll-up members
```js
let markMembers = cube.rollUp('product', productMembers, 'mark')
```
### Drill-down members
```js
let productMembers = cube.drillDown('mark', markMembers, 'product')
```

### Slice
```js
let member = cube.getDimensionMembers('mark')[0]
let subCube = cube.slice(member)
```

### Dice
```js
let markMember = cube.getDimensionMembers('mark')[0]
let regionMember = cube.getDimensionMembers('region')[0]
let subCube = cube.slice({ mark: markMember, region: regionMember })
```

### Additional member props
It may be that the dimension member may content additional properties from the fact table that do not participate in creating own [surrogate key][8], for this use the property `otherProps`
```js
let facts = [{ id: 1, nikname: 'Monkey', name: 'Albert', surname: 'Einstein', countryBirth: 'Germany' }]
let dimensionHierarchies = [
   {
       dimensionTable: {
           dimension: 'user',
           keyProps: ['nikname'],
           otherProps: ['name', 'surname']
       },
       dimensionTable: {
           dimension: 'country',
           keyProps: ['countryBirth'],
       }
   }
]
let cube = Cube.create(facts, dimensionHierarchies)
let members = cube.getDimensionMembers('user')
```
return:
```js
[
    { id: 1, nikname: 'Monkey', name: 'Albert', surname: 'Einstein' }
]
```

## Versioning
We use <a href="https://semver.org/">SemVer</a> for versioning.

## Todo
In future versions:

API
- Add method delete empty cells(+ to example)
- Add exclude set param
- Add options for "id" or genericId method, for members, for fast
- Add support for single keyProp in schema and single dependency
- Update method addMember without rollup options (then more than one member will be added)

Code quality
- Update code with JsDoc
- Add amd/umd/common/ES6 builds
- Security protection for the "id" and "<dimension>_id" property in members
- Add empty cells
- Add validation for all public methods
- Remove responsibility for "id" prop at facts

Perhaps
- Add unbalanced, ragged hierarchies, multiple hierarchies (each cube dimension can contains more then one hierarchies, dimension with both fiscal and calendar years is one classic example)
- Add calculated members
- Add MDX query language
- Add Speed tests

Deploy
- Fix test cover

Docs
- Update readme file (rename Set to Space?)