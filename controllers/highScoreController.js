const fetch = require('node-fetch');

module.exports = {
  getHighScore: function (req, res) {
    fetch('https://nameless-springs-78473.firebaseio.com/highScore.json')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        res.json(myJson);
      });
  },
  postHighScore: function (req, res) {
    fetch('https://nameless-springs-78473.firebaseio.com/highScore.json', { method: 'PUT', body: req.body.score})
    .then(function (response) {
      res.json(response);
    });
  }
};
