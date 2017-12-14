## Quick Start
How Cube is work?
```javascript

// This is an array of data from server
let entities = [
    { id: 1, city: 'New York', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '$20'},
    { id: 2, city: 'Paris', company: 'SkyLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '$10'},
    { id: 3, city: 'Paris', company: 'AirLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '$10'},
    { id: 4, city: 'Moscou', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '$20'},
]

// This is the data scheme we need to obtain
let schema = [
    { name: 'cities', keyProps: ['city']},
    { name: 'companies', keyProps: ['company']},
    { name: 'age', keyProps: ['minAgePlane', 'maxAgePlane']},
    { name: 'prices', keyProps: ['price'], dependency: 'cities' },
    { name: 'counts', keyProps: ['planesCount'], dependency: ['cities', 'companies']},
]

// We send it all to the constructor
let cube = new Cube(entities, schema);

```
Now cube will be:

```js
{
    measurements: {
        cities: [
            { id: 1, city: 'New York' },
            { id: 1, city: 'Paris' },
            { id: 1, city: 'Moscou' },
        ],
        companies: [
            { id: 1, company: 'AirLine' },
            { id: 2, company: 'SkyLine' },
        ],
        age: [
            { id: 1, minAgePlane: '1 year', minAgePlane: '5 year' },
            { id: 1, minAgePlane: '5 year', minAgePlane: '10 year' },
        ],
        prices: [
            { id: 1, price: '$20' },
            { id: 2, price: '$10' },
            { id: 3, price: '$20' },
        ],
        counts: [
            { id: 1, planesCount: 1 },
            { id: 2, planesCount: 1 },
            { id: 3, planesCount: 1 },
            { id: 4, planesCount: 1 },
        ]
    },
    normalizedData: [
        { id: 1, cities_id: 1, companies: 1, age_id: 1, counts_id: 1, price_id: 1 },
        { id: 2, cities_id: 2, companies: 2, age_id: 2, counts_id: 2, price_id: 2 },
        { id: 3, cities_id: 2, companies: 1, age_id: 2, counts_id: 3, price_id: 2 },
        { id: 4, cities_id: 3, companies: 1, age_id: 1, counts_id: 4, price_id: 3 },
    ]
}
```
How get list back?

```javascript
cube.getList()

```
```js
[
    { id: 1, city: 'New York', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '$20'},
    { id: 2, city: 'Paris', company: 'SkyLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '$10'},
    { id: 3, city: 'Paris', company: 'AirLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '$10'},
    { id: 4, city: 'Moscou', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '$20'},
]
```