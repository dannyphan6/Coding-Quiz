var startBtn = document.querySelector("#startBtn");
var timerElement = document.querySelector("#timer");
var scoreElement = document.querySelector("#score");
var jsImage = document.querySelector("#javascript");
var section = document.querySelector("#section");
var showQuestions = document.querySelector("#questions")
var title = document.querySelector(".title");
var choices = document.querySelector(".choices");
var highScore = document.querySelector("#highscores");

var jsQuestions = [{
    Question: "What are the types of pop up boxes that are available in JavaScript?",
    Choices: ["Alert", "Confirm", "Prompt", "All the above"],
    Answer: "All the above"
},
{
    Question: "The condition in an if/else statement is enclosed within ____?",
    Choices: ["Quotes", "Curly Braces", "Square Brackets", "Parentheses"],
    Answer: "Parentheses"
},
{
    Question: "A very useful function used for debugging in JavaScript is called ____",
    Choices: ["localStorage", "getAttribute", "console.log", "setItems"],
    Answer: "console.log"
}]

console.log(jsQuestions);

var timer;
var timerCount; 
var score = 0;
var currentQuestion = 0;


function startGame() {
    timerCount = 60;
    // Setting an attribute class of hide that hides the whole 'section' once game starts
    section.setAttribute("class", "hide")
    // Removing the attribute class of hide to display questions after section is hidden
    showQuestions.removeAttribute("class", "hide")
    startTimer();
    setScore();
    nextQuestion();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = "Timer: " + timerCount + " seconds";
        if (timerCount <= 0) {
            clearInterval(timer);
        }
    }, 1000);
    
}

function setScore() {
    scoreElement.textContent = "Score: " + score;
}

function nextQuestion() {
    // The array jsQuestions is stored in the variable 
    var allQuestions = jsQuestions[currentQuestion];

    title.textContent = allQuestions.Question

    choices.innerHTML = ""

    for(i = 0; i < allQuestions.Choices.length; i++) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", allQuestions.Choices[i])
        choiceBtn.textContent = allQuestions.Choices[i]
        choiceBtn.onclick = answerCorrect
        choices.appendChild(choiceBtn)
    }
}

function answerCorrect () {
    console.log(this.value)

    if (this.value !== jsQuestions[currentQuestion].Answer) {
        timerCount -= 10;
    } else if (this.value === jsQuestions[currentQuestion].Answer) {
        score += 20;
        scoreElement.textContent = "Score: " + score
    }
    currentQuestion++;
    if(currentQuestion === jsQuestions.length) {
        gameOver();
    } else {
        nextQuestion();
    }

}

function gameOver () {
    showQuestions.setAttribute("class", "show");
    highScore.removeAttribute("class", "hide");
}

function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = 0;


}

function saveScore() {

}





startBtn.onclick = startGame
