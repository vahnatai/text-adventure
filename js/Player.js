import Inventory from './Inventory.js';

class Player {
	constructor() {
		this.inventory = new Inventory();
	}

	storeItem(item) {
		this.inventory.addItem(item);
	}
	
	getDescription() {
		return 'You look at yourself. Imagine a dashing adventurer of your preferred gender and description. You see something like that but less dashing.';
	}
}

export default Player;
