var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var keyPressed = "";
var currentWord = "";
var lettersInWord = [];
var lettersToDisplay = [];
var wrongGuesses = [];
var wordsToGuess = ["michael", "vanessa", "jo", "jacquelyn"];
var gameStarted = false;

$(document).ready(function () {
    function chooseRandomWord() {
        // choose a word
        currentWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
        lettersInWord = currentWord.split("");

        for (let index = 0; index < lettersInWord.length; index++) {
            lettersToDisplay[index] = "_";
        }

        // useful for debugging
        console.log("currentWord='" + currentWord + "'");
    }

    function displayStats() {
        // display the current word
        $("#currentWord").text(lettersToDisplay.join(" "));

        // display the wins
        $("#wins").text(wins);

        // display the losses
        $("#losses").text(losses);

        // display the guesses remaining
        $("#guessesRemaining").text(guessesRemaining);

        // display the wrong guesses
        $("#wrongGuesses").text(wrongGuesses.join(" "));
    }

    function newGame() {
        guessesRemaining = 10;
        keyPressed = "";
        lettersInWord = [];
        lettersToDisplay = [];
        wrongGuesses = [];
        chooseRandomWord();
        gameStarted = true;
        displayStats();
    }

    function updateWordDisplay(letter) {
        for (let index = 0; index < lettersInWord.length; index++) {
            if (letter === lettersInWord[index]) {
                lettersToDisplay[index] = letter;
            }
        }
    }

    function showQuitOrContinue(title, message) {
        $('#winOrLossLabel').html(title);
        $('#continueMessage').html(message);
        $('#quitOrContinueDialog').modal('show');
    }

    // listen for keys that players type
    $(document).keyup(function (event) {
        // TODO: restart the game
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
                if (currentWord.indexOf(keyPressed) > -1) {
                    // console.log("correct guess");
                    updateWordDisplay(keyPressed);
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
                    newGame();
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
            newGame();
        }
    });

    $("#continueGameButton").on("click", function () {
        $('#quitOrContinueDialog').modal('hide');
        // TODO: continue game
    });

    $("#quitGameButton, #closeButton").on("click", function () {
        $('#quitOrContinueDialog').modal('hide');
        // TODO: quit game
    });
});
