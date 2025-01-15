import {
  popUpText,
  correctAnswerText,
  createPopUp,
  openPopUp,
  scoreDisplay,
} from "./feedbackPopup.js";

import { selectedCategory, homePage } from "./homepage.js";
import { checkIfGameOver } from "./gameOver.js";

export let currentQuestionNumber = 0;
export let arrayQuestion = [];
export let score = 0;

let apiUrl = `https://opentdb.com/api.php?amount=10&category=${9}&type=multiple`;
const answerButtons = document.querySelectorAll(".btn-answer");
const questionDisplay = document.getElementById("question");
const exitButton = document.getElementById("quit-game");
const continueButton = document.querySelector(".continue-button");
const exitButton2 = document.querySelector(".exit-button2");
const exitWindow = document.querySelector(".exit-popup");


async function getDataFromApi(url, retries = 3) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        console.log("Rate limit exceeded. Retrying...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return getDataFromApi(url, retries - 1);
      } else {
        throw new Error(`Could not access data: ${response.statusText}`);
      }
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
  if (!arrayQuestion[currentQuestionNumber]) return;

  questionDisplay.style.display = "flex";
  const currentQuestion = arrayQuestion[currentQuestionNumber].question;
  const cleanQuestion = currentQuestion
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&iacute;/g, "Í")
    .replace(/&rdquo;/g, "'")
    .replace(/&ldquo;/g, "'");

  questionDisplay.innerText = cleanQuestion;
}


export function clearQuestion() {
  questionDisplay.innerText = "";
}

function randomizeAnswers() {
  const answers = [
    ...arrayQuestion[currentQuestionNumber].incorrect_answers,
    arrayQuestion[currentQuestionNumber].correct_answer,
  ];

  const randomAnswers = answers.sort(() => Math.random() - 0.5);

  return randomAnswers;
}

export function displayAnswers() {
  if (!arrayQuestion[currentQuestionNumber]) return;
  const randomAnswers = randomizeAnswers();

  answerButtons.forEach((button, index) => {
    button.innerText = randomAnswers[index];
  });
}

export function displayQuestionNumber(array, currentQuestionNumber) {
  let questionNumberDisplay = document.getElementById("current-question");
  questionNumberDisplay.innerText = `${currentQuestionNumber + 1} / ${
    array.length
  }`;
  return questionNumberDisplay;
}

let questionNumberDisplay;
export { questionNumberDisplay };

export function updateQuestionNumber() {
  currentQuestionNumber++;
  checkIfGameOver();
}

function checkCorrectAnswer(selectedAnswer) {
  const correctAnswer = arrayQuestion[currentQuestionNumber].correct_answer;
  if (selectedAnswer === correctAnswer) {
    popUpText.innerText = "correct";
    popUpText.style.color = "var(--correct-color)";
    popUpText.classList.add("success");
    correctAnswerText.innerText = `correct answer: ${correctAnswer}`;
    score += 10;
    scoreDisplay.innerText = `Score: ${score}`;
  } else {
    popUpText.innerText = "incorrect";
    popUpText.style.color = "var(--incorrect-color)";
    correctAnswerText.innerText = `correct answer: ${correctAnswer}`;
    scoreDisplay.innerText = `Score: ${score}`;
  }
}

function clickAnyAnswer(buttons, popUp) {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      openPopUp(popUp);
      const selectedAnswer = button.innerText;
      checkCorrectAnswer(selectedAnswer);
    });
  });
}

function displayCurrentCategory() {
  const navTitle = document.getElementById("current-category");
  const { selectedCategoryText } = selectedCategory();
  navTitle.innerText = `${selectedCategoryText}`;
}

function exitPopUp() {
  exitWindow.style.display = "flex";
}

export function exitGame() {
  exitWindow.style.display = "none";
  homePage();
}

function eventsExitButtons() {
  exitButton.addEventListener("click", exitPopUp);
exitButton2.addEventListener("click", exitGame);
continueButton.addEventListener("click", () => {
  exitWindow.style.display = "none";
});
}


export async function startQuiz() {
  await getDataFromApi(apiUrl);

  if (arrayQuestion) {
    clearQuestion();
    displayQuestions();
    displayAnswers();
    displayQuestionNumber(arrayQuestion, currentQuestionNumber);
    const popUpWindow = createPopUp();
    clickAnyAnswer(answerButtons, popUpWindow);
    displayCurrentCategory();
    eventsExitButtons() 
  } else {
    console.error("No questions to display.");
  }
}

export function resetGame() {
  score = 0;
  currentQuestionNumber = 0;
  arrayQuestion = []; //I clear the array, so I dont have an error efter question 10, but not sure if it helps

}
