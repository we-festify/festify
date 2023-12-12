const express = require("express");
const router = express.Router();
const EntryPassController = require("../controllers/entryPass");
const AuthMiddleware = require("../middlewares/auth");
const RBACMiddleware = require("../middlewares/rbac");

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
router.get(
  "/:entryPassId",
  AuthMiddleware.requireLoggedIn,
  AuthMiddleware.requireVerified,
  EntryPassController.getById
);
router.post(
  "/:entryPassId/check-in",
  AuthMiddleware.requireLoggedIn,
  AuthMiddleware.requireVerified,
  RBACMiddleware.requirePermission("entryPass", "checkIn"),
  EntryPassController.checkIn
);

module.exports = router;
