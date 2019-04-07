var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var keyPressed = "";
var currentWord = "";
var lettersInWord = [];
var lettersToDisplay = [];
var wrongGuesses = [];
var gameStarted = false;

$(document).ready(function () {
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

        console.log(lettersToDisplay);
    }

    function clearDisplay() {
        $("#currentWord, #wins, #losses, #guessesRemaining, #wrongGuesses, #currentWordLabel, #winsLabel, #lossesLabel, #guessesRemainingLabel, #wrongGuessesLabel").empty();
    }

    function displayLabels() {
        $("#currentWordLabel").text("Word to Guess:");
        $("#winsLabel").text("Wins:");
        $("#lossesLabel").text("Losses:");
        $("#guessesRemainingLabel").text("Guesses Remaining:");
        $("#wrongGuessesLabel").text("Letters Guessed:");
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

        // display the wrong guesses
        $("#wrongGuesses").text(wrongGuesses.join(" "));
    }

    function resetGame() {
        wins = 0;
        losses = 0;
        gameStarted = false;
        $("#instructions").text("Press any key to get started!");
        clearDisplay();
    }

    function newRound() {
        guessesRemaining = 10;
        keyPressed = "";
        lettersInWord = [];
        lettersToDisplay = [];
        wrongGuesses = [];
        chooseRandomWord();
        getLettersToDisplay();
        gameStarted = true;
        displayStats();
    }

    function updateLettersToDisplay(letter) {
        for (let index = 0; index < lettersInWord.length; index++) {
            if (letter === lettersInWord[index].toLowerCase()) {
                lettersToDisplay[index] = lettersInWord[index];
            }
        }
    }

    function showQuitOrContinue(title, message) {
        $('#winOrLossLabel').html(title);
        $('#winOrLossMessage').html(message);
        $('#quitOrContinueDialog').modal('show');
    }

    resetGame();

    // listen for keys that players type
    $(document).keyup(function (event) {
        if (gameStarted) {
            // NOTE: we only care about letters
            if (event.keyCode >= 65 && event.keyCode <= 90) {

                // console.log(event.key.toLowerCase());
                keyPressed = event.key.toLowerCase();

                // don't let the user make the same wrong guess
                if (wrongGuesses.indexOf(keyPressed) > -1) {
                    return;
                }

                // check if key pressed is in the current word
                if ((currentWord.indexOf(keyPressed) > -1) || (currentWord.indexOf(keyPressed.toUpperCase()) > -1)) {
                    // console.log("correct guess");
                    updateLettersToDisplay(keyPressed);
                }
                else {
                    // console.log("wrong guess");
                    wrongGuesses.push(keyPressed);
                    guessesRemaining--;
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
