import Inventory from './Inventory.js';

class Player {
	constructor() {
		this.inventory = new Inventory();
	}
	
	getDescription() {
		return 'Imagine a dashing adventurer of your preferred gender and description. Something like that but with less confidence.';
	}
}

export default Player;
