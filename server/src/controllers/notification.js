const WebPushService = require("../services/webPush");

class NotificationController {
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

  static async getSubscriptionsByUser(req, res, next) {
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
}

module.exports = NotificationController;
