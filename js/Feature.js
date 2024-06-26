class Feature {
	constructor(name, description, moreDescription, hiddenItems, cantGetReason) {
		this.name = name;
		this.description = description;
		this.moreDescription = moreDescription;
		this.hiddenItems = hiddenItems;
		this.cantGetReason = cantGetReason;
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

	getHiddenItem(itemName) {
		return this.hiddenItems.find((i) => i.name === itemName);
	}

	removeHiddenItem(itemName) {
		const item = this.getHiddenItem(itemName);
		if (!item) {
			return null;
		}
		return this.hiddenItems.splice(this.hiddenItems.indexOf(item), 1)[0];
	}

	getCantGetReason() {
		return this.cantGetReason;
	}
}

export default Feature;
