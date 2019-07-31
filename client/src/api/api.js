import axios from "axios";

export default {
    getRandomWord: function () {
        return axios.get("/api/randomWord");
    },
    getHighScore: function () {
        return axios.get("/api/highScore");
    },
    postHighScore: function (score) {
        return axios.post("/api/highScore", { score: score });
    }
};
