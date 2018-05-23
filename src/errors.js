export class NotCompletelySpaceException extends Error {
	constructor(dimension) {
		super();
		this.message = `Not completely defined space for added member, not found member for dimension: "${dimension}"`;
	}
}

export class CantAddMemberRollupException extends Error {
	constructor(dimension, id) {
		super();
		this.message = `Can't add member, rollup dimension: ${dimension} with id: ${id} not found`;
	}
}

export class NotFoundFactId extends Error {
	constructor() {
		super();
		this.message = 'Not found fact id'
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

export const handleError = (error)=>{
	if (error instanceof Error) {
		error.message = `[Cube] ${error.message}`
	}
	throw error;
};
