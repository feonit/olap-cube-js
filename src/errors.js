export class InsufficientRollupData extends Error {
	constructor(dimension, id) {
		super();
		this.message = `Can't add member, member for rollup dimension: ${dimension} with id: ${id} not found`;
	}
}

export class NotFoundFactId extends Error {
	constructor(name) {
		super();
		this.message = `In fact data, no property was found with the name: ${name}`
	}
}

export class CreateInstanceException extends Error {
	constructor() {
		super();
		this.message = 'this must have prototype of Cube'
	}
}

export class DimensionException extends Error {
	constructor(dimension) {
		super();
		this.message = `For the name "${dimension}" the dimension is already set`;
	}
}

export const handleError = error => {
	if (error instanceof Error) {
		error.message = `[Cube] ${error.message}`
	}
	throw error;
};
