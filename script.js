const body = document.querySelector("body");

const apiUrl = `https://opentdb.com/api.php?amount=10&category=${9}&type=multiple`
const questionDisplay = document.getElementById("question");
const answerButtons = document.querySelectorAll(".btn-answer");

let currentQuestionNumber = 1 
let arrayQuestion = [];

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

        arrayQuestion = data.results;
        return arrayQuestion;

    } catch (error) {
    alert("An error occurred: " + error.message);
    }
}



  //create here a for each or loop for all questions

function displayQuestions() {

    const currentQuestion = arrayQuestion[currentQuestionNumber].question;

    const questionElement = document.createElement("p");
    questionElement.innerText = currentQuestion;
    questionDisplay.appendChild(questionElement);
}


function randomizeAnswers() {
    const answers = [...arrayQuestion[currentQuestionNumber].incorrect_answers, arrayQuestion[currentQuestionNumber].correct_answer]
    console.log(answers);

    const randomAnswers = answers.sort(() => Math.random() - 0.5);
    console.log(randomAnswers);

    return randomAnswers;

}

//QUESTION: i tried to make this fx reusable, but is it really if I set up the randomAnswers as a parameter? :o
function displayAnswers() {

    const randomAnswers = randomizeAnswers();
   
    answerButtons.forEach((button, index) => {
        button.innerText = randomAnswers[index];
    });
}







//this is not working
function displayQuestionNumber (array, currentQuestionNumber){
    let questionNumberDisplay = document.getElementById("current-question");
     questionNumberDisplay.innerText = `${currentQuestionNumber} / ${array.length}`

}

function updateQuestionNumber() {
    currentQuestionNumber++;
    console.log("updated question number") 

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
    nextButton.id = "nextQuestion";
    nextButton.innerText = "Next Question";
    popUpWindow.appendChild(nextButton);

    nextButton.addEventListener("click", () => {
        console.log("next question btn clicked")
       updateQuestionNumber();
       displayQuestions();
       displayAnswers();
        closePopUp(popUpWindow);
    });

    return popUpWindow; 
}

function openPopUp(popUp) {

            popUp.style.display= "flex";

}


function closePopUp(popUp) {

        popUp.style.display = "none"; 
   
}

function clickAnyAnswer (buttons, popUp) {

    buttons.forEach((button) => {
        button.addEventListener("click", () =>{
            openPopUp(popUp);

    })
   
        // checkCorrectAnswer(); create this one
    })
}




async function startQuiz() {
    await getDataFromApi(apiUrl); 
    // console.log("Fetched Questions:", arrayQuestion[0]); 

    if (arrayQuestion) {
      
        displayQuestions();
        displayAnswers();
        displayQuestionNumber(arrayQuestion, currentQuestionNumber);
        const popUpWindow = createPopUp();
        clickAnyAnswer(answerButtons, popUpWindow);
   
    } else {
        console.error("No questions to display.");
    }
}

startQuiz();

