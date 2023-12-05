const WebPushSubscription = require("../models/WebPushSubscription");

class WebPushSubscriptionRepository {
  static async create(user, subscription) {
    try {
      return await WebPushSubscription.create({
        user,
        subscriptions: [subscription],
      });
    } catch (err) {
      throw err;
    }
  }

  static async getByUser(user) {
    try {
      return await WebPushSubscription.findOne({ user });
    } catch (err) {
      throw err;
    }
  }

  static async addToUser(user, subscription) {
    try {
      const webPushSubscription = await WebPushSubscription.findOne({ user });
      if (!webPushSubscription) {
        return await WebPushSubscriptionRepository.create(user, subscription);
      }
      const index = webPushSubscription.subscriptions.findIndex(
        (sub) => sub.endpoint === subscription.endpoint
      );
      if (index !== -1) {
        return webPushSubscription;
      }
      webPushSubscription.subscriptions.push(subscription);
      return await webPushSubscription.save();
    } catch (err) {
      throw err;
    }
  }

  static async removeFromUser(user, subscription) {
    try {
      const webPushSubscription = await WebPushSubscription.findOne({ user });
      if (!webPushSubscription) {
        return null;
      }
      const index = webPushSubscription.subscriptions.findIndex(
        (sub) => sub.endpoint === subscription.endpoint
      );
      if (index === -1) {
        return null;
      }
      webPushSubscription.subscriptions.splice(index, 1);
      if (webPushSubscription.subscriptions.length === 0) {
        await webPushSubscription.deleteOne();
        return null;
      }
      return await webPushSubscription.save();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = WebPushSubscriptionRepository;
