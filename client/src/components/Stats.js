import React from "react";

function Stats({
    wordToGuess,
    lettersGuessed,
    score,
    guessesRemaining,
    timeRemaining
}) {
    return (
        <div>
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title" id="currentWordLabel">Word to Guess:</h5>
                    <p className="card-text"><span id="currentWord">{wordToGuess}</span></p>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title" id="lettersGuessedLabel">Letters Guessed:</h5>
                    <p className="card-text"><span id="lettersGuessed">{lettersGuessed}</span></p>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    <p className="card-text"><span id="guessesRemainingLabel">Guesses Remaining:</span> <span id="guessesRemaining">{guessesRemaining}</span></p>
                </div>
            </div>
            <div id="timerDisplay" className="card mb-4">
                <div className="card-body">
                    <p className="card-text">{timeRemaining}</p>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <p className="card-text">Score: <span id="score">{score}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Stats;
