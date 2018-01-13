import Cube from './src/cube.js';

let entities = [
    { id: 1, city: 'New York', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
    { id: 2, city: 'Paris', company: 'SkyLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
    { id: 3, city: 'Paris', company: 'AirLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
    { id: 4, city: 'Moscow', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
    { id: 5, city: 'Moscow', company: 'SkyLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 2, price: '25$'},
]

let schema = [
    { name: 'cities', keyProps: ['city']},
    { name: 'companies', keyProps: ['company']},
    { name: 'age', keyProps: ['minAgePlane', 'maxAgePlane']},
    { name: 'prices', keyProps: ['price'], dependency: 'cities' },
    { name: 'counts', keyProps: ['planesCount'], dependency: ['cities', 'companies']},
]

// let cube = new Cube(entities, schema);

//    class Schema{
//        constructor(schema){
//            this.schema = schema;
//        }
//
//        getColumns(){
//            return ['']
//        }
//    }

//    mySchema = new Schema(schema);

const AdditionalCube = {

    mesurments: {
        x: [1,2,3],
        y: [1,2,3],
        z: [1,2,3],
    },

    addColumn(name, options){
        const names = this.getAllMesurmentsNamesExceptOne(name);
        const mesurments = {};

        names.forEach( name => {
            mesurments[name] = this.mesurments[name];
        });

        mesurments[name] = [options];

        this.forEachByMesurments(mesurments, (cellOptions) => {
            this.createCell(cellOptions);
        })
    },
    getAllMesurmentsNames(){
        return ['x', 'y', 'z']
    },

    getAllMesurmentsNamesExceptOne(oneName){
        const allMesurmentsNames = this.getAllMesurmentsNames();
        let allMesurmentsNamesExceptOne = null;
        const index = allMesurmentsNames.indexOf(oneName);
        if (index => -1){
            allMesurmentsNames.splice(index, 1);
            allMesurmentsNamesExceptOne = allMesurmentsNames;
        }
        return allMesurmentsNamesExceptOne;
    },

    forEachByMesurments(mesurments, cb){
        const cellOptions = {};
        const keys = Object.keys(mesurments);
        const mesurmentsLength = keys.length;

        const reqursiveForEach = (cellOptions, index) => {

            if (index !== mesurmentsLength){
                const mesurement = mesurments[keys[index]];

                mesurement.forEach( member => {
                    cellOptions[keys[index]] = member;
                    reqursiveForEach(cellOptions, index + 1)
                })

            } else {
                cb(cellOptions)
            }
        };

        reqursiveForEach(cellOptions, 0);

    },

    createCell(cellOptions){
        console.log(cellOptions)
    }
}

AdditionalCube.addColumn('x', 4)