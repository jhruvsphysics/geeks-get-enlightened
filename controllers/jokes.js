const JokeBank = require("../models/JokeBank");
const User = require("../models/User");
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
    // const jokes = await JokeBank.find().sort({ likes: -1 }).lean();
    const jokes = await JokeBank.find().lean();
    const max = jokes.length
    const randomInd = Math.floor(Math.random() * max)
    console.log(jokes[randomInd])
    await JokeBank.findOneAndUpdate(
      { _id: jokes[randomInd]._id },
      {
        $inc: { views: 1 },
      }
    );
    await User.findOneAndUpdate(
      { _id: jokes[randomInd].user },
      {
        $inc: { total_views: 1 },
      }
    );
    res.redirect(`/joke/getJoke/${jokes[randomInd]._id}`);
    } catch (err) {
      console.log(err);
    }
  },
  getJokeID: async (req, res) => {
    try {
      const joke = await JokeBank.findById(req.params.id);
      res.render("joke.ejs", { joke: joke, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createJoke: async (req, res) => {
    try {
      const joke = await JokeBank.create({
                    setup: req.body.setup,
                    punchline: req.body.punchline,
                    likes: 0,
                    views: 0,
                    user: req.user.id,
                  });
      console.log("Joke has been added!", joke);
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  getJokeFeed: async (req, res) => {
    try {
    const jokes = await JokeBank.find().sort({ likes: -1 }).lean();
    res.render("jokefeed.ejs", { jokes: jokes, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  likeJoke: async (req, res) => {
    try {
      const joke = await JokeBank.findOne({_id: req.params.id})
      if (joke.likes < joke.views) {
        await JokeBank.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
          }
        );
        await User.findOneAndUpdate(
          { _id: joke.user },
          {
            $inc: { total_likes: 1 },
          }
        );
        console.log(`Likes +1`);
      }
      console.log(`Likes +0 due to limit set by views`);
      res.redirect(`/joke/getJoke/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteJoke: async (req, res) => {
    try {
      // Delete joke from db
      await JokeBank.remove({ _id: req.params.id });
      console.log("Deleted joke");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};