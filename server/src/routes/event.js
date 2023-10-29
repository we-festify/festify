const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event");
const AuthMiddleware = require("../middlewares/auth");
const RBACMiddleware = require("../middlewares/rbac");

router.post(
  "/",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermission("event", "create"),
  EventController.create
);
router.get(
  "/:id",
  RBACMiddleware.requirePermission("event", "read"),
  EventController.getById
);
router.get(
  "/",
  RBACMiddleware.requirePermission("event", "read"),
  EventController.getAll
);
router.get(
  "/type/:type",
  RBACMiddleware.requirePermission("event", "read"),
  EventController.getAllByType
);
router.get(
  "/organisation/:organisationId",
  RBACMiddleware.requirePermission("event", "read"),
  EventController.getAllByOrganisation
);
router.put(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermission("event", "update"),
  EventController.updateById
);
router.delete(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermission("event", "delete"),
  EventController.deleteById
);

module.exports = router;
