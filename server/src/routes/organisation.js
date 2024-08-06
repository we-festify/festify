const express = require("express");
const router = express.Router();
const OrganisationController = require("../controllers/organisation");
const AuthMiddleware = require("../middlewares/auth");
const RBACMiddleware = require("../middlewares/rbac");

router.post(
  "/",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("organisation:create"),
  OrganisationController.create
);
router.get(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("organisation:read"),
  OrganisationController.getById
);
router.get(
  "/",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("organisation:read"),
  OrganisationController.getAll
);
router.patch(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("organisation:update", [
    "organisation:updateSelf",
    OrganisationController.organisationMemberValidator,
  ]),
  OrganisationController.updateById
);
router.delete(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("organisation:delete"),
  OrganisationController.deleteById
);

module.exports = router;
