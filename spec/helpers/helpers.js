
let isEqual;

try {
    isEqual = _.isEqual
} catch (error){
    isEqual = require('../../node_modules/lodash/isEqual.js')
}

function jsonParseStringify(data){
    return JSON.parse(JSON.stringify(data))
}

export {jsonParseStringify, isEqual}