var startScreen;
var gameHTML;
var counter = 30;

var questionArray = ["In what year was Mario first created?", "What was Mario's original name?", "In which game did Mario first appear?", "This popular enemy from 'Super Mario Bros. 2' was actually revealed to be a transvestite. Was it...", "What was the original name of the princess Mario is always fighting to save?", "What was Mario's original profession?", "How many members make up the Koopalings?", "What was the first game in which Bowser and Mario fight on the same team?" ];

var answerArray = [["1983","1978","1988","1980"], ["Mustache Guy","Jumpman","Wario","Plumberman"], ["Super Mario Bros.","Mario Bros.","Donkey Kong","Dr. Mario"], ["Shy Guy","Phanto","Birdo","Mouser"], ["Princess Daisy","Princess Peach","Princess Diana","Princess Toadstool"], ["Carpenter","Plumber","Shoemaker","Construction Worker"], ["6","7","9","4"], ["Super Mario Bros. 3","Mario Party 2","Paper Mario","Super Mario RPG"]];

var imageArray = ["<img class='center-block img-right' id='babyMario' src='assets/images/babymario.png'>", "<img class='center-block img-right' id='jumpman' src='assets/images/jumpman.png'>", "<img class='center-block img-right' id='donkeyKong' src='assets/images/donkeykong.gif'>", "<img class='center-block img-right' id='birdo' src='assets/images/birdo.png'>", "<img class='center-block img-right' id='peach' src='assets/images/peach.png'>", "<img class='center-block img-right' id='carpenter' src='assets/images/carpenter.png'>", "<img class='center-block img-right' id='koopalings' src='assets/images/koopalings.png'>", "<img class='center-block img-right' id='bowser' src='assets/images/bowser2.gif'>"];

var correctAnswers = ["A. 1983", "B. Jumpman", "C. Donkey Kong", "C. Birdo", "D. Princess Toadstool", "A. Carpenter", "B. 7", "D. Super Mario RPG"];

var questionCounter = 0
var selecedAnswer;
var theClock;
var numberCorrect = 0;
var numberIncorrect = 0;
var numberUnanswered = 0;

function setVolumeLow() {
	var myAudio = document.getElementById("background");  
    myAudio.volume = 0.2;
}

function setVolumeNorm() {
	var myAudio = document.getElementById("background");  
    myAudio.volume = 1.0;
}

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Game</a></p>";
	$(".mainArea").html(startScreen);
}

function generateLossTimeOut() {
	numberUnanswered++;
	$('audio#incorrect')[0].play();
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time! The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.gif'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 3000);
}

function generateWin() {
	numberCorrect++;
	$('audio#correct')[0].play();
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 3000);
}

function generateLoss() {
	numberIncorrect++;
	$('audio#incorrect')[0].play();
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Incorrect! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.gif'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000);
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
		setVolumeLow();
		$('audio#gameend')[0].play();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 10) {
			$('audio#timeup')[0].play();
		}
		if (counter === 0) {
			clearInterval(theClock);
			generateLossTimeOut();
		}
		if (counter > 0) {
			counter--;
			$(".timer").html(counter);
		}
	}
}

function finalScreen() {
	
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Let's see how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + numberCorrect + "</p>" + "<p class='summary'>Incorrect Answers: " + numberIncorrect + "</p>" + "<p class='summary'>Unanswered: " + numberUnanswered + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	numberCorrect = 0;
	numberIncorrect = 0;
	numberUnanswered = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

$(document).ready(function() {

initialScreen();

$("body").on("load", function(){
})

$("body").on("click", ".start-button", function(event){
	event.preventDefault();
	$('audio#background')[0].play();
    $('audio#start')[0].play();
    generateHTML();

    timerWrapper();

});

$("body").on("click", ".answer", function(event){
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		clearInterval(theClock);
		generateWin();
	}
	else {
		clearInterval(theClock);
		generateLoss();
	}
});

$("body").on("click", ".reset-button", function(event){
	$('audio#start')[0].play();
	setVolumeNorm();
    resetGame();
});

});