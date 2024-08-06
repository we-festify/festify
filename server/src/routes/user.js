const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const RBACMiddleware = require("../middlewares/rbac");

router.get(
  "/",
  RBACMiddleware.requirePermissions("user:read"),
  UserController.getAll
);
router.get(
  "/:userId",
  RBACMiddleware.requirePermissions("user:read"),
  UserController.getById
);
router.post(
  "/",
  RBACMiddleware.requirePermissions("user:create"),
  UserController.create
);
// Update if user is self or has user:update(SUDO) permission
router.patch(
  "/:userId",
  RBACMiddleware.requirePermissions("user:update", [
    "user:updateSelf",
    UserController.selfValidator,
  ]),
  UserController.update
);
router.delete(
  "/:userId",
  RBACMiddleware.requirePermissions("user:delete"),
  UserController.delete
);

module.exports = router;
