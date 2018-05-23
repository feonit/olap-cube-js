export let isEqual;

try {
	isEqual = _.isEqual
} catch (error) {
	isEqual = require('../../node_modules/lodash/isEqual.js')
}

export const jsonParseStringify = (data)=>{
	return JSON.parse(JSON.stringify(data))
};

export const isEqualObjects = (obj, objTarget) => {
	const objData = jsonParseStringify(obj);
	const objTargetData = jsonParseStringify(objTarget);
	const test = isEqual(objData, objTargetData);
	expect(test).toBe(true);
	return test;
};

export const recursiveObjectsNotHaveCommonLinks = (obj1, obj2)=>{
	Object.keys(obj1).forEach(key => {

		if (typeof obj1[key] === 'object' && obj1[key] !== null) {
			const check = obj1[key] !== obj2[key];
			expect(check).toBe(true);
			if (!check){
				debugger;
			}

			recursiveObjectsNotHaveCommonLinks(obj1[key], obj2[key])
		}
	})
};

export const isClone = (targetObj, cloneObj)=>{
	recursiveObjectsNotHaveCommonLinks(targetObj, cloneObj)
};
