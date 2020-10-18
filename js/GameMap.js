import gameMapData from '../assets/GameMapData.js';
import Feature from './Feature.js';
import Item from './Item.js';
import Room from './Room.js';

class GameMap {
    constructor(firstRoom) {
        this.firstRoom = firstRoom;
    }
}

GameMap.loadFromFile = () => {
    const rooms = {};
    gameMapData.rooms.forEach(({name, description, items, features}) => {
        const room = new Room(name, description);
        rooms[name] = room;

        items.forEach(({name, quickDesc, floorDesc, moreDesc}) => {
            room.addItem(new Item(name, quickDesc, floorDesc, moreDesc));
        });
        features.forEach(({name, description, moreDescription, hiddenItems}) => {
            room.addFeature(new Feature(
                name,
                description,
                moreDescription,
                (hiddenItems || []).map(({name, quickDesc, floorDesc, moreDesc}) => new Item(name, quickDesc, floorDesc, moreDesc))
            ));
        });
    });

    gameMapData.rooms.forEach(({name, exits}) => {
        const room = rooms[name];
        exits.forEach(({direction, destinationName}) => {
            const destRoom = rooms[destinationName];
            if (!destRoom) {
                throw new Error(`Bad destination name in map data: "${destinationName}"`);
            }
            room.addExit(direction, destRoom);
        });
    });
    
    return rooms[gameMapData.startRoomName];
};

export default GameMap;
