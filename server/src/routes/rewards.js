const express = require("express");
const router = express.Router();
const RewardController = require("../controllers/reward");
const AuthMiddleware = require("../middlewares/auth");
const RBACMiddleware = require("../middlewares/rbac");

router.get(
  "/me",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("reward:read"),
  RewardController.getAllBySelf
);
router.get(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("reward:read"),
  RewardController.getById
);

module.exports = router;
