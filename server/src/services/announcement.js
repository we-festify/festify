const AnnouncementRepository = require("../repositories/announcement");

class AnnouncementService {
  static async create(announcement) {
    try {
      return await AnnouncementRepository.create(announcement);
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await AnnouncementRepository.getById(id);
    } catch (err) {
      throw err;
    }
  }

  static async getAllByEventId(eventId, { page, limit }) {
    try {
      return await AnnouncementRepository.getAllByEventId(eventId, {
        page,
        limit,
      });
    } catch (err) {
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      return await AnnouncementRepository.deleteById(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AnnouncementService;
