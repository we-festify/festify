const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth");
const ParticipantController = require("../controllers/participant");

router.post(
  "/",
  AuthMiddleware.requireLoggedIn,
  AuthMiddleware.requireVerified,
  ParticipantController.register
);
router.get(
  "/me",
  AuthMiddleware.requireLoggedIn,
  AuthMiddleware.requireVerified,
  ParticipantController.getAllParticipationsBySelf
);
router.get(
  "/event/:eventId",
  AuthMiddleware.requireLoggedIn,
  AuthMiddleware.requireVerified,
  ParticipantController.getAllByEventId
);

module.exports = router;
