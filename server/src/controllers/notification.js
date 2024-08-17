const NotificationService = require("../services/notification");
const FCMService = require("../services/fcm");
const { BadRequestError } = require("../utils/errors");

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

  static async sendNotificationToTopics(req, res, next) {
    try {
      const { notification, topics } = req.body;
      if (!topics || !topics.length) {
        throw new BadRequestError("Topics are required");
      }
      if (!notification || !notification.title || !notification.body) {
        throw new BadRequestError("Notification title and body are required");
      }
      await FCMService.sendNotificationToTopics(topics, notification);
      res.status(200).json({
        message: "Notification sent",
      });
    } catch (err) {
      next(err);
    }
  }

  static async subscribeToTopics(req, res, next) {
    try {
      const { topics, token } = req.body;
      const { user } = req;

      await FCMService.subscribeToTopics(user._id, topics, token);
      res.status(200).json({
        message: "Subscribed to topic",
      });
    } catch (err) {
      next(err);
    }
  }

  static async unsubscribeFromTopics(req, res, next) {
    try {
      const { topics, token } = req.body;
      const { user } = req;

      await FCMService.unsubscribeFromTopics(user._id, topics, token);
      res.status(200).json({
        message: "Unsubscribed from topic",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = NotificationController;
