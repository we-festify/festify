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
router.get(
  "/me", // get all entry passes of self
  AuthMiddleware.requireLoggedIn,
  AuthMiddleware.requireVerified,
  EntryPassController.getAllBySelf
);

module.exports = router;
