import {homepage, game,} from "./homepage.js"
import {body} from "./script.js"


const exitButton = document.getElementById("quit-game");
const continueButton = document.createElement("button");
const exitButton2 = document.createElement("button");
const exitWindow = document.createElement("div")

function exitPopUp() {
    
    exitWindow.classList.add("exit-popup")
    continueButton.classList.add("continue-button")
    exitButton2.classList.add("exit-button2")


    continueButton.innerText="continue"
    exitButton2.innerText="exit game"

    exitWindow.appendChild(continueButton)
    exitWindow.appendChild(exitButton2)

    body.appendChild(exitWindow)

  exitWindow.style.display="flex"
}

export function exitGame () {
    console.log("exit game")
    exitWindow.style.display="none"
    game.style.display="none"
    homepage.style.display="flex"

    //add here to reset score
    //reset display import the fx 

}

//dont understand why exitGame and not exitGAme()
exitButton.addEventListener("click",exitPopUp);
exitButton2.addEventListener("click",exitGame);

continueButton.addEventListener("click", () =>{

    exitWindow.style.display="none"
})

   


