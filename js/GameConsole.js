import CommandError from './CommandError.js';
import Game from './Game.js';

class GameConsole {
	constructor(input, output, inputPreCaret, inputCaret, inputPostCaret, pointCounter, stepCounter, sendButton) {
		this.game = new Game();
		this.input = input;
		this.output = output;
		this.inputPreCaret = inputPreCaret;
		this.inputCaret = inputCaret;
		this.inputPostCaret = inputPostCaret;
		this.sendButton = sendButton;
		this.pointCounter = pointCounter;
		this.stepCounter = stepCounter;
		this.history = [];
		this.historyCursor = 0;
	}

	start() {
        const keyCodeHandlers = {
            // enter
            '13': (gc) => gc.runCommand(),
            // up
            '38': (gc) => gc.previousCommand(),
            // down
            '40': (gc) => gc.nextCommand(),
        };

		this.input.onkeydown = (e) => {
			const {value, selectionStart, selectionEnd} = e.target;
			this.renderVirtualInput(value, selectionStart, selectionEnd);
            const keyCode = GameConsole.getKeyCode(e);
            const handler = keyCodeHandlers[keyCode];
            if (handler) {
                handler(this);
                return false;
            }
            return true;
		};

		this.input.onkeyup = (e) => {
			const {value, selectionStart, selectionEnd} = e.target;
			this.renderVirtualInput(value, selectionStart, selectionEnd);
            return true;
		};
		
		this.sendButton.onclick = (e) => {
			this.runCommand();
		};
		
		document.onclick = () => {
			this.focusInput();
		};

		document.defaultView.onblur = () => {
			this.unfocusInput();
		};

		this.renderVirtualInput('', 0, 0);
		return this.render(this.game.look());
	}

	runCommand() {
		const command = this.input.value.toLowerCase();
		if (!command) {
			return;
		}
		this.parseCommand(command);
		this.input.value = '';
		this.renderVirtualInput('', 0, 0);
	}

	parseCommand(command) {
		try {
			GameConsole.SWEARS.forEach((swear) => {
				if (command.includes(swear)) {
					throw new CommandError('Such fucking language!');
				}
			});
			const [baseCommand, ...args] = command.split(' ');
			const handler = GameConsole.COMMANDS[baseCommand] ||
				(() => {throw new CommandError(`I don't know how to "${baseCommand}".`)});
			const output = handler(this.game, args);
			this.render(output);
			this.history.push(command);
			this.historyCursor = this.history.length;
		} catch (error) {
			if (error instanceof CommandError) {
				this.render(error.message);
				console.debug(error);
			} else {
				console.error(error);
			}
		}
	}

	focusInput(){
		this.input.focus();
		this.inputCaret.parentElement.classList.add("focus");
	}

	unfocusInput(){
		this.inputCaret.parentElement.classList.remove("focus");
	}

	renderVirtualInput(textContent, caretStart, caretEnd) {
		const isMultiChar = caretStart !== caretEnd;
		const isLastChar = caretStart === textContent.length;
		if (!isMultiChar && !isLastChar) {
			caretEnd++;
		}

		const pre = textContent.substring(0, caretStart);
		const selection = isLastChar ? '&nbsp;' : textContent.substring(caretStart, caretEnd);
		const post = textContent.substring(caretEnd);

		this.inputPreCaret.textContent = pre;
		this.inputCaret.innerHTML = selection;
		this.inputPostCaret.textContent = post;
		this.focusInput();
	}

	render(message) {
		this.output.value = message;
		this.pointCounter.innerHTML = `${this.game.points}/${Game.MAX_POINTS}`;
		this.stepCounter.innerHTML = this.game.steps;
	}

	showHistoryCommand() {
		this.input.value = this.historyCursor === this.history.length ? '' : this.history[this.historyCursor];
	}

	previousCommand() {
		if (this.historyCursor > 0) {
			this.historyCursor--;
		}
		this.showHistoryCommand();
	}

	nextCommand() {
		if (this.historyCursor < this.history.length) {
			this.historyCursor++;
		}
		this.showHistoryCommand();
	}
}

GameConsole.getKeyCode = (keyEvent) => {
	if (!keyEvent) keyEvent = window.event;
	return keyEvent.keyCode || keyEvent.which;
};

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

	//score
	'score': (game, args) => game.showScore(),
};

export default GameConsole;
