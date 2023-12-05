const UserRepository = require("../repositories/user");
const WebPushSubscriptionRepository = require("../repositories/webPushSubscription");
const { BadRequestError } = require("../utils/errors");
const webpush = require("web-push");

webpush.setVapidDetails(
  process.env.WEB_PUSH_VAPID_SUBJECT,
  process.env.WEB_PUSH_VAPID_PUBLIC_KEY,
  process.env.WEB_PUSH_VAPID_PRIVATE_KEY
);

class WebPushService {
  static async subscribe(user, subscription) {
    try {
      if (!user) {
        throw new BadRequestError("User not found");
      }
      if (!subscription || !subscription.endpoint) {
        throw new BadRequestError("Invalid subscription");
      }
      if (!(await UserRepository.getById(user))) {
        throw new BadRequestError("User not found");
      }
      return await WebPushSubscriptionRepository.addToUser(user, subscription);
    } catch (err) {
      throw err;
    }
  }

  static async unsubscribe(user, subscription) {
    try {
      if (!user) {
        throw new BadRequestError("User not found");
      }
      if (!subscription || !subscription.endpoint) {
        throw new BadRequestError("Invalid subscription");
      }
      if (!(await UserRepository.getById(user))) {
        throw new BadRequestError("User not found");
      }
      return await WebPushSubscriptionRepository.removeFromUser(
        user,
        subscription
      );
    } catch (err) {
      throw err;
    }
  }

  static async getSubscriptionByUser(user) {
    try {
      if (!user) {
        throw new BadRequestError("User not found");
      }
      if (!(await UserRepository.getById(user))) {
        throw new BadRequestError("User not found");
      }
      return await WebPushSubscriptionRepository.getByUser(user);
    } catch (err) {
      throw err;
    }
  }

  static async sendNotificationToUser(
    user,
    notification,
    config = {
      topic: null,
      urgency: "normal",
      throwOnError: false,
    }
  ) {
    try {
      if (!user) {
        throw new BadRequestError("User not found");
      }
      const webPushSubscription = await WebPushSubscriptionRepository.getByUser(
        user
      );
      if (!webPushSubscription) {
        throw new BadRequestError("User not subscribed to web push");
      }
      const payload = JSON.stringify({
        title: notification.title,
        body: notification.body,
        icon: notification.icon,
      });
      const options = {
        TTL: 60,
        topic: config.topic,
        urgency: config.urgency,
      };
      const promises = webPushSubscription.subscriptions.map((subscription) => {
        return webpush.sendNotification(subscription, payload, options);
      });
      await Promise.all(promises);
    } catch (err) {
      if (config.throwOnError) {
        throw err;
      }
      console.error(err);
    }
  }
}

module.exports = WebPushService;
