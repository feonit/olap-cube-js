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

export class NotFoundFactId {
	constructor() {
		this.message = 'Not found fact id'
	}
}

export class CreateInstanceException {
	constructor() {
		this.message = 'this must have prototype of Cube'
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
