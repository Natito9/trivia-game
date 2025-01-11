import {homepage, game} from "./homepage.js"
import {body} from "./script.js"

const exitButton = document.getElementById("quit-game");
const continueButton = document.createElement("button");
const exitButton2 = document.createElement("button");
const exitWindow = document.createElement("div")

function exitPopUp() {
    console.log("exit pop up is displayed")
    
    exitWindow.classList.add("exit-popup")

    exitWindow.appendChild(continueButton)
    exitWindow.appendChild(exitButton2)

    body.appendChild(exitWindow)

  exitWindow.style.display="flex"
}

function exitGame () {
    console.log("exit game")
    exitWindow.style.display="none"
    game.style.display="none"
    homepage.style.display="grid"


}

//dont understand why exitGame and not exitGAme()
exitButton.addEventListener("click",exitPopUp);
exitButton2.addEventListener("click",exitGame);

   


