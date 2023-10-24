const express = require("express");
const router = express.Router();
const RegistrationController = require("../controllers/registration");

router.post("/", RegistrationController.create);

module.exports = router;
