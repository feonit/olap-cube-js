export default class Measure {
	constructor(props){
		Object.assign(this, props);
	}
	static createMeasure(props){
		return new Measure(props)
	}
}