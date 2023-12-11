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

// Announcements
router.post(
  "/:eventId/announcements",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermission("announcement", "create"),
  EventController.createAnnouncement
);
router.get(
  "/:eventId/announcements",
  RBACMiddleware.requirePermission("announcement", "read"),
  EventController.getAllAnnouncementsByEventId
);
router.delete(
  "/:eventId/announcements/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermission("announcement", "delete"),
  EventController.deleteAnnouncementById
);

module.exports = router;
