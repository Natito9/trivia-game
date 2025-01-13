
import {popUpText, correctAnswerText, createPopUp, openPopUp} from "./feedbackPopup.js"
import { navTitle, selectedCategory } from "./homepage.js";
export const body = document.querySelector("body");


const apiUrl = `https://opentdb.com/api.php?amount=10&category=${9}&type=multiple`
const questionDisplay = document.getElementById("question");
const answerButtons = document.querySelectorAll(".btn-answer");


let score = 0
export let currentQuestionNumber = 0 
export let arrayQuestion = [];


async function getDataFromApi(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not access data");
        }

        const data = await response.json();

        if (data.error) {
            alert(data.error.message);
            return;
        }

        arrayQuestion = data.results;
        return arrayQuestion;

    } catch (error) {
    alert("An error occurred: " + error.message);
    }
}


export function displayQuestions() {

    const currentQuestion = arrayQuestion[currentQuestionNumber].question;
    const cleanQuestion = currentQuestion.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#039;/g, "'").replace(/&iacute;/g, "Í");

    const questionElement = document.createElement("p");
    questionElement.innerText = cleanQuestion;
    questionDisplay.appendChild(questionElement);

}


export function clearQuestion () {
    
    questionDisplay.innerText="";
}


function randomizeAnswers() {
    const answers = [...arrayQuestion[currentQuestionNumber].incorrect_answers, arrayQuestion[currentQuestionNumber].correct_answer]
    console.log(answers);

    const randomAnswers = answers.sort(() => Math.random() - 0.5);
    console.log(randomAnswers);

    return randomAnswers;

}

export function displayAnswers() {

    const randomAnswers = randomizeAnswers();
   
    answerButtons.forEach((button, index) => {
        button.innerText = randomAnswers[index];
    });
}


//tried to make it reusable 
export function displayQuestionNumber (array, currentQuestionNumber){
    let questionNumberDisplay = document.getElementById("current-question");
     questionNumberDisplay.innerText = `${currentQuestionNumber + 1} / ${array.length}`
    return questionNumberDisplay;
}
let questionNumberDisplay
export {questionNumberDisplay};

export function updateQuestionNumber() {
    currentQuestionNumber++;
    console.log("updated question number") 

}


function checkCorrectAnswer(selectedAnswer) {

    const correctAnswer = arrayQuestion[currentQuestionNumber].correct_answer;
    if ( selectedAnswer === correctAnswer) {
            console.log("yay")
            popUpText.innerText = "correct";
            popUpText.style.color="var(--correct-color)"
            correctAnswerText.innerText = ""
            score++

    }
    else {
        console.log("incorrect sorry")
        popUpText.innerText = "incorrect";
         popUpText.style.color="var(--incorrect-color)"
        correctAnswerText.innerText = `correct answer: ${correctAnswer}`
    }   
}


function clickAnyAnswer (buttons, popUp) {

    buttons.forEach((button) => {
        button.addEventListener("click", () =>{
            openPopUp(popUp);
            const selectedAnswer = button.innerText;
            checkCorrectAnswer(selectedAnswer);
    })
    })
}

function displayCurrentCategory () {

    const {selectedCategoryText} = selectedCategory();
    navTitle.innerText = `${selectedCategoryText}`
}


export async function startQuiz() {
    await getDataFromApi(apiUrl); 

    if (arrayQuestion) {
      
        displayQuestions();
        displayAnswers();
        displayQuestionNumber(arrayQuestion, currentQuestionNumber);
        const popUpWindow = createPopUp();
        clickAnyAnswer(answerButtons, popUpWindow);
        displayCurrentCategory ()
   
    } else {
        console.error("No questions to display.");
    }
}

