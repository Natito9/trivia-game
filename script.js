//visual aspects

//game start display
//trivia display in main
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

//api call
//handle 404 error with pop up
//fetch different categories changing the api url
const body = document.querySelector("body");

const apiUrl = `https://opentdb.com/api.php?amount=10&category=${9}&type=multiple`
const questionDisplay = document.getElementById("question");


//create alements 

//const all the answer buttons

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
        //fix this later
        const arrayQuestion = data.results[0,1,2,3,4,5,6,7,8,9].question;
        // questionDisplay.innerText = firstQuestion

        return arrayQuestion;

    } catch (error) {
    alert("An error occurred: " + error.message);
    }
}

// i want to take the data of the 10 objects in the array and display them dinamycaly after each other


//remove when done
// async function logData() {;
//     console.log(data);
// }

// logData();


getDataFromApi();

function displayQuestions() {

    questionDisplay.innerText = arrayQuestion[0]

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


const { popUpWindow, nextButton } = createPopUp();
openPopUp(popUpWindow)
closePopUp(nextButton, popUpWindow)

//create const createResult
