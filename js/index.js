import GameConsole from './GameConsole.js';
						
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
						