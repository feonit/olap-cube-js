import {ENTITY_ID} from './const.js';
import Fact from './Fact.js';

/**
 * Cell. A piece of data obtained by defining one element
 * in each dimension of a multidimensional array.
 * The cells of the hypercube can be empty or full.
 * */
export default class Cell extends Fact{
    deleteProps(props){
        props.forEach( prop => {
            if ( prop !== ENTITY_ID ){
                delete this[prop];
            }
        });
    }
    addIdAttribute(value, substring){
        const idAttribute = Cell.genericId(substring);
        this[idAttribute] = value;
    }
    /**
     * A way to create a name for a property in which a unique identifier will be stored
     * */
    static genericId(entityName) {
        return entityName + '_' + ENTITY_ID;
    }
}