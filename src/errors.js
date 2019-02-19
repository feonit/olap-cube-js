export class InsufficientRollupData {
	constructor(dimension, id) {
		this.message = `Can't add member, member for rollup dimension: ${dimension} with id: ${id} not found`;
	}
}

export class NotFoundFactId {
	constructor(name) {
		this.message = `In fact data, no property was found with the name: ${name}`
	}
}

export class NotCompletelySpaceException {
	constructor(dimension) {
		this.message = `Not completely defined space for added member, not found member for dimension: "${dimension}"`;
	}
}

export class CantAddMemberRollupException {
	constructor(dimension, id) {
		this.message = `Can't add member, rollup dimension: ${dimension} with id: ${id} not found`;
	}
}

export class DimensionException {
	constructor(dimension) {
		this.message = `For the name "${dimension}" the dimension is already set`;
	}
}

export const handleError = error => {
	error.message = `[Cube] ${error.message}`
	throw error;
};
