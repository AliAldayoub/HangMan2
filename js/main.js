const keysBox = document.querySelector('.keys-Box');

const keys = document.querySelectorAll('.keys-Box span');

const answerBox = document.querySelector('.answer-box');

const startButton = document.querySelector('.start');

const tryButton = document.querySelector('.try');

const hangMan = document.querySelector('.hang-man');

const overlayHang = document.querySelector('.overlayHang');

const startGameButton = document.querySelector('.startgame');

const inputBox = document.querySelector('.overlay input');

const overlay = document.querySelector('.overlay');
const arr = [ 'INTERSTELLER', 'GODFATHER', 'FURY', 'THEIRISHMAN', 'SUPERMAN', 'BREAKINGBAD', 'GAMEOFTHRONES' ];

let randomIndex = Math.floor(Math.random() * 7);
let gameOverCounter = 0;
let winCounter = 0;
let hangManNum = 0;
function createSpanElement(elem) {
	let span = document.createElement('span');
	elem.appendChild(span);
}

function startGame() {
	randomIndex = Math.floor(Math.random() * 7);
	for (let i = 0; i < arr[randomIndex].length; i++) {
		createSpanElement(answerBox);
	}
	keys.forEach((key) => {
		key.classList.remove('no-clicking');
	});
	gameOverCounter = 0;
	hangManNum = 0;
	winCounter = 0;
	overlayHang.style.display = 'none';
	overlayHang.firstElementChild.firstElementChild.innerHTML = ' Hang Man ';
	overlayHang.firstElementChild.firstElementChild.nextElementSibling.innerHTML = 'Try Again';

	for (let i = 0; i < hangMan.children.length; i++) {
		hangMan.children[i].style.visibility = 'hidden';
	}
}
keys.forEach((key) => {
	key.addEventListener('click', function() {
		let x = false;
		let str = arr[randomIndex];
		for (let i = 0; i < str.length; i++) {
			if (str[i] == key.innerHTML) {
				x = true;
				winCounter++;
				answerBox.children[i].innerHTML = str[i];
				key.classList.add('no-clicking');
				document.querySelector('.success').play();
			}
		}
		if (x == false) {
			hangMan.children[hangManNum].style.visibility = 'visible';
			hangManNum++;
			gameOverCounter++;
			document.querySelector('.wrong').play();
		}
		if (gameOverCounter == 8) {
			overlayHang.style.display = 'flex';
			keys.forEach((key) => {
				key.classList.add('no-clicking');
				document.querySelector('.hangsound').play();
			});
		}
		if (winCounter == str.length && gameOverCounter != 8) {
			overlayHang.style.display = 'flex';
			keys.forEach((key) => {
				key.classList.add('no-clicking');
			});
			overlayHang.firstElementChild.firstElementChild.innerHTML = ' You Win ';
			overlayHang.firstElementChild.firstElementChild.nextElementSibling.innerHTML = 'play Again';
			document.querySelector('.winsound').play();
		}
	});
});

startButton.addEventListener('click', function() {
	while (answerBox.children.length != 0) answerBox.removeChild(answerBox.children[0]);
	// console.log(answerBox.children[0]);
	document.querySelector('.hangsound').pause();
	document.querySelector('.winsound').pause();
	document.querySelector('.winsound').currentTime = 0;
	document.querySelector('.hangsound').currentTime = 0;
	startGame();
});
tryButton.addEventListener('click', function() {
	while (answerBox.children.length != 0) answerBox.removeChild(answerBox.children[0]);
	// console.log(answerBox.children[0]);

	startGame();
	document.querySelector('.hangsound').pause();
	document.querySelector('.hangsound').currentTime = 0;
	document.querySelector('.winsound').pause();
	document.querySelector('.winsound').currentTime = 0;
});
startGameButton.addEventListener('click', function() {
	// while (answerBox.children.length != 0) answerBox.removeChild(answerBox.children[0]);
	// console.log(answerBox.children[0]);
	overlay.style.display = 'none';
	startGame();
	if (inputBox.value == '') {
		document.querySelector('.name span ').innerHTML = 'Default User';
	} else {
		document.querySelector('.name span ').innerHTML = inputBox.value;
	}
	inputBox.value = '';
});
