class Feature {
	constructor(name, description) {
		this.name = name;
		this.description = description;
	}
	
	getDescription() {
		return this.description instanceof Function 
		? this.description()
		: this.description;
	}
}

export default Feature;
