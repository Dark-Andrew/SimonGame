let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

const buttonColours = ["red", "blue", "green", "yellow"];

const sounds = {
    red: new Audio("sounds/red.mp3"),
    blue: new Audio("sounds/blue.mp3"),
    green: new Audio("sounds/green.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    wrong: new Audio("sounds/wrong.mp3")

}

function playSound(color) {
    sounds[color].currentTime = 0;
    sounds[color].play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");s
    }, 100);
}

function nextSequence() {
    userClickedPattern = []
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSequence(0);
}

function playSequence(currentIndex) {
    if (currentIndex >= gamePattern.length) return;

    setTimeout(function() {
        animatePress(gamePattern[currentIndex]);
        playSound(gamePattern[currentIndex]);

        playSequence(currentIndex + 1);
    }, 600); 
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over. Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

$(document).on("keydown", function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});