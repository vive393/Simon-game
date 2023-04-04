var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

//Starting game when user presses any key
var level = 0;
var started = false;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level" + level);
        setTimeout(function () {
            nextSequence();
        }, 200);
        started = true;
    }
})

function nextSequence() 
{
    //resetting the user input every time nextSequence is called
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

//Checking which button is pressed

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1); //passing last index for each clicks
})

//CHECKING USER ANSWER AT EVERY USER CLICK
function checkAnswer(currentIndex) {
    if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
        if (gamePattern.length === userClickedPattern.length) {
            //call next sequence after 1000ms
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }
    else //wrong answer
    {
        $("body").addClass("game-over");
        //remove this class after 200ms
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        var gameOverAudio = new Audio("sounds/wrong.mp3");
        gameOverAudio.play();
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $(document).keypress(restart())
        }, 100);
    }
}

//common func to play sound function for both - 'when user clicks' and 'in next Sequence'
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//addding animations to user clicks (adding css class)
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    //remove this class after 100ms
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//restart game
function restart() {
    userClickedPattern = [];
    gamePattern = [];
    started = false;
    level = 0;
}




