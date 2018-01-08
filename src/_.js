
const _ = {};

_.uniq = function (items, fn) {
    const hash = {};
    const forEachFn = fn
        ? (item) => { hash[fn(item)] = item }
        : (item) => { hash[item] = item };
    items.forEach(forEachFn);
    return Object.keys(hash).map(key => hash[key]);
};

export default _;