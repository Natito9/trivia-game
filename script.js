const body = document.querySelector("body");
const main = document.getElementById("main")

const apiUrl = `https://opentdb.com/api.php?amount=10&category=${9}&type=multiple`
const questionDisplay = document.getElementById("question");
const answerButtons = document.querySelectorAll(".btn-answer");
const popUpText = document.createElement("p");

let score = 0
let currentQuestionNumber = 0 
let arrayQuestion = [];

function homePage() {
    main 
    const homepage = document.createElement ("div")
    homepage.classList.add("homepage-container")

    const titleHome = document.createElement ("h1")
    titleHome.classList.add("title-home")
    titleHome.innerText("Trivia")

    const category = document.createElement("select")
    const option1 = document.createElement("option")
    option1.innerText("General Knowledge")

    const option2 = document.createElement("option")
    option2.innerText("Geography")
    const option3 = document.createElement("option")
    option3.innerText("Video Games")

    category.appendChild(option1,option2,option3)

    main.appendChild(homepage)


    
}

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


function displayQuestions() {

    const currentQuestion = arrayQuestion[currentQuestionNumber].question;
    const cleanQuestion = currentQuestion.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#039;/g, "'");

    const questionElement = document.createElement("p");
    questionElement.innerText = cleanQuestion;
    questionDisplay.appendChild(questionElement);

}


function clearQuestion () {
    
    questionDisplay.innerText="";
}


function randomizeAnswers() {
    const answers = [...arrayQuestion[currentQuestionNumber].incorrect_answers, arrayQuestion[currentQuestionNumber].correct_answer]
    console.log(answers);

    const randomAnswers = answers.sort(() => Math.random() - 0.5);
    console.log(randomAnswers);

    return randomAnswers;

}

function displayAnswers() {

    const randomAnswers = randomizeAnswers();
   
    answerButtons.forEach((button, index) => {
        button.innerText = randomAnswers[index];
    });
}


//tried to make it reusable 
function displayQuestionNumber (array, currentQuestionNumber){
    let questionNumberDisplay = document.getElementById("current-question");
     questionNumberDisplay.innerText = `${currentQuestionNumber + 1} / ${array.length}`

}

function updateQuestionNumber() {
    currentQuestionNumber++;
    console.log("updated question number") 

}


// pop up window handling
function createPopUp() {

    const popUpWindow = document.createElement("div");
    const nextButton = document.createElement("button");

    
    popUpWindow.classList.add("popUp-window");
    body.appendChild(popUpWindow);

   
    popUpText.classList.add("popUp-text");
    popUpWindow.appendChild(popUpText);

    
    nextButton.classList.add("next-question-button");
    nextButton.id = "nextQuestion";
    nextButton.innerText = "Next Question";
    popUpWindow.appendChild(nextButton);

    nextButton.addEventListener("click", () => {
        console.log("next question btn clicked")

       const questionElement = displayQuestions()
       clearQuestion (questionElement)
       updateQuestionNumber();
       displayQuestionNumber(arrayQuestion, currentQuestionNumber);
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


function checkCorrectAnswer(selectedAnswer) {

    const correct_answer = arrayQuestion[currentQuestionNumber].correct_answer;
    if ( selectedAnswer === correct_answer) {
            console.log("yay")
            popUpText.innerText = "correct";
            score++
    }
    else {
        console.log("incorrect sorry")
        popUpText.innerText = "incorrect";
    }
}


function clickAnyAnswer (buttons, popUp) {

    buttons.forEach((button) => {
        button.addEventListener("click", () =>{
            openPopUp(popUp);
            const selectedAnswer = button.innerText;
            checkCorrectAnswer(selectedAnswer);

    })
   
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

