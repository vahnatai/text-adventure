class Feature {
	constructor(name, description) {
		this.name = name;
		this.description = description;
	}
	
	getDescription(game) {
		return this.description instanceof Function 
			? this.description(game)
			: this.description;
	}
}

export default Feature;
