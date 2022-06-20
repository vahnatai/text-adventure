# text-adventure
A node.js-based engine for creating text adventure games for HTML5 canvas via vanilla JavaScript.

## Running the Project

The default game implementation can be run with `npm start`. This will host the game at `http://localhost:PORT`, where `PORT` is an environment variable (default `3000`).

## Game Commands

- `LOOK`: Examine the room or area around you.
- `LOOK OBJECT`: Examine an object in the area or in your inventory.
- `GO DIRECTION`: Navigate the landscape, where possible values of `DIRECTION` are indicated by examining at your surroundings.
-  `GET OBJECT`: Obtain objects from the world, putting the new loot into your inventory.
- `INVENTORY`: List the contents of your inventory.

**NOTE**: Up and down on the keyboard allow you to cycle back and forth through previous commands.

## Command Shorthand

- `L` -> `LOOK`
- `I`, `INV` -> `INVENTORY`
- `N`, `NORTH` -> `GO NORTH`
- `W`, `WEST` -> `GO WEST`
- `E`, `EAST` -> `GO EAST`
- `S`, `SOUTH` -> `GO SOUTH`