/*************VARIABLES*************/
//store colors
var buttonColors = [
    "green", //0
    "red", //1
    "yellow", //2
    "blue" //3
]
//Game Pattern Storage
var gamePattern = [ /*Added From nextSequence*/ ];
var userClicks = [ /* Added from userClickHistory*/ ];

var level = 0;
var gameOn = false;

/******************BASIC FUNCTIONS*********************/

/*AWAIT KEYPRESS TO BEGIN GAME*/
$(document).keypress(function () {
    if (!gameOn) {
        nextSequence();
        $(`#level-title`).text(`Level: ` + level);
        gameOn = true;
    }
});

//log user clicks after nextSequence() has executed, check the userClicks vs gamePattern using checkAnswer(lastInArray)
$(`.btn`).click(function () {
    var buttonClicked = $(this).attr(`id`);
    userClicks.push(buttonClicked);
    animate(buttonClicked);
    playSound(buttonClicked);

    checkAnswer(userClicks.length - 1);
});


function checkAnswer(usersLastClick) {
    //if the gamePatterns last call is equal to the users last click
    if (gamePattern[usersLastClick] === userClicks[usersLastClick]) {
        console.log("success");
        //if the userClicks and the gamePatterns lengths are equal, call nextSequence()
        if (userClicks.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
                //update the titles level indicator
                $(`#level-title`).text(`Level: ` + level);
            }, 1000);
        }
    } else {
        $(`#level-title`).text(`You have made it to level ` + level + '! Hit enter to try again')
        //play sound for incorrect click
        var wrongSound = new Audio('sounds/wrong.mp3');
        wrongSound.play();
        console.log("wrong")
        console.log(`[` + userClicks + `]`);
        console.log(`[` + gamePattern + `]`);
        reset();
    }

}
/************* NEXT SEQUENCE TO PROGRESS GAME *********/
function nextSequence() {
    userClicks = [];
    level++;
    console.log(level);

    randomNumber = Math.floor(Math.random() * 4)
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animate(randomChosenColor);
    playSound(randomChosenColor);
}

/********RESET GAME******/
function reset() {
    level = 0;
    gamePattern = [];
    gameOn = false;
}


/******************** SOUNDS AND ANIMATIONS*************************************/

//buttons animations
function animate(clickedButton) {
    $(`#` + clickedButton).fadeOut(100).fadeIn(100);
};

//Play a sound in corellation to randomChosenColor
function playSound(color) {
    var sound = new Audio('sounds/' + color + '.mp3');
    sound.play();
};