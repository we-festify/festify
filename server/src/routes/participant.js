const express = require("express");
const router = express.Router();
const ParticipantController = require("../controllers/participant");

router.post("/", ParticipantController.create);

module.exports = router;
