import CommandError from './CommandError.js';
import Feature from './Feature.js';
import GameMap from './GameMap.js';
import Item from './Item.js';
import Player from './Player.js';
import Room from './Room.js';

class Game {
	constructor() {
		this.player = new Player();
		this.initRooms();
		this.steps = 0;
		this.points = 0;
	}
	
	initRooms() {
		this.currentRoom = GameMap.loadFromFile();
	}
		
	go(direction) {
		if (!direction) {
			throw new CommandError('Go where?');
		}
		direction = direction.toUpperCase();
		const destination = this.currentRoom.getExit(direction);
		if (!destination) {
			throw new CommandError(`You can't find a way to go ${direction} from here.`);
		}
		this.currentRoom = destination;
		this.steps++;
		return `You move ${direction}...\n\n${this.look()}`;
	}
						
	look(target) {
		if (!target) {
			return this.currentRoom.getDescription(this);
		}
		if (target === 'self') {
			return this.player.getDescription();
		}
		const feature = this.currentRoom.getFeature(target);
		let item = this.currentRoom.getItem(target);
		if (feature) {
			return feature.getDescription();
		} else if (item) {
			return item.getFloorDescription();
		} else {
			item = this.player.inventory.getItem(target);
			if (item) {
				return item.getInventoryDescription();
			} else {
				throw new CommandError(`You can't see a "${target}" here.`);
			}
		}
	}
	
	get(target) {
		if (!target) {
			throw new CommandError('Get what?');
		}
		const item = this.currentRoom.removeItem(target);
		if (!item) {
			throw new CommandError(`There's no "${target}" here to get.`);
		}
		this.player.storeItem(item);
		this.steps++;
		this.points++;
		return `You pick up the ${target}.`;
	}
						
	showInventory() {
		return this.player.listInventory();
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
