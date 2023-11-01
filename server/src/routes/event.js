const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event");
const { checkLoggedIn } = require("../middlewares/auth");
const { checkPermission } = require("../middlewares/rbac");

router.post(
  "/",
  checkLoggedIn,
  checkPermission("event", "create"),
  EventController.create
);
router.get(
  "/:id",
  checkLoggedIn,
  checkPermission("event", "read"),
  EventController.getById
);
router.get(
  "/",
  checkLoggedIn,
  checkPermission("event", "read"),
  EventController.getAll
);
router.get(
  "/type/:type",
  checkLoggedIn,
  checkPermission("event", "read"),
  EventController.getAllByType
);
router.get(
  "/organisation/:organisationId",
  checkLoggedIn,
  checkPermission("event", "read"),
  EventController.getAllByOrganisation
);
router.put(
  "/:id",
  checkLoggedIn,
  checkPermission("event", "update"),
  EventController.updateById
);
router.delete(
  "/:id",
  checkLoggedIn,
  checkPermission("event", "delete"),
  EventController.deleteById
);

module.exports = router;
