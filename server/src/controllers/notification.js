const NotificationService = require("../services/notification");
const FCMService = require("../services/fcm");
const WebPushService = require("../services/webPush");

class NotificationController {
  // Notification Permission
  static async updatePermissions(req, res, next) {
    try {
      const { user } = req;
      const { notificationPermission } = req.body;
      const updatedNotificationPermission =
        await NotificationService.updatePermissions(
          user._id,
          notificationPermission
        );
      res.status(200).json({
        notificationPermission: updatedNotificationPermission,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getPermissions(req, res, next) {
    try {
      const { user } = req;
      const notificationPermission = await NotificationService.getPermissions(
        user._id
      );
      res.status(200).json({
        notificationPermission,
      });
    } catch (err) {
      next(err);
    }
  }

  // Web Push
  static async subscribeWebPush(req, res, next) {
    try {
      const { user } = req;
      const { subscription } = req.body;
      const webPushSubscription = await WebPushService.subscribe(
        user,
        subscription
      );
      res.status(200).json({
        subscription: webPushSubscription,
      });
    } catch (err) {
      next(err);
    }
  }

  static async unsubscribeWebPush(req, res, next) {
    try {
      const { user } = req;
      const { subscription } = req.body;
      const webPushSubscription = await WebPushService.unsubscribe(
        user,
        subscription
      );
      res.status(200).json({
        subscription: webPushSubscription,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getWebPushSubscriptionsByUser(req, res, next) {
    try {
      const { user } = req;
      const webPushSubscriptions = await WebPushService.getSubscriptionByUser(
        user
      );
      res.status(200).json({
        subscription: webPushSubscriptions,
      });
    } catch (err) {
      next(err);
    }
  }

  static async testWebPush(req, res, next) {
    try {
      const { notification } = req.body;
      const { user } = req;
      await WebPushService.sendNotificationToUser(user, notification, {
        topic: "test",
        throwOnError: true,
      });
      res.status(200).json({
        message: "Notification sent",
      });
    } catch (err) {
      next(err);
    }
  }

  // FCM
  static async getFCMByUser(req, res, next) {
    try {
      const { user } = req;
      const fcm = await FCMService.getByUserId(user);
      res.status(200).json({
        fcm,
      });
    } catch (err) {
      next(err);
    }
  }

  static async subscribeFCM(req, res, next) {
    try {
      const { user } = req;
      const { token } = req.body;
      const subscribedFCM = await FCMService.subscribeUserToken(user, token);
      res.status(200).json({
        fcm: subscribedFCM,
      });
    } catch (err) {
      next(err);
    }
  }

  static async unsubscribeFCM(req, res, next) {
    try {
      const { user } = req;
      const { token } = req.body;
      const unsubscribedFCM = await FCMService.unsubscribeUserToken(
        user,
        token
      );
      res.status(200).json({
        fcm: unsubscribedFCM,
      });
    } catch (err) {
      next(err);
    }
  }

  static async testFCM(req, res, next) {
    try {
      const { notification } = req.body;
      const { user } = req;
      await FCMService.sendNotificationToUser(user._id, notification);
      res.status(200).json({
        message: "Notification sent",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = NotificationController;
