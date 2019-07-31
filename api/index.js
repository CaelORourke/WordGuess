const router = require("express").Router();
const wordGuessController = require("../controllers/wordGuessController");
const highScoreController = require("../controllers/highScoreController");

//matches with "/api"
router.route("/")
    .get((req, res) => {
        res.json(wordsToGuess);
});

//matches with "/api/randomWord"
router.route("/randomWord")
    .get(wordGuessController.getRandomWord);

//matches with "/api/highScore"
router.route("/highScore")
    .get(highScoreController.getHighScore)
    .post(highScoreController.postHighScore);

module.exports = router;
