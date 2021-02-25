var startBtn = document.querySelector("#startBtn");
var timerElement = document.querySelector("#timer");
var scoreElement = document.querySelector("#score");
var footballLogo = document.querySelector("NFL");

var footballQuestions = [{
    Question: "Who was the first team in the NFL to go 0-16?",
    Choices: ["Detroit Lions", "New York Jets", "Cleveland Browns", "St. Louis Rams"],
    Answer: "Detroit Lions"
},
{
    Question: "In the season 2019-2020, who is currently the oldest NFL coach?",
    Choices: ["Bill Belichick", "Bruce Arians", "Mike Zimmer", "Pete Carroll"],
    Answer: "Pete Carroll"
},
{
    Question: "In 2001, what team drafted Drew Brees and in what round?",
    Choices: ["New Orlean Saints, 1st Round", "Indianapolis Colts, 3th Round", "San Diego Chargers, 2nd Round", "Atlanta Falcons, 1st Round"],
    Answer: "San Diego Chargers, 2nd Round"
}]

console.log(footballQuestions);

var timer;
var timerCount; 
var keepingScore = 0;
var currentQuestion = 0;


function startGame() {
    timerCount = 60;
    startBtn.disabled = false;
    startTimer();
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = "Timer: " + timerCount + " seconds";
    }, 1000);
}

function setScore

function getArray() {

}

function getCorrect () {

}

function getWrong () {

}

function gameOver() {

}

function saveHighScore() {

}





startBtn.onclick = startGame
