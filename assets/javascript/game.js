var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var keyPressed = "";
var currentWord = "";
var lettersInWord = [];
var lettersToDisplay = [];
var lettersGuessed = [];
var gameStarted = false;

$(document).ready(function () {
    var correctGuessSound = $("#correctGuessSound")[0];
    var wrongGuessSound = $("#wrongGuessSound")[0];

    function chooseRandomWord() {
        currentWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];

        console.log("currentWord='" + currentWord + "'");
    }

    function getLettersToDisplay() {
        lettersInWord = currentWord.split("");

        for (let index = 0; index < lettersInWord.length; index++) {
            if (lettersInWord[index] === " ") {
                lettersToDisplay[index] = " ";
            }
            else if (lettersInWord[index] === "-") {
                lettersToDisplay[index] = "-";
            }
            else {
                lettersToDisplay[index] = "_";
            }
        }

        // console.log(lettersToDisplay);
    }

    function clearDisplay() {
        $("#currentWord, #wins, #losses, #guessesRemaining, #lettersGuessed, #currentWordLabel, #winsLabel, #lossesLabel, #guessesRemainingLabel, #lettersGuessedLabel").empty();
    }

    function displayLabels() {
        $("#currentWordLabel").text("Word to Guess:");
        $("#winsLabel").text("Wins:");
        $("#lossesLabel").text("Losses:");
        $("#guessesRemainingLabel").text("Guesses Remaining:");
        $("#lettersGuessedLabel").text("Letters Guessed:");
    }

    function displayStats() {
        // display the current word
        $("#currentWord").html(lettersToDisplay.join("&nbsp;"));

        // display the wins
        $("#wins").text(wins);

        // display the losses
        $("#losses").text(losses);

        // display the guesses remaining
        $("#guessesRemaining").text(guessesRemaining);

        // display the letters guessed
        $("#lettersGuessed").text(lettersGuessed.join(" "));
    }

    function resetGame() {
        wins = 0;
        losses = 0;
        gameStarted = false;
        $("#instructions").text("Press any key to get started!");
        resetTimer();
        clearDisplay();
    }

    function newRound() {
        guessesRemaining = 10;
        keyPressed = "";
        lettersInWord = [];
        lettersToDisplay = [];
        lettersGuessed = [];
        chooseRandomWord();
        getLettersToDisplay();
        gameStarted = true;
        displayStats();
        startTimer();
    }

    function updateLettersToDisplay(letter) {
        for (let index = 0; index < lettersInWord.length; index++) {
            if (letter === lettersInWord[index].toLowerCase()) {
                lettersToDisplay[index] = lettersInWord[index];
            }
        }
    }

    function showQuitOrContinue(title, message) {
        stopTimer();
        $('#winOrLossLabel').html(title);
        $('#winOrLossMessage').html(message);
        $('#quitOrContinueDialog').modal('show');
    }

    function playSound(sound) {
        if (sound.paused) {
            sound.play();
        }
        else {
            sound.pause();
            sound.currentTime = 0;
            sound.play();
        }
    }

    resetGame();

    // listen for keys that players type
    $(document).keyup(function (event) {
        if (gameStarted) {
            // NOTE: we only care about letters
            if (event.keyCode >= 65 && event.keyCode <= 90) {

                // console.log(event.key.toLowerCase());
                keyPressed = event.key.toLowerCase();

                if (lettersGuessed.indexOf(keyPressed) > -1) {
                    // don't let the user make the same guess
                    return;
                }
                else {
                    lettersGuessed.push(keyPressed);
                    lettersGuessed.sort();
                }

                // check if key pressed is in the current word
                if ((currentWord.indexOf(keyPressed) > -1) || (currentWord.indexOf(keyPressed.toUpperCase()) > -1)) {
                    // console.log("correct guess");
                    updateLettersToDisplay(keyPressed);
                    playSound(correctGuessSound);
                }
                else {
                    // console.log("wrong guess");
                    guessesRemaining--;
                    playSound(wrongGuessSound);
                }

                // check if user won
                if (lettersInWord.toString() === lettersToDisplay.toString()) {
                    wins++;
                    showQuitOrContinue("Congratulations!", "You won!");
                }

                // check is user lost
                if (guessesRemaining < 1) {
                    losses++;
                    showQuitOrContinue("Sorry!", "You lost!");
                }

                displayStats()
            }
        }
        else {
            $("#instructions").text("Press a letter key to guess.");
            displayLabels();
            newRound();
        }
    });

    $("#continueGameButton").on("click", function () {
        $('#quitOrContinueDialog').modal('hide');
        newRound();
    });

    $("#quitGameButton, #closeButton").on("click", function () {
        $('#quitOrContinueDialog').modal('hide');
        resetGame();
    });
});
