var startBtn = document.querySelector("#startBtn");
var timerElement = document.querySelector("#timer");
var scoreElement = document.querySelector("#score");
var sectionEl = document.querySelector("#section");
var showQuestions = document.querySelector("#questions")
var titleEl = document.querySelector(".title");
var choicesEl = document.querySelector(".choices");
var currentScore = document.querySelector("#currentscores");
var gameOverEl = document.querySelector("#gameover");
var enterName = document.querySelector("#name");
var submitBtn = document.querySelector("#submit");
var highScore = document.querySelector("#highscore");
var resetBtn = document.querySelector("#reset");
var endResults = document.querySelector("#results");
var renderScore = document.querySelector("#listitems");

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
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = "Timer: " + timerCount + " seconds";
        if (timerCount <= 0) {
            clearInterval(timer);
            gameOver();
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
    for (i = 0; i < allQuestions.Choices.length; i++) {
        var choiceBtn = document.createElement("button");
        // Sets an attribute of value to each of the choices
        choiceBtn.setAttribute("value", allQuestions.Choices[i]);
        choiceBtn.setAttribute("class", "btn");
        // Displays the choices inside of the element button created on line 74
        choiceBtn.textContent = allQuestions.Choices[i];
        // When user clicks on a button, then execute function answerCorrect, which will analyze whether the choice is correct or false
        choiceBtn.onclick = answerCorrect;
        // targets the class choices in HTML and adds all the buttons + content to that div 
        choicesEl.appendChild(choiceBtn);
    }
}

function answerCorrect() {
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

    // If it doesn't equal jsQuestions.length, then continue and execute nextQuestion
    currentQuestion++;

    // If currentQuestion is equal to the length of how many questions are in jsQuestions, then end the game
    if (currentQuestion === jsQuestions.length) {
        gameOver();
    } else {
        nextQuestion();
    }
}

function gameOver() {
    clearInterval(timer);

    showQuestions.setAttribute("class", "hide");
    currentScore.removeAttribute("class", "hide");

    var finalScore = document.createElement("h2");
    finalScore.textContent = "You scored " + score + "/100";
    currentScore.append(finalScore);

    endResults.setAttribute("style", "display:flex");
    highScore.removeAttribute("class", "hide");
    resetBtn.removeAttribute("class", "hide");
}

function generateScore() {
    var endScore = JSON.parse(window.localStorage.getItem("High Scores")) || [];
    renderScore.innerHTML = "";

    // for loop is looping through the number of scores stored in localStorage
    for (var i=0; i < endScore.length; i++) {
        var listScore = document.createElement("li")
        listScore.setAttribute("class", "list-score")
        listScore.textContent = "Name: " + endScore[i].initials + " Score: " + endScore[i].scores;

        // The listScore.textContent is being appended to renderScore, which will display on the webpage
        renderScore.append(listScore);
    }
}

function resetGame(event) {
    event.preventDefault();
    window.location.reload();
}

function saveScore() {
    var userInitials = enterName.value.trim();
    var userScore = score;
    console.log(score)
    var objects = {
        initials: userInitials,
        scores: userScore
    };
    // This is looking in localStorage for values under High Scores. If not found, an empty array is stored in endScore
    console.log(objects)
    var endScore = JSON.parse(window.localStorage.getItem("High Scores")) || [];
    
    // Since endScore is now an array then we can push user input from 'objects' into the variable endScore
    endScore.push(objects);
   
    // Takes the object in endScore and turns them into a string
    window.localStorage.setItem("High Scores", JSON.stringify(endScore));
}

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    saveScore();
    generateScore();
});
resetBtn.addEventListener("click", resetGame);
startBtn.addEventListener("click", startGame);

