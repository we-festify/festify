const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event");
const AuthMiddleware = require("../middlewares/auth");
const RBACMiddleware = require("../middlewares/rbac");

router.post(
  "/",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("event:create"),
  EventController.create
);
router.get(
  "/:id",
  RBACMiddleware.requirePermissions("event:read"),
  EventController.getById
);
router.get(
  "/",
  RBACMiddleware.requirePermissions("event:read"),
  EventController.getAll
);
router.get(
  "/type/:type",
  RBACMiddleware.requirePermissions("event:read"),
  EventController.getAllByType
);
router.get(
  "/organisation/:organisationId",
  RBACMiddleware.requirePermissions("event:read"),
  EventController.getAllByOrganisation
);
router.put(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("event:update", [
    "event:updateSelf",
    EventController.creatorValidator,
  ]),
  EventController.updateById
);
router.delete(
  "/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("event:delete", [
    "event:deleteSelf",
    EventController.creatorValidator,
  ]),
  EventController.deleteById
);

// Announcements
router.post(
  "/:eventId/announcements",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("announcement:create"),
  EventController.createAnnouncement
);
router.get(
  "/:eventId/announcements",
  RBACMiddleware.requirePermissions("announcement:read"),
  EventController.getAllAnnouncementsByEventId
);
router.delete(
  "/:eventId/announcements/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("announcement:delete", [
    "announcement:deleteSelf",
    EventController.announcementSelfValidator,
  ]),
  EventController.deleteAnnouncementById
);

module.exports = router;
