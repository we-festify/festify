const NotificationPermissionRepository = require("../repositories/notificationPermission");
const Redis = require("ioredis");

class NotificationService {
  constructor() {
    // publishser for notifications
    const publisher = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      maxRetriesPerRequest: 0,
    });
    publisher.on("error", (err) => {
      console.error("Redis Notifications Publisher error:", err);
      return publisher.disconnect();
    });
    publisher.on("connect", () => {
      console.log("Redis Notifications Publisher connected");
    });
    this._publisher = publisher;
  }

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

  async sendInAppNotification(notification) {
    if (!this._publisher) return; // no redis connection
    if (!notification) throw new Error("Missing notification");
    await this._publisher.publish(
      "NOTIFICATIONS",
      JSON.stringify(notification)
    );
  }
}

module.exports = new NotificationService();
