console.log('hello world');

const subjects = document.querySelectorAll(".subjects");
let button = document.getElementById("btn")
let previous = document.getElementById("prev")

const optionA = document.getElementById("a");
const optionB = document.getElementById("b");
const optionC = document.getElementById("c");
const optionD = document.getElementById("d");
let questionText =  document.getElementById("question");
const subjectIcon = document.getElementById("subject-icon");
let questionSeriesContainer = document.querySelector(".question-series");
let selectSubContainer = document.querySelector(".subject-select");
const progressContainer = document.querySelector(".progress-container");
let clickedSubject = document.getElementById("clickedsubject")
let counter = 0 ;
let section = document.querySelector("section")
let sliderContainer = document.querySelector(".slide-container")
const numberofQuestion = document.getElementById("numberof-question");

sliderContainer.addEventListener("click",shiftSlider);
let slider = document.querySelector(".inner-slider");

function shiftSlider() {

    if (!slider.classList.contains("sliderRight")) {
        slider.classList.add("sliderRight");
        darkMode();
        localStorage.setItem("theme","dark-mode")
    } else {
        slider.classList.remove("sliderRight");
        localStorage.setItem("theme","")

        lightMode();
    }
}


function darkMode(){
    section.classList.add("dark-mode")
    slider.classList.add("sliderRight");
 
}

function lightMode(){
    section.classList.remove("dark-mode")
    slider.classList.remove("sliderRight");

}

let setTheme = localStorage.getItem("theme");


if (setTheme === "dark-mode") {
   
    darkMode();
}else{

    lightMode();
}

function darkAndLightTheme(){
localStorage.getItem("theme",darkMode());
}

subjects.forEach(subject => {
    subject.addEventListener('click',getSelectedSubject);
})

let x ="" ;
let numbers = '';

function getSelectedSubject(){
    selectSubContainer.style.display = "none";
    questionSeriesContainer.style.display = "block";
    x = this.getAttribute('data-subject');

   let imgSrc = this.querySelector("img");
   clickedSubject.innerHTML = x;
   document.getElementById("pick-text").style.display = 'none';
   progressContainer.style.display = "block";

   console.log(imgSrc);
   subjectIcon.src = imgSrc.src;
   subjectIcon.classList.add(imgSrc.getAttribute("class"));
   
 fetchingData();
   return x;
}


let correctAnswerJson = [];
let js = '';
function showQuestion(data){
    
 // console.log();
  numbers = `Question ${counter +1} of ${data[x].length}`;
  console.log(numbers);
    if (counter >= data[x].length) {
       
               counter = 0;
               showCorrectAnswers();
       }else{
    let question = data[x][counter].question;
    let option = data[x][counter];
    correctAnswerJson = option.answer ;

     console.log(question);
   
    questionText.innerHTML = question;
    questionText.style.fontSize = "1.5em";
    questionText.style.fontWeight = "600";

    optionA.innerHTML = option.choice1;
    optionB.innerHTML = option.choice2;
    optionC.innerHTML = option.choice3;
    optionD.innerHTML = option.choice4;

    counter++;
   

}
numberofQuestion.innerHTML = numbers;

}


function fetchingData(){

fetch("questions.json")
.then(data => {
    if(!data.ok){
       console.log("Failed to etch Data");
    }
    return data.json();
}).then(question => showQuestion(question))
.catch(error => {
    console.log('Sorry Something went Wrong',error)
})
}


let answerData = document.querySelectorAll(".option-container");

let getContainer = '';

answerData.forEach(answers => {
    getContainer =answers;
    answers.addEventListener("click",checkCorrectAnswer);
})


let correctAnswer = '';
let checkAnswer = 0;

function checkCorrectAnswer(){
const progressBar = document.querySelector(".progress-bar");

    let answerAtt = this.querySelectorAll('li');
    
    for(let i = 0; i < answerAtt.length;i++){
        let p = answerAtt[i].getAttribute("data-answer");
        
        let convertDataToNum = parseInt(p);
        console.log(correctAnswerJson);
        let currentWidth = parseInt(progressBar.style.width || 0);
        let newWidth = currentWidth + 30;
    if (convertDataToNum == correctAnswerJson) {
       
       this.style.border = '4px solid green';
       this.style.boxShadow = '8px 8px 8px 2px solid green';

       checkAnswer += 1;
       correctAnswer = checkAnswer;
       
    if(progressBar.style.width !== 200 + "px"){
       progressBar.style.width = newWidth + "px";
       }
    }

    else{
        console.log('incorrect');
        this.style.border = '4px solid red';
        
    }
    }
    

}

button.addEventListener("click",increase);



function increase(){
     if(fetchingData){
        fetchingData();
     }
        answerData.forEach(div => {
            div.style.border = "";
        })
}

function showCorrectAnswers(){
    let mainContainer = document.querySelector(".quiz-container");
    mainContainer.innerHTML = `
    <div class="lastMessage">
    <h1 >Your ${correctAnswer ? correctAnswer: 0} Answer are correct out of 10</h1>
    <button class="imp-btn">Click to Refresh</button>
    </div>
    `;

    let refreshBtn = mainContainer.querySelector("button");
    refreshBtn.addEventListener("click",refresh);
    function refresh(){
        window.location.reload();
    }

}



