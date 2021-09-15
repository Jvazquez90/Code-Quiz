// Questions and Answers
var questions = [{
    title: "What does HTML stand for?",
    choices: ["HighText Machine Language", "HyperText and Links Markup Language", "HyperText Markup Language", "None Of The Above"],
    answer: "HyperText Markup Language"
},
{
    title: "What tag can be used for a line-break in HTML",
    choices: ["< br >","< a >", "< b >","< break >"],
    answer: "< br >"
},
{
    title: "What does CSS Stand for?",
    choices: ["Color and Style Sheets", "Cascading Style Sheets", "Cascade Style Sheet", "None Of The Above"],
    answer: "Cascading Style Sheets"
},
{
    title: "In HTML what is used to define an internal stylesheet?",
    choices: ["< style >", "< script >", "style", "< link >"],
    answer: "< link >"
},
{
    title:" How would you write 'Hello World' in javascript?",
    choices: ["document.write('Hello World')","println ('Hello World')", "response.write('Hello World')", "System.out.println('Hello World')"],
    answer: "document.write('Hello World')"
}]

// Scores and Timers 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

var startBtn = document.getElementById('start-btn')

//Press Start to play game and start timer
function start() {

    timeLeft = 60;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;

        //If the timer reaches 0 end game
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    },1000);

    // hideStartElements()
    next();

    // console.log(start);
    // console.log(setInterval);

}
// function hideStartElements() {
//     //create a list of elements to hide
//     var quizContainer = document.getElementById('quizcontainer')
//     //hide them
//     quizContainer.style.display = 'none';
// }

//Next Question
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h3>" +questions[currentQuestion].title + "</h3>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }
    document.getElementById("quizContainer").innerHTML = quizContent;

    // console.log('end game')
}

//Take away 20 seconds if question answered incorrectly
function incorrect() {
    timeLeft -= 20; 
    next();
}

//increase the score by 20 points if question answered correctly
function correct() {
    score += 20;
    next();
}

//stop the timer to end the game 
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <input type="text" id="name" style="height: 30px" placeholder="Name"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizContainer").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", JSON.stringify(score));
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}

function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>`;

    document.getElementById("quizContainer") .innerHTML = quizContent;
}
//clears the score name in the local storage 'clear score' is selected
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");
    resetGame();
}
//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        The Gamer Quiz!
    </h1>
    <iframe src="https://giphy.com/embed/jow0htwvROxzepF0UZ" width="380" height="238" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/lootcrate-game-on-neon-lights-jow0htwvROxzepF0UZ"></a></p>
    <h3>
        Press Start to Play!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizContainer").innerHTML = quizContent;
}
startBtn.addEventListener('click', start)