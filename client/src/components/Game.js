import React, { Component } from "react";
import Jumbotron from "./Jumbotron";
import Image from "./Image";
import Stats from "./Stats";
import QuitOrContinueDialog from "./QuitOrContinueDialog";
import GameOverDialog from "./GameOverDialog";
import Api from "../api/api";
import Stopwatch from "./Stopwatch";

class Game extends Component {
    state = {
        wordToGuess: "",
        letterScore: 0,
        lettersInWord: [],
        lettersToDisplay: [],
        lettersGuessed: [],
        score: 0,
        highScore: 0,
        guessesRemaining: 0,
        gameStarted: false,
        showQuitOrContinue: false,
        showGameOver: false,
        timeRemaining: "01:00"
    };

    constructor(props) {
        super(props);

        this.correctGuessSound = new Audio("assets/sounds/sms-alert-1-daniel_simon.mp3");
        this.wrongGuessSound = new Audio("assets/sounds/fire_bow_sound-mike-koenig.mp3");

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        this.getHighScore();

        Stopwatch.onDisplayTime((time) => {
            this.setState({ timeRemaining: time });
        });

        Stopwatch.onTimesUp(() => {
            // showGameOver("Time's up!");
            // Stopwatch.stopTimer();
            this.setState({ showGameOver: true });
        });

        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        if (this.state.gameStarted) {

            if (event.which === 32)// spacebar
            {
                Stopwatch.stopTimer();
                this.setState({ showGameOver: true });
            }

            // NOTE: we only care about letters
            if (event.which >= 65 && event.which <= 90) {
                let keyPressed = event.key.toLowerCase();
                // console.log(keyPressed);

                // don't let the user make the same guess
                if (this.hasGuessedLetter(keyPressed)) {
                    return;
                }

                if (this.isLetterInWord(keyPressed, Stopwatch.getTime())) {
                    this.playSound(this.correctGuessSound);
                }
                else {
                    this.playSound(this.wrongGuessSound);
                }
            }
        }
        else {
            this.newRound();
        }
    }

    updateLettersToDisplay = (letter) => {
        let newLettersToDisplay = this.state.lettersToDisplay.slice(0);
        for (let i = 0; i < this.state.lettersInWord.length; i++) {
            if (letter === this.state.lettersInWord[i].toLowerCase()) {
                newLettersToDisplay[i] = this.state.lettersInWord[i];
            }
        }
        this.setState({ lettersToDisplay: newLettersToDisplay });
    };

    hasGuessedLetter = (letter) => {
        let newLettersGuessed = this.state.lettersGuessed.slice(0);
        if (newLettersGuessed.indexOf(letter) > -1) {
            return true;
        }
        else {
            newLettersGuessed.push(letter);
            newLettersGuessed.sort();
            this.setState({ lettersGuessed: newLettersGuessed });
            return false;
        }
    };

    isLetterInWord = (letter, timeRemaining) => {
        if ((this.state.wordToGuess.indexOf(letter) > -1) || (this.state.wordToGuess.indexOf(letter.toUpperCase()) > -1)) {
            // console.log("correct guess");
            this.updateLettersToDisplay(letter);

            // check if user won
            if (this.state.lettersInWord.toString() === this.state.lettersToDisplay.toString()) {
                // score points for letters in the word
                let score = this.state.score + (this.state.letterScore * 100);
                this.setState({ score: score });

                if (timeRemaining > 0) {
                    // score points for time remaining
                    score += (timeRemaining * 10);
                }

                this.getHighScore()
                .then(() => {
                    if (score > this.state.highScore) {
                        Api.postHighScore(score);
                        this.setState({ highScore: score });
                    }
                });

                Stopwatch.stopTimer();
                this.setState({ showQuitOrContinue: true });
            }

            return true;
        }
        else {
            let guessesRemaining = this.state.guessesRemaining;
            guessesRemaining--;
            this.setState({ guessesRemaining: guessesRemaining });

            // check if user lost
            if (this.state.guessesRemaining < 1) {
                Stopwatch.stopTimer();
                this.setState({ showGameOver: true });
            }

            return false;
        }
    };

    newRound = () => {
        Api.getRandomWord()
            .then(res => {
                let currentWord = res.data.wordToGuess;
                let lettersInWord = currentWord.split("");
                let lettersToDisplay = currentWord.replace(/[a-zA-Z]/g, "_").split("");
                // console.log(currentWord);

                Stopwatch.resetTimer();
                Stopwatch.startTimer();
        
                this.setState({
                    wordToGuess: res.data.wordToGuess,
                    lettersInWord: lettersInWord,
                    lettersToDisplay: lettersToDisplay,
                    lettersGuessed: [],
                    letterScore: res.data.letterScore,
                    guessesRemaining: 6,
                    gameStarted: true,
                    showQuitOrContinue: false,
                    showGameOver: false
                });
            })
            .catch(err => console.log(err));
    };

    resetGame = () => {
        Stopwatch.startTime = 60;// seconds
        Stopwatch.resetTimer();

        this.setState({
            wordToGuess: "",
            lettersInWord: [],
            lettersToDisplay: [],
            lettersGuessed: [],
            wordsGuessed: [],
            letterScore: 0,
            score: 0,
            guessesRemaining: 0,
            gameStarted: false,
            showQuitOrContinue: false,
            showGameOver: false
        });
    };

    playSound = (sound) => {
        if (sound.paused) {
            sound.play();
        }
        else {
            sound.pause();
            sound.currentTime = 0;
            sound.play();
        }
    };

    formatScore = (score) => {
        return score.toLocaleString('en-US');
    };

    modalClose = () => {
        this.newRound();
    };

    onQuit = () => {
        this.resetGame();
    };

    onContinue = () => {
        this.newRound();
    };

    getHighScore = () => {
        return Api.getHighScore()
            .then(res => {
                if (res.data !== null) {
                    let highScore = parseInt(res.data);
                    this.setState({
                        highScore: highScore
                    });
                }
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <Jumbotron title="Word Guess" description="Guess the names of cat breeds." instructions={this.state.gameStarted ? "Press a letter key to guess. Press spacebar to quit." : "Press any key to get started!"}>
                                <div id="highScoreDisplay">High Score: <span id="highScore">{this.formatScore(this.state.highScore)}</span></div>
                            </Jumbotron>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <Image src="assets/images/kitty-551554_640.jpg" alt="kitten" />
                        </div>
                        <div className="col-lg-6">
                            <Stats wordToGuess={this.state.lettersToDisplay} lettersGuessed={this.state.lettersGuessed} guessesRemaining={this.state.guessesRemaining} timeRemaining={this.state.timeRemaining} score={this.formatScore(this.state.score)} />
                        </div>
                    </div>
                </div>
                <QuitOrContinueDialog title="Congratulations!" message="You won!" show={this.state.showQuitOrContinue} onHide={this.modalClose} onQuit={this.onQuit} onContinue={this.onContinue} />
                <GameOverDialog title="Game Over!" message="You lost!" show={this.state.showGameOver} onHide={this.onQuit} />
            </div>
        );
    }
}

export default Game;
