import NormalizedData from './NormalizedData.js'

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export default class NormalizedDataNotSaved extends NormalizedData{
    constructor(data, options){
        super(data, options)
        if (!data.id){
            this.id = uuidv4()
        }
    }
}