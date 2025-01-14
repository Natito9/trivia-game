import { startQuiz } from "./script.js"

const main = document.getElementById("main")

export const game = document.getElementById("gameOn")
export const category = document.getElementById("selectMenu")
export const homepage = document.querySelector(".homepage-container")


export function homePage() {
    const navTitle = document.getElementById("current-category")
    game.style.display="none"
    navTitle.innerText="Trivia"
    homepage.style.display="flex"

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