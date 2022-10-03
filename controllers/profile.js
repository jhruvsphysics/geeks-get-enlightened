const JokeBank = require("../models/JokeBank");

module.exports = {
    getProfile: async (req, res) => {
        try {
            const jokes = await JokeBank.find({user: req.user.id})
            res.render("profile1.ejs", { jokes: jokes, user: req.user });
        } catch (err) {
            console.log(err);
        }
        },
  getMyJokes: async (req, res) => {
    try {
      const jokes = await JokeBank.find({
        user: req.user.id
      });
      res.render("jokefeed.ejs", { jokes: jokes, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};