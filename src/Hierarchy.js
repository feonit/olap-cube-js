import Relation from './Relation.js'

export default class Hierarchy {
    constructor(){
        this._relations = [];
    }
    addRelation(parent, childs){
        this._relations.push(new Relation({parent, childs}));
    }
    getLeaves(){
        const leaves = {};
        this._relations.forEach( relation => {
            const reqursively = relation => {
                if (!relation.childs || !relation.childs.length){
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
    getRelation(parent){
        const relation = this._relations.find( relation => {
            return relation.parent === parent;
        });
        return relation
    }
    //todo
    getResolutionOrder(){
        const leaves = this.getLeaves();
        const other = [];
        const reqursively = (current) => {
            const parent = this.getParentOf(current);
            if (parent && other.indexOf(parent) === -1){

                const relation = this.getRelation(parent);

                if (relation.childs && relation.childs.length){
                    const notAllowToAdd = relation.childs.find( child => {
                        return other.indexOf(child) === -1
                    });
                    if (!notAllowToAdd){
                        other.push(parent);
                    }
                } else {
                    other.push(parent);
                }

                reqursively(parent);
            }
        };
        leaves.forEach( leave => {
            reqursively(leave)
        });
        return [].concat(leaves).concat(other);
    }
    getParentOf(child){
        const found = this._relations.find( relation => {
            if (relation.childs && relation.childs.length){
                const found = relation.childs.find( innerChild => {
                    return innerChild === child
                });
                return found && relation.parent;
            }
        });
        return found && found.parent;
    }
}