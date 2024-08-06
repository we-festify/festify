const { applicationDB } = require("../../database");

const Announcement = require("../models/Announcement")(applicationDB);

class AnnouncementRepository {
  static async create(announcement) {
    try {
      return await Announcement.create(announcement);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await Announcement.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getAllByEventId(eventId, { page, limit }) {
    try {
      return await Announcement.find({ event: eventId })
        .populate("createdBy")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      return await Announcement.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AnnouncementRepository;
