const FCMRepository = require("../repositories/fcm");
const firebaseAdmin = require("../config/firebase");

class FCMService {
  static async getByUserId(userId) {
    try {
      const fcmToken = await FCMRepository.getByUserId(userId);
      return fcmToken;
    } catch (err) {
      throw err;
    }
  }

  static async subscribeUserToken(userId, token) {
    try {
      const fcmToken = await FCMRepository.getByUserId(userId);
      if (fcmToken) {
        if (!fcmToken.tokens.includes(token)) {
          fcmToken.tokens.push(token);
          await FCMRepository.updateByUserId(userId, fcmToken);
        }
      } else {
        await FCMRepository.create({ user: userId, tokens: [token] });
      }
    } catch (err) {
      throw err;
    }
  }

  static async unsubscribeUserToken(userId, token) {
    try {
      const fcmToken = await FCMRepository.getByUserId(userId);
      if (fcmToken) {
        fcmToken.tokens = fcmToken.tokens.filter((t) => t !== token);
        await FCMRepository.updateByUserId(userId, fcmToken);
      }
    } catch (err) {
      throw err;
    }
  }

  static async sendNotificationToUser(userId, notification = {}, options = {}) {
    try {
      const fcm = await FCMRepository.getByUserId(userId);
      if (fcm) {
        const payload = {
          notification: {
            title: notification.title,
            body: notification.body,
          },
          ...options,
        };
        fcm.tokens.forEach(async (token) => {
          await firebaseAdmin.messaging().send({
            ...payload,
            token,
          });
        });
      }
    } catch (err) {
      throw err;
    }
  }

  static async sendNotificationToTopic(topic, notification = {}, options = {}) {
    try {
      const message = {
        notification: {
          title: notification.title,
          body: notification.body,
        },
        ...options,
        topic,
      };
      await firebaseAdmin.messaging().send(message);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = FCMService;
