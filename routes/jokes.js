const express = require("express");
const router = express.Router();
const jokesController = require("../controllers/jokes");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.post("/createJoke", ensureAuth, jokesController.createJoke);

module.exports = router;