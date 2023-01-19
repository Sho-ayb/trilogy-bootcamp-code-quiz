/*

Psuedocode 

Variables
---

score = 0; - this can be in the scores function 
timer = 30 - this can be in the timer function 
penality = 10; - this can be in the timer function 

questionsArr  - this is stored within the questions.js file  


1. We need a list of questions to be displayed on the page: these questions should be stored in the questions.js file.  We should "export" this array so that we can get access to it within our logic.js file. 

    1.1 These questions should be stored within an array of objects. 
    1.2 These objects should contain properties to store the buttons
        
        - describe the object 

        [
            {
                question: 'What data types can an array store ?',
                choices: ['string', 'numbers', 'objects', 'all of them' ],
                answer: 'all of them', 
                correct: false,
                answered: false
            }, 

            // multiple object questions 
        ]

2. logic file:  

    functions 
    --- 

    1. lets first import the questions file. The questions file should use "export" on the array objects itself.

            export const questionArr = [ {}, {}, {}... ]

            we then need to import this file in to our logic.js file using "import"

            import questions from 'path to the question file'


    2. lets query select all the elements we need in our functions
       
       - we will need to query select the following elements 

           1. the start quiz button 
           2. the timer div element on the page - we will later either use Element.children or Node.childNodes to get the span element specifically to change the text value of the timer
           3. get the div container with the id of "start-screen"
           4. get the div container with the id of "questions"
           5. get the div container with the id of "end-screen"
           6. get the div container with the id of "feedback"

    
    3. game start function: 
    
         - Add an event listener to the start button
            
            - Game will start with a question and timer will start - this means to invoke the timer function and the renderQuestions function
            
            - Function should keep track of the questions - if all questions completed function should render to page their score and render html elements to save their initials and their final score.
            
            - we can not use random questions function because - we need to keep track of questions already completed 

            - we need a method of keeping a track of the questions - this is why added another property to the questions array object named "answered". 

            - we will loop through the array of objects - and at each iteration we will invoke the renderQuestions function: we will pass as function arguments the choices array. 
            
            - if the user has answered  - invoke the checkCorrect function and change the objects "answered" property to true. 

            - the next iteration of a question should be based on the object "answered" property value being true - this means if the question has been answered move to the next object in the array and invoke the renderQuestions function and pass in choices array to the function. 

            - this iteration is until the end of the array of objects has been reached: at which point the "end-screen" should be displayed - which should show the score and allow the user to save their initials. 
            
                - these initials and the score should be saved to localStorage

            - when the questions are rendered to the page - we need to confirm what question has been clicked on by the user and based on the answer - invoke the checkCorrect function. 

                - we also need to render correct or incorrect text to the "feedback" element on the page - this can be either done within this function by returning a result from the checkCorrect function or invoking the checkCorrect function, get access to the object property and determine the "feedback" elements value based on the properties value          
    
    4  add a timer function
    
        - timer will decrement by seconds - remember that we can user the setInterval() method to keep track of the time
        
        - when an incorrect answer is submitted the timer will substract by an penalty amount e.g 10 seconds
    
        - this means then: the timer function should have one argument being passed to it - we can call it "incorrect" and its value will come from passing in the objects correct property

        - if the timer reaches zero: the renderEnd function should be invoked 


    5. add a renderQuestions function 

        - this function should take in an argument to function - we can call "questionChoices". 
        
        - "questionChoices" is an array of choices - we need to loop through this array and dynamically create the choices elements on the page and these should be added to the div element "choices" in the html

        - this function should get the variable we query selected the "start-screen" and apply the hide class in css file on to this element. This means we need to change the class attribute to hide. 

        - likewise we need to get the variable we query selected the "questions" and remove the class attribute of hide on to this element. 


    6. add a renderEnd function 

        - this function should make disappear the "questions" div container element from the page and render the "end-screen" div element instead. 
        

    7. check correct answer function 
        
         - when user gets the answer correct, mutate the object property correct to true and invoke the score function 

         - when user gets the answer incorrect, mutate the object property correct to false and invoke the score function 
        

    8. score function:  

        - check if the object "correct" property is true, if true update the score variable by 1 
        - check if the object "correct" property is false, if false update the score variable by -1 

*/

// selecting all the elements on the page we need

const startBtn = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const questions = document.getElementById("questions");
const endScreen = document.getElementById("end-screen");
const feedback = document.getElementById("feedback");

const time = document.getElementById("time");

// VARIABLES

// function for the start quiz button

const startQuizHandler = (handler) => {
  // lets attach an event listener to the startBtn

  startBtn.addEventListener("click", function () {
    console.log("Quiz Challenge Started");

    // lets hide the start screen by calling the function
    cleanUpStart();
    handler();
  });
};

// lets create a function to clean up the start screen

const cleanUpStart = () => {
  startScreen.setAttribute("class", "hide");
};

// function for the questions page

const buildQuizHandler = () => {
  // we need a variable to keep track of the index of the array of objects

  let currentIndex = 0;

  // we need a variable to keep track of the current question in the arrays of objects

  let currentQuestion = questionsArr[currentIndex]; // we will increment currentIndex below

  console.log(currentQuestion);

  // lets create an ordered list for the page

  const ol = document.createElement("ol");

  // lets query select the choices div element from html

  const choices = document.querySelector(".choices");

  // lets append the ordered list element to choices div

  choices.appendChild(ol);

  console.log(choices);

  // lets first unhide the questions div container here

  questions.classList.remove("hide");

  if (currentIndex <= questionsArr.length) {
    document.getElementById("question-title").textContent =
      currentQuestion.question;

    // lets create a for loop here to extract the answers data we need from the array of objects

    for (let i = currentIndex; i < currentQuestion.answers.length; i++) {
      const answer = currentQuestion.answers[i]; // will pull each answer from the array

      // lets create list item elements to hold our buttons

      const li = document.createElement("li");

      console.log(li);

      // lets append each list item element to the ol element

      ol.appendChild(li);

      // lets create button elements for the page

      const answerBtn = document.createElement("button");

      // lets append each button to the choices div element within each order list - list item

      li.appendChild(answerBtn);

      // lets apply the text from the answers array in to buttons text content

      answerBtn.textContent = answer;
    }
  }
};

// lets create an init() function here - we will invoke all the event handlers here

const init = () => {
  // lets pass in a function to the handler
  startQuizHandler(buildQuizHandler);
};

// lets invoke the init function

init();

/* 


STARTING ALL OVER AGAIN AS THIS CODE NOT WORKING CORRECTLY AND NO ERROR REGISTERING IN CONSOLE EITHER - THE ANSWERS IN THE ARRAY ARE CREATED BUT THEN IS BEING CLEARED FROM THE PAGE. I THINK IT IS PROBLEM WITH HOW THE CODE HAS BEEN STRUCTURED WHERE THE QUESTIONS ARE EXTRACTED FROM THE ARRAY OF OBJECTS - questions.js file - AND THEN PASSED TO FUNCTION - makeAppear - that renders the button elements on to the page with the currentQuestion being passed to it - THIS WORKS FOR THE FIRST TWO OBJECTS BUT THEN THE THIRD OBJECT OF QUESTIONS DOES NOT APPEAR ON THE PAGE.


// second attempt 


// selecting all the elements on the page we need

const startBtn = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const questions = document.getElementById("questions");
const endScreen = document.getElementById("end-screen");
const feedback = document.getElementById("feedback");

const time = document.getElementById("time");

// lets create a global variables

let currentIndex = 0;

// let answerBtn; // need to be global so buttons can be cleared from view

// console.log(answerBtn);

// all helper functions

//  the timer function

function startTimer(questionObj, penality) {
  let counter = 0;
  let timerLeft = 5;

  let penalised = penality;

  // lets create a function to convert the seconds

  const convertSecs = (s) => {
    const mins = String(Math.floor(s / 60));

    const secs = String(s % 60);

    return mins + ":" + secs; // was jumpy using template literal ? this fixed it
  };

  // lets create an anonymous function we can pass in to setInterval method

  const tick = function () {
    // lets increment the counter
    counter++;

    let currentTime = timerLeft - counter;

    // lets use the convertSecs fn to get mins and secs, we will minus the timerLeft by the counter

    if (currentTime >= 0) {
      time.textContent = convertSecs(currentTime);

      console.log(currentTime);

      //   if (questionObj.isCorrect === false) {
      //     clearInterval(timer);
      //     const timer = setInterval(tick, 1000);
      //     currentTime = currentTime - penalised;
      //     time.textContent = convertSecs(currentTime);
      //   }

      //   if (timer && questionObj.isCorrect == false) {
      //     clearInterval(timer);

      //     currentTime -= penalised;

      //     console.log(currentTime);

      //     timer.tick();
      //   }
    }
  };

  const timer = setInterval(tick, 1000);
}

// cleanUpEls function

function cleanUpEls(screen) {
  if (screen === "startScreen") {
    console.log("Cleaning start screen");

    startScreen.setAttribute("class", "hide");
  }

  if (screen === "questionScreen") {
    console.log("Cleaning question screen");

    // lets get the parent element choices to clean up the button elements that were created in renderQuestions function

    const choices = document.getElementById("choices");

    // lets loop through the elements using a while loop and remove each child
    //https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
    // we also need to clear the feedback element from the page, lets wrap this within a setTimeout function to remove the element after 2 secs

    setTimeout(() => {
      feedback.classList.add("hide");
    }, 1100);
  }
}

function makeAppear(whatEl, element) {
  // Making element question appear on page

  if (whatEl === "question") {
    console.log("inside whatEl");

    questions.classList.remove("hide");

    const questionTitle = element.question;

    // console.log(questions);

    questions.children[0].textContent = questionTitle;
  }

  // Making element choices appear on page

  if (whatEl === "answers") {
    // lets create the buttons on the page - seemed to have to make this a global variable ??

    const choices = document.getElementById("choices");

    const answerBtn = document.createElement("button");

    choices.appendChild(answerBtn);

    answerBtn.textContent = element;
  }

  // Making feedback text appear when user gets answer correct

  if (whatEl === "correct" || whatEl === "incorrect") {
    if (whatEl === "correct") {
      // questionArr.isCorrect = true;

      feedback.classList.remove("hide");

      // lets create a h2 element on the feedback div container

      feedbackPara = document.createElement("p");

      // lets append this to the div element

      feedback.appendChild(feedbackPara);

      feedbackPara.textContent = "Correct!";
    }

    if (whatEl === "incorrect") {
      // questionArr.isCorrect = true;

      feedback.classList.remove("hide");

      // lets create a h2 element on the feedback div container

      feedbackPara = document.createElement("p");

      // lets append this to the div element

      feedback.appendChild(feedbackPara);

      feedbackPara.textContent = "Wrong!";
    }
  }
}

// checkAnswer function

function checkAnswer(choice, answer) {
  console.log("Checking the answer");

  console.log(choice);
  console.log(answer.correctAnswer);

  if (choice === answer.correctAnswer) {
    console.log("correct answer");

    makeAppear("correct", answer);
  }

  if (choice != answer.correctAnswer) {
    console.log("incorrect answer");

    makeAppear("incorrect", answer);
  }
}

// main functions

// renderQuestions function

function renderQuestions(questions) {
  // lets get the parent element for the buttons, so we can attach an event listener to it

  const choices = document.getElementById("choices");

  console.log(choices);

  // lets invoke the cleanUpEls function and the choices parent element of answer buttons

  cleanUpEls("startScreen");
  cleanUpEls("questionScreen");

  questions.forEach((currentQuestion, questionNumber, questionArr) => {
    console.log("in the forEach");

    if (currentIndex === questionNumber) {
      console.log(
        "current index:",
        currentIndex,
        "question number:",
        questionNumber
      );

      makeAppear("question", currentQuestion);
    }

    // we need to loop through the object of answers
    // and pass to makeAppear function

    // for (const answer in currentQuestion.answers) {
    //   console.log("inside for in loop");

    //   console.log(
    //     "current index:",
    //     currentIndex,
    //     "question number: ",
    //     questionNumber
    //   );

    //   if (currentIndex === questionNumber) {
    //     // console.log(currentQuestion.correctAnswer);
    //     makeAppear("answers", currentQuestion.answers[answer]);
    //   }
    // }

    if (currentIndex === questionNumber) {
      console.log(
        "current index:",
        currentIndex,
        "question number: ",
        questionNumber
      );

      for (const answer in currentQuestion.answers) {
        makeAppear("answers", currentQuestion.answers[answer]);
      }
    }

    if (currentIndex === questionNumber) {
      choices.addEventListener("click", function (e) {
        console.log(e);

        checkAnswer(e.target.textContent, currentQuestion);

        // when a button is clicked we should invoke this function again to render the next questions

        nextQuestion();
      });
    }
  });

  // lets now increment the currentIndex variable here

  // currentIndex++;
}

// lets create a function that invokes the renderQuestions function again

function nextQuestion() {
  currentIndex++;
  renderQuestions(questionsArr);
}

function startQuiz() {
  // lets create an event listener on the startBtn element

  startBtn.addEventListener("click", function () {
    console.log("start button clicked");

    // lets start the timer to countdown from seconds
    // startTimer();
    renderQuestions(questionsArr);
  });
}

startQuiz();

*/

/*  ----------------------------------------------------------------------- */

// first attempt

// the renderQuestions function

// function renderQuestions(questionChoices) {
//   //  lets first make disappear the start screen from the page

//   startScreen.setAttribute("class", "hide");

//   // lets make the div element questions appear by removing the hide class from the element

//   questions.classList.remove("hide");

//   // now we need to loop through the questions array of objects and render the specific properties to the page

//   // lets create a variable to store the current index of object in the array

//   let currentIndex = 0;

//   // lets get the child element of questions element

//   const choicesEl = questions.children[1];

//   questionChoices.forEach((question, index, array) => {
//     // this console logs all the objects to the console
//     // console.log(question);
//     // console.log(index);
//     // console.log(array[index]);

//     console.log(question === array[index]);

//     // since its an array of objects we need to set the index on the array
//     // if the currentIndex == 0 then this logs the first object
//     // console.log(questionsArr[currentIndex]);

//     // we need to the following code until the array is complete

//     if (index != questionChoices.length) {
//       for (const key of Object.keys(questionChoices)) {
//         console.log(questionChoices[key]);
//       }

//       if (question.hasAnswered === false) {
//         console.log("not answered");

//         const questionTitle = question.question;

//         questions.children[0].textContent = questionTitle;

//         for (const choice of question.choices) {
//           // console.log(choice);

//           // lets create all the elements for the buttons on the page

//           const choiceBtn = document.createElement("button");

//           // lets append it to the div element choices but first we need to query select the div element

//           choicesEl.appendChild(choiceBtn);

//           choiceBtn.setAttribute("class", "button");

//           choiceBtn.textContent = choice;

//           choiceBtn.addEventListener("click", function () {
//             console.log(choiceBtn.textContent);

//             if (choiceBtn.textContent === question.answer) {
//               // lets mutate the isCorrect key value of the questions object

//               question.isCorrect = true;

//               feedback.classList.remove("hide");

//               // lets create a h2 element on the feedback div container

//               feedbackPara = document.createElement("p");

//               // lets append this to the div element

//               feedback.appendChild(feedbackPara);

//               feedbackPara.textContent = "Correct!";
//             } else {
//               question.isCorrect = false;

//               // lets invoke the timer function and pass in a penality time

//               startTimer(question, 10);

//               feedback.classList.remove("hide");

//               feedbackPara = document.createElement("p");

//               // lets append this to the div element

//               feedback.appendChild(feedbackPara);

//               feedbackPara.textContent = "Wrong!";
//             }
//           });
//         }
//       }
//     }
//   });
// }

// lets create another function here to generate the next question

// function nextQuestion(questionObject) {
//   console.log("next question");
//   console.log(questionObject);

//   // lets invoke the function to remove all children

//   clearScreen();

//   console.log(questionObject.question);

//   const questionTitle = questionObject.question;

//   questions.children[0].textContent = questionTitle;

//   // lets

//   const choices = questionObject.choices;

//   console.log(choices);

//   for (const choice of choices) {
//     const choiceBtn = document.createElement("button");

//     // lets append it to the div element choices but first we need to query select the div element

//     choicesEl.appendChild(choiceBtn);

//     choiceBtn.setAttribute("class", "button");

//     choiceBtn.textContent = choice;

//     choiceBtn.addEventListener("click", function () {
//       console.log(choice);
//     });
//   }
// }

// lets create a clearScreen function

// function clearScreen() {
//   questions.children[0].textContent = "";
//   questions.children[1].remove();

//   feedback.textContent = "";
// }

// startQuiz();

// renderQuestions();
