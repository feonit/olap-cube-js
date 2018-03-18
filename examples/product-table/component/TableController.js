export default class TableController {
	getSortedObjectKeys (obj) {
		const keys = Object.keys(obj).sort((key1, key2)=>{
			return key1 === 'id' ? false : key1 > key2;
		});
		let index;
		if (index = keys.indexOf('$$hashKey') !== -1){
			keys.splice(index, 1);
		}
		return keys;
	}
}