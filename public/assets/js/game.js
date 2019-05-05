import {stopwatch} from "./stopwatch.js";
import {wordGuess} from "./wordGuess.js";

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
        $("#score").text(wordGuess.getScore());
        $("#guessesRemaining").text(wordGuess.getGuessesRemaining());
        $("#lettersGuessed").text(wordGuess.getLettersGuessed().join(" "));
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
        stopwatch.startTime = 60;//seconds
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
            if (event.which === 32)//spacebar
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
});
