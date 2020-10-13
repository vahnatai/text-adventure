class Item {
	constructor(name, quickDesc, floorDesc, invDesc, useCallback) {
		this.name = name;
		this.quickDesc = quickDesc;
		this.floorDesc = floorDesc;
		this.invDesc = invDesc;
		this.useCallback = useCallback;
	}
	
	use() {
		return this.useCallback();
	}
}

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

class Player {
	constructor() {
		this.inventory = new Inventory();
	}
	
	getDescription() {
		return 'Imagine a dashing adventurer of your preferred gender and description. Something like that but with less confidence.';
	}
}

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

class Room {
	constructor(name, blurb) {
		this.name = name;
		this.blurb = blurb;
		this.exits = {};
		this.features = [];
		this.items = [];
	}
	
	getDescription() {
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
			...features.map((f) => f.getDescription()),
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
		this.features.push(feature)
	}
	
	getFeature(featureName) {
		return this.features.find((f) => f.name === featureName);
	}
	
	addItem(item) {
		this.items.push(item);
	}
	
	getItem(itemName) {
		return this.items.find((i) => i.name === itemName);
	}
	
	pickupItem(player, item) {
		if (!this.items.includes(item)) {
			throw Error('attempt to pickup missing item');
		}
		player.inventory.addItem(item);
		return this.items.splice(this.items.indexOf(item), 1);
	}
}

class Game {
	constructor() {
		this.player = new Player();
		this.initRooms();
		this.steps = 0;
		this.points = 0;
	}
	
	initRooms() {
		const foyer = new Room('FOYER', 'The decor of this room is bright and welcoming.' );
		const hall = new Room('HALL', 'This large and comfortable space has capacity for many people, but its present emptiness strikes a lonely tone.');
		const basement = new Room('BASEMENT', 'The air down here is musty and stale.');
		
		foyer.addItem(new Item(
			'knife',
			'A curved KNIFE lies on the floor.',
			'The knife appears to be of considerable craftsmanship.',
			'An elaborate ritual knife, its blade a tongue that curves back and forth, portuding from the mouth of a snake at the crossguard.'
		));
		basement.addItem(new Item(
			'baby',
			'A small BABY lies cooing on its back on the floor.',
			'Yup, that\'s a live baby. It looks healthy enough.',
			'A sweet and stupid child, oblivious to the world around it. Seems content. Maybe a little chubby.'
		));
				
		foyer.addFeature(new Feature(
			'window',
			() => `The ${this.isDay() ? 'sun shines warmly' : 'moon glows cooly'} through a nearby window.`
		));
		foyer.addFeature(new Feature(
			'box',
			'A large wooden box sits against one wall.'
		));
		hall.addFeature(new Feature(
			'throne',
			'An opulent throne towers over the rest of the room.'
		));
							
		basement.addFeature(new Feature(
			'fruit', 
			'A pile of old fruit rots in the corner.'
		));
			
		foyer.addExit('SOUTH', hall);
		hall.addExit('NORTH', foyer);
		hall.addExit('SOUTH', basement);
		basement.addExit('NORTH', hall);
		
		this.currentRoom = foyer;
	}
		
	go(direction) {
		direction = direction.toUpperCase();
		const destination = this.currentRoom.getExit(direction);
		if (!destination) {
			throw Error(`You can't find a way to go ${direction}.`);
		}
		this.currentRoom = destination;
		this.steps++;
		return `You move ${direction}...\n\n${this.look()}`;
	}
						
	look(target) {
		if (!target) {
			return this.currentRoom.getDescription();
		} else if (target === 'self') {
			return this.player.getDescription();
		} else {
			const feature = this.currentRoom.getFeature(target);
			var item = this.currentRoom.getItem(target);
			if (feature) {
				return feature.getDescription();
			} else if (item) {
				return item.floorDesc;
			} else {
				item = this.player.inventory.getItem(target);
				if (item) {
					return item.invDesc;
				} else {
					throw new Error(`I can't see a "${target}" here.`);
				}
			}
		}
	}
	
	get(target) {
		if (!target) {
			throw new Error('Get what?');
		}
		const item = this.currentRoom.getItem(target);
		if (!item) {
			throw new Error(`I don't know how to get "${target}".`);
		}
		this.currentRoom.pickupItem(this.player, item);
		this.steps++;
		this.points++;
		return `You pick up the ${target}.`;
	}
						
	showInventory() {
		return 'Items in your inventory:\n\t' + this.player.inventory.listItems('\n\t');
	}
	
	showScore() {
		return `Your current score is {this.points} out of `;
	}
	
	isDay() {
		return Boolean((Math.floor(this.steps/Game.DAY_LENGTH) + 1) % 2);
	}
}
Game.DAY_LENGTH = 12;
Game.MAX_POINTS = 200;
						
class GameConsole {
	constructor(input, output, pointCounter, stepCounter) {
		this.game = new Game();
		this.input = input;
		this.output = output;
		this.pointCounter = pointCounter;
		this.stepCounter = stepCounter;
		this.history = [];
		this.commandIndex = 0;
	}
	
	parseCommand(command) {
		try {
			GameConsole.SWEARS.forEach((swear) => {
				if (command.includes(swear)) {
					throw Error('Such fucking language!');
				}
			});
			const [baseCommand, ...args] = command.split(' ');
			const handler = GameConsole.COMMANDS[baseCommand] ||
			(() => {throw new Error(`I don't know how to "${baseCommand}".`)});
			const output = handler(this.game, args);
			this.render(output);
			this.history.push(command);
			this.commandIndex = this.history.length;
		} catch (error) {
			this.render(error.message);
		}
	}
	
	render(message) {
		this.output.value = message;
		this.pointCounter.innerHTML = this.game.points;
		this.stepCounter.innerHTML = this.game.steps;
	}

	showHistoryCommand() {
		this.input.value = this.history[this.commandIndex];
		console.log('commandIndex', this.commandIndex);
		console.log('history.length', this.history.length);
	}

	previousCommand() {
		if (this.commandIndex > 0) {
			this.commandIndex--;
		}
		this.showHistoryCommand();
	}
	
	nextCommand() {
		if (this.commandIndex < this.history.length - 1) {
			this.commandIndex++;
		}
		this.showHistoryCommand();
	}
}
GameConsole.SWEARS = [
	'shit',
	'piss',
	'fuck',
	'cunt',
	'cock',
	'tits',
	'twat',
	'wanker',
	'dickhead',
	'pussy',
	'fart',
	'poop',
	'pee'
];
GameConsole.COMMANDS = {
	// movement
	'go': (game, args) => game.go(args.join(' ')),
	'north': (game, args) => game.go('north'),
	'n': (game, args) => game.go('north'),
	'south': (game, args) => game.go('south'),
	's': (game, args) => game.go('south'),
	'west': (game, args) => game.go('west'),
	'w': (game, args) => game.go('west'),
	'east': (game, args) => game.go('east'),
	'e': (game, args) => game.go('east'),
	
	// look
	'look': (game, args) => game.look(args[0]),
	'l': (game, args) => game.look(args[0]),
	
	// get
	'get': (game, args) => game.get(args.join(' ')),
	
	// inventory
	'inventory': (game, args) => game.showInventory(),
	'inv': (game, args) => game.showInventory(),
	'i': (game, args) => game.showInventory(),
};
						
window.onload = () => {
	const outputBox = document.getElementById('outputBox');
	const inputBox = document.getElementById('inputBox');
	const sendButton = document.getElementById('sendButton');
	const pointCount = document.getElementById('pointCount');
	const stepCount = document.getElementById('stepCount');
	
	const gc = new GameConsole(inputBox, outputBox, pointCount, stepCount);
	gc.render(gc.game.look());
	
	function runCommand() {
		gc.parseCommand(inputBox.value.toLowerCase());
		inputBox.value = '';
	}
	
	inputBox.onkeypress = function(e) {
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '13') {
			// Enter pressed
			runCommand();
			return false;
		}
	}

	inputBox.onkeydown = function (e) {
		if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode == '38') {
			// up pressed
			gc.previousCommand();
			return false;
		}
		if (keyCode == '40') {
			// down pressed
			gc.nextCommand();
			return false;
		}
	};

	sendButton.onclick = function() {
		runCommand();
	}
};
						