// WHAT TO DO
// TODO: restart the game
// TODO: don't let the user make the same wrong guess

var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var keyPressed = "";
var currentWord = "";
var lettersInWord = [];
var lettersToDisplay = [];
var wrongGuesses = [];
var wordsToGuess = ["michael", "vanessa", "jo", "jacquelyn"];

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
    document.getElementById("currentWord").innerHTML = lettersToDisplay.join(" ");

    // display the wins
    document.getElementById("wins").innerHTML = wins;

    // display the losses
    document.getElementById("losses").innerHTML = losses;

    // display the guesses remaining
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;

    // display the wrong guesses
    document.getElementById("wrongGuesses").innerHTML = wrongGuesses.join(" ");
}

function newGame() {
    guessesRemaining = 10;
    keyPressed = "";
    lettersInWord = [];
    lettersToDisplay = [];
    wrongGuesses = [];
    chooseRandomWord();
}

newGame();
displayStats();

function updateWordDisplay(letter) {
    for (let index = 0; index < lettersInWord.length; index++) {
        if (letter === lettersInWord[index]) {
            lettersToDisplay[index] = letter;
        }
    }
}

// listen for letters that players type
document.onkeyup = function (event) {
    // NOTE: we only care about letters
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        console.log(event.key.toLowerCase());
        keyPressed = event.key.toLowerCase();

        // check if key pressed is in the current word
        if (currentWord.indexOf(keyPressed) > -1) {
            console.log("correct guess");
            updateWordDisplay(keyPressed);
        }
        else {
            console.log("wrong guess");
            wrongGuesses.push(keyPressed);
            guessesRemaining--;
        }

        // check if user won
        if (lettersInWord.toString() === lettersToDisplay.toString()) {
            wins++;
            newGame();
        }

        // check is user lost
        if (guessesRemaining < 1) {
            console.log("You lost!");
            losses++;
        }

        displayStats()
    }
}