const express = require("express");
const router = express.Router();
const SponsorController = require("../controllers/sponsor");
const AuthMiddleware = require("../middlewares/auth");
const RBACMiddleware = require("../middlewares/rbac");

router.post(
  "/",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermission("sponsor", "create"),
  SponsorController.create
);
router.get(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermission("sponsor", "read"),
  SponsorController.getById
);
router.get(
  "/",
  RBACMiddleware.requirePermission("sponsor", "read"),
  SponsorController.getAll
);
router.patch(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermission("sponsor", "update"),
  SponsorController.updateById
);
router.delete(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermission("sponsor", "delete"),
  SponsorController.deleteById
);

module.exports = router;
