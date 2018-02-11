export default class Relation {
    constructor({parent = null, childs = null}){
        /** @type {string} */
        this.parent = parent;
        /** @type {string} */
        this.childs = childs;
    }
}