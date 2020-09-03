var questions = [
    {
        name: "Question 1",
        question: "Which function returns a random integer from min to max inclusively?",
        choice1: "var getRandomInt = function(min, max) { return Math.floor(Math.random() * (max - min) + min + 1; }",
        choice2: "function getRandomInt(min, max) { return Math.random(min, max) }",
        choice3: "const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);",
        choice4: "let getRandomInt = (min, max) => return Math.floor(Math.random() * (max - min) + min + 1);",
        choice5: "None of the above.",
        correct: "const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);"
    },
    {
        name: "Question 2",
        question: "Which of these is not a valid array method?",
        choice1: ".pop()",
        choice2: ".shift()",
        choice3: ".toString()",
        choice4: ".forEach()",
        choice5: ".unShift",
        correct: ".unShift"
    },
    {
        name: "Question 3",
        question: "The Boolean() function tests whether a parameter is true or false. Which choice will return false?",
        choice1: "Boolean(true)",
        choice2: "Boolean(\"false\")",
        choice3: "Boolean(0)",
        choice4: "Boolean(1337)",
        choice5: "None of the above.",
        correct: "Boolean(0)"
    },
    {
        name: "Question 4",
        question: "What will typeof [] return?",
        choice1: '"string"',
        choice2: '"undefined"',
        choice3: '"object"',
        choice4: '"array"',
        choice5: '"boolean"',
        correct: '"object"'
    },
    {
        name: "Question 5",
        question: "Q5",
        choice1: "ch1",
        choice2: "ch2",
        choice3: "ch3",
        choice4: "ch4",
        choice5: "None of the above.",
        correct: "ch2"
    }
];
var currentAnswer = "";
var time = 50;
var qNum = 0;
var correctAnswers = 0;
var hiscores = 0;
var renderQuestions = () => {
    $("#question").text(questions[qNum].question);
    for (let i = 1; i < 6; i++) {
        $(`#choice${i}`).text(questions[qNum][`choice${i}`]);
        $(`#choice${i}`).attr("style", "display: inline");
    }
};
var updateAnswer = () => currentAnswer = questions[qNum].correct;

var clearQuiz = () => {
    for (let i = 1; i < 6; i++) $(`#choice${i}`).attr("style", "display: none");
    $("#question").text("");
    $("#quiz-start").attr("style", "display: none");
    $("#view-hiscores").attr("style", "display: none");
}

function scrambleQuestions(arr) {
    var newArr = arr;
    var returnArr = [];
    for (let i = 0; i < 5; i++) {
        var randInt = Math.floor(Math.random() * (newArr.length))
        console.log(randInt);
        returnArr.push(newArr[randInt])
        newArr.splice(randInt, 1);
    }
    return returnArr;
}

function checkAnswer(ans) {
    if (ans === currentAnswer) {
        console.log("correct answer");
        correctAnswers++;
        console.log("correct answers: " + correctAnswers);
    } else {
        console.log("wrong answer");
    }
    if (qNum < questions.length - 1) {
        qNum++;
        renderQuestions();
        console.log("Correct answer is " + currentAnswer);
        updateAnswer();
    } else {
        endQuiz();
    }
}

function updateHiscores(scores=false) {
    if (scores) {
        $("#hiscores").empty();
        localStorage.setItem("hiscores", JSON.stringify(scores));
        for (let i in scores) {
            var newLi = $(`<li>Initials: ${scores[i][0]} Score: ${scores[i][1]}</li>`)
            console.log(scores)
            $("#hiscores").append(newLi);
        }
    } else {
        $("#hiscores").empty();
        localStorage.clear();
    }

}

var getHiscores = () => JSON.parse(localStorage.getItem("hiscores"));
var addHiscore = () => hiscores.push([$("#initials").val(), correctAnswers]);

$("#add-hiscore").on("click", event => {
    if (!hiscores) {
        hiscores = [];
    }
    addHiscore();
    updateHiscores(hiscores);
});

$("#clear-hiscores").on("click", event => {
    hiscores = false;
    updateHiscores(hiscores)
});

$("#view-hiscores").on("click", event => {
    endQuiz();
});

function endQuiz() {
    clearQuiz();
    $("#correct-answers").text(`Correct answers: ${correctAnswers}`);
    $("#post-quiz").attr("style", "display: inline");
    
}

const init = () => {
    $(".choice-button").on("click", event => {
        console.log("Answer chosen: " + event.target.textContent);
        checkAnswer(event.target.textContent);
    })
    $("#quiz-start").on("click", () => renderQuestions());
    questions = scrambleQuestions(questions);
    updateAnswer();
    hiscores = getHiscores();
    updateHiscores(hiscores);
};
init();
// var choice2 = $("#choice2");
// var choice3 = $("#choice3");
// var choice4 = $("#choice4");
// var choice5 = $("#choice5");