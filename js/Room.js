class Room {
	constructor(name, blurb) {
		this.name = name;
		this.blurb = blurb;
		this.exits = {};
		this.features = [];
		this.items = [];
	}

	getDescription(game) {
		const {
			name,
			blurb,
			features,
			items,
			exits: getPrettyExits,
		} = this;
		return [
			`You are in the ${name}.`,
			blurb,
			...features.map((f) => f.getShortDescription(game)),
			...items.map((i) => i.quickDesc),
			this.getPrettyExits()
		].join(' ');
	}

	getPrettyExits() {
		const exits = Object.keys(this.exits);
		if (!exits.length) {
			return 'No way out!?';
		}
		const description = 'Obvious exits are ';
		if (exits.length == 1) {
			return description + exits[0] + '.';
		}
		const last = ' and ' + exits.pop();
		return description + exits.join(', ') + last + '.';
	}

	addExit(direction, exit) {
		this.exits[direction.toUpperCase()] = exit;
	}

	getExit(direction) {
		return this.exits[direction.toUpperCase()];
	}

	addFeature(feature) {
		this.features.push(feature);
	}

	getFeature(featureName) {
		return this.features.find((f) => f.name === featureName);
	}

	addItem(item) {
		this.items.push(item);
	}

	getItem(itemName) {
		return this.items.find((i) => i.name === itemName) || this.features.map((f) => f.getHiddenItem(itemName)).find(i => i);
	}

	removeItem(itemName) {
		const item = this.getItem(itemName);
		if (!item) {
			return null;
		}
		if (this.items.includes(item)) {
			// item directly in room
			return this.items.splice(this.items.indexOf(item), 1)[0];
		}
		// item within feature
		return this.features.filter(f => f.getHiddenItem(itemName))[0].removeHiddenItem(itemName);
	}
}

export default Room;
