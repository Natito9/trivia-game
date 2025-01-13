import {clearQuestion, updateQuestionNumber, displayQuestionNumber,
    displayQuestions, displayAnswers, body, arrayQuestion, currentQuestionNumber} from "./script.js"

export const popUpText = document.createElement("p");
export const correctAnswerText= document.createElement("p")

export function createPopUp() {

    const popUpWindow = document.createElement("div");
    const nextButton = document.createElement("button");
    
    popUpWindow.classList.add("popUp-window");
    body.appendChild(popUpWindow);
   
    popUpText.classList.add("popUp-text");
    popUpWindow.appendChild(popUpText);

    popUpWindow.appendChild(correctAnswerText)

    nextButton.classList.add("next-question-button");
    nextButton.id = "nextQuestion";
    nextButton.innerText = "Next Question";
    popUpWindow.appendChild(nextButton);

    nextButton.addEventListener("click", () => {
        // console.log("next question btn clicked")

        const questionElement = displayQuestions();
       clearQuestion (questionElement);
       updateQuestionNumber();
       displayQuestionNumber(arrayQuestion, currentQuestionNumber);
       displayQuestions();
       displayAnswers();
        closePopUp(popUpWindow);
    });

    return popUpWindow;
}

export function openPopUp(popUp) {

    popUp.style.display= "flex";
}

export function closePopUp(popUp) {

    popUp.style.display = "none"; 
   
}