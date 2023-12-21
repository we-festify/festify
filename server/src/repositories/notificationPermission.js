const { applicationDB } = require("../../database");

const NotificationPermission = require("../models/NotificationPermission")(
  applicationDB
);

class NotificationPermissionRepository {
  static async create(userId, notificationPermission) {
    try {
      return await NotificationPermission.create({
        user: userId,
        ...notificationPermission,
      });
    } catch (err) {
      throw err;
    }
  }

  static async update(userId, notificationPermission) {
    try {
      return await NotificationPermission.findOneAndUpdate(
        { user: userId },
        notificationPermission,
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  static async get(userId) {
    try {
      return await NotificationPermission.findOne({ user: userId });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = NotificationPermissionRepository;
