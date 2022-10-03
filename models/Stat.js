const mongoose = require("mongoose");

const StatSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Stat", StatSchema);