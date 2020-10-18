class Inventory {
	constructor() {
		this.items = [];
	}
	
	addItem(item) {
		this.items.push(item);
	}
	
	getItem(itemName) {
		return this.items.find((i) => i.name === itemName);
	}
	
	listItems(separator) {
		if (!this.items.length) {
			return '(Empty)';
		}
		return this.items
			.map((i) => i.name.toUpperCase())
			.join(separator);
	}
}

export default Inventory;
