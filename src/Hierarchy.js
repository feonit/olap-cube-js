import Relation from './Relation.js'

/**
 * The elements of a dimension can be organized as a hierarchy,
 * a set of parent-child relationships, typically where a parent member summarizes its children
 * */
export default class Hierarchy {
    constructor(){
        this._relations = [];
    }
    /**
     * @param {string} parent
     * @param {string} childs
     * */
    addRelation(parent, childs){
        this._relations.push(new Relation({parent, childs}));
    }
    /**
     * @param {string} parent
     * @return {Relation}
     * */
    getRelation(parent){
        return this._relations.find( relation => {
            return relation.parent === parent;
        })
    }
    /**
     * @return {Relation}
     * */
    getRoot(){
        return this._relations.find( relation => {
            return relation.childs.length > 1;
        })
    }
    /**
     * @return {string[]}
     * */
    getResolutionOrder(){
        const order = [];
        const root = this.getRoot();
        const reqursively = (relation) => {
            if (relation.childs.length){
                relation.childs.forEach( child => {
                    const relation = this.getRelation(child);
                    reqursively(relation);
                });
            }
            order.push(relation.parent);
        };
        reqursively(root);
        return order;
    }
    /**
     * @deprecated
     * */
    getParentOf(child){
        const found = this._relations.find( relation => {
            if (relation.childs.length){
                const found = relation.childs.find( innerChild => {
                    return innerChild === child
                });
                return found && relation.parent;
            }
        });
        return found && found.parent;
    }
    /**
     * @deprecated
     * */
    getLeaves(){
        const leaves = {};
        this._relations.forEach( relation => {
            const reqursively = relation => {
                if (!relation.childs.length){
                    leaves[relation.parent] = true;
                } else {
                    relation.childs.forEach( child => {
                        const relation = this.getRelation(child);
                        reqursively(relation)
                    })
                }
            };
            reqursively(relation)
        });
        return Object.keys(leaves);
    }
}