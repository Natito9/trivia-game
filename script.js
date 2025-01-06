//visual aspects

//game start display
// DONE trivia display in main
//correct and incorrent display
//game ends display

//logic

//start game
//select category (not priority?)
// get question
//select answer
// check if answer is correct or not
//update score 
//display correct or incorrect pop up
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



async function getDataFromApi() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Could not access data");
        }

        const data = await response.json();

        if (data.error) {
            alert(data.error.message);
            return;
        }
        console.log(data)
        const arrayQuestion = data.results;;
        return arrayQuestion;

    } catch (error) {
    alert("An error occurred: " + error.message);
    }
}


function displayQuestions(arrayQuestion) {

        const firstQuestion = arrayQuestion[0].question;
        console.log(firstQuestion);

        const questionElement = document.createElement("p");
        questionElement.innerText = `${firstQuestion}`;
        questionDisplay.appendChild(questionElement);


}

function displayAnswers(arrayQuestion) {
    const firstQuestionAnswers = [arrayQuestion[0].incorrect_answers, arrayQuestion[0].correct_answer]
    console.log(firstQuestionAnswers);
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

function openPopUp(popUpWindow) {
    const answerButtons = document.querySelectorAll(".btn-answer");

    answerButtons.forEach(button => {
        button.addEventListener("click", () => {
            popUpWindow.style.display= "flex";

        })

    });
    return { answerButtons };


};

function closePopUp(nextButton, popUpWindow) {

    nextButton.addEventListener("click", () =>{
        popUpWindow.style.display = "none";
        
    })
   
}

//start quiz

async function startQuiz() {
    const arrayQuestion = await getDataFromApi(); 
    console.log("Fetched Questions:", arrayQuestion); 
    if (arrayQuestion) {
        //here all functions
        const { popUpWindow, nextButton } = createPopUp();
        displayQuestions(arrayQuestion);
        displayAnswers(arrayQuestion)
        openPopUp(popUpWindow);
        closePopUp(nextButton, popUpWindow);
    } else {
        console.error("No questions available to display.");
    }
}

startQuiz();

