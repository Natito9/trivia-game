import { homePage } from "./homepage.js";
import {
  arrayQuestion,
  currentQuestionNumber,
  score,
  resetGame,
} from "./script.js";
import { closePopUp } from "./feedbackPopup.js";


const gameOverContainer = document.querySelector(".gameOver");
const totalScoreDisplay = document.getElementById("totalScore");
const toHomeButton = document.querySelector(".exit-game-button");


function goToHome() {
  toHomeButton.addEventListener("click", () => {
    gameOverContainer.style.display = "none";
    homePage();
  });
}


function resultsGameOver() {
  closePopUp();
  const questionDisplay = document.getElementById("question");
  questionDisplay.style.display = "none";

  gameOverContainer.style.display = "flex";
  totalScoreDisplay.innerText = `Your final score is: ${score}/ ${
    arrayQuestion.length * 10
  }`;
  goToHome();
}


export function checkIfGameOver() {
  let something = currentQuestionNumber;

  switch (something) {
    case 10:
      resultsGameOver();
      resetGame();

      break;

    default:
  }
}
