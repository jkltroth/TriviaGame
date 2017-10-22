// Declaring variables for each major HTML element
const quizContainer = $('#quiz');
const resultsContainer = $('#results');

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

//prevents the clock from being sped up unnecessarily
var clockRunning = false;


var countdownTimer = {

    time: 90,

    start: function () {
        if (!clockRunning) {
            intervalId = setInterval(countdownTimer.count, 1000);
            clockRunning = true;
        }
    },

    stop: function () {
        clearInterval(intervalId);
        clockRunning = false;
    },

    // A timer function
    count: function () {

        countdownTimer.time--;

        let currentTime = countdownTimer.timeConverter(countdownTimer.time);

        $('#timer').html(currentTime);

    },

    timeConverter: function (t) {

        //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "0";
        }

        return minutes + ":" + seconds;
    },

};


// Creating an array to hold questions for quiz, and assigning to variable 'myQuestions'
const myQuestions = [{
        question: 'Who is the first human character Rick Grimes meets after waking up from his coma?',
        answers: {
            a: 'Merle',
            b: 'Glen',
            c: 'Morgan',
            d: 'Shane'
        },
        correctAnswer: 'c'
    },
    {
        question: 'What did Hershel do for work before the zombie apocolypse?',
        answers: {
            a: 'Lawyer',
            b: 'Veternarian',
            c: 'Farmer',
            d: 'Doctor'
        },
        correctAnswer: 'b'
    },
    {
        question: 'Who kills Shane?',
        answers: {
            a: 'Carl',
            b: 'A walker',
            c: 'Daryl',
            d: 'Rick'
        },
        correctAnswer: 'd'
    },
    {
        question: 'The Governor is the leader of which town?',
        answers: {
            a: 'Savannah',
            b: 'Alexandria',
            c: 'Macon',
            d: 'Woodbury'
        },
        correctAnswer: 'd'
    },
    {
        question: 'Who did Rick handcuff to a roof?',
        answers: {
            a: 'Merle',
            b: 'Glenn',
            c: 'Daryl',
            d: 'T-Dog'
        },
        correctAnswer: 'a'
    }
];

// A function to build the quiz
function buildQuiz() {

    // This array holds html output for answers
    const output = [];

    // For each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {

        // An array to store the list of answer choices
        const answers = [];

        // and for each available answer...
        for (letter in currentQuestion.answers) {

            // ...add an HTML radio button
            answers.push(
                `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        // add this question and its answers to the output
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });

    // Combine output list into one string of HTML and put it on the page
    $('#quiz').html(output.join(''));

};

function showResults() {

    // Get answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = 'input[name=question' + questionNumber + ']:checked';
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            // add to the number of correct answers
            numCorrect++;
        }

    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;
};

// When the document is ready...
$(document).ready(function () {

   
    
});

$('#startQuiz').on('click', function () {

    $("#timer").html("1:30");

    countdownTimer.start();

    buildQuiz();

});

$('#submit').on('click', showResults);