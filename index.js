const colors = ["red", "yellow", "green", "blue"];
//This array will be modified
let gamesequences = [];
let playerSequences = [];
let level = 0;
let started = false;
let highScore = 0;



// For generating a sequence
function generateSequence() {
  playerSequences = [];
  level++;
  $("#level-title").text("Level " + level);
  let randumNumber = Math.floor(Math.random() * 4);
  // This gives a random Colour
  let randomChosenColor = colors[randumNumber];
  //Adding the number to sequences
  gamesequences.push(randomChosenColor);
  //Added animation and audio
  $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
  playAudio(randomChosenColor);
}


//Keypress Event
$(document).keypress(function name() {
  //If the game is started, keypress should not invoke the 
  if (!started) {
    // level starts from 0
    // console.log("il "+level);
    generateSequence();
    started = true;
  }
})

//Click Event 
$(".btn").click(function name(event) {
  let btnname = event.target.id;
  playerSequences.push(btnname);
  // console.log(btnname);
  //Adding the clicked button to player Sequence
  playAudio(btnname);
  //Animation
  flash(btnname);
  //To get the index, one less than the number of times buttons are clicked
  checksequence(playerSequences.length - 1);
})


//Play Audio function
function playAudio(key) {
  var audio = new Audio('sounds/' + key + '.mp3');
  audio.play();
}

// //Function Animation the button is pressed
function flash(key) {
  var activeButton = document.querySelector("." + key);
  activeButton.classList.add("pressed");
  setTimeout(function () {
    activeButton.classList.remove("pressed"), 500
  });
}

//User and computer sequence check
function checksequence(currentLevel) {
  //Checks
  console.log("currentLevel " + currentLevel);
  if (gamesequences[currentLevel] === playerSequences[currentLevel]) {
    if (gamesequences.length === playerSequences.length) {
      setTimeout(function () {
        generateSequence();
      }, 1000);
    }
  }
  else {
    playAudio("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, press Enter to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    if (level > highScore) {
      highScore = level;
      $("#level-title").text("Highscore : " + highScore);
      $("#level-title").after("<h2>Press A key to restart the game!</h2>"); 
    }
    console.log("restart");
    restart();
  }
}

function restart() {
  level = 0;
  gamesequences = [];
  started = false; 
}
