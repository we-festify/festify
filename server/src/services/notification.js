const NotificationPermissionRepository = require("../repositories/notificationPermission");

class NotificationService {
  static async updatePermissions(userId, notificationPermission) {
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

  static async getPermissions(userId) {
    return await NotificationPermissionRepository.get(userId);
  }
}

module.exports = NotificationService;
