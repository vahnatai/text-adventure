class Feature {
	constructor(name, description, moreDescription, hiddenItems) {
		this.name = name;
		this.description = description;
		this.moreDescription = moreDescription;
		this.hiddenItems = hiddenItems;
	}

	getShortDescription(game) {
		return this.description instanceof Function 
			? this.description(game)
			: this.description;
	}

	getDescription(game) {
		return [
			this.getShortDescription(game),
			this.moreDescription,
			...(this.hiddenItems || []).map((item) => item.getQuickDescription())
		].join(' ');
	}
}

export default Feature;
