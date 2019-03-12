<div align="center">
  <a href="https://github.com/feonit/olap-cube">
    <img width="200" height="200" src="https://raw.githubusercontent.com/feonit/olap-cube-js/master/cube.jpg">
  </a>
</div>

[![Build Status](https://travis-ci.org/feonit/olap-cube-js.svg?branch=master)](https://travis-ci.org/feonit/olap-cube-js)
[![codecov](https://codecov.io/gh/feonit/olap-cube-js/branch/master/graph/badge.svg)](https://codecov.io/gh/feonit/olap-cube-js)
[![Version](https://img.shields.io/npm/v/olap-cube-js.svg)](https://www.npmjs.com/package/olap-cube-js)
![npm](https://img.shields.io/npm/dt/olap-cube-js.svg)


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
- [Getting Started](#getting-started)
- [How Cube is work?](#how-cube-is-work)
  - [Structure](#structure)
  - [Sets](#sets)
- [API](#api)
  - [Access to measures of the cells](#access-to-measures-of-the-cells)
  - [Access to members of the dimensions](#access-to-members-of-the-dimensions)
  - [Editing dimension members](#editing-dimension-members)
  - [Adding dimension members](#adding-dimension-members)
  - [Removing dimension members](#removing-dimension-members)
  - [Adding facts](#adding-facts)
  - [Removing facts](#removing-facts)
  - [Added dimension hierarchy](#added-dimension-hierarchy)
  - [Removing dimension hierarchy](#removing-dimension-hierarchy)
  - [Multiple hierarchies](#multiple-hierarchies)
  - [Filling empty cells](#filling-empty-cells)
  - [Removing empty cells](#removing-empty-cells)
  - [Drill-up members](#drill-up-members)
  - [Drill-down members](#drill-down-members)
  - [Slice](#slice)
  - [Dice](#dice)
  - [Additional member props](#additional-member-props)
  - [Custom members](#custom-members)
  - [Default Member Options](#default-member-options)
  - [Custom facts](#custom-facts)
  - [Default Fact Options](#default-fact-options)
- [Versioning](#versioning)
- [Explanation of Build Files](#explanation-of-build-files)
- [Todo](#todo)
- [Demo][6]
- [Specification][5]
- [Changelog][10]
- [Motivation](#motivation)

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
- Multiple hierarchies (each cube dimension can contains more then one hierarchies, dimension with both fiscal and calendar years is one classic example)

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
        level: [
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
let cube = new Cube({dimensionHierarchies});
cube.addFacts(facts);

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
            level: []
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
            level: []
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
            level: [
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
                    level: []
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

[set]: https://en.wikipedia.org/wiki/Set_(mathematics)
[subset]: https://en.wikipedia.org/wiki/Subset
[emptyset]: https://en.wikipedia.org/wiki/Empty_set
[nultiset]: https://en.wikipedia.org/wiki/Multiset
[12]: https://en.wikipedia.org/wiki/Set_(mathematics)#Unions

### Sets

A set is a collection of distinct objects.
Set provides a specialized syntax for getting and manipulating the multidimensional data stored in OLAP cubes.
Access to the elements of the OLAP-cube can be carried out several types of sets

##### Types of sets: [Set][set], [Subset][subset], [Emptyset][emptyset], [Multiset][nultiset]
***Set***, that type determines one element:
<br/>
***w : ( x , y , z ) → w<sub>xyz</sub>*** ,

***Subset***, that type determines several elements:
<br/>
***W : ( x , y ) → W = { w<sub>z1</sub> , w<sub>z2</sub> , … , w<sub>zn</sub> }*** ,

***Emptyset***, that type determines all elements:
<br/>
***W : () → W = { w<sub>x1 y1 z1</sub> , w<sub>x1 y1 z2</sub> , … , w<sub>xn yn zn</sub> }*** ,

***Emptyset***, that type determines union of elements:
<br/>
***W : ({ z<sub>1</sub> , z<sub>2</sub> }) → W = { W<sub>x1 y1</sub> , W<sub>xn yn</sub> } = { w<sub>x1 y1</sub> , w<sub>xn yn</sub> }<sub>z1</sub> ∪ { w<sub>x1 y1</sub> , w<sub>xn yn</sub> }<sub>z2</sub>*** .
<br/>
Now using different types of sets, you can access the elements of the cube

## API

### Access to measures of the cells
Access to measures is possible through access to cube cells

##### Set <br/>
Define the set with maximum cardinality. For this fixate all dimensions of the first level of the hierarchy.

Example:
```js
let set = { regions: { id: 1 }, date: { id: 1 }, products: { id: 1 } }
```
execute:
```js
cube.dice(set).getCells()
```
return:
```js
[
    { id: 1, value: 737, regions_id: 1, date_id: 1, products_id: 1 }
]
```
execute:
```js
cube.dice(set).getFacts()
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
```
execute:
```js
cube.dice(subSet).getCells()
```
return:
```js
[
    { id: 3, value: 112, regions_id: 3, date_id: 3, products_id: 3 },
    { id: 4, value: 319, regions_id: 3, date_id: 3, products_id: 4 },
]
```
execute:
```js
cube.dice(subSet).getFacts()
```
return:
```js
[
    { id: 3, region: 'West',  year: 2018, month: 'April', product: 'Product 3', category: 'Category 2', value: 112 },
    { id: 4, region: 'West',  year: 2018, month: 'April', product: 'Product 1', category: 'Category 2', value: 319 },
]
```
##### Emptyset <br/>
This way you can take all the facts from the cube back:
```js
let emptySet = {}
```
execute:
```js
cube.dice(emptySet).getCells()
// or little shorter
cube.getCells()
```
return:
```js
[
    { id: 1, value: 737, regions_id: 1, date_id: 1, products_id: 1 },
    { id: 2, value: 155, regions_id: 2, date_id: 2, products_id: 2 },
    { id: 3, value: 112, regions_id: 3, date_id: 3, products_id: 3 },
    { id: 4, value: 319, regions_id: 3, date_id: 3, products_id: 4 },
]
```
execute:
```js
cube.dice(emptySet).getFacts()
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
```
execute:
```js
cube.dice(multiSet).getCells()
```
return:
```js
[
    { id: 1, value: 737, regions_id: 1, date_id: 1, products_id: 1 },
    { id: 2, value: 155, regions_id: 2, date_id: 2, products_id: 2 },
]
```
execute:
```js
cube.dice(multiSet).getFacts()
```
return:
```js
[
    { id: 1, region: 'North', year: 2017, month: 'January', product: 'Product 1', category: 'Category 1', value: 737 },
    { id: 2, region: 'South', year: 2017, month: 'April',   product: 'Product 2', category: 'Category 1', value: 155 },
]
```
### Access to members of the dimensions
##### Emptyset <br/>
Simple call return all members of the dimension:
```js
cube.dice({}).getDimensionMembers('products')
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
cube.dice({ categories: { id: 1 } }).getDimensionMembers('products')
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
cube.dice({ categories: { id: 1 } }).getDimensionMembers('regions')
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
cube.dice({ regions: [{ id: 2 }, { id: 3 }] }).getDimensionMembers('products')
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
let regions = cube.getDimensionMembers('regions');
// if regions = [{id: 1, region: 'South'}, {id: 2, region: 'West'}]
let member = regions[0]
member['region'] = 'East'; 
```

> The cube and its subcubes have common links to dimension members. It is made possible to edit data in dimension members between operations.
> ````
> const subCube = cube.dice({ product: { id: 1 } }) // some operation
> const memberFromCube = cube.getDimensionMembers('regions').find(({id}) => id === 1)
> const memberFromSubcube = subCube.getDimensionMembers('regions').find(({id}) => id === 1)
> memberFromCube === memberFromSubcube // true
> ````

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
let cube = new Cube();
cube.addFacts(facts);
cube.addDimensionHierarchy({
    dimensionTable: {
        dimension: 'product',
        keyProps: ['product']
    },
    level: [
        {
            dimensionTable: {
                dimension: 'mark',
                keyProps: ['mark']
            },
        }
    ]
})
console.log(cube.getCells())
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
### Multiple hierarchies
```js
let dimensionHierarchies = [
	{
        dimensionTable: {
            dimension: 'products',
            keyProps: ['product']
        },
        level: [
            {
                dimensionTable: {
                    dimension: 'discounts',
                    keyProps: ['discount']
                }
            },
            {
                dimensionTable: {
                    dimension: 'categories',
                    keyProps: ['category']
                }
            }
        ]
    }
]
let facts = [
	{id: 1, product: 'TV', discount: 5, category: 'electronics'},
	{id: 2, product: 'milk', discount: 10, category: 'food'},
]
let cube = new Cube({dimensionHierarchies});
cube.addFacts(facts);
cube.getDimensionMembers('product')
```
return:
```js
[
	{id: 1, product: 'TV', discounts_id: 1, categories_id: 1},
	{id: 2, product: 'milk', discounts_id: 2, categories_id: 2},
]
```
or:
```js
cube.getCells()
```
return:
```js
[
	{id: 1, products_id: 1},
	{id: 2, products_id: 2},
]
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
let cube = new Cube({dimensionHierarchies});
cube.addFacts(facts);

```

Execute filling:
```js
let defaultMeasures = { value: 0 }; // properties for empty cells
cube.fillEmptyCells(defaultMeasures);
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

### Removing empty cells
You can remove all or some of the empty cells. At the same time, some of the dimension members can be removed too if no more cells found correspond to the dimension member
```js
cube.removeCells(cube.getEmptyCells())
// or
cube.removeCells(cube.getEmptyCells().filter(({ value }) => !value))

// for flexibility use other api methods `createEmptyCells`, `isEmptyCell` and `addEmptyCells`
```

### Drill-up members
```js
let markMembers = cube.dice({'product': productMembers}).getDimensionMembers('mark')
```
### Drill-down members
```js
let productMembers = cube.dice({'mark': markMembers}).getDimensionMembers('product')
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
let subCube = cube.dice({ mark: markMember, region: regionMember })
```

### Additional member props
It may be that the dimension member may content additional properties from the fact table that do not participate in creating own [surrogate key][8], for this use the property `otherProps`
```js
let facts = [{ id: 1, nikname: 'Monkey', name: 'Albert', surname: 'Einstein', countryBirth: 'Germany' }]
let dimensionHierarchies = [
    {
        dimensionTable: {
            dimension: 'country',
            keyProps: ['countryBirth'],
        }
    },
    {
        dimensionTable: {
            dimension: 'user',
            keyProps: ['nikname'],
            otherProps: ['name', 'surname']
        }
    }
]
let cube = new Cube({dimensionHierarchies})
cube.addFacts(facts);
let members = cube.getDimensionMembers('user')
```
return:
```js
[
    { id: 1, nikname: 'Monkey', name: 'Albert', surname: 'Einstein' }
]
```

### Custom members
```js
let facts = [{ id: 1, nikname: 'Monkey', group: 'Administrators' }];
let dimensionHierarchies = [
    {
        dimensionTable: {
            dimension: 'user',
            keyProps: ['nikname'],
            foreignKey: 'USER_ID'
        },
        level: [
            {
                dimensionTable: {
                    dimension: 'group',
                    keyProps: ['group'],
                    primaryKey: 'ID',
                    foreignKey: 'GROUP_ID'
                }
            }
        ]
    }
];
let cube = new Cube({dimensionHierarchies});
cube.addFacts(facts);

```
execute:
```js
let userMember = cube.getDimensionMembers('user')[0] 
```
return:
```js
{ id: 1, nikname: 'Monkey', GROUP_ID: 1 }
```
execute:
```js
let groupMember = cube.getDimensionMembers('group')[0];
```
return:
```js
{ ID: 1, group: 'Administrators' }
```
execute:
```js
let cell = cube.getCells()[0];
```
return:
```js
{ id: 1, USER_ID: 1 }
```

### Default Member Options
```js
let dimensionHierarchies = [
    {
        dimensionTable: {
            dimension: 'user',
            keyProps: ['nikname'],
            defaultMemberOptions: {
                nikname: 'anonymous'
            }
        }
    }
];
let cube = new Cube({dimensionHierarchies})
cube.addDimensionMember('user')
```
### Custom facts
Like custom members, some times need make custom facts
```js
let facts = [{ saleId: 1, saleCount: 1 }];
let dimensionHierarchies = [
    {
        dimensionTable: {
            dimension: 'saleCount',
            keyProps: ['saleCount']
        }
    }
];
let cube = new Cube({dimensionHierarchies, factPrimaryKey: 'saleId'})
cube.addFacts(facts);

```

### Default Fact Options
```js
let facts = [
    { id: 1, x: 1, y: 1, isOpen: true },
    { id: 1, x: 2, y: 2, isOpen: true },
];
let dimensionHierarchies = [
    {
        dimensionTable: {
            dimension: 'x',
            keyProps: ['x']
        }
    },
    {
        dimensionTable: {
            dimension: 'y',
            keyProps: ['y']
        }
    }
];
let cube = new Cube({dimensionHierarchies, defaultFactOptions: { isOpen: false }});
cube.addFacts(facts);
cube.fillEmptyCells();
cube.addDimensionMember('x', { x: 3 })
```

## Versioning
We use <a href="https://semver.org/">SemVer</a> for versioning.
Until olap-cube-js reaches a 1.0 release, breaking changes will be released with a new minor version. For example 0.10.0, and 0.10.1 will have the same API, but 0.11.0 will have breaking changes.
The project is on stage of developing API.

## Explanation of Build Files

|      | UMD             | ES Module           |
|------|-----------------|---------------------|
| dev  | cube.js         | cube.esm.js         |
| prod | cube.min.js     | cube.esm.min.js     |


## Todo
In future versions:

Perhaps
- Add unbalanced, ragged hierarchies
- Add calculated members
- Add MDX query language
- Add Speed tests


## Motivation
As a frontend developer, I am not very familiar with the subject area of cubic data,
but in my work I was faced with cubic data of a hierarchical type, so I wanted to make a small tool
to solve my problems. The task turned out to be difficult, but interesting in terms of creating a public API,
the results of which are presented above.