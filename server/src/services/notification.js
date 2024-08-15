const FCMService = require("./fcm");
const NotificationPermissionRepository = require("../repositories/notificationPermission");
const { createNotificationPayload } = require("../utils/notification");

class NotificationService {
  constructor() {}

  async updatePermissions(userId, notificationPermission) {
    try {
      const existingNotificationPermission =
        await NotificationPermissionRepository.get(userId);
      if (existingNotificationPermission) {
        return await NotificationPermissionRepository.update(
          userId,
          notificationPermission
        );
      } else {
        return await NotificationPermissionRepository.create(
          userId,
          notificationPermission
        );
      }
    } catch (err) {
      throw err;
    }
  }

  async getPermissions(userId) {
    return await NotificationPermissionRepository.get(userId);
  }

  async sendNotificationToTopic(topic, notificationPayload) {
    try {
      const [notification, options] =
        createNotificationPayload(notificationPayload);
      await FCMService.sendNotificationToTopic(topic, notification, options);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new NotificationService();
