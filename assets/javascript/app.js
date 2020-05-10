/* Thoughts

Create an array containing questions & answers.
Loop through the arrays & write the HTML from that onto the page.
----

3 Variables
1. correct
2. wrong
3. blank
1. userSelection


~
1. Quiz Timer
2. Go through the array of questions & print the html for questions onto the page
  - Do same thing for the answer 'buttons' as above.
3. Create a 'submit' button.
4. Game will end if the timer = 0 or the user clicks submit.
5. Print the results onto the page.
6. Maybe include a reset function/button?
~

*/

var userSelection = [];
var correct = 0;
var wrong = 0;
var blank = 0;
var timer = 90;
var intervalID;

var questions = [{
    question: "<p class =qStyle>What is jQuery?</p><br>",
    choices: ["An adventure book!", "A search engine", "A lightweight, 'write less, do more', JavaScript library", "A new upcoming game"],
    answer: 2
},
{
    question: "<p class =qStyle>jQuery is the library file of _______</p><br>",
    choices: ["Python", "HTML", "JSON", "JavaScript"],
    answer: 3
},
{
    question: "<p class =qStyle>In what scenarios can jQuery be used?</p><br>",
    choices: ["When applying static/dynamic CSS onto a page", "Calling functions on events", "to simplify what would be used in JavaScript", "All of the above"],
    answer: 3
},
{
    question: "<p class =qStyle>Choose the one that is NOT a basic jQuery selector symbol.</p><br>",
    choices: ["#", ".", "¿", "," ],
    answer: 2
},
{
    question: "<p class =qStyle>What is the correct jQuery code to set the background color of all p elements to red?</p><br>",
    choices: ["$('p').style('background-color','red');", "$('p').css('background-color','red')", "$('p').manipulate('background-color','red')", "$('p').layout('background-color','red')"],
    answer: 1
},
{
    question: "<p class =qStyle>Which jQuery method is used to hide selected elements?</p><br>",
    choices: ["hide()", "hidden()", "display(none)", "visible(false)"],
    answer: 0
},
{
    question: "<p class =qStyle>Which jQuery method is used to perform an asynchronous HTTP request?</p><br>",
    choices: ["jQuery.ajaxSetup()", "jQuery.ajaxAsync()", "jQuery.ajax()", "jQuery.ajaxStart()"],
    answer: 2
},
{
    question: "<p class =qStyle>Which jQuery function is used to prevent code from running, before the document is finished loading?</p><br>",
    choices: ["$(document).load()", "$(document).ready()", "$(document).onload()", "$(code).ready()"],
    answer: 1
}
];

// upon loading of page...
$(document).ready(function(){

    $("#startBtn").click(function(){

        // this is for the quiz timer/counter
        intervalID = setInterval(decrement, 1000);

        // this will expand the #main container to 'contain' all questions once the button is clicked
        $("#main").css("height", "1100px");

        mkQuestions();
        $("#startBtn").hide();
        mkSubmitBtn();
        //showResults() functions will show the user the results.
        $("#quizSubmit").click(function(){
            showResults();
        });
        // this will tell me what the user selected
        $("input").click(function(){
            userSelection[this.name] = this.value;
        });
    });

});


// this will go through each questions and print it to the page
function mkQuestions(){
    for(var i=0; i < questions.length; i++){
        $("#quizQs").append("<h2><br>" + questions[i].question);
        // this will make the answer 'buttons' & also assign 
        for(var x=0; x < questions[i].choices.length; x++){
            $("#quizQs").append("<label class='radio-inline'><input value='" + x + "' type='radio' name='" + i + "'>" + questions[i].choices[x] + "</label>");
        }
        $("#quizQs").append("<br><br>");
    }
}

// this will create the 'submit' button
function mkSubmitBtn(){
    $("#quizSubmit").append("<br><br><button id=submitBtn>Submit</button>");
}


function decrement(){
    timer--;
    $("#timeLeft").html("Time remaining: <u>" + timer + "</u> seconds left...<br><br>");
    if (timer === 0){
        alert("Times up!");
        showResults();
    }
}

// this will populate the page with the user's results from the quiz
function showResults(){
    $("#main").css("height", "550px");
    $("#quizQs").hide();
    $("#timeLeft").hide();
    $("#quizSubmit").hide();

    for(i=0; i < questions.length; i++){
        if(questions[i].answer === userSelection[i]){
            correct++;
        }
        else if (userSelection[i]){
            wrong++;
        }
        else {
            blank++;
        }
    }
    var quizResults = $("#quizResults");
    $(quizResults).append("<br><br><br><p class=done>All Done!</p>");
    $(quizResults).append("<br><br><p>Correct Answers: <u>" + correct + "</p>");
    $(quizResults).append("<br><p>Incorrect Answers: <u>" + wrong + "</p>");
    $(quizResults).append("<br><p>Unanswered: <u>" + blank + "</p>");

    clearInterval(intervalID);
}