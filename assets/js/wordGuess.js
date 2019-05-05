const wordGuess = (function () {
    let currentWord = "";
    let gameLost = false;
    let gameStarted = false;
    let gameWon = false;
    let guessesRemaining = 6;
    let lettersGuessed = [];
    let lettersInWord = [];
    let lettersToDisplay = [];
    let losses = 0;
    let score = 0;
    let wins = 0;
    let wordsGuessed = [];

    const letterScores = {
        'a': 1,
        'b': 3,
        'C': 3,
        'd': 2,
        'e': 1,
        'f': 4,
        'g': 2,
        'h': 4,
        'i': 1,
        'j': 8,
        'k': 5,
        'l': 1,
        'm': 3,
        'n': 1,
        'o': 1,
        'p': 3,
        'q': 10,
        'r': 1,
        's': 1,
        't': 1,
        'u': 1,
        'v': 4,
        'w': 4,
        'x': 8,
        'y': 4,
        'z': 10
        };

    function chooseRandomWord() {
        currentWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
        if (wordsGuessed.indexOf(currentWord) > -1) {
            chooseRandomWord();
        }
        else {
            lettersInWord = currentWord.split("");
            lettersToDisplay = currentWord.replace(/[a-zA-Z]/g, "_").split("");
            wordsGuessed.push(currentWord);
            // console.log(`currentWord='${currentWord}'`);
            // console.log(lettersInWord);
            // console.log(lettersToDisplay);
        }
    };

    function getLetterScore(letters) {
        let score = 0;
        for (let i = 0; i < letters.length; ++i) {
            score += letterScores[letters[i]] || 0;
        }
        return score;
    };

    function updateLettersToDisplay(letter) {
        for (let i = 0; i < lettersInWord.length; i++) {
            if (letter === lettersInWord[i].toLowerCase()) {
                lettersToDisplay[i] = lettersInWord[i];
            }
        }
    };

    return {
        getGamePaused() {
            return gameWon || gameLost;
        },

        getGameStarted() {
            return gameStarted;
        },

        getGuessesRemaining() {
            return guessesRemaining;
        },

        getLettersGuessed() {
            return lettersGuessed;
        },

        getLettersToDisplay() {
            return lettersToDisplay;
        },

        getLosses() {
            return losses;
        },

        getScore() {
            return score;
        },

        getWins() {
            return wins;
        },

        hasGuessedLetter(letter) {
            if (lettersGuessed.indexOf(letter) > -1) {
                return true;
            }
            else {
                lettersGuessed.push(letter);
                lettersGuessed.sort();
                return false;
            }
        },

        hasUserLost() {
            return gameWon;
        },

        hasUserWon() {
            return gameLost;
        },

        isLetterInWord(letter, timeRemaining) {
            if ((currentWord.indexOf(letter) > -1) || (currentWord.indexOf(letter.toUpperCase()) > -1)) {
                // console.log("correct guess");
                updateLettersToDisplay(letter);

                // check if user won
                if (lettersInWord.toString() === lettersToDisplay.toString()) {
                    wins++;
                    // score points for letters in the word
                    score += getLetterScore(lettersInWord) * 100;

                    if (timeRemaining > 0) {
                        // score points for time remaining
                        score += (timeRemaining * 10);
                    }
                    gameLost = true;
                }

                return true;
            }
            else {
                guessesRemaining--;

                // check if user lost
                if (guessesRemaining < 1) {
                    losses++;
                    gameWon = true;
                }

                return false;
            }
        },

        newRound() {
            guessesRemaining = 6;
            lettersInWord = [];
            lettersToDisplay = [];
            lettersGuessed = [];
            chooseRandomWord();
            gameWon = false;
            gameLost = false;
            gameStarted = true;
        },

        resetGame() {
            wins = 0;
            losses = 0;
            score = 0;
            wordsGuessed = [];
            gameWon = false;
            gameLost = false;
            gameStarted = false;
        }
    };
})();
