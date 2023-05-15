gamePattern = [];

let userClickedPattern = [];

let btnColors = ["red", "blue", "green", "yellow"];

var started = false;

let level = 0;

function nextSeq() {
    userClickedPattern=[]
    level++;
    $("h1").text("Level " + level);
    
    let index = Math.floor(Math.random() * 3) + 1;
    gamePattern.push(btnColors[index]);
    $("#"+ btnColors[index]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(curColor) {
    $("#" + curColor).addClass("pressed");
    setTimeout(function () {
        $("#" + curColor).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                
                console.log("yes");
                nextSeq();
            }, 1000)
        }
    }else{
        $("body").addClass("game-over");
                setTimeout(function(){
                    $("body").removeClass("game-over");
                },200);
        playSound("wrong");
        $("h1").text("Game Over Press Any Key to Restart")
        starOver();
    }


}

$(".btn").on("click", function () {

    let userChosenColor = ($(this).attr("id"));
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});

$(document).keypress(function () {
    $("h1").text("Level " + level);
    if (!started) {
        
        nextSeq();
        started = true;
    }

});

function starOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
