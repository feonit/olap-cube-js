## Quick Start
How Cube is work?
```javascript

// This is an array of data from server
const entities = [
    { id: 1, city: 'New York', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year'},
    { id: 2, city: 'Paris', company: 'SkyLine', minAgePlane: '5 year', maxAgePlane: '10 year'},
    { id: 3, city: 'Paris', company: 'AirLine', minAgePlane: '5 year', maxAgePlane: '10 year'},
    { id: 4, city: 'Moscou', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year'},
]

// This is the data scheme we need to obtain
const schema = [
    { name: 'cities', keyProps: ['city']},
    { name: 'companies', keyProps: ['company']},
    { name: 'age', keyProps: ['minAgePlane', 'maxAgePlane']},
]

// We send it all to the constructor
const cube = new Cube(entity, schema);

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
        ]      
    }
    normalizedData: [
        { id: 1, cities_id: 1, companies: 1, age_id: 1 },
        { id: 2, cities_id: 2, companies: 2, age_id: 2 },
        { id: 3, cities_id: 2, companies: 1, age_id: 2 },
        { id: 4, cities_id: 3, companies: 1, age_id: 1 },
    ]
}