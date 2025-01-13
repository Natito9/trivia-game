//here all the game over things
//change the popup text
// button to show view results
import { scoreDisplay, nextButton } from "./feedbackPopup.js";
import { arrayQuestion } from "./script.js";

//if the array === max array or 10 (this case):
nextButton.innerText="View results"
// when this button is clicked... this:
scoreDisplay.innerText= `Your final score is: ${score}/ ${arrayQuestion .length * 10}`
//probably nextbutton becomes exit and use exitGame()