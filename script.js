//visual aspects

//game start display
// DONE trivia display in main
//correct and incorrent display
//game ends display

//logic

//start game ( conect a button start to fx start quiz)
//select category (not priority?)
// DONE get question
//DONEselect answer
// check if answer is correct or not
//update score 
// DONE display pop up
//show in pop up if correct or incorrect
//click on next question or exit game
//show next question
// update the current question counter 2/10
//end game
//show final score and option to play again

//need

//DONE api call
//handle 404 error with pop up
//fetch different categories changing the api url

const body = document.querySelector("body");

const apiUrl = `https://opentdb.com/api.php?amount=10&category=${9}&type=multiple`
const questionDisplay = document.getElementById("question");
const answerButtons = document.querySelectorAll(".btn-answer");



async function getDataFromApi(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not access data");
        }

        const data = await response.json();

        if (data.error) {
            alert(data.error.message);
            return;
        }
        console.log(data)
        const arrayQuestion = data.results;
        return arrayQuestion;

    } catch (error) {
    alert("An error occurred: " + error.message);
    }
}

  //create here a for each or loop for all questions

function displayQuestions(arrayQuestion) {

    const currentQuestion = arrayQuestion[0].question;
      
    console.log(currentQuestion);

    const questionElement = document.createElement("p");
    questionElement.innerText = `${currentQuestion}`;
    questionDisplay.appendChild(questionElement);

    // return currentQuestion;
}

function randomizeAnswers(arrayQuestion) {
    const firstQuestionAnswers = [...arrayQuestion[0].incorrect_answers, arrayQuestion[0].correct_answer]
    console.log(firstQuestionAnswers);

    const randomAnswers = firstQuestionAnswers.sort(() => Math.random() - 0.5);
    console.log(randomAnswers);

    return randomAnswers;

}



function displayAnswers(randomAnswers, answerButtons) {
   
    answerButtons.forEach((button, index) => {
        button.innerText = randomAnswers[index];
    });
}


let currentQuestionNumber = 1
console.log(currentQuestionNumber);


function questionNumber (array, question){
    let questionNumberDisplay = document.getElementById("current-question");
    questionNumberDisplay.innerText =  `${question} / ${array.length}`

}


// pop up window handling
function createPopUp() {

    const popUpWindow = document.createElement("div");
    const popUpText = document.createElement("p");
    const nextButton = document.createElement("button");

    
    popUpWindow.classList.add("popUp-window");
    body.appendChild(popUpWindow);

   
    popUpText.classList.add("popUp-text");
    popUpText.innerText = `answer is:`;
    popUpWindow.appendChild(popUpText);

    
    nextButton.classList.add("next-question-button");
    nextButton.innerText = "Next Question";
    popUpWindow.appendChild(nextButton);

    return { popUpWindow, nextButton };
}


//change this to the parent ?
//have another function that compares the target  (event.target) to know which button is clicked(?)
function openPopUp(popUp, buttons) {


    buttons.forEach(button => {
        button.addEventListener("click", () => {
            popUp.style.display= "flex";

        })

    });

};

function closePopUp(nextButton, popUpWindow) {

    nextButton.addEventListener("click", () =>{
        popUpWindow.style.display = "none";
        
    })
   
}

async function startQuiz() {
    const arrayQuestion = await getDataFromApi(apiUrl); 
    console.log("Fetched Questions:", arrayQuestion[0]); 

    if (arrayQuestion) {
        //here all functions
        const { popUpWindow, nextButton } = createPopUp();
        // const { currentQuestion} = displayQuestions(arrayQuestion);
        displayQuestions(arrayQuestion);
        const randomAnswers = randomizeAnswers(arrayQuestion);
        questionNumber(arrayQuestion, currentQuestionNumber);
        openPopUp(popUpWindow, answerButtons);
        closePopUp(nextButton, popUpWindow);
        displayAnswers(randomAnswers, answerButtons);
   
    } else {
        console.error("No questions available to display.");
    }
}

startQuiz();

