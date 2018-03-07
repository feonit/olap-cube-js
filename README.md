<div align="center">
  <a href="https://github.com/feonit/olap-cube">
    <img width="200" height="200" src="https://raw.githubusercontent.com/feonit/olap-cube/master/cube.jpg">
  </a>
</div>

[![Build Status](https://travis-ci.org/feonit/olap-cube.svg?branch=master)](https://travis-ci.org/feonit/olap-cube)
[![codecov](https://codecov.io/gh/feonit/olap-cube/branch/master/graph/badge.svg)](https://codecov.io/gh/feonit/olap-cube)

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
let dataArray = [
    { id: 1, city: 'New York', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
    { id: 2, city: 'Paris', company: 'SkyLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
    { id: 3, city: 'Paris', company: 'AirLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
    { id: 4, city: 'Moscow', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
    { id: 5, city: 'Moscow', company: 'SkyLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 2, price: '25$'},
]

// This is the data schema we need to obtain
let schema = {
    dimension: 'counts',
    keyProps: ['planesCount'],
    dependency: [
        {
            dimension: 'prices',
            keyProps: ['price'],
            dependency: [
                {
                    dimension: 'cities',
                    keyProps: ['city']
                }
            ]
        },
        {
            dimension: 'companies',
            keyProps: ['company']
        },
        {
            dimension: 'age',
            keyProps: ['minAgePlane', 'maxAgePlane']
        }
    ]
}

// We send it all to the constructor
let cube = new Cube(dataArray, schema);

```
Now cube will be:

```js
{
    space: {
        cities: [
            { id: 1, city: 'New York' },
            { id: 2, city: 'Paris' },
            { id: 3, city: 'Moscow' },
        ],
        companies: [
            { id: 1, company: 'AirLine' },
            { id: 2, company: 'SkyLine' },
        ],
        age: [
            { id: 1, minAgePlane: '1 year', maxAgePlane: '5 year' },
            { id: 2, minAgePlane: '5 year', maxAgePlane: '10 year' },
        ],
        prices: [
            { id: 1, price: '20$' },
            { id: 2, price: '10$' },
            { id: 3, price: '20$' },
            { id: 4, price: '25$' },
        ],
        counts: [
            { id: 1, planesCount: 1 },
            { id: 2, planesCount: 1 },
            { id: 3, planesCount: 1 },
            { id: 4, planesCount: 1 },
            { id: 5, planesCount: 2 },
        ]
    },
    cellTable: [
        { id: 1, cities_id: 1, companies_id: 1, age_id: 1, prices_id: 1, counts_id: 1 },
        { id: 2, cities_id: 2, companies_id: 2, age_id: 2, prices_id: 2, counts_id: 3 },
        { id: 3, cities_id: 2, companies_id: 1, age_id: 2, prices_id: 2, counts_id: 2 },
        { id: 4, cities_id: 3, companies_id: 1, age_id: 1, prices_id: 3, counts_id: 4 },
        { id: 5, cities_id: 3, companies_id: 2, age_id: 1, prices_id: 4, counts_id: 5 },
    ]
}
```
How get list back:

```javascript
cube.getDataArray()

```
```js
[
    { id: 1, city: 'New York', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
    { id: 2, city: 'Paris', company: 'SkyLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
    { id: 3, city: 'Paris', company: 'AirLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
    { id: 4, city: 'Moscow', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
    { id: 5, city: 'Moscow', company: 'SkyLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 2, price: '25$'},
]
```

How to take normal data:

```javascript
cube.query('prices')
```

```js
[
    { id: 1, price: "20$" },
    { id: 2, price: "10$" },
    { id: 3, price: "20$" },
    { id: 4, price: "25$" },
]
```
or for dependent
```javascript
let city = { id: 3 /** city: "Moscow"*/ }; // other parameters are optional
cube.query('prices', { 'cities': city })
```

```js
[
    { id: 3, price: "20$" },
    { id: 4, price: "25$" },
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
const newDataArray = cube.getDataArray()

```

Now newDataArray will be:
```js
[
    { id: 1, x: 0, y: 1, xy: true },
    { id: 2, x: 1, y: 0, xy: true },
    { x: 0, y: 0, xy: false },
    { x: 1, y: 1, xy: false }
]

```

## Todo
- unbalanced, ragged hierarchy
- multi hierarchy (group spec fact table)
- Analysis additional attributes of the members of the measurements
- method delete empty cells
- remove responsibility for "id" prop at facts
- add support for snowflake schema
- add validation for tree 
- single keyProp
- fact table without final dimension
- ES5/ES6 umd
- dist folder/ version/ npm
