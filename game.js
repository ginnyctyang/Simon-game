
// Show information

function showInformation(){
  alert("Simon will continue to give you new signals. Repeat all the signals Simon has given you by pressing the same color buttons.");
}


// the array to carry the sequence of pattern
var gamePattern = [];
var userClickedPattern = [];

// The buttons
var buttonColours = ["red", "blue", "green", "yellow"];

// The settings before started
var level = 0;
var started = false;

// The function of playing sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// The function of showing the next sequence
function nextSequence() {
  level++;
  $("h1").text("level " + level);
  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  userClickedPattern = [];
}

// the animation of pressing the button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
    },
    100);
}

// Detect whether the game has started
$(document).keypress(function() {
  if (!started) {
    $("h1").text("level " + level);
    nextSequence();
    started = true;
  }
});

// when button get clicked
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
  console.log("gamePattern: " + gamePattern + " userClickedPattern: "+ userClickedPattern);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      console.log("success");
    if (userClickedPattern.length === gamePattern.length){
setTimeout(function() {
  nextSequence();
},1000);}
}
else{
console.log("wrong");
var audio = new Audio("sounds/wrong.mp3");
audio.play();
$("body").addClass("game-over");
setTimeout(function() {
$("body").removeClass("game-over");
},200);
$("h1").text("Game Over, Press Any Key to Restart");
}
startOver();
}

function startOver(){
level=0;
gamePattern=[];
started=false;
}

// if (userClickedPattern===gamePattern){
// $("h1").text("Hi");
// nextSequence();
// }
// else{
// $("h1").text("Game Over");
// setTimeout(function() {
//   text("Press A Key to Start");
//   },100);
// var level = 0;
// var started = false;
// gamePattern = [];
// userClickedPattern = [];
// }
