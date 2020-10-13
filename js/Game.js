import Player from './Player.js';
import Room from './Room.js';
import Item from './Item.js';
import Feature from './Feature.js';

class Game {
	constructor() {
		this.player = new Player();
		this.initRooms();
		this.steps = 0;
		this.points = 0;
	}
	
	initRooms() {
		const foyer = new Room('FOYER', 'The decor of this room is bright and welcoming.' );
		const hall = new Room('HALL', 'This large and comfortable space has capacity for many people. Perhaps that is why seeing its present emptiness feels so lonely.');
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
		if (!direction) {
			throw Error('Go where?');
		}
		direction = direction.toUpperCase();
		const destination = this.currentRoom.getExit(direction);
		if (!destination) {
			throw Error(`You can't find a way to go ${direction} from here.`);
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
					throw new Error(`You can't see a "${target}" here.`);
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
			throw new Error(`There's no "${target}" here to get.`);
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
		return `Your current score is ${this.points} out of ${Game.MAX_POINTS}.`;
	}
	
	isDay() {
		return Boolean((Math.floor(this.steps/Game.DAY_LENGTH) + 1) % 2);
	}
}
Game.DAY_LENGTH = 12;
Game.MAX_POINTS = 200;

export default Game;
