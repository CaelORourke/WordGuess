// WHAT TO TRACK
// a list of words to guess
// the current word to guess
// track wrong guesses

// WHAT TO DO
// TODO: choose a word
// TODO: restart the game
// TODO: check if key pressed is in the current word
// TODO: check if user won
// TODO: check is user lost
// TODO: display the wrong guesses
// TODO: display the current word

var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var keyPressed = "";

// display the wins
document.getElementById("wins").innerHTML = wins;

// display the losses
document.getElementById("losses").innerHTML = losses;

// display the guesses remaining
document.getElementById("guessesRemaining").innerHTML = guessesRemaining;

// listen for letters that players type
document.onkeyup = function(event) {
    // console.log(event.keyCode);
    // console.log(event.key);

    // NOTE: we only care about letters
    if (event.keyCode >= 65 && event.keyCode <= 90)
    {
        console.log(event.key.toLowerCase());
        keyPressed = event.key.toLowerCase();
    }
}