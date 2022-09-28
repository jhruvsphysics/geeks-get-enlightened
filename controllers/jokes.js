const Post = require("../models/Post");
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
    //   const jokes = await Joke.find({  });
    let joke = await fetch("https://geek-jokes.sameerkumar.website/api?format=json")
    joke = await joke.json()
    console.log(joke.joke)
      res.render("joke.ejs", { joke: joke, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
};