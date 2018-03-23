<div align="center">
  <a href="https://github.com/feonit/olap-cube">
    <img width="200" height="200" src="https://raw.githubusercontent.com/feonit/olap-cube-js/master/cube.jpg">
  </a>
</div>

[![Build Status](https://travis-ci.org/feonit/olap-cube-js.svg?branch=master)](https://travis-ci.org/feonit/olap-cube-js)
[![codecov](https://codecov.io/gh/feonit/olap-cube-js/branch/master/graph/badge.svg)](https://codecov.io/gh/feonit/olap-cube-js)
[![Version](https://img.shields.io/npm/v/olap-cube-js.svg)](https://www.npmjs.com/package/olap-cube-js)



[1]: https://en.wikipedia.org/wiki/Star_schema
[2]: https://en.wikipedia.org/wiki/Fact_table
[3]: https://en.wikipedia.org/wiki/Dimension_(data_warehouse)
[4]: https://www.ibm.com/support/knowledgecenter/en/SSEPGG_9.7.0/com.ibm.db2.abx.cub.doc/abx-c-cube-balancedandunbalancedhierarchies.html
[5]: https://feonit.github.io/olap-cube-js/spec/
[6]: https://feonit.github.io/olap-cube-js/examples/product-table/index.html
[7]: https://nodejs.org/en/

# OLAP Cube.js
The simplest data analysis tools written in javascript.
This solution is a means for extracting and replenishing data, which together with your data storage means and a means of providing aggregate data, is intended for decision making.

## Support:
- Multidimensional conceptual data representation
- Tree structure for representing hierarchical data
- [Balanced][4] hierarchies
- Multi-level hierarchies
- One hierarchy for one [dimension][3]
- One [fact table][2]
- OLAP data is typically stored in a [star schema][1]
- Analysis of only the key attributes of the members of the dimensions
- The ability to edit data
- Composite dimension keys

[Specification][5] [Demo][6]

## Getting Started


### Prerequisites
For install the software you need a package manager - [npm][7] which is installed with Node.js

### Installing
Then in the console run the following command
```js
npm install olap-cube-js
```

## How Cube is work?

```js

// This is an array of data from server
let facts = [
    { id: 1, region: 'North', year: 2017, month: 'January', product: 'Product 1', category: 'Category 1', value: 737 },
    { id: 2, region: 'South', year: 2017, month: 'April',   product: 'Product 2', category: 'Category 1', value: 155 },
    { id: 3, region: 'West',  year: 2018, month: 'April',   product: 'Product 3', category: 'Category 2', value: 112 },
    { id: 4, region: 'West',  year: 2018, month: 'April',   product: 'Product 1', category: 'Category 2', value: 319 },
]

// This is the data schema we need to obtain
let schema = {
    dimension: 'value',
    keyProps: ['value'],
    dependency: [
        {
            dimension: 'regions',
            keyProps: ['region'],
        },
        {
            dimension: 'date',
            keyProps: ['year', 'month']
        },
        {
            dimension: 'products',
            keyProps: ['product'],
            dependency: [
                {
                    dimension: 'categories',
                    keyProps: ['category']
                }
            ]
        }
    ]
}

// We send it all to the constructor
let cube = new Cube(facts, schema);

```
Now the cube will represent the structure below:

```js
{
    space: {
        regions: [
            { id: 1, region: 'North' },
            { id: 2, region: 'South' },
            { id: 3, region: 'West' }
        ],
        date: [
            { id: 1, year: 2017, month: 'January' },
            { id: 2, year: 2017, month: 'April' },
            { id: 3, year: 2018, month: 'April' }
        ],
        products: [
            { id: 1, product: 'Product 1' },
            { id: 2, product: 'Product 2' },
            { id: 3, product: 'Product 3' },
            { id: 4, product: 'Product 1' },
        ],
        categories: [
            { id: 1, category: 'Category 1' },
            { id: 2, category: 'Category 2' },
        ],
        value: [
            { id: 1, value: 737 },
            { id: 2, value: 155 },
            { id: 3, value: 112 },
            { id: 4, value: 319 },
        ]
    },
    cellTable: [
        { id: 1, regions_id: 1, date_id: 1, products_id: 1, categories_id: 1, value_id: 1 },
        { id: 2, regions_id: 2, date_id: 2, products_id: 2, categories_id: 1, value_id: 3 },
        { id: 3, regions_id: 3, date_id: 3, products_id: 3, categories_id: 2, value_id: 2 },
        { id: 4, regions_id: 3, date_id: 4, products_id: 4, categories_id: 2, value_id: 4 },
    ]
}
```

### Set
A set is a collection of distinct objects.
Set provides a specialized syntax for querying and manipulating the multidimensional data stored in OLAP cubes

### Cube queries
Access to the elements of the OLAP-cube can be carried out both for a
complete set of dimension indices:
<br/>
***w : ( x , y , z ) → w<sub>xyz</sub>*** ,

and for their subset:
<br/>
***W : ( x , y ) → W = { w<sub>z1</sub> , w<sub>z2</sub> , … , w<sub>zn</sub> }***

in particular, with empty set, this way return all elements:
<br/>
***W : () → W = { w<sub>x1 y1 z1</sub> , w<sub>x1 y1 z2</sub> , … , w<sub>xn yn zn</sub> }***

as a bonus, multiset, it is when an object from a set can be a set of values:
<br/>
***W : ({ z<sub>1</sub> , z<sub>2</sub> }) → W = { W<sub>x1 y1</sub> , W<sub>xn yn</sub> } = { w<sub>x1 y1</sub> , w<sub>xn yn</sub> }<sub>z1</sub> ∪ { w<sub>x1 y1</sub> , w<sub>xn yn</sub> }<sub>z2</sub>***
#### Access to facts of the fact table

Fixate all specializing dimensions
```js
let set = { regions: { id: 1 }, data: { id: 1 }, products: { id: 1 } }
cube.query(set)
```
return:
```js
[
    { category: "Category 1", id: 1, month: "January", product: "Product 1", region: "North", value: 737, year: 2017 }
]
```
Fixate some of the dimensions
```js
let subset = { regions: { id: 1 } }
cube.query(subset)

// this way you can take all the facts from the cube back
cube.query()

// or even fix a plurality of dimension values
let multiset = { date: [ { id: 1 }, { id: 2 } ] }
cube.query(multiset)

```

#### Access to members of the dimensions tables

Simple queries return all members of the dimension:
```js
cube.query('products')
```
return:
```js
[
    { id: 1, product: 'Product 1' },
    { id: 2, product: 'Product 2' },
    { id: 3, product: 'Product 3' },
    { id: 4, product: 'Product 1' },
]
```

Queries with the second argument return all members of the dimension in accordance with the passed filter data

```js
cube.query('products', { categories: { id: 1 } })
```
return:
```js
[
    { id: 1, product: 'Product 1' },
    { id: 2, product: 'Product 2' },
]
```
Multiset example:
```js
cube.query('products', { regions: [{ id: 2 }, { id: 3 }] } )
```
return:
```js
[
    { id: 2, product: 'Product 2' },
    { id: 3, product: 'Product 3' },
    { id: 4, product: 'Product 1' },
]
```
Other example:
```js
cube.query('regions', { categories: { id: 1 } })
```
return:
```js
[
    { id: 1, region: 'North' },
    { id: 2, region: 'South' },
]
```
Other example:
```js
cube.query('value', { date: { id: 1 } } )
```
```js
[
    { id: 1, value: 737 },
]
```

### Cube filling
Fills the fact table with all possible missing combinations. For example, for a table, such data will represent empty cells

```js
let schema = {
    dimension: 'value',
    keyProps: ['value'],
    dependency: [
        {
            dimension: 'regions',
            keyProps: ['region']
        },{
            dimension: 'products',
            keyProps: ['product']
        }
    ]
};

let facts = [
    { id: 1, region: 'North', product: 'Product 1', value: 10 },
    { id: 2, region: 'South', product: 'Product 2', value: 20 }
];
let cube = new Cube(facts, schema)
```

Execute filling:
```js
let props = { value: 0 }; // properties for empty cells
cube.fill(props);
```

Now get the facts back:
```js
let factsFilled = cube.query()
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

### Editing data in a cube
```js
let regions = cube.query('regions')
let member = regions[0]
member['region'] = 'East'; 
```

### Adding data to the cube
```js
let member = { product: 'Product 3' }
cube.addMember('products', member)
```

### Deleting data from a cube
```js
let member = { id: 2 }
cube.removeMember('products', member)
```

## Todo
- Update readme file
- Method delete empty cells
- Method delete empty cells to example
- ES5/ES6 umd
- Exclude query param
- Multiple, unbalanced, ragged hierarchies
- Use additional attributes of the members
- Remove responsibility for "id" prop at facts
- Add support for snowflake schema
- Add validation for tree
- Single keyProp
- AddMember without rollup options (then more than one member will be added)

