const express = require("express");
const router = express.Router();
const MapController = require("../controllers/map");
const AuthMiddleware = require("../middlewares/auth");
const RBACMiddleware = require("../middlewares/rbac");

router.post(
  "/markers",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("marker:create"),
  MapController.createMarker
);
router.get(
  "/markers",
  RBACMiddleware.requirePermissions("marker:read"),
  MapController.getAllMarkers
);
router.get(
  "/markers/:id",
  RBACMiddleware.requirePermissions("marker:read"),
  MapController.getMarkerById
);
router.patch(
  "/markers/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("marker:update", [
    "marker:updateSelf",
    MapController.creatorValidator,
  ]),
  MapController.updateMarkerById
);
router.delete(
  "/markers/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("marker:delete", [
    "marker:deleteSelf",
    MapController.creatorValidator,
  ]),
  MapController.deleteMarkerById
);

module.exports = router;
