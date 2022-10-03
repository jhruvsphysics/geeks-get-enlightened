const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/", ensureAuth, profileController.getProfile);
router.get("/getMyJokes", ensureAuth, profileController.getMyJokes);

module.exports = router;