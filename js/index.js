import GameConsole from './GameConsole.js';

window.onload = () => {
	const outputBox = document.getElementById('outputBox');
	const inputBox = document.getElementById('inputBox');
	const sendButton = document.getElementById('sendButton');
	const pointCount = document.getElementById('pointCount');
	const stepCount = document.getElementById('stepCount');

	const gc = new GameConsole(inputBox, outputBox, pointCount, stepCount, sendButton);
	gc.start();
};
