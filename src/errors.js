export class NotCompletelySpaceException extends Error {
	constructor(dimension){
		super();
		this.message = `Not completely defined space for added member, not found member for dimension: "${dimension}"`;
	}
}

export class AddDimensionOfCellException extends Error {
	constructor(dimension){
		super();
		this.message = `You can not add a second member to the dimension for the cell: "${dimension}"`;
	}
}

export class CantAddMemberRollupException extends Error {
	constructor(dimension, id){
		super();
		this.message = `Can't add member, rollup dimension: ${dimension} with id: ${id} not found`;
	}
}

export class NotFoundFactId extends Error {
	constructor(){
		super();
		this.message = `Not found fact id`
	}
}

export const handleError = (error)=>{
	if (error instanceof Error){
		error.message = `[Cube] ${error.message}`
	}
	throw error;
};