const express = require("express");
const router = express.Router();
const RewardController = require("../controllers/reward");
const AuthMiddleware = require("../middlewares/auth");
const RBACMiddleware = require("../middlewares/rbac");

router.post(
  "/",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("reward", "create"),
  RewardController.create
);

router.get(
  "/:id",
  RBACMiddleware.requirePermissions("reward", "read"),
  RewardController.getById
);

router.get(
  "/user/:userId",
  RBACMiddleware.requirePermissions("reward", "read"),
  RewardController.getAllByUser
);


module.exports = router;
