"use strict";
// Velja öll element
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// Búa til spurningar
let questions = [
    {
        question : "Hvað stendur JS fyrir ?",
        choiceA : "Java Script",
        choiceB : "Joð Scrifta",
        choiceC : "Jumbó Samloka",
        choiceD : "Java Soldier",
        correct : "A"
    },{
        question : "Hvað stendur html fyrir ?",
        choiceA : "Honest Text More Language",
        choiceB : "Hypertext Markup Language",
        correct : "B"
    }
];

// Búa til breytur

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// Sýna spurningu
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";

    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;

    if(runningQuestion > 0){
        choiceC.style.display = "none";
        choiceD.style.display = "none";
    }
}

start.addEventListener("click",startQuiz);

// Byrja spurningu og tíma
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// Sýna framförin
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// Teljari

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // Ef vitlaust sýna rauðann lit
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // Enda spurningarleik
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// Tjekka hvort það sé rétt svar

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // Svar er rétt
        score++;
        // ef svar er rétt breyta lit í grænan
        answerIsCorrect();
    }else{
        // Svar er rangt
        // þá er sýnt rauðann lit
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // enda spurningu
        clearInterval(TIMER);
        scoreRender();
    }
}

// svar er rétt og setja grænan lit
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// svar er vitlaust og setja rauðan lit
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// Stigatafla
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // Reikna prósentu
    const scorePerCent = Math.round(100 * score/questions.length);
    
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















