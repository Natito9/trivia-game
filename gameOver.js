//here all the game over things
//change the popup text
// button to show view results
import { scoreDisplay, nextButton } from "./feedbackPopup.js";
import { arrayQuestion, currentQuestionNumber } from "./script.js";
import {exitGame} from "./exitGame.js"
if (currentQuestionNumber === 10) {
    
    nextButton.innerText="View results"
    nextButton.addEventListener("click", () =>{
            resultsGameOver()
    })
}
else {
    //keep playing
}

// when this button is clicked... this:
function resultsGameOver(){
    scoreDisplay.innerText= `Your final score is: ${score}/ ${arrayQuestion .length * 10}`
    nextButton.innerText= "To homepage"
    nextButton.addEventListener("click", () =>{
        exitGame()
    })
}

//probably nextbutton becomes exit and use exitGame()