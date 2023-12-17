const express = require("express");
const router = express.Router();
const MapController = require("../controllers/map");
const AuthMiddleware = require("../middlewares/auth");
const RBACMiddleware = require("../middlewares/rbac");

router.post(
  "/markers",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requireAdmin,
  MapController.createMarker
);
router.get("/markers", MapController.getAllMarkers);
router.get("/markers/:id", MapController.getMarkerById);
router.patch(
  "/markers/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requireAdmin,
  MapController.updateMarkerById
);
router.delete(
  "/markers/:id",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requireAdmin,
  MapController.deleteMarkerById
);

module.exports = router;
