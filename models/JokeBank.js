const mongoose = require("mongoose");

const JokeBankSchema = new mongoose.Schema({
  setup: {
    type: String,
    require: true,
  },
  punchline: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    require: true,
  },
  views: {
    type: Number,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("JokeBank", JokeBankSchema);