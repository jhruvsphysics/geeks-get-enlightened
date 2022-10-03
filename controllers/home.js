const User = require("../models/User");

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  getAbout: (req, res) => {
    res.render("about.ejs");
  },
  getLeaderboard: async (req, res) => {
    try {
      const leaders = await User.find().sort({ total_likes: -1 }).lean();
      res.render("leaderboard.ejs", {leaders: leaders, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
};
