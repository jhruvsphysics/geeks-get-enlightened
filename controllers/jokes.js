const JokeBank = require("../models/JokeBank");
// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
  getJokeGenerator: async (req, res) => {
    try {
    //   const jokes = await Joke.find({  });
    let joke = {m: 1}
      res.render("joke.ejs", { joke: joke, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  getJoke: async (req, res) => {
    try {
    const jokes = await JokeBank.find().sort({ likes: -1 }).lean();
    const max = 400
    const randomInd = Math.floor(Math.random() * max)
    console.log(jokes[randomInd])
      res.render("joke.ejs", { joke: jokes[randomInd], user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
};