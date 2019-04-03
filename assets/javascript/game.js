// WHAT TO TRACK
// a list of words to guess

// WHAT TO DO
// TODO: restart the game
// TODO: check if user won
// TODO: check is user lost
// TODO: display the current word

var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var keyPressed = "";
var currentWord = "shane";
var wrongGuesses = [];

// useful for debugging
console.log(currentWord);

// TODO: choose a word

function displayStats() {
    // display the wins
    document.getElementById("wins").innerHTML = wins;

    // display the losses
    document.getElementById("losses").innerHTML = losses;

    // display the guesses remaining
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;

    // display the wrong guesses
    document.getElementById("wrongGuesses").innerHTML = wrongGuesses;
}

displayStats();

// listen for letters that players type
document.onkeyup = function (event) {
    // console.log(event.keyCode);
    // console.log(event.key);

    // NOTE: we only care about letters
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        console.log(event.key.toLowerCase());
        keyPressed = event.key.toLowerCase();

        // console.log(currentWord.indexOf(keyPressed));
        // check if key pressed is in the current word
        if (currentWord.indexOf(keyPressed) > -1) {
            console.log("correct guess");
        }
        else {
            console.log("wrong guess");
            wrongGuesses.push(keyPressed);
        }

        displayStats()
    }
}