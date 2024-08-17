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

  static async sendNotificationToTopics(
    topics,
    notification = {},
    options = {}
  ) {
    try {
      const condition = topics
        .reduce((acc, topic) => {
          acc = `'${topic}' in topics || ${acc}`;
          return acc;
        }, "")
        .slice(0, -4);
      const message = {
        notification: {
          title: notification.title,
          body: notification.body,
        },
        ...options,
        condition,
      };
      await firebaseAdmin.messaging().send(message);
    } catch (err) {
      throw err;
    }
  }

  static async subscribeToTopics(userId, topics, token) {
    try {
      let tokens = [token];
      console.log(userId, topics, token);
      if (!token) tokens = await FCMRepository.getByUserId(userId).tokens;
      if (tokens.length > 0) {
        topics.forEach(async (topic) => {
          await firebaseAdmin.messaging().subscribeToTopic(tokens, topic);
        });
      }
    } catch (err) {
      throw err;
    }
  }

  static async unsubscribeFromTopics(userId, topics, token) {
    try {
      let tokens = [token];
      console.log(userId, topics, token);
      if (!token) tokens = await FCMRepository.getByUserId(userId).tokens;
      if (tokens.length > 0) {
        topics.forEach(async (topic) => {
          await firebaseAdmin.messaging().unsubscribeFromTopic(tokens, topic);
        });
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = FCMService;
