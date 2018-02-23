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
}