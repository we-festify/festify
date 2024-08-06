const express = require("express");
const router = express.Router();
const RBACController = require("../controllers/rbac");
const RBACMiddleware = require("../middlewares/rbac");

router.get("/permissions/me", RBACController.getMyPermissions);
router.get("/actions", RBACController.getAllActions);
router.get("/permissions", RBACController.getAllPermissions);
router.put(
  "/permissions",
  RBACMiddleware.requirePermissions("permissions:update"),
  RBACController.updatePermissions
);

module.exports = router;
