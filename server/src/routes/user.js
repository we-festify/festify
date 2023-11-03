const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const RBACMiddleware = require("../middlewares/rbac");

router.get(
  "/",
  RBACMiddleware.requirePermission("user", "read"),
  UserController.getAll
);

module.exports = router;
