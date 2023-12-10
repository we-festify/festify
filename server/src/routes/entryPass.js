const express = require("express");
const router = express.Router();
const EntryPassController = require("../controllers/entryPass");
const AuthMiddleware = require("../middlewares/auth");

router.post(
  "/:eventId/purchase",
  AuthMiddleware.requireLoggedIn,
  AuthMiddleware.requireVerified,
  EntryPassController.purchase
);

module.exports = router;
