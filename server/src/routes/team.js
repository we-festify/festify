const express = require("express");
const router = express.Router();
const TeamController = require("../controllers/team");

router.post("/", TeamController.create);

module.exports = router;
