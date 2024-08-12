const { applicationDB } = require("../../database");
const FCMToken = require("../models/FCMToken")(applicationDB);

class FCMRepository {
  static async create(fcm) {
    try {
      const fcmToken = await FCMToken.create(fcm);
      return fcmToken;
    } catch (err) {
      throw err;
    }
  }

  static async getByUserId(userId) {
    try {
      const fcmToken = await FCMToken.findOne({ user: userId });
      return fcmToken;
    } catch (err) {
      throw err;
    }
  }

  static async updateByUserId(userId, fcm) {
    try {
      const fcmToken = await FCMToken.findOneAndUpdate({ user: userId }, fcm, {
        new: true,
      });
      return fcmToken;
    } catch (err) {
      throw err;
    }
  }

  static async deleteByUserId(userId) {
    try {
      await FCMToken.deleteOne({ user: userId });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = FCMRepository;
