import {clearQuestion, updateQuestionNumber, displayQuestionNumber,
    displayQuestions, displayAnswers, body, arrayQuestion, currentQuestionNumber} from "./script.js"

export const popUpText = document.createElement("p");
export const correctAnswerText= document.createElement("p")
export const scoreDisplay = document.createElement("p")
export const nextButton = document.createElement("button");

export function createPopUp() {
    //is it better to export this element and take it out from here ? probably :) ASK
    const popUpWindow = document.createElement("div");

    
    popUpWindow.classList.add("popUp-window");
    body.appendChild(popUpWindow);
   
    popUpText.classList.add("popUp-text")
    popUpWindow.appendChild(popUpText)
    popUpWindow.appendChild(correctAnswerText)
    popUpWindow.appendChild(scoreDisplay)
    scoreDisplay.id="scoreDisplay"
    nextButton.classList.add("next-question-button");
    nextButton.id = "nextQuestion";
    nextButton.innerText = "Next Question";
    popUpWindow.appendChild(nextButton);

    nextButton.addEventListener("click", () => {

        const questionElement = displayQuestions();
       clearQuestion (questionElement);
       updateQuestionNumber();
       displayQuestionNumber(arrayQuestion, currentQuestionNumber);
       displayQuestions();
       displayAnswers();
        closePopUp(popUpWindow);
    });
    //check if this is beign used!!
    return popUpWindow;
}

export function openPopUp(popUp) {

    popUp.style.display= "flex";
}

export function closePopUp(popUp) {

    popUp.style.display = "none"; 
   
}


// ask! i create an element here but I want to change it in the main js??? is that ok or is messy?? its the score display, should I move it?