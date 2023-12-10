const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/notification");
const AuthMiddleware = require("../middlewares/auth");
const RBACMiddleware = require("../middlewares/rbac");

// Notification Permission
router.patch(
  "/permission",
  AuthMiddleware.requireLoggedIn,
  NotificationController.updatePermissions
);
router.get(
  "/permission",
  AuthMiddleware.requireLoggedIn,
  NotificationController.getPermissions
);

// Web Push
router.post(
  "/webpush/subscription",
  AuthMiddleware.requireLoggedIn,
  NotificationController.subscribeWebPush
);
router.delete(
  "/webpush/subscription",
  AuthMiddleware.requireLoggedIn,
  NotificationController.unsubscribeWebPush
);
router.get(
  "/webpush/subscription",
  AuthMiddleware.requireLoggedIn,
  NotificationController.getSubscriptionsByUser
);
router.post(
  "/webpush/test",
  RBACMiddleware.requireAdmin,
  NotificationController.testWebPush
);

module.exports = router;
