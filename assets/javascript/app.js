var startScreen;
var gameHTML;
var counter = 30;

var questionArray = ["In what year was Mario first created?", "What was Mario's original name?", "In which game did Mario first appear?", "This popular enemy from 'Super Mario Bros. 2' was actually revealed to be a transvestite. Was it...", "What was the original name of the princess Mario is always fighting to save?", "What was Mario's original profession?", "How many members make up the Koopalings?", "What was the first game in which Bowser and Mario fight on the same team?" ];

var answerArray = [["1983","1978","1988","1980"], ["Mustache Guy","Jumpman","Wario","Plumberman"], ["Super Mario Bros.","Mario Bros.","Donkey Kong","Dr. Mario"], ["Shy Guy","Phanto","Birdo","Mouser"], ["Princess Daisy","Princess Peach","Princess Diana","Princess Toadstool"], ["Carpenter","Plumber","Shoemaker","Construction Worker"], ["6","7","9","4"], ["Super Mario Bros. 3","Mario Party 2","Paper Mario","Super Mario RPG"]];

// seperate images into IDs for better styling
var imageArray = ["<img class='center-block img-right' src='assets/images/babymario.png'>", "<img class='center-block img-right' src='assets/images/jumpman.png'>", "<img class='center-block img-right' src='assets/images/donkeykong.gif'>", "<img class='center-block img-right' src='assets/images/birdo.png'>", "<img class='center-block img-right' src='assets/images/peach.png'>", "<img class='center-block img-right' src='assets/images/carpenter.png'>", "<img class='center-block img-right' src='assets/images/koopalings.png'>", "<img class='center-block img-right' src='assets/images/bowser2.gif'>"];

var correctAnswers = ["A. 1983", "B. Jumpman", "C. Donkey Kong", "C. Birdo", "D. Princess Toadstool", "A. Carpenter", "B. 7", "D. Super Mario RPG"];

var questionCounter = 0
var selecedAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio(""); //add sfx

function generateLossTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time! The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.gif'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 3000);
}

function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 3000);
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='http://www.defunctgames.com/pic/deaths/rip-mario1.gif'>";
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
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Let's see how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

$(document).ready(function() {

function initialScreen() {
    startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Game</a></p>";
    $(".mainArea").html(startScreen);
}

initialScreen();

$("body").on("click", ".start-button", function(event){
    event.preventDefault();
    clickSound.play();
    generateHTML();

    timerWrapper();

});

$("body").on("click", ".answer", function(event){
	clickSound.play();
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
    clickSound.play();
    resetGame();
});

});