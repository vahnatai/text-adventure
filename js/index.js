import GameConsole from './GameConsole.js';

window.onload = () => {
	const outputBox = document.getElementById('outputBox');
	const inputBox = document.getElementById('inputBox');
	const preCaret = document.getElementById('preCaret');
	const virtualCaret = document.getElementById('virtualCaret');
	const postCaret = document.getElementById('postCaret');
	const sendButton = document.getElementById('sendButton');
	const pointCount = document.getElementById('pointCount');
	const stepCount = document.getElementById('stepCount');

	const gc = new GameConsole(inputBox, outputBox, preCaret, virtualCaret, postCaret, pointCount, stepCount, sendButton);
	gc.start();
};
