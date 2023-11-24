const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth");
const ParticipantController = require("../controllers/participant");

router.post(
  "/",
  AuthMiddleware.requireLoggedIn,
  AuthMiddleware.requireVerified,
  ParticipantController.create
);

router.get(
  "/me",
  AuthMiddleware.requireLoggedIn,
  AuthMiddleware.requireVerified,
  ParticipantController.getAllParticipationsBySelf
);

module.exports = router;
