export default class QueryAdapter {
	/**
	 * It allows to find the dimension members in space for some defining values
	 * and replace these values on found members
	 * @param {object} fixSpaceOptions
	 * @param {Space} space
	 * */
	applyAdapter(fixSpaceOptions, space) {
		this.removeEmptyFilds(fixSpaceOptions);

		Object.keys(fixSpaceOptions).forEach(dimension => {
			const value = fixSpaceOptions[dimension];

			const filterValue = (dimension, value) => {
				const memberList = space[dimension];
				return memberList ? memberList.searchValue(value) : void 0;
			};

			const filterData = (dimension, data) => {
				const memberList = space[dimension];
				return memberList ? memberList.searchData(data) : void 0;
			};

			if (typeof value === 'string') {
				fixSpaceOptions[dimension] = filterValue(dimension, value) || [];
			}

			// if ( typeof value === "object") {
			// 	fixSpaceOptions[dimension] = filterData(dimension, value) || [];
			// }

			if (Array.isArray(value) && value.length){

				if (typeof value[0] === 'string'){
					fixSpaceOptions[dimension] = [];
					value.reduce((accumulated, value) => {
						const found = filterValue(dimension, value);
						if (found) {
							[].splice.apply(accumulated, [accumulated.length, 0].concat(found))
						}
						return accumulated;
					}, fixSpaceOptions[dimension])
				}

				// if (typeof value[0] === "object"){
				// 	fixSpaceOptions[dimension] = [];
				// 	value.reduce( (accumulated, value) => {
				// 		const found = filterData(dimension, value);
				// 		if (found){
				// 			[].splice.apply(accumulated, [accumulated.length, 0].concat(found))
				// 		}
				// 		return accumulated;
				// 	}, fixSpaceOptions[dimension])
				// }

			}


		});
		return fixSpaceOptions;
	}
	/**
	 * { field: undefined } => {}
	 * */
	removeEmptyFilds(fixSpaceOptions){
		Object.keys(fixSpaceOptions).reduce((fixSpaceOptions, prop)=>{
			if (!fixSpaceOptions[prop]){
				delete fixSpaceOptions[prop];
			}
			return fixSpaceOptions;
		}, fixSpaceOptions);
		return fixSpaceOptions;
	}
}
