const express = require("express");
const router = express.Router();
const OrganisationController = require("../controllers/organisation");
const AuthMiddleware = require("../middlewares/auth");
const RBACMiddleware = require("../middlewares/rbac");

router.post(
  "/",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermission("organisation", "create"),
  OrganisationController.create
);
router.get(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermission("organisation", "read"),
  OrganisationController.getById
);
router.get(
  "/",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermission("organisation", "read"),
  OrganisationController.getAll
);
router.put(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermission("organisation", "update"),
  OrganisationController.updateById
);
router.delete(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermission("organisation", "delete"),
  OrganisationController.deleteById
);

module.exports = router;
