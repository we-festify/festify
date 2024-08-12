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
  NotificationController.getWebPushSubscriptionsByUser
);
router.post("/webpush/test", NotificationController.testWebPush);

// FCM
router.get(
  "/fcm",
  AuthMiddleware.requireLoggedIn,
  NotificationController.getFCMByUser
);
router.post(
  "/fcm/subscribe",
  AuthMiddleware.requireLoggedIn,
  NotificationController.subscribeFCM
);
router.delete(
  "/fcm/subscribe",
  AuthMiddleware.requireLoggedIn,
  NotificationController.unsubscribeFCM
);
router.post(
  "/fcm/test",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("notification:send"),
  NotificationController.testFCM
);

module.exports = router;
