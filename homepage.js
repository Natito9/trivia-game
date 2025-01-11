const main = document.getElementById("main")
const homepage = document.createElement("div")
const game = document.getElementById("gameOn")

export{homepage, game}


function homePage() {
   
    game.style.display="none"
    homepage.classList.add("homepage-container")

    const titleHome = document.createElement("h1")
    titleHome.classList.add("title-home")
    titleHome.innerText="Trivia";

    const category = document.createElement("select")

    const option1 = document.createElement("option")
    option1.innerText ="General Knowledge";
    option1.value="9"

    const option2 = document.createElement("option")
    option2.innerText = "Geography";
    option2.value="22"

    const option3 = document.createElement("option")
    option3.innerText="Video Games";
    option3.value="15"

    const playButton = document.createElement("button")
    playButton.id="playButton"
    playButton.innerText = "Play"
    playButton.classList.add("play-button")
    


    category.appendChild(option1);
    category.appendChild(option2);
    category.appendChild(option3);

    homepage.appendChild(category)
    homepage.appendChild(playButton)


    main.appendChild(homepage)

    playButton.addEventListener("click", () =>{
        console.log("play")
        game.style.display="grid"
    homepage.style.display="none"

 
    })

    
}

homePage()