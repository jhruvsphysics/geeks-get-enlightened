const express = require("express");
const router = express.Router();
const jokesController = require("../controllers/jokes");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/getJoke", ensureAuth, jokesController.getJoke);
router.get("/getJoke/:id", ensureAuth, jokesController.getJokeID);
router.post("/createJoke", ensureAuth, jokesController.createJoke);
router.get("/feed", jokesController.getJokeFeed);
router.put("/likeJoke/:id", jokesController.likeJoke);
router.delete("/deleteJoke/:id", jokesController.deleteJoke);

module.exports = router;