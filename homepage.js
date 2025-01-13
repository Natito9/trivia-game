import { startQuiz } from "./script.js"

const main = document.getElementById("main")
export const homepage = document.createElement("div")
export const game = document.getElementById("gameOn")
export const navTitle = document.getElementById("current-category")

export const category = document.createElement("select")

function homePage() {
   
    game.style.display="none"

    homepage.classList.add("homepage-container")

    navTitle.innerText="Trivia"

    const titleHome = document.createElement("h2")
    titleHome.classList.add("title-home")
    titleHome.innerText="choose a category"


    const option1 = document.createElement("option")
    option1.innerText ="General Knowledge"
    option1.value="9"

    const option2 = document.createElement("option")
    option2.innerText = "Geography"
    option2.value="22"

    const option3 = document.createElement("option")
    option3.innerText="Video Games"
    option3.value="15"

    const playButton = document.createElement("button")
    playButton.id="playButton"
    playButton.innerText = "Play"
    playButton.classList.add("play-button")

    //i tried this but didnt work 
    // [option1, option2, option3].forEach(option => category.appendChild(option));
    // [titleHome, category, playButton].forEach(element=> homepage.appendChild(element))
    category.appendChild(option1)
    category.appendChild(option2)
    category.appendChild(option3)

    homepage.appendChild(titleHome)
    homepage.appendChild(category)
    homepage.appendChild(playButton)

    main.appendChild(homepage)

    // exitButton.style.backgroundImage="none"

    playButton.addEventListener("click", () =>{
        game.style.display="grid"
        homepage.style.display="none"
        startQuiz()

 
    })

    
}

export function selectedCategory() {
    const selectedOption = category.options[category.selectedIndex]
    const selectedCategoryValue = selectedOption.value           
    const selectedCategoryText = selectedOption.innerText
    
   return {selectedCategoryValue, selectedCategoryText}

}


category.addEventListener("change", selectedCategory)



homePage()