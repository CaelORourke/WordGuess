import {stopwatch} from "./stopwatch.js";
import {wordGuess} from "./wordGuess.js";

var firebaseConfig = {
    apiKey: "AIzaSyAO1ORpCe_Wpz1ER-625_YyYkNIS1x3WFw",
    authDomain: "nameless-springs-78473.firebaseapp.com",
    databaseURL: "https://nameless-springs-78473.firebaseio.com",
    projectId: "nameless-springs-78473",
    storageBucket: "nameless-springs-78473.appspot.com",
    messagingSenderId: "295683947244",
    appId: "1:295683947244:web:c77c0a1e459b7c4d"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var highScore = 0;

$(document).ready(function () {
    const correctGuessSound = $("#correctGuessSound")[0];
    const wrongGuessSound = $("#wrongGuessSound")[0];

    function clearDisplay() {
        $("#currentWord, #guessesRemaining, #lettersGuessed, #currentWordLabel, #lossesLabel, #guessesRemainingLabel, #lettersGuessedLabel").empty();
    }

    function displayLabels() {
        $("#currentWordLabel").text("Word to Guess:");
        $("#guessesRemainingLabel").text("Guesses Remaining:");
        $("#lettersGuessedLabel").text("Letters Guessed:");
    }

    function displayStats() {
        $("#currentWord").html(wordGuess.getLettersToDisplay().join("&nbsp;"));
        $("#score").text(formatScore(wordGuess.getScore()));
        $("#guessesRemaining").text(wordGuess.getGuessesRemaining());
        $("#lettersGuessed").text(wordGuess.getLettersGuessed().join(" "));
    }

    function formatScore(score) {
        return score.toLocaleString('en-US');
    }

    function newRound() {
        wordGuess.newRound();
        displayStats();
        stopwatch.resetTimer();
        stopwatch.startTimer();
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

    function resetGame() {
        wordGuess.resetGame();
        stopwatch.startTime = 60;// seconds
        stopwatch.resetTimer();
        clearDisplay();
        $("#instructions").text("Press any key to get started!");
    }

    function showGameOver(message) {
        $('#gameOverMessage').html(message);
        $('#gameOverDialog').modal('show');
    }

    function showQuitOrContinue(title, message) {
        stopwatch.stopTimer();
        $('#winOrLossLabel').html(title);
        $('#winOrLossMessage').html(message);
        $('#quitOrContinueDialog').modal('show');
    }

    stopwatch.onDisplayTime((time) => {
        $("#timerDisplay .card-text").text(time);
    });

    stopwatch.onTimesUp(() => {
        showGameOver("Time's up!");
    });

    $("#continueGameButton").on("click", () => {
        $('#quitOrContinueDialog').modal('hide');
        newRound();
    });

    $("#quitGameButton, #closeButton").on("click", () => {
        $('#quitOrContinueDialog').modal('hide');
        resetGame();
    });

    $("#okButton").on("click", () => {
        $('#gameOverDialog').modal('hide');
        resetGame();
    });

    $("#quitOrContinueDialog, #gameOverDialog").on("hidden.bs.modal", () => {
        if (wordGuess.getGameStarted() && wordGuess.getGamePaused()) {
            resetGame();
        }
    });

    resetGame();

    $(document).keyup((event) => {
        if (wordGuess.getGamePaused()) {
            return;
        }

        if (wordGuess.getGameStarted()) {
            if (event.which === 32)// spacebar
            {
                stopwatch.stopTimer();
                showGameOver("You lost!");
            }

            // NOTE: we only care about letters
            if (event.which >= 65 && event.which <= 90) {

                let keyPressed = event.key.toLowerCase();

                // don't let the user make the same guess
                if (wordGuess.hasGuessedLetter(keyPressed)) {
                    return;
                }

                if (wordGuess.isLetterInWord(keyPressed, stopwatch.time)) {
                    playSound(correctGuessSound);
                }
                else {
                    playSound(wrongGuessSound);
                }

                if (wordGuess.hasUserWon()) {
                    if (wordGuess.getScore() > highScore) {
                        var newHighScore = wordGuess.getScore();
                        database.ref().set({
                            highScore: newHighScore
                        });
                    }
                    showQuitOrContinue("Congratulations!", "You won!");
                }

                if (wordGuess.hasUserLost()) {
                    stopwatch.stopTimer();
                    showGameOver("You lost!");
                }

                displayStats()
            }
        }
        else {
            $("#instructions").text("Press a letter key to guess. Press spacebar to quit.");
            displayLabels();
            newRound();
        }
    });

    // NOTE: this is called on initial load and for each change after that.
    database.ref().on("value", function(snapshot) {
        if (snapshot.child("highScore").exists()) {
            highScore = parseInt(snapshot.val().highScore);
        }
        // console.log(highScore);
        $("#highScore").text(formatScore(highScore));
    },
    function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});
