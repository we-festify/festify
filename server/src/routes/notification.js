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

// FCM
router.get("/fcm", NotificationController.getFCMByUser);
router.post("/fcm/subscribe", NotificationController.subscribeFCM);
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
router.post(
  "/fcm/send",
  AuthMiddleware.requireLoggedIn,
  RBACMiddleware.requirePermissions("notification:send"),
  NotificationController.sendNotificationToTopics
);
router.post("/fcm/subscribe/topics", NotificationController.subscribeToTopics);
router.delete(
  "/fcm/subscribe/topics",
  NotificationController.unsubscribeFromTopics
);

module.exports = router;
