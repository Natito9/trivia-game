import {
  clearQuestion,
  updateQuestionNumber,
  displayQuestionNumber,
  displayQuestions,
  displayAnswers,
  arrayQuestion,
  currentQuestionNumber,
} from "./script.js";

export const popUpText = document.createElement("p");
export const correctAnswerText = document.createElement("p");
export const scoreDisplay = document.createElement("p");
export const nextButton = document.createElement("button");
export const body = document.querySelector("body");
const popUpWindow = document.createElement("div");

export function createPopUp() {
  popUpWindow.classList.add("popUp-window");
  body.appendChild(popUpWindow);

  popUpText.classList.add("popUp-text");
  popUpWindow.appendChild(popUpText);
  popUpWindow.appendChild(correctAnswerText);
  popUpWindow.appendChild(scoreDisplay);
  scoreDisplay.id = "scoreDisplay";
  nextButton.classList.add("next-question-button");
  nextButton.id = "nextQuestion";
  nextButton.innerText = "Next Question";
  popUpWindow.appendChild(nextButton);

  nextButton.addEventListener("click", () => {
    // const questionElement = displayQuestions();
    clearQuestion();

    updateQuestionNumber();
    displayQuestionNumber(arrayQuestion, currentQuestionNumber);
    displayQuestions();
    displayAnswers();

    closePopUp(popUpWindow);
  });

  return popUpWindow;
}

export function openPopUp() {
  popUpWindow.style.display = "flex";
}

export function closePopUp() {
  popUpWindow.style.display = "none";
}
