const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const RBACMiddleware = require("../middlewares/rbac");

router.get(
  "/",
  RBACMiddleware.requireAdmin,
  RBACMiddleware.requirePermission("user", "read"),
  UserController.getAll
);
router.get(
  "/:userId",
  RBACMiddleware.requireAdmin,
  RBACMiddleware.requirePermission("user", "read"),
  UserController.getById
);
router.post(
  "/",
  RBACMiddleware.requireAdmin,
  RBACMiddleware.requirePermission("user", "create"),
  UserController.create
);
router.patch(
  "/:userId",
  RBACMiddleware.requirePermission("user", "update"),
  UserController.update
);
router.delete(
  "/:userId",
  RBACMiddleware.requireAdmin,
  RBACMiddleware.requirePermission("user", "delete"),
  UserController.delete
);

module.exports = router;
