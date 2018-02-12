export default class Relation {
    constructor({parent = null, childs = []}){
        /** @type {string} */
        this.parent = parent;
        /** @type {string} */
        this.childs = childs;
    }
}