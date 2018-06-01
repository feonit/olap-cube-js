export default class Space {
	/**
	 *
	 * */
	static union() {
		const newSpace = {};
		const arg = [...arguments];
		arg.forEach(space => {
			Space.add(newSpace, space);
		});
		return newSpace;
	}
	/**
	 *
	 * */
	static add(targetSpace, otherSpace) {
		Object.keys(otherSpace).forEach(key => {
			if (!targetSpace[key]) {
				targetSpace[key] = [];
			}
			Array.prototype.push.apply(targetSpace[key], otherSpace[key])
		})
	}
}
