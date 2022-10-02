const JokeBank = require("../models/JokeBank");
// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
  getJokeGenerator: async (req, res) => {
    try {
      const joke = {setup: "get a laugh", punchline: ""}
      res.render("joke.ejs", { joke: joke, user: req.user });
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
  createJoke: async (req, res) => {
    try {
      const joke = await JokeBank.create({
                    type: "general",
                    setup: req.body.setup,
                    punchline: req.body.punchline,
                    likes: 0,
                    views: 0,
                    user: req.user._id,
                  });
      console.log("Joke has been added!", joke);
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
};