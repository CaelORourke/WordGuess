//TODO: get the data from a repository
const wordsToGuess = [
  "Abyssinian",
  "American Bobtail",
  "American Curl",
  "American Shorthair",
  "American Wirehair",
  "Balinese",
  "Bengal",
  "Birman",
  "Bombay",
  "British Shorthair",
  "Burmese",
  "Chartreux",
  "Cornish Rex",
  "Cymric",
  "Devon Rex",
  "Egyptian Mau",
  "Exotic Shorthair",
  "Havana Brown",
  "Himalayan",
  "Japanese Bobtail",
  "Javanese",
  "Korat",
  "Maine Coon",
  "Manx",
  "Munchkin",
  "Nebelung",
  "Norwegian Forest",
  "Ocicat",
  "Oriental Shorthair",
  "Persian",
  "Pixie-bob",
  "Ragdoll",
  "Russian Blue",
  "Savannah",
  "Scottish Fold",
  "Selkirk Rex",
  "Siamese",
  "Siberian",
  "Singapura",
  "Snowshoe",
  "Somali",
  "Sphynx",
  "Tonkinese",
  "Turkish Angora",
  "Turkish Van"
];

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

function getLetterScore(letters) {
  let score = 0;
  for (let i = 0; i < letters.length; ++i) {
    score += letterScores[letters[i]] || 0;
  }
  return score;
};

module.exports = {
  getRandomWord: function (req, res) {
    let wordToGuess = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
    let letterScore = getLetterScore(wordToGuess);
    //TODO: don't repeat same random word during a game
    res.json({
      wordToGuess: wordToGuess,
      letterScore: letterScore
    });
  }
};
