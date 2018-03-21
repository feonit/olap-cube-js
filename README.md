<div align="center">
  <a href="https://github.com/feonit/olap-cube">
    <img width="200" height="200" src="https://raw.githubusercontent.com/feonit/olap-cube-js/master/cube.jpg">
  </a>
</div>

[![Build Status](https://travis-ci.org/feonit/olap-cube-js.svg?branch=master)](https://travis-ci.org/feonit/olap-cube-js)
[![codecov](https://codecov.io/gh/feonit/olap-cube-js/branch/master/graph/badge.svg)](https://codecov.io/gh/feonit/olap-cube-js)
[![Version](https://img.shields.io/npm/v/olap-cube-js.svg)](https://www.npmjs.com/package/olap-cube-js)

The simplest data analysis tools written in javascript.

This solution is a means for extracting and replenishing data, which together with your data storage means and a means of providing aggregate data, is intended for decision making.

[1]: https://en.wikipedia.org/wiki/Star_schema
[2]: https://en.wikipedia.org/wiki/Fact_table
[3]: https://en.wikipedia.org/wiki/Dimension_(data_warehouse)
[4]: https://www.ibm.com/support/knowledgecenter/en/SSEPGG_9.7.0/com.ibm.db2.abx.cub.doc/abx-c-cube-balancedandunbalancedhierarchies.html
[5]: https://feonit.github.io/olap-cube-js/spec/
[6]: https://feonit.github.io/olap-cube-js/examples/product-table/index.html

[Specification][5]

[Demo][6]

## Support:
- Multidimensional conceptual data representation
- Tree structure for representing hierarchical data
- [Balanced][4] hierarchies
- Multi-level hierarchies
- Multiple hierarchies. One hierarchy for one [dimension][3]
- One [fact table][2]
- OLAP data is typically stored in a [star schema][1]
- Analysis of only the key attributes of the members of the dimensions
- The ability to edit data


## Quick Start
How Cube is work?
```javascript

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
Now cube will be:

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

How to take normal data:

```javascript
cube.query('products')
```

```js
[
    { id: 1, product: 'Product 1' },
    { id: 2, product: 'Product 2' },
    { id: 3, product: 'Product 3' },
    { id: 4, product: 'Product 1' },
]
```
or for dependent
```javascript
let member = { id: 1 }
let filter = { categories: member }
cube.query('prices', filter )
```

```js
[
    { id: 1, product: 'Product 1' },
    { id: 2, product: 'Product 2' },
]
```

Cube filling:

```js
const schema = {
    dimension: 'xy',
    keyProps: ['xy'],
    dependency: [
        {
            dimension: 'x',
            keyProps: ['x']
        },{
            dimension: 'y',
            keyProps: ['y']
        }
    ]
}
const dataArray = [
    { id: 1, x: 0, y: 1, xy: true },
    { id: 2, x: 1, y: 0, xy: true }
]
const cube = new Cube(dataArray, schema)
cube.fill({ xy: false })
const facts = cube.denormalize()

```

Now facts will be:
```js
[
    { id: 1, x: 0, y: 1, xy: true },
    { id: 2, x: 1, y: 0, xy: true },
    { x: 0, y: 0, xy: false },
    { x: 1, y: 1, xy: false }
]

```


How get facts back:

```javascript
cube.denormalize()

```
```js
[
    { id: 1, region: 'North', year: 2017, month: 'January', product: 'Product 1', category: 'Category 1', value: 737 },
    { id: 2, region: 'South', year: 2017, month: 'April',   product: 'Product 2', category: 'Category 1', value: 155 },
    { id: 3, region: 'West',  year: 2018, month: 'April',   product: 'Product 3', category: 'Category 2', value: 112 },
    { id: 4, region: 'West',  year: 2018, month: 'April',   product: 'Product 1', category: 'Category 2', value: 319 },
]
```

## Todo
- method delete empty cells
- method delete empty cells to example
- dist folder/ version/ npm
- ES5/ES6 umd
- update readme file
- add package to npm

## For the future
- unbalanced, ragged hierarchy
- multi hierarchy (group spec fact table)
- Analysis additional attributes of the members of the measurements
- remove responsibility for "id" prop at facts
- add support for snowflake schema
- add validation for tree 
- single keyProp
- addMember without rollup options (then more than one member will be added)

