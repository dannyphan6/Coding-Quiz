var startBtn = document.querySelector("#startBtn");
var timerElement = document.querySelector("#timer");
var scoreElement = document.querySelector("#score");
var jsImage = document.querySelector("#javascript");
var sectionEl = document.querySelector("#section");
var showQuestions = document.querySelector("#questions")
var titleEl = document.querySelector(".title");
var choicesEl = document.querySelector(".choices");
var highScore = document.querySelector("#highscores");
var gameOverEl = document.querySelector("#gameover");


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
},
{
    Question: "Arrays in JavaScript can be used to store ____",
    Choices: ["Numbers & Strings", "Other Arrays", "Booleans", "All the above"],
    Answer: "All the above"
},
{
    Question: "Commonly used data types DO NOT include ____",
    Choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    Answer: "Alerts"
}];

console.log(jsQuestions);

var timer;
var timerCount; 
var score = 0;
var currentQuestion = 0;


function startGame() {
    timerCount = 60;
    // Setting an attribute class of hide that hides the whole 'section' once game starts
    sectionEl.setAttribute("class", "hide");
    // Removing the attribute class of hide to display questions after section is hidden
    showQuestions.removeAttribute("class", "hide");
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
    scoreElement.textContent = "Score: " + score + "/100";
}

function nextQuestion() {
    // The array jsQuestions is stored in the variable 
    var allQuestions = jsQuestions[currentQuestion];

    // Targets the class title in HTML and displays the question from allQuestions
    titleEl.textContent = allQuestions.Question;

    // Clears the string of choices when the next question appears
    // innerHTML is used here because it's clearing everything including the values, text inside button, and etc 
    choicesEl.innerHTML = "";

    // for loop that creates a button for each choice in allQuestions
    for(i = 0; i < allQuestions.Choices.length; i++) {
        var choiceBtn = document.createElement("button");
        // Sets an attribute of value to each of the choices
        choiceBtn.setAttribute("value", allQuestions.Choices[i]);
        // Displays the choices inside of the element button created on line 74
        choiceBtn.textContent = allQuestions.Choices[i];
        // When user clicks on a button, then execute function answerCorrect, which will analyze whether the choice is correct or false
        choiceBtn.onclick = answerCorrect;
        // targets the class choices in HTML and adds all the buttons + content to that div 
        choicesEl.appendChild(choiceBtn);
    }
}

function answerCorrect () {
    // This will grab the value from whatever the user selects
    console.log(this.value);

    // This says that if the value the user selects, isn't equal to the 'Answer' then subtract 10 seconds
    if (this.value !== jsQuestions[currentQuestion].Answer) {
        timerCount -= 10;
    // If the value the user selects IS equal to the 'Answer' then add 20 points and display the score
    } else if (this.value === jsQuestions[currentQuestion].Answer) {
        score += 20;
        scoreElement.textContent = "Score: " + score + "/100";
    }
    // If currentQuestion is equal to the length of how many questions are in jsQuestions, then end the game
    // If it doesn't equal jsQuestions.length, then continue and execute nextQuestion
    currentQuestion++;
    if(currentQuestion === jsQuestions.length) {
        gameOver();
    } else {
        nextQuestion();
    }
}

function gameOver () {
    clearInterval(timer);

    
    showQuestions.setAttribute("class", "hide");
    highScore.removeAttribute("class", "show");
    var finalScore = document.createElement("h2");
    finalScore.textContent = "You scored " + score + "/100";
    highScore.append(finalScore);
}

function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = 0;


}

function saveScore() {

}





startBtn.onclick = startGame
